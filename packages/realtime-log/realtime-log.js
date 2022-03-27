export class Log {
  constructor({
    enabledDebug = false,
    logger = globalThis.wx && globalThis.wx.getRealtimeLogManager
      ? globalThis.wx.getRealtimeLogManager()
      : {},
    env = globalThis.wx && globalThis.wx.getAccountInfoSync
      ? globalThis.wx.getAccountInfoSync().miniProgram.envVersion
      : '',
  } = {}) {
    this.logger = logger;
    this.enabledDebug = enabledDebug;
    this.env = env;
  }
  _log = console.log;
  _info = console.info;
  _debug = console.debug;
  _warn = console.warn;
  _error = console.error;
  switchDebug(enabledDebug = !this.enabledDebug) {
    this.enabledDebug = enabledDebug;
  }

  log = this.#fn.bind(this, 'log');
  info = this.#fn.bind(this, 'info');
  debug = this.#fn.bind(this, 'debug');
  warn = this.#fn.bind(this, 'warn');
  error = this.#fn.bind(this, 'error');
  #fn(level, ...rest) {
    const mapLevel =
      {
        log: 'info',
        debug: 'info',
      }[level] ?? level;
    this.enabledDebug && this[`_${level}`](...rest);
    this.logger[mapLevel]?.(...(this.env ? [this.env].concat(rest) : rest));
  }
  overwrite(overwriteNames = ['log', 'info', 'debug', 'warn', 'error']) {
    return overwriteNames.map(i => (console[i] = this[i]));
  }

  /** 从基础库2.7.3开始支持 */
  setFilterMsg(msg) {
    if (typeof msg === 'string') {
      this.logger.setFilterMsg?.(msg);
    }
  }
  /** 从基础库2.8.1开始支持 */
  addFilterMsg(msg) {
    if (typeof msg === 'string') {
      this.logger.addFilterMsg?.(msg);
    }
  }
}

export const log = new Log();
export default log;
