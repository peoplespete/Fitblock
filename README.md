# Fitblock

**_Sometimes you don't take care of yourself because you get lost in a screen.  What if you couldn't piddle on the internet until you'd earned it by completing your Fitbit steps goal?  That's just what this Chrome Extension does. If you haven't finished your steps, you aren't able to access Facebook.  It may just be that extra edge to get you off the sofa and out of the house._**

## Installation

### Github

Clone the repo:
```bash
git clone https://github.com/peoplespete/Fitblock.git
cd Fitblock
pwd
```
Note where you've saved it.

### Chrome
###

Install the extension files via _Developer Mode_ in [Chrome Extension Manager](chrome://extensions/)

Click _Load Unpacked Extension..._
![Chrome Extension Install](/images/screenshots/one.png?raw=true)

Click the _options.html_ file and copy the Callback URL
![Options Page](/images/screenshots/eleven.png?raw=true)

### Fitbit
###

Log onto [Fitbit's Dev Site](https://dev.fitbit.com/)

Click _Register an App_
![Fitbit Dev Page](/images/screenshots/two.png?raw=true)

Fill in all the required fields

Paste the Callback URL you copied from the options page in Callback URL field

![App Registration via Fitbit](/images/screenshots/four.png?raw=true)

Click _Register_

Copy your _OAuth 2.0 Client ID_ and your _Client (Consumer) Secret_
![Copy Fitbit OAuth 2.0 Credentials](/images/screenshots/five.png?raw=true)

### Chrome
###

Return to the Chrome Extension's option page and fill in your Fitbit Credentials and click _Register_
![Add Fitbit OAuth 2.0 Credentials to Options Page](/images/screenshots/six.png?raw=true)

If you see a message indicating the Fitbit Registration Complete, you're all set!
![Fitbit Registration Complete](/images/screenshots/eight.png?raw=true)

## How It Works

Navigate to [Facebook.com](https://www.facebook.com/)

If you've completed your steps goal for the day you'll see this:
![Facebook.com](/images/screenshots/nine.png?raw=true)

If you have not, you'll be denied access and get an update on how close you are to your goal:
![Disallowed Page](/images/screenshots/ten.png?raw=true)

#### Known Bugs:

Right now the Fitbit API Access Token will eventually expire.


#### Problems Registering?
If you need to reset registration go into the Javascript console and run this command 
```Javascript
localStorage.clear()
```
Then refresh the options page and retry your registration.


#### Thanks to:    
Nate McIntyre (natemcintyre@gmail.com) for his [Chrome Extension Template](https://github.com/natemcintyre/Chrome-Extension-Template).
    
