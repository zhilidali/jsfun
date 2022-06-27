export const updateManager = globalThis.wx.getUpdateManager();
const showUpdateModal = () =>
  globalThis.wx.showModal({
    title: '更新提示',
    content: '新版本已经准备好，是否重启应用？',
    showCancel: false,
    success: function (res) {
      if (res.confirm) {
        updateManager.applyUpdate();
      }
    },
  });

export function updater({
  confirm = true,
  onCheck = res => console.log('updater Check', res),
  onReady = () => {
    // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
    console.log('updater Ready');
    confirm ? updateManager.applyUpdate() : showUpdateModal();
  },
  onFailed = res => console.warn('updater Failed', res),
} = {}) {
  updateManager.onCheckForUpdate(onCheck);
  updateManager.onUpdateReady(() => onReady(updateManager));
  updateManager.onUpdateFailed(onFailed);

  return updateManager;
}

export function canIUse(schema) {
  if (globalThis.wx.canIUse(schema)) {
    return true;
  } else {
    globalThis.wx.showModal({
      title: '溫馨提示',
      content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。',
      showCancel: false,
      success: function (res) {
        if (res.confirm) {
          globalThis.wx.updateWeChatApp({
            success(res) {
              console.log('updateWeChatApp success', res);
            },
            fail(res) {
              console.error('updateWeChatApp fail', res);
            },
            complete(res) {
              console.info('updateWeChatApp complete', res);
            },
          });
        }
      },
    });
  }
}
