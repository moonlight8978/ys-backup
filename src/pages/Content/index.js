const applyBackup = (secrets) => {
  secrets.forEach(([secretId, foundFlag]) => {
    if (foundFlag === '1' && secretId.match(/^[\d|_]+$/)) {
      localStorage.setItem(secretId, foundFlag);
    }
  });
};

chrome.runtime.onMessage.addListener(function ({ type, data }, sender, sendResponse) {
  console.log(sender.tab ? 'from a content script:' + sender.tab.url : 'from the extension');
  if (type === 'apply') {
    console.log(JSON.parse(data));
    applyBackup(JSON.parse(data));
  } else {
    const data = JSON.stringify(Object.entries(localStorage));
    chrome.runtime.sendMessage({ type: 'upload', data: data });
  }
});
