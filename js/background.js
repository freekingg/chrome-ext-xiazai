console.log('background.js')
let allUrl = []

// 监听http请求
chrome.webRequest.onBeforeSendHeaders.addListener(
  function (details) {
    let name = details.url.substring(details.url.lastIndexOf('.') + 1);
    if (name == 'png' || name == 'jpg') {
      allUrl.push(details.url)
    }

    for (var i = 0; i < details.requestHeaders.length; ++i) {
      if (details.requestHeaders[i].name === 'User-Agent') {
        details.requestHeaders.splice(i, 1);
        break;
      }
    }
    return { requestHeaders: details.requestHeaders };
  },
  { urls: ["<all_urls>"] },
  ["blocking", "requestHeaders"]);

chrome.runtime.onInstalled.addListener(function () {
  chrome.contextMenus.create({
    'id': 'saveall',
    'type': 'normal',
    'title': '保存所有图片'
  })
});

// 监听右键事件
chrome.contextMenus.onClicked.addListener(function (info, tab) {
  if (info.menuItemId === 'saveall') {
    downlad(allUrl)
  }
});

// 监听页面刷新
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status == "loading") {
    console.log('loading')
    allUrl = []
  }

});

// 下载方法
function downlad() {
  sendMessageToContentScript({ cmd: 'test', value: allUrl }, function (response) {
    console.log('来自content的回复：' + response);
  });

  if (!allUrl.length) {
    alert('当前站点没有可下载的图片')
    return
  }

  allUrl.forEach(function (t) {
    chrome.downloads.download({
      url: t,
      conflictAction: 'uniquify',
      saveAs: false
    })
  })
}

// 与content通信
function sendMessageToContentScript(message, callback) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, message, function (response) {
      if (callback) callback(response);
    });
  });
}
