# cpi-gpio
An extension of pi-gpio, allowing for event-driven callbacks from digital inputs.

## Background
I am currently using a Raspberry Pi Zero W and trying to implement some basic GPIO tasks within Node.js. The best library I found for this purpose was pi-gpio as it doesn't require root access, like rpi-gpio does, and appears to function much better than other libraries such as onoff.


## Installation
	[ ] write this

## Usage
I liked the way onoff handles setup in that it treats each pin as an object, making it easier to keep track of everything (at least in my opinion).

In the document, first include cpi-gpio
`var Gpio = require('cpi-gpio').Gpio`

Then start making some Gpio objects.
`var greenLed = new Gpio(11, 'out', function(success, err) {
	if (success) {
		console.log("New Gpio pin set up at " + greenLed.pin + ". Its type is " + greenLed.type);
	} else {
		console.log(err);
	}
});

You don't have to include a callback if you don't want to. This can be cleaner when setting up multiple Gpio objects.
```var 	greenLed = new Gpio(11, 'out'),
	yellowLed = new Gpio(13, 'out'),
	redLed = new Gpio(15, 'out');


