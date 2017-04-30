# cpi-gpio
An extension of pi-gpio, allowing for event-driven callbacks from digital inputs.

## Background
I am currently using a Raspberry Pi Zero W and trying to implement some basic GPIO tasks within Node.js. The best library I found for this purpose was pi-gpio as it doesn't require root access, like rpi-gpio does, and appears to function much better than other libraries such as onoff.


## Installation
Similarly to pi-gpio, this requires the quick2wire-gpio-admin. There are some isues with it which need to be sorted before it will work on newer Pis.

To install it do the following:

```
git clone git://github.com/quick2wire/quick2wire-gpio-admin.git
cd quick2wire-gpio-admin

#This can be vim or whatever text editor you choose
vim ./src/gpio-admin.c
```

In your editor, replace the following line (line 30):
```
int size = snprintf(path, PATH_MAX, "/sys/devices/virtual/gpio/gpio%u/%s", pin, filename);
```

With this:
```
int size = snprintf(path, PATH_MAX, "/sys/class/gpio/gpio%u/%s", pin, filename);
```

(Thanks to [rexington](https://github.com/rexington) for this)




## Usage
I liked the way onoff handles setup in that it treats each pin as an object, making it easier to keep track of everything (at least in my opinion).

### Setup
In the document, first include cpi-gpio

```javascript
var Gpio = require('cpi-gpio').Gpio
```

Then start making some Gpio objects.

```javascript
var greenLed = new Gpio(11, 'out', function(success, err) {
	if (success) {
		console.log("New Gpio pin set up at " + greenLed.pin + ". Its type is " + greenLed.type);
	} else {
		console.log(err);
	}
});
```

You don't have to include a callback if you don't want to. This can be cleaner when setting up multiple Gpio objects.
```javascript
var 	greenLed = new Gpio(11, 'out'),
	yellowLed = new Gpio(13, 'out'),
	redLed = new Gpio(15, 'out');

```

### Writing to pins
In the setup section we made some pins available for writing. Currently the only way to write to them is synchronously, but that's fine as it's a very quick process.

```javascript
greenLed.writeSync(1);
```

Getting an LED to turn on is as simple as that.
