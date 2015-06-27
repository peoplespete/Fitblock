chrome.webRequest.onBeforeRequest.addListener(
    function(details) {

      if (parseInt(localStorage.getItem("steps")) > parseInt(localStorage.getItem("goal"))) {
        return {};
      } else {
        chrome.tabs.update(details.tabId, {url: chrome.extension.getURL('/html/disallowed.html')});
        // return {cancel: true};
      }

    },
    {urls: ["*://*.facebook.com/"]},
    ["blocking"]);

