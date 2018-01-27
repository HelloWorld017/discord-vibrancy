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

console.log("vibrancy loaded");
const electronProxy = new Proxy(electronOriginal.exports.BrowserWindow, {
	construct(target, ...args) {
		args[0].transparent = true;
		console.log("Proxy active!");
		const browserWindow = new target(...args);
		vibrancy.SetVibrancy(browserWindow, 2);
		
		return browserWindow;
	}
});

electronOriginal.exports.BrowserWindow = electronProxy;
require.cache[electronCache] = electronOriginal;

console.log("done cache monkeypatching");

module.exports = require('./lib/BetterDiscord');
