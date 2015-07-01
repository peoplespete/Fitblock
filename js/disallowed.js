if(localStorage.getItem("steps") != null && localStorage.getItem("goal") != null ){
  $("#detailed_message").text("You have " + localStorage.getItem("steps") + " steps on your way to today's goal of " + localStorage.getItem("goal") );
}else{
  $("#detailed_message").text("Error getting steps or goal information.  Try reconfiguring.");
}