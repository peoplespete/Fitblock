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

