// check for localStorage of stuff and if you have it then don't have them see the fill in screen
if (localStorage.getItem("steps") != null && localStorage.getItem("goal") != null) {
  // get numbers
  $("#fitbit_credentials").hide();
  $("#already_configured").text("You've already configured your Fitbit, way to go!");
}

$("#callback_url").text(chrome.extension.getURL('/html/authorizer.html'));

$("form").submit(function (e) {
      e.preventDefault(); // this will prevent from submitting the form.
});

$( "#fitbit_credentials_submit" ).click(function() {
  localStorage.setItem("client_id", $("#client_id").val());
  localStorage.setItem("secret", $("#secret").val());

  url = "https://www.fitbit.com/oauth2/authorize?"
  url = url + "response_type=code&";
  url = url + "client_id=" + localStorage.getItem("client_id") + "&";
  url = url + "redirect_uri=" + chrome.extension.getURL('/html/authorizer.html') + "&";
  url = url + "scope=activity";
  console.log(url);
  window.location.replace(url);
});

