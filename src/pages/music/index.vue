<template>
  <up-navbar title="音乐播放器" :autoBack="false" @leftClick="back">
  </up-navbar>
  <view class="page-wrap">
    <view class="page-wrap-top">
      <up-search
        v-model="params.title"
        shape="square"
        :show-action="false"
        placeholder="搜索歌手或歌曲名称"
        @change="debounce(search, 4000)"
      ></up-search>
    </view>

    <view class="page-wrap-list">
      <up-list height="100%" width="100%">
        <up-list-item
          v-for="(item, index) in songList"
          :key="index"
          @click="handleClickSong(item.n)"
        >
          <view @click="handleClickSong(item.n)" class="page-wrap-listItem">
            <up-image
              :show-loading="true"
              :src="src"
              width="40px"
              height="40px"
              radius="5"
            ></up-image>
            <view style="margin-left: 5px">
              <up-text :text="item.title" color="#000"></up-text>
              <up-text :text="item.singer" color="#6B7280" size="12"></up-text>
            </view>
          </view>
        </up-list-item>
      </up-list>
    </view>

    <view class="page-wrap-bottom" v-if="songInfo.music_url">
      <view class="song-info">
        <view class="cover">
          <up-image
            :show-loading="true"
            :src="songInfo.cover"
            width="60px"
            height="60px"
            radius="5"
          ></up-image>
        </view>
        <view class="title">
          <up-text :text="songInfo.title" color="#000"></up-text>
          <up-text :text="songInfo.singer" color="#6B7280" size="12"></up-text>
        </view>
        <view class="time" v-if="songInfo.duration != 0">
          {{ songInfo.currentTime }} / {{ songInfo.duration }}
        </view>
      </view>
      <view class="song-controller">
        <span
          class="iconfont icon-left-circle"
          @click="controller('left')"
        ></span>
        <span
          v-if="paused"
          class="iconfont icon-play-circle"
          @click="controller('play')"
        ></span>
        <span
          v-else
          class="iconfont icon-timeout"
          @click="controller('paused')"
        ></span>
        <span
          class="iconfont icon-right-circle"
          @click="controller('right')"
        ></span>
        <span class="iconfont icon-reload" @click="controller('reload')"></span>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { route, toast } from "@/uni_modules/uview-plus";
import { debounce } from "@/uni_modules/uview-plus";
import { searchMusic } from "@/common/api/music";
import { onHide } from "@dcloudio/uni-app";
const params = reactive({
  title: "",
  n: "",
  num: 60,
});
const src = ref("https://cdn.uviewui.com/uview/album/1.jpg");
const songList = ref<any[]>([]);
let songInfo: any = reactive({
  id: "",
  title: "",
  singer: "",
  cover: "",
  lrc_url: "",
  music_url: "",
  duration: 0,
  currentTime: 0,
});
onHide(() => {});

const back = () => {
  if (innerAudioContext) {
    innerAudioContext.pause();
    innerAudioContext.destroy();
    innerAudioContext = null;
  }
  route({
    type: "switchTab",
    url: "/pages/tabBar/index",
  });
};
// 使用innerAudioContext 播放歌曲
let innerAudioContext: any = null;
const paused = ref(true);
const search = () => {
  params.n = "";
  handleChange();
};

/**
 * 1：params.n可以用来区分是搜索歌曲还是播放歌曲
 * 2：params.n为空时，表示搜索歌曲
 * 2.1 如果搜索的歌曲存在于数据库 则会直接播放
 * 2.2 如果搜索的歌曲不存在于数据库 则会返回搜索结果列表
 */
