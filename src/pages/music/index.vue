<template>
  <up-navbar title="音乐播放器" :autoBack="false" @leftClick="back">
  </up-navbar>
  <view class="page-wrap">
    <u-dropdown>
      <u-dropdown-item
        v-model="channel"
        :title="title"
        :options="channelList"
        @change="change"
      ></u-dropdown-item>
      <u-dropdown-item
        v-model="channel"
        title="版本"
        :options="channelList"
      ></u-dropdown-item>
      <u-dropdown-item
        v-model="channel"
        title="接口"
        :options="channelList"
      ></u-dropdown-item>
    </u-dropdown>
    <up-search
      style="margin-top: 30px"
      :inputStyle="inputStyle"
      placeholder="搜索歌曲名称或歌手"
      shape="square"
      :show-action="true"
      actionText="搜索"
      height="48"
      borderColor="#E7EAF0"
      bgColor="#FFFFFF"
      v-model="keyword"
      @custom="search"
    ></up-search>

    <view class="song-list" v-if="songList.length">
      <view
        class="item"
        v-for="(item, index) in songList"
        :key="index"
        @click="getMusic(item.n, false)"
      >
        <up-text :text="item.n" class="id"></up-text>
        <up-text :text="item.song_title" lines="1"></up-text>
        <up-text :text="item.song_singer" lines="1" align="right"></up-text>
      </view>
    </view>
    <view class="song-info" v-if="songInfo.music_url">
      <view class="cover">
        <up-image :src="songInfo.cover" width="80px" height="80px"></up-image>
      </view>
      <view class="title">
        <up-text :text="songInfo.song_name"></up-text>
        <up-text :text="songInfo.song_singer"></up-text>
      </view>
      <view class="time">
        {{ songInfo.currentTime }} / {{ songInfo.duration }}
      </view>
    </view>
    <view class="song-controller" v-if="songInfo.music_url">
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
</template>

<script lang="ts" setup>
import { ref } from "vue";
const keyword = ref("");
const back = () => {
  uni.switchTab({
    url: "/pages/tabBar/index",
  });
};
const inputStyle = {};
const songList = ref<any[]>([]);
const search = () => {
  const info: any = channelList.find(
    (item: any) => item.value == channel.value
  );
  info.params.gm = keyword.value;
  info.params.n = "";
  songList.value = [];
  songInfo.value = {};
  uni.request({
    url: info.api_url,
    data: info.params,
    success: (res: any) => {
      const { code, data } = res.data;
      if (code == 200) {
        songList.value = data;
      }
    },
  });
};
const songInfo: any = ref({});

// 使用innerAudioContext 播放歌曲
let innerAudioContext: any = null;
const currentN = ref(1);
const getMusic = (n: any, type = false) => {
  const info: any = channelList.find(
    (item: any) => item.value == channel.value
  );
  info.params.gm = keyword.value;
  info.params.n = n;
  currentN.value = n;
  if (innerAudioContext) {
    try {
      innerAudioContext.pause();
      innerAudioContext.destroy();
      innerAudioContext = null;
    } catch (e) {
      //TODO handle the exception
    }
  }
  songInfo.value = {};
  uni.request({
    url: info.api_url,
    data: info.params,
    success: (res: any) => {
      const { code, data } = res.data;
      if (code == 200) {
        data.duration = 0;
        data.currentTime = 0;
        songInfo.value = data;
        play(type);
      }
    },
  });
};

const paused = ref(true);
const play = (type: boolean) => {
  paused.value = true;
  innerAudioContext = uni.createInnerAudioContext();
  innerAudioContext.autoplay = type;
  // #ifdef APP-PLUS
  innerAudioContext.autoplay = true;
  // #endif
  innerAudioContext.src = songInfo.value.music_url;
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
    songInfo.value.duration = formatTime(innerAudioContext.duration);
  });
  innerAudioContext.onTimeUpdate((res: any) => {
    songInfo.value.currentTime = formatTime(innerAudioContext.currentTime);
    songInfo.value.duration = formatTime(innerAudioContext.duration);
  });
  innerAudioContext.onEnded((res: any) => {
    getMusic(currentN.value + 1, true);
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

// 渠道列表
const channel = ref(1);
const title: any = ref("QQ音乐");
const channelList = [
  {
    label: "QQ音乐",
    value: 1,
    api_url: "https://www.hhlqilongzhu.cn/api/dg_qqmusic.php",
    params: {
      gm: "",
      n: "",
      num: 60,
      type: "json",
    },
  },
];
const change = (value: any) => {
  const channel = channelList.find((item: any) => item.value == value);
  if (channel && channel.label) {
    title.value = channel.label;
  }
  if (keyword.value) {
    search();
  }
};
</script>

<style lang="scss" scoped>
body,
uni-page-body {
  height: 100%;
}
.page-wrap {
  padding: calc(var(--status-bar-height) + 50px) 24px 0;
  box-sizing: border-box;
  background: linear-gradient(to bottom, #ffffff, #f8f8f8);
  min-height: 100%;
  box-sizing: border-box;
  .song-list {
    height: 40vh;
    margin: 10px 0;
    border: 1px solid #e7eaf0;
    border-radius: 10px;
    overflow: auto;
    .item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 50px;
      padding: 4px 15px;
      box-sizing: border-box;
      &:nth-of-type(2n + 1) {
        background-color: #f7f7f7;
      }
    }
  }
  .song-info {
    display: flex;
    align-items: center;
    border: 1px solid #e7eaf0;
    .title {
      margin-left: 15px;
    }
    .time {
      flex: 1;
      text-align: right;
      padding-right: 10px;
    }
  }
  .song-controller {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    .iconfont {
      padding: 0 10px;
      font-size: 40px;
    }
  }
}
</style>
