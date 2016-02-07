var Nightmare = require('nightmare');
var Promise   = require('q');
var process   = require('./process');
var fs        = require('fs');
var fo        = require('vo');


// Using request & cheerio
exports.first = function(callback) {
    console.log('one');
    process.process('123');
}

exports.second = function(callback) {
    console.log('two');
}

// Using nightmare & cheerio
exports.third = function(callback) {
	var x = Date.now();
	var nightmare = Nightmare();
	Promise.resolve(nightmare
		// .goto('http://www.apartmentratings.com/fl/tallahassee/studio-green-formerly-seminole-oaks-private-residence-hall-formerly-college-park-cash-hall_850222067432304/')
		.goto('http://www.apartmentratings.com/nc/charlotte/davis-commons_704599290828269/')
		.evaluate(function() {
		return document.getElementsByTagName('html')[0].innerHTML;
	})).then(function(html) {
		console.log("\nFinished in " + (Date.now()-x) + "ms");
		process.process(html);
		
		if(nightmare.running) {
			return nightmare.end();
		}		
	}).then(function(result) {
		// console.log('RESULT: ', result);
	}, function(err) {
		console.error(err); // notice that `throwing in here doesn't work
	});

}

// Taking screenshots with nightmare
exports.fourth = function() {
	console.log('\nTaking screenshots...');
	var nightmare = new Nightmare()
		.viewport(1280,1024)
		.useragent("Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36")
		.goto('http://www.aspensquare.com/texas/college-station/apartments/stadium-view')
		.wait()
		.screenshot('./screenshots/aspen1.png')
		.click('div#openMessageWindow')
		.wait(1000)
		.screenshot('./screenshots/aspen2.png')
		.wait(500)
		.type('#msgFname', 'Enoch')
		.type('#msgLname', 'Thomson')
		.type('#msgEmail', 'enoch.thompson@gmail.com')
		.type('#msgPhone', '801-212-3398')
		.type('#msgComments', 'Howdy!')
		.screenshot('./screenshots/aspen3.png')
		.wait(500)
	.run(function (err, nightmare) {
		if (err) return console.log(err);
		console.log('\nFinished taking screenshots!\n'.rainbow);
	})
	.end(function() {
		// Exit
	});

}

// Open Google and perform a search
exports.fifth = function() {
	var Nightmare = require('nightmare');
	var vo = require('vo');
	 
	vo(function* () {
		var nightmare = Nightmare({ show: true });
		var link = yield nightmare
			.goto('http://www.google.com')
			.type('input[title="Search"]', 'emberjs')
			.click('input[value="Google Search"]')
			.wait(500)
			.evaluate(function () {
				return document.getElementsByClassName('ac-21th')[0].href;
			});
		yield nightmare.end();
		return link;
	})(function (err, result) {
	if (err) return console.log(err);
		console.log(result);
	});
}
