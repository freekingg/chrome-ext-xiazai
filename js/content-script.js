console.log('content-script')
// 与bg通信
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  // console.log(sender.tab ?"from a content script:" + sender.tab.url :"from the extension");
  if (request.cmd == 'test') {
    console.log('我收到了你的消息！')
    console.log(request.value)
    sendResponse({ farewell: "ok" });
  }
});