//GPIO setupv
var pi-gpio = require ('pi-gpio');

//Constructor - pin should be an integer and type should either be 'out' or 'in'
class Gpio = function(pin, type) {
	this.pin = pin;
	this.kind = kind;

	this.isOpen = false
}


//Opening and closing pins
//Callback will return a boolean representing whether or not the pin is now open, an an error in the case that it is
Gpio.prototype.open = function(callback) {
	pi-gpio.open(this.pin, kind, function(err) {
		if (err) {
			this.isOpen = false;
		} else {
			this.isOpen = true;
		}
	
		callback(this.isOpen, err);
	});
}

Gpio.prototype.close = function() {
	pi-gpio.close(this.pin);
}


//Setting values of the pins
//Syncronous writing of the value, which should be 1 or 0
Gpio.prototype.writeSync(value) {
	if (!this.isOpen) {
		this.open(function(success, err) {
			if (!success) {
				return;
			}		
		});
	}

	pi-gpio.write(this.pin, value, null);			
}


module.exports = Gpio;


