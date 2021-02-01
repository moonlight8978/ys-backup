import React from 'react';
import axios from 'axios';
import { Button } from '../../components/Button';

const client = axios.create({
  baseURL: 'https://api.github.com',
});

const uploadGist = () => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { type: 'getBackup' });
  });
};

const downloadGist = () => {
  client
    .get(`/gists/${localStorage.getItem('_config/gistId')}`, {
      headers: {
        Authorization: `token ${localStorage.getItem('_config/githubToken')}`,
      },
    })
    .then((response) => {
      const json = response.data.files['yuanshen.site'].content;

      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { type: 'apply', data: json });
      });
    });
};

const goToOptionsPage = () => {
  chrome.tabs.create({ url: '/options.html' });
};

const Popup = () => {
  return (
    <>
      <div className="flex">
        <Button onClick={uploadGist} className="flex-1" color="red">
          Upload progress
        </Button>

        <Button onClick={downloadGist} className="flex-1" color="green">
          Download progress
        </Button>
      </div>

      <div className="my-3 flex justify-center">
        <Button onClick={goToOptionsPage} color="blue">
          Configure
        </Button>
      </div>
    </>
  );
};

export default Popup;
