function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}


localStorage.setItem("code", getParameterByName('code'));

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

    var missing_config = false;
    if(localStorage.getItem("client_id") == null){
      missing_config = true;
      alert("Missing Fitbit Client ID");
    }
    if(localStorage.getItem("secret") == null){
      missing_config = true;
      alert("Missing Fitbit Secret");
    }
    if(localStorage.getItem("code") == null || localStorage.getItem("code") == ""){
      missing_config = true;
      alert("Missing Fitbit Code");
    }
    if(localStorage.getItem("access_token") == null || localStorage.getItem("access_token") == ""){
      missing_config = true;
      alert("Missing Fitbit Access Token");
    }
    if(missing_config){
      alert("Problem with your Fitbit Registration, try again.");
      window.location.replace(chrome.extension.getURL('/html/options.html'));
    }
    else{
      $("#message").text("Fitbit Registration Complete" );      
    }

  },
  error: function (e) {
    alert(e);
    console.log(e);
  },
});
