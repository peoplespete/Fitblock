function date_today(){
  var d = new Date();
  var month = d.getMonth()+1;
  var day = d.getDate();
  return d.getFullYear() + '-' +
      (month<10 ? '0' : '') + month + '-' +
      (day<10 ? '0' : '') + day;
}

chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
      var missing_config = false;
      if(localStorage.getItem("client_id") == null){
        missing_config = true;
        alert("Missing Fitbit Client ID");
      }
      if(localStorage.getItem("secret") == null){
        missing_config = true;
        alert("Missing Fitbit Secret");
      }
      if(localStorage.getItem("code") == null){
        missing_config = true;
        alert("Missing Fitbit Code");
      }
      if(missing_config){
        chrome.tabs.update(details.tabId, {url: chrome.extension.getURL('/html/disallowed.html')});
      }

      url = "https://api.fitbit.com/oauth2/token?";
      url = url + "client_id=" + localStorage.getItem("client_id") + "&";
      url = url + "grant_type=" + "authorization_code" + "&";
      url = url + "redirect_uri=" + chrome.extension.getURL('/html/authorizer.html') + "&";
      url = url + "code=" + localStorage.getItem("code");

      $.ajax({

        url: url,
        type: 'POST',
        beforeSend: function (xhr) {
          xhr.setRequestHeader('Authorization', 'Basic ' + window.btoa(unescape(encodeURIComponent(localStorage.getItem("client_id") + ':' + localStorage.getItem("secret")))));
        },
        contentType: 'application/x-www-form-urlencoded',

        success: function (data) {
          localStorage.setItem("access_token", data.access_token);
          $.ajax({

            url: "https://api.fitbit.com/1/user/-/activities/goals/daily.json",
            type: 'GET',
            beforeSend: function (xhr) {
              xhr.setRequestHeader('Authorization', 'Basic ' + window.btoa(unescape(encodeURIComponent(localStorage.getItem("client_id") + ':' + localStorage.getItem("secret")))));
              xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("access_token"));
            },
            contentType: 'application/x-www-form-urlencoded',

            success: function (data) {
              console.log("Daily Goal:" + data.goals.steps);
              localStorage.setItem("goal", data.goals.steps);

              $.ajax({
                url: "https://api.fitbit.com/1/user/-/activities/date/" + date_today() + ".json",
                type: 'GET',
                beforeSend: function (xhr) {
                  xhr.setRequestHeader('Authorization', 'Basic ' + window.btoa(unescape(encodeURIComponent(localStorage.getItem("client_id") + ':' + localStorage.getItem("secret")))));
                  xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("access_token"));
                },
                contentType: 'application/x-www-form-urlencoded',

                success: function (data) {
                  console.log("Steps Count:" + data.summary.steps);
                  localStorage.setItem("steps", data.summary.steps);
                  var percentage_completion = Math.floor((localStorage.getItem("steps") / localStorage.getItem("goal")) * 100);
                  console.log(percentage_completion);
                  if (localStorage.getItem("steps") != null && localStorage.getItem("goal") != null && (parseInt(localStorage.getItem("steps")) > parseInt(localStorage.getItem("goal")))) {
                    return {};
                  } else {
                    chrome.tabs.update(details.tabId, {url: chrome.extension.getURL('/html/disallowed.html')});
                    // return {cancel: true};
                  }
                },
                error: function (e) {
                  
                  console.log("failure to get step count!!!");
                  console.log(e);
                  chrome.tabs.update(details.tabId, {url: chrome.extension.getURL('/html/disallowed.html')});
                },
              });

            },
            error: function (e) {
              console.log("failure to get goal!!!");
              console.log(e);
              if(e.responseText.includes("Access token invalid or expired")){
                window.location.replace(chrome.extension.getURL("/html/options.html"));
              }
            },
          });

        },
        error: function (e) {
          console.log(e);
        },
      });

    },
    {urls: ["*://*.facebook.com/"]},
    ["blocking"]);

