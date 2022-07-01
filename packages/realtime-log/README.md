# realtimeLog

[![NPM version](https://img.shields.io/npm/v/@zhilidali/realtime-log)](https://www.npmjs.org/package/@zhilidali/realtime-log)

一款内置微信小程序实时日志的工具类, 支持原生微信小程序、Taro 框架等。

- 内置微信 realtimeLogManager，可通过 `logger` 选项自定义配置实时日志管理器。
- 可通过 `env` 选项标识，默认为小程序版本标识。
- 可通过 `enabledConsole` 选项或 `switchConsole` 方法控制是否打印到开发控制台。
- 或通过传入 `debug` 选项启用 [debug](https://github.com/debug-js/debug) 来控制打印
- ~~可调用 `overweite` 方法来复写 console.log(不推荐)。~~

## 安装

```sh
npm i @zhilidali/realtime-log
```

## 使用

简单的使用方式

```js
import { log } from '@zhilidali/realtime-log';

log.switchConsole(false); // 禁止到控制台
log.info('something');
```

高级的使用方式

```js
import { Log } from '@zhilidali/realtime-log';
import debug from 'debug';

const log = new Log({ debug });

log('namespace')('something');
```
