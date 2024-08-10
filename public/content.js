// Request the current tab's URL from the background script
chrome.runtime.sendMessage({ action: 'getTabUrl' }, (response) => {
  if (response && response.url) {
    console.log('Current Tab URL:', response.url);
    // You can use the URL here for whatever you need
    if (response.url) {
      let status = 'ok';
      if (response.url == "https://www.w3schools.com/"){
        status = 'danger';
        chrome.runtime.sendMessage({ action: 'changeIcon', condition: status });
      };
    } 
  }
});
