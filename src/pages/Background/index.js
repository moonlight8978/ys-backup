import '../../assets/img/icon-34.png';
import '../../assets/img/icon-128.png';

chrome.runtime.onMessage.addListener(function ({ type, data }, sender, sendResponse) {
  console.log(sender.tab ? 'from a content script:' + sender.tab.url : 'from the extension');
  if (type === 'upload') {
    console.log(JSON.parse(data));
  }
});
