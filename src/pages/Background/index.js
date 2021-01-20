import axios from 'axios';

import '../../assets/img/icon-34.png';
import '../../assets/img/icon-128.png';

const client = axios.create({
  baseURL: 'https://api.github.com',
});

chrome.runtime.onMessage.addListener(({ type, data }, sender, sendResponse) => {
  console.log(sender.tab ? 'from a content script:' + sender.tab.url : 'from the extension');
  if (type === 'upload') {
    client
      .patch(
        `/gists/${localStorage.getItem('_config/gistId')}`,
        {
          files: {
            'yuanshen.site': {
              content: data,
            },
          },
          description: 'Auto update',
        },
        {
          headers: {
            Authorization: `token ${localStorage.getItem('_config/githubToken')}`,
            Accept: 'application/vnd.github.v3+json',
          },
        }
      )
      .then((response) => {
        console.log(response);
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
          chrome.tabs.sendMessage(tabs[0].id, { type: 'alert', data: 'Upload successfully' });
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }
  return true;
});
