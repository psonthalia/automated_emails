# Automated Emails
Uses nodemailer and a google sheets document to send out mass emails

## Setup
* **EMAIL**
	* Convert google email settings to allow less secure access. Can be found [here](https://myaccount.google.com/security).

* **SHEET**
	* Publish document to web. For full steps follow these [instructions](https://github.com/bpk68/g-sheets-api#readme).
	* Get the sheet id which can be found between the '/d/' and the next '/' in the url of the google sheets document.
* **CONFIG.JSON**
	* You must make a `config.json` file in the enclosed folder in the following format:
	<br />
	```
	{
		"user": "YOUR EMAIL HERE",
		"pass": "YOUR PASSWORD HERE",
		"sheetId": "YOUR GOOGLE SHEET ID"
	}
	```

* Run `npm install` in the terminal in the project directory.

## Run
In the terminal, run `node index.js`.

##Notes
* In `index.js` change the `subject` to your email subject and `html` to the html for your email body
* In `index.js` change the `sleep_duration` to change the duration in between email sends (This is to prevent Google from blocking you)
* Inspired from <a href="https://github.com/tsonthalia/EmailBot">here</a>