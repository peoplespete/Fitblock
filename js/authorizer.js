function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}


localStorage.setItem("code", getParameterByName('code'));

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
if(missing_config){
  alert("Problem with your Fitbit Registration, try again.");
  window.location.replace(chrome.extension.getURL('/html/options.html'));
}
else{
  $("#message").text("Fitbit Registration Complete" );      
}