const handleChange = () => {
  searchMusic(params).then((res: any) => {
    const { errorCode, data, errorMessage } = res;
    if (errorCode != 0) {
      toast(errorMessage);
      return;
    }
    if (Array.isArray(data)) {
      songList.value = data;
    } else {
      if (innerAudioContext) {
        try {
          innerAudioContext.pause();
          innerAudioContext.destroy();
          innerAudioContext = null;
        } catch (e) {
          //TODO handle the exception
        }
      }
      songInfo.id = data.id;
      songInfo.title = data.title;
      songInfo.singer = data.singer;
      songInfo.cover = data.cover;
      songInfo.lrc_url = data.lrc_url;
      songInfo.music_url = data.music_url;
      songInfo.duration = 0;
      songInfo.currentTime = 0;
      play(true);

      // 判读搜索到的歌曲是否存在于歌曲列表中
      const index = songList.value.findIndex(
        (item: any) => item.title === data.title
      );
      // 如果存在则不更新歌曲列表
      if (index === -1) {
        songList.value = [];
      }
    }
  });
};

const handleClickSong = (n: string) => {
  params.n = n;
  handleChange();
};

const play = (type: boolean) => {
  paused.value = true;
  innerAudioContext = uni.createInnerAudioContext();
  innerAudioContext.autoplay = type;
  // #ifdef APP-PLUS
  innerAudioContext.autoplay = true;
  // #endif
  innerAudioContext.src = songInfo.music_url;
  innerAudioContext.onPlay(() => {
    // alert("音频播放事件");
    paused.value = innerAudioContext.paused;
  });
  innerAudioContext.onPause(() => {
    // alert("音频暂停事件");
    paused.value = innerAudioContext.paused;
  });
  innerAudioContext.onError((res: any) => {
    alert("音频播放错误事件");
  });
  innerAudioContext.onCanplay((res: any) => {
    songInfo.duration = formatTime(innerAudioContext.duration);
  });
  innerAudioContext.onTimeUpdate((res: any) => {
    songInfo.currentTime = formatTime(innerAudioContext.currentTime);
    songInfo.duration = formatTime(innerAudioContext.duration);
  });
  innerAudioContext.onEnded((res: any) => {
    if (songList.value.length > 0) {
      if (params.n && Number(params.n) + 1 > songList.value.length) {
        params.n = songList.value[0].n;
      } else {
        params.n = params.n + 1;
      }
      handleChange();
    } else {
      innerAudioContext.pause();
      innerAudioContext.destroy();
      innerAudioContext = null;
    }
  });
};

const controller = (type: any) => {
  switch (type) {
    case "play":
      innerAudioContext.play();
      break;
    case "paused":
      innerAudioContext.pause();
      break;
    case "reload":
      innerAudioContext.seek(1);
      break;
    case "left":
      innerAudioContext.seek(innerAudioContext.currentTime - 10);
      break;
    case "right":
      innerAudioContext.seek(innerAudioContext.currentTime + 10);
      break;
    default:
      break;
  }
};

// 将单位秒转成分钟秒
const formatTime = (time: any) => {
  const min = Math.floor(time / 60);
  const sec = Math.floor(time % 60);
  return `${min}:${sec < 10 ? "0" + sec : sec}`;
};
</script>

<style lang="scss" scoped>
.page-wrap {
  padding-top: calc(var(--status-bar-height) + 70px);
  .page-wrap-top {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 70px;
    padding: 12px 20px;
    background-color: #ffffff;
    box-sizing: border-box;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  .page-wrap-list {
    height: 45vh;
    .page-wrap-listItem {
      position: relative;
      display: flex;
      align-items: center;
      height: 70px;
      padding: 0 20px;
      box-sizing: border-box;
      &::after {
        position: absolute;
        content: "";
        left: 20px;
        right: 20px;
        bottom: 0;
        height: 1px;
        background-color: #f3f4f6;
      }
    }
  }
  .page-wrap-bottom {
    position: fixed;
    left: 0;
    bottom: 20px;
    width: 100%;
    border-top: 1px solid #f3f4f6;
    .song-info {
      display: flex;
      align-items: center;
      padding: 10px 20px;
      .title {
        margin-left: 10px;
      }
      .time {
        flex: 1;
        text-align: right;
        color: #6b7280;
        font-size: 12px;
      }
    }
    .song-controller {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 50px;
      margin-top: 10px;
      .iconfont {
        font-size: 30px;
        margin: 0 10px;
      }
    }
  }
}
</style>
