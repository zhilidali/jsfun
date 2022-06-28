export function updater({
  log = () => {},
  updateManager = globalThis.wx.getUpdateManager(),
  onCheck = () => {},
  onReady = applyUpdate => applyUpdate(),
  onFailed = () => {},
} = {}) {
  updateManager.onCheckForUpdate(res => {
    log('onCheck', res);
    onCheck(res, updateManager);
  });
  updateManager.onUpdateReady(() => {
    log('onReady');
    onReady(updateManager.applyUpdate, updateManager);
  });
  updateManager.onUpdateFailed(res => {
    log('onFailed', res);
    onFailed(res, updateManager);
  });

  return updateManager;
}
