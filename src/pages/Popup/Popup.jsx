import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Popup.css';
import { Button } from 'react-bootstrap';
import axios from 'axios';

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
      <div className="popup__button-container">
        <Button onClick={uploadGist} variant="success" className="popup__button">
          Upload progress
        </Button>

        <Button onClick={downloadGist} variant="warning" className="popup__button">
          Download progress
        </Button>
      </div>

      <div className="popup__configure">
        <Button onClick={goToOptionsPage} variant="link">
          Configure
        </Button>
      </div>
    </>
  );
};

export default Popup;
