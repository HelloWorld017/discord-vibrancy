const electron = require('electron');
const electronCache = require.resolve('electron');
const electronOriginal = require.cache[electronCache];

const path = require('path');

module.paths.push(path.resolve(
	__dirname,
	'..', '..', '..',
	'..', '..', '..',
	'BetterDiscord',
	'plugins',
	'discord-vibrancy',
	'node_modules'
));

const vibrancy = module.require('electron-vibrancy');
let counter = 0;

console.log("vibrancy loaded");

const electronProxy = new Proxy(electronOriginal.exports, {
	get(target, prop, receiver) {
		if(prop === 'BrowserWindow' && counter === 0) {
			counter++;
			return browserWindowProxy;
		} else {
			return Reflect.get(...arguments);
		}
	}
});

const browserWindowProxy = new Proxy(electronOriginal.exports.BrowserWindow, {
	construct(target, args) {
		args[0].transparent = true;
		if(args[0].backgroundColor) {
			delete args[0].backgroundColor;
		}
		
		console.log("Proxy active!");
		const browserWindow = new target(...args);
		vibrancy.SetVibrancy(browserWindow, 2);
		
		return browserWindow;
	},
	
	get(target, prop) {
		console.log("Get Prop", prop);
		return Reflect.get(...arguments);
	}
});

electronOriginal.exports = electronProxy;
require.cache[electronCache] = electronOriginal;

console.log("done cache monkeypatching");

module.exports = require('./lib/BetterDiscord');
