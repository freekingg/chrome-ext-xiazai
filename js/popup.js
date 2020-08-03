console.log('popup')

// 弹窗页面
let get = document.querySelector('#get')
let clear = document.querySelector('#clear')
let bg = chrome.extension.getBackgroundPage();
get.addEventListener('click', () => {
  bg.downlad()
})

// function sendMessageToContentScript(message, callback) {
//   chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//     chrome.tabs.sendMessage(tabs[0].id, message, function (response) {
//       if (callback) callback(response);
//     });
//   });
// }

// sendMessageToContentScript({ cmd: 'test', value: '你好，我是popup！' }, function (response) {
//   console.log('来自content的回复：' + response);
// });

