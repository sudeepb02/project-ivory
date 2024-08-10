// background.js

function getCurrentTabUrl(callback) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTab = tabs[0];
    const activeTabUrl = activeTab ? activeTab.url : null;
    callback(activeTabUrl);
  });
}

// Listener to change the icon based on the message from content script
chrome.runtime.onMessage.addListener((message) => {
  if (message.action === 'changeIcon') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {

    let iconPath;
    switch (message.condition) {
      case 'ok':
        iconPath = 'images/veg.png';
        break;
      case 'danger':
        iconPath = 'images/nonveg.png';
        break;
      default:
        iconPath = 'images/veg.png';
    }
    chrome.action.setIcon({ tabId: tabs[0].id, path: iconPath });
  });

  }
});

// Listener to respond with the current tab's URL
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'getTabUrl') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      sendResponse({ url: tabs[0].url });
    });
    // Return true to indicate that the response will be sent asynchronously
    return true;
  }
});



// chrome.action.onClicked.addListener((tab) => {
//   chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//     const activeTab = tabs[0];
//     const url = activeTab.url;
//     console.log('Active tab URL:', url);

//     // Send the URL to the content script
//     chrome.tabs.sendMessage(activeTab.id, { action: 'getURL', url: url }, (response) => {
//       console.log('Content script response:', response);
//     });
//   });
// });
  

// // background.js

// chrome.action.onClicked.addListener((tab) => {
//     chrome.scripting.executeScript({
//       target: { tabId: tab.id },
//       files: ["content.js"]
//     });
//   });
  