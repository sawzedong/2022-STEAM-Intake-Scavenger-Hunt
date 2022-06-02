# Documentation: Intake 2022 Scavenger Hunt

[https://intake-2022.szd101.repl.co/](https://intake-2022.szd101.repl.co/)

Note: this website may or may not be **deprecated** and discontinued in the future.

## Usage

This is the first stage of the trial for the Y1s before they were to attend physical trials. 
The goal was to use this to decrease and manage the number of participants to a reasonable number.

## Content

The Scavenger Hunt includes:
<ol>
	<li>Introduction page</li>
	<li>Stages with questions (6x)</li>
	<li>Final stage</li>
	<li>Help page</li>
</ol> 
They would have to solve each question to proceed to the next page, and only if they complete the final stage (and fill in the Google Form) before the deadline are they allowed to attend physical trials.

## Solutions to Questions

Stage 1.<br>
No questions

Stage 2.<br>
134 (watch the video)  
Until (do... until a condition is met)

Stage 3.<br>
Solving a math problem step by step, Searching for relevant and discarding irrelevant information in a problem<br>
<pre>
&nbsp;&nbsp;&nbsp;| X | X
&nbsp;&nbsp;&nbsp;| X |&nbsp;&nbsp;&nbsp;
&nbsp;X |&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
</pre>
(See XNOR gate, only those with 0 or 2 highlighted will be highlighted)

Stage 4.<br>
<ol>
	<li><em>Start infinite loop of all the steps below</em></li>
	<li> Input light sensor data </li>
	<li> If light value is low then: carry out step below </li>
	<li> Motor C speed increase </li>
	<li> If light value is high then: carry out step below </li>
	<li> Motor A speed increase </li>
	<li><em>Else, if light value is ok: carry out step below</em></li>
	<li><em>Drive straight</em></li>
</ol> 
**OR**<br>
<ol>
	<li><em>Start infinite loop of all the steps below</em></li>
	<li> Input light sensor data </li>
	<li> If light value is high then: carry out step below </li>
	<li> Motor A speed increase </li>
	<li> If light value is low then: carry out step below </li>
	<li> Motor C speed increase </li>
	<li><em>Else, if light value is ok: carry out step below</em></li>
	<li><em>Drive straight</em></li>
</ol>
(If high, robot has deviated to the right, hence increase A's speed to move towards the left. Vice versa.)<br><br>

Stage 5.<br>
1.30°N, 103.88°E (Since the range is 2d.p., it is roughly 1.1km, taking the coordinates of Dunman High School and rounding it provides an answer accurate enough)

Stage 6.<br>
STEAM (Either highlight the pages to see, or just look for bolded letters)

## Technologies

The page is coded and runs on python's flask backend module, and hosted on [replit.com](replit.com) \(see [https://replit.com/@SZD101/Intake-2022#README.md](https://replit.com/@SZD101/Intake-2022#README.md)\).

Templates and pages are coded using HTML and CSS, but submission of answers are handled using python's flask to prevent inspect element to find answers.

jQuery is used for any front-end javascript involved (such as the changing link as text input changes)

As replit's are public to all, the answers and route links are placed in a .env file and queried using `os.environ['KEY_NAME']`. Do ensure to run `import os` at the start of the file.  
**IMPORTANT: env.json is only present to show what the hidden keys and texts used in the 2022 Intake exercise were. Do NOT upload the answers as a file that is visible. (if using replit, there is an inbuilt secrets function).**

Although mostly unnecessary, an additional layer of answer protection is added by hash comparison instead of storing plaintext, using `hashlib.sha3_256('YOUR TEXT').hexdigest()`. Again, run `import hashlib` at the start of the code.

As [replit.com](replit.com) timeout and go down after about an hour of inactivity, to prevent issues with re-syncing and having to keep pressing 'run', [https://uptimerobot.com/](https://uptimerobot.com/) is used to constant ping the website every 5 minutes or so to keep it running. (Thanks to 2020 - 2021 EXCO for suggesting during the Discord Bot lessons)  
*Note: this bot has been discontinued as the website is no longer used since 8 April 2022.*

## Help
[https://flask.palletsprojects.com/en/2.0.x/](https://flask.palletsprojects.com/en/2.0.x/)

[https://codeburst.io/jinja-2-explained-in-5-minutes-88548486834e](https://codeburst.io/jinja-2-explained-in-5-minutes-88548486834e)

## Other help

Contact Ze Dong (saw.zedong@dhs.sg), but if you are looking at this document you most likely have my number.

## Credits

Thanks to Harry and Darrius for helping to come up with the questions and content for the website.