// content.js

// popup.js

// Function to get the current tab's URL
function getCurrentTabUrl(callback) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    if (tabs.length > 0) {
      const tab = tabs[0];
      const url = tab.url;
      callback(url);
    } else {
      callback(null);
    }
  });
}

// Function to display the URL in the popup
function displayURL() {
  getCurrentTabUrl(function (url) {
    const popup_body = document.body;
    const urlDisplayElement = document.getElementById('url-display');
    if (url) {
      urlDisplayElement.textContent = `URL: ${url}`;
      let status = 'ok';
      if (url == "https://www.w3schools.com/"){
        status = 'danger';
        chrome.runtime.sendMessage({ action: 'changeIcon', condition: status });
      };

      // Remove existing classes
      urlDisplayElement.classList.remove('ok', 'danger');
      popup_body.classList.remove('ok','danger');
      popup_body.classList.add(status);
    // Add class based on thstatuse status
      urlDisplayElement.classList.add(status);
    } else {
      urlDisplayElement.textContent = 'Unable to retrieve URL';
    }
  });
}

// Run the displayURL function once the DOM is fully loaded
document.addEventListener('DOMContentLoaded', displayURL);


// function getCurrentPageURL() {
//   const url = document.location.href; // Access the current page URL
//   console.log('Current page URL:', url);
//   return url;
// }

// function displayURL() {
//   const url = getCurrentPageURL();
  
//   // Select the element where you want to display the URL
//   const urlDisplayElement = document.getElementById('url-display');
//   if (urlDisplayElement) {
//     urlDisplayElement.textContent = `${url}`;
//   } else {
//     console.error('Element with id "url-display" not found.');
//   }
//   // // Optionally, set the URL in an input field
//   // const urlInputElement = document.getElementById('url-input');
//   // urlInputElement.value = url;
// }

// // Wait for the DOM to load before running the script
// document.addEventListener('DOMContentLoaded', () => {
//   // Automatically run the displayURL function
//   displayURL();
// });

// // Function to log the URL and do something with it
// function handleActiveTabURL(url) {
//   console.log('Handling URL in content script:', url);
//   // Add logic to handle the URL, such as modifying the page
// }

// // Listen for messages from the background script
// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   if (request.action === 'getURL') {
//     handleActiveTabURL(request.url);
//   }
//   sendResponse({ status: 'URL handled' });
// });


// // content.js

// // Function to extract all links from the webpage
// function extractLinks() {
//     // Select all <a> elements on the page
//     const links = document.querySelectorAll('a');
  
//     // Create an array to store the links
//     const linkArray = [];
  
//     // Iterate over each link element
//     links.forEach((link) => {
//       // Get the href attribute (URL)
//       const url = link.href;
  
//       // Get the text content of the link
//       const text = link.textContent.trim();
  
//       // Add the link to the array
//       linkArray.push({ text, url });
//     });
  
//     // Log the array of links to the console
//     console.log('Links extracted:', linkArray);
  
//     // Optionally, send the links to a background script or popup
//     return linkArray;
//   }
  
//   // Run the function to extract links
//   extractLinks();
  