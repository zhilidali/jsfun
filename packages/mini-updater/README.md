# mini updater

[![NPM version](https://img.shields.io/npm/v/@zhilidali/mini-updater)](https://www.npmjs.org/package/@zhilidali/mini-updater)

微信小程序更新管理工具

## 安装及使用

```sh
npm i @zhilidali/mini-updater
```

```js
import updater from '@zhilidali/mini-updater';

onLaunch () {
  // 推荐简单直接地在小程序 onLaunch 中调用
  updater();

  // 可传入配置项
  updater({
    updateManager: wx.getUpdateManager(),
    log: console.log,
    onCheck(res, updateManager) {},
    onReady(applyUpdate, updateManager) {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success(res) {
          if (res.confirm) {
            applyUpdate();
          }
        },
      });
    },
    onFailed(res, updateManager) {},
  })
}
```
