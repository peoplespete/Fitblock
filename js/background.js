chrome.webRequest.onBeforeRequest.addListener(
    function(details) {

// HOW OFTEN SHOULD WE GET NEW STEPS NUMBERS!!??
// everytime this runs!  this only runs when the url matches anyways
      if (localStorage.getItem("steps") != null && localStorage.getItem("goal") != null && (parseInt(localStorage.getItem("steps")) > parseInt(localStorage.getItem("goal")))) {
        return {};
      } else {
        chrome.tabs.update(details.tabId, {url: chrome.extension.getURL('/html/disallowed.html')});
        // return {cancel: true};
      }

    },
    {urls: ["*://*.facebook.com/"]},
    ["blocking"]);

