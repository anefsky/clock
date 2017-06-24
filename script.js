(function() {
	createTickMarks();
	createHands();
})();

function Hand(element) {
	var _element = element;

	function _setPosition(angle) {
		_element.style.transform = "rotate(" + angle + "deg)";
	}
	return {
		setPosition: function(angle) {
			_setPosition(angle);
		}
	}
}

function createHands() {
	var handSeconds = new Hand(document.querySelector('.hand.second'));
	var handMinute = new Hand(document.querySelector('.hand.minute'));
	var handHour = new Hand(document.querySelector('.hand.hour'));
	setHandsMovement(handSeconds, handMinute, handHour);
}

function createTickMarks() {
	var tickHolder = document.querySelector('.tick-holder');
	for(var i = 0; i < 12; i++) {
		var tick = document.createElement('div');
		tickHolder.appendChild(tick);
		tick.classList.add('tick-mark');
		var tickRadius = 3;
		var faceRadius = 150;
		var angle = i * (360 / 12);
		var radians = angle * Math.PI / 180;
		offsetLeft = -tickRadius + faceRadius * Math.sin(radians);
		offsetBottom = -tickRadius + faceRadius * Math.cos(radians);
		tick.style.left = offsetLeft + 'px';
		tick.style.bottom = offsetBottom + 'px';
	}
}

function setHandsMovement(secondHand, minuteHand, hourHand) {
	var date = new Date();
	var seconds = date.getSeconds();
	var minutes = date.getMinutes();
	var hours = date.getHours();

	setInterval(function() {
		seconds++;
		if(seconds === 60) seconds = 0;
		secondHand.setPosition(360 / 60 * seconds);

		if(seconds === 0) minutes++;
		if(minutes === 60) minutes = 0;
		minuteHand.setPosition(minutes * 360 / 60 + seconds * 360 / (60 * 60));

		if(seconds === 0 & minutes === 0) hours++;
		if(hours === 12) hours = 0;
		hourHand.setPosition(hours * 360 / 12 + minutes * 360 / (60 * 12) + 
			seconds * 360 / (60 * 12 * 60));

		document.querySelector('.face').style.visibility = 'visible';
	}, 1000);
}
