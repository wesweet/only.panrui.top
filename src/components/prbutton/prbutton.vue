<template>
  <button
    :class="['buttonBorder', !_rotate ? 'dlbutton' : 'dlbutton_loading']"
    :style="{ background: bgColor, color: fontColor }"
    @click="handClick"
  >
    <view :class="_rotate ? 'rotate_loop' : ''">
      <text v-if="_rotate" class="cuIcon cuIcon-loading1"></text>
      <view v-if="!_rotate"
        ><slot name="text">{{ text }}</slot></view
      >
    </view>
  </button>
</template>

<script lang="ts" setup>
import { ref, computed, defineProps, defineEmits } from "vue";
// 接受props
const props = defineProps({
  bgColor: {
    // 按钮背景颜色
    type: String,
    default: "linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.6))",
  },
  fontColor: {
    // 按钮字体颜色
    type: String,
    default: "#FFFFFF",
  },
  text: String, //显示文本
  rotate: {
    //是否启动加载
    type: [Boolean, String],
    default: false,
  },
});

// 触发父组件事件
const emit = defineEmits(["click"]);
const handClick = () => {
  emit("click");
}

// 添加计算属性
const _rotate = computed(() => {
  return String(props.rotate) !== "false";
});
</script>

<style scoped lang="scss">
button {
  outline: none; /* 或者 outline: 0 */
}
button:after {
  border: none;
}
button:focus {
  outline: none; /* 或者 outline: 0 */
}

.dlbutton {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  font-size: 30rpx;
  white-space: nowrap;
  overflow: hidden;
  width: 601rpx;
  height: 100rpx;
  background: linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.6));
  box-shadow: 0rpx 0rpx 13rpx 0rpx rgba(164, 217, 228, 0.4);
  border-radius: 2.5rem;
  margin-top: 0rpx;
}
.dlbutton_loading {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  font-size: 30rpx;
  width: 100rpx;
  height: 100rpx;
  background: linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.6));
  box-shadow: 0rpx 0rpx 13rpx 0rpx rgba(164, 217, 228, 0.4);
  border-radius: 2.5rem;
  margin-top: 0rpx;
}
.buttonBorder {
  border: none;
  border-radius: 2.5rem;
  -webkit-box-shadow: 0 0 60rpx 0 rgba(0, 0, 0, 0.2);
  box-shadow: 0 0 60rpx 0 rgba(0, 0, 0, 0.2);
  -webkit-transition: all 0.4s cubic-bezier(0.57, 0.19, 0.51, 0.95);
  -moz-transition: all 0.4s cubic-bezier(0.57, 0.19, 0.51, 0.95);
  -ms-transition: all 0.4s cubic-bezier(0.57, 0.19, 0.51, 0.95);
  -o-transition: all 0.4s cubic-bezier(0.57, 0.19, 0.51, 0.95);
  transition: all 0.4s cubic-bezier(0.57, 0.19, 0.51, 0.95);
}

/* 旋转动画 */
.rotate_loop {
  -webkit-transition-property: -webkit-transform;
  -webkit-transition-duration: 1s;
  -moz-transition-property: -moz-transform;
  -moz-transition-duration: 1s;
  -webkit-animation: rotate 1s linear infinite;
  -moz-animation: rotate 1s linear infinite;
  -o-animation: rotate 1s linear infinite;
  animation: rotate 1s linear infinite;
}
@-webkit-keyframes rotate {
  from {
    -webkit-transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
  }
}
@-moz-keyframes rotate {
  from {
    -moz-transform: rotate(0deg);
  }
  to {
    -moz-transform: rotate(359deg);
  }
}
@-o-keyframes rotate {
  from {
    -o-transform: rotate(0deg);
  }
  to {
    -o-transform: rotate(359deg);
  }
}
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}
</style>
