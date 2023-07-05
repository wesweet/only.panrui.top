<template>
  <StatusBar></StatusBar>
  <uni-nav-bar shadow dark title="蓝牙测试" />
  <view>
    <uni-list>
      <uni-list-item
        :title="item.name"
        v-for="(item, index) in list"
        :index="index"
        :key="index"
      />
    </uni-list>
    <view v-if="isInitBluetooth">
      <button size="mini" @click="getBluetoothDevices">开始搜索蓝牙</button>
    </view>
  </view>
</template>

<script lang="ts" setup>
import StatusBar from "@/components/StatusBar.vue";

// #ifdef APP-PLUS
import { ref } from "vue";
// 使用ts 定义接口
interface Device {
  name: string;
  deviceId: string;
  RSSI: number;
  advertisData: ArrayBuffer;
  advertisServiceUUIDs: string[];
  localName: string;
  serviceData: object;
}

const list = ref<Device[]>([]);

// 定义一个变量，用于表示是否初始化蓝牙模块成功，true表示成功，false表示失败 使用ref定义响应式变量
const isInitBluetooth = ref(false);

// 定义一个方法，用于获取附件的蓝牙设备
function getBluetoothDevices() {
  uni.getBluetoothDevices({
    success: function (res: any) {
      console.log("获取附近的蓝牙设备成功", res);
      // 将获取到的蓝牙设备列表赋值给list
      list.value = res.devices;
      // 停止搜寻附近的蓝牙设备
      uni.stopBluetoothDevicesDiscovery({
        success: function (res) {
          console.log("停止搜寻附近的蓝牙设备成功");
        },
        fail: function (res) {
          console.log("停止搜寻附近的蓝牙设备失败", res);
        },
      });
    },
    fail: function (res) {
      console.log("获取附近的蓝牙设备失败");
      console.log(res);
    },
  });
}
// 初始化蓝牙模块
uni.openBluetoothAdapter({
  success: function (res) {
    isInitBluetooth.value = true;
  },
  fail: function (res) {},
});

// #endif
</script>

<style></style>
