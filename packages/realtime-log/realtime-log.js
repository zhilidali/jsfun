const { getRealtimeLogManager, getAccountInfoSync } = globalThis.wx ?? {};

export class Log {
  constructor({
    logger = getRealtimeLogManager?.() ?? {},
    env = getAccountInfoSync().miniProgram.version ||
      getAccountInfoSync().miniProgram.envVersion,
    enabledConsole = false,
    debug,
  } = {}) {
    this.logger = logger;
    this.enabledConsole = enabledConsole;
    this.env = env;
    if (debug) {
      const injectDebug = namespace => {
        const log = debug(namespace);
        return Object.setPrototypeOf((...rest) => {
          log(...rest);
          this.logger.info(...(this.env ? [this.env].concat(rest) : rest));
        }, log);
      };
      return Object.setPrototypeOf(injectDebug, this);
    }
  }
  _log = console.log;
  _info = console.info;
  _debug = console.debug;
  _warn = console.warn;
  _error = console.error;
  switchConsole(enabledConsole = !this.enabledConsole) {
    this.enabledConsole = enabledConsole;
  }

  log = this.#fn.bind(this, 'log');
  info = this.#fn.bind(this, 'info');
  debug = this.#fn.bind(this, 'debug');
  warn = this.#fn.bind(this, 'warn');
  error = this.#fn.bind(this, 'error');
  #fn(level, ...rest) {
    const mapLevel = { log: 'info', debug: 'info' }[level] ?? level;
    // 打印到控制台
    this.enabledConsole && this[`_${level}`](...rest);
    // 打印到微信后台
    this.logger[mapLevel]?.(...(this.env ? [this.env].concat(rest) : rest));
  }
  overwrite(overwriteNames = ['log', 'info', 'debug', 'warn', 'error']) {
    return overwriteNames.map(i => (console[i] = this[i]));
  }

  setFilterMsg(msg) {
    if (typeof msg === 'string') {
      this.logger.setFilterMsg?.(msg);
    }
  }
  addFilterMsg(msg) {
    if (typeof msg === 'string') {
      this.logger.addFilterMsg?.(msg);
    }
  }
}

export const log = new Log({ enabledConsole: true });
export default Object.setPrototypeOf(Log, log);
