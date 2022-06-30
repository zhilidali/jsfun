# realtimeLog

一款内置微信小程序实时日志的小工具

- 支持原生微信小程序、Taro 框架等。
- 通过 `enabledDebug` 选项或 `switchDebug` 方法随时来控制是否在控制台打印
- 通过 `logger` 选项来配置其他端的实时日志
- 通过 `env` 选项查看
- 可调用 `overweite` 方法来复写 console.log(不推荐)。

## 安装

```sh
npm i @zhilidali/realtime-log
```

## 使用

```js
// 推荐使用的方式
import log from '@zhilidali/realtime-log';

log.switchDebug(true);
log.info('something');
```

```js
import { Log } from '@zhilidali/realtime-log';

const log = new Log({
  enabledDebug: false,
  logger = wx.getRealtimeLogManager(),
  env: 'release',
});

log.info('something');
```
