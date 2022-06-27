# mini updater

一款更新微信或小程序的小工具

- updater 直接在小程序 onLaunch 中调用即可
- 内置 updateManager，可自定义事件监听和方法调用
- canIUse 当微信版本过低时，提示并升级微信

## 安装

```sh
npm i @zhilidali/mini-updater
```

## 使用

```js
// 推荐使用的方式
import { updater } from '@zhilidali/mini-updater';

onLaunch () {
  // 直接在小程序 onLaunch 中调用即可
  updater();
}
```
