//META{"name":"DiscordVibrancy"}*//
const fs = require('fs');
const path = require('path');

const PLUGINS_BASE = path.resolve('..', '..', '..', 'Roaming', 'BetterDiscord');
const INJECT_SOURCE_DIR = path.resolve(PLUGINS_BASE, 'plugins', 'discord-vibrancy');
const BETTER_DISCORD_BASE = path.resolve(
	'..', '..', '..',
	'Roaming', 'discord', '0.0.300', 'modules',
	'discord_desktop_core', 'node_modules', 'BetterDiscord'
);

class DiscordVibrancy {
	getName() {
		return "DiscordVibrancy";
	}
	
	getDescription() {
		return "Make them transparent and blurred! Use with transparenter css!";
	}
	
	getVersion() {
		return "1.0";
	}
	
	getAuthor() {
		return "Khinenw";
	}
	
	load() {
		console.log("[DISCORD VIBRANCY] Start Loading...");
		
		const INJECT_PATH = path.resolve(BETTER_DISCORD_BASE, 'injected');
		const INJECTED_SUCCESSFULLY = fs.existsSync(INJECT_PATH);
		
		console.info("[DISCORD VIBRANCY] Checking Inject status : ", INJECTED_SUCCESSFULLY);

		if(!INJECTED_SUCCESSFULLY) {
			console.log("[DISCORD VIBRANCY] Injecting hyper-inject script...");
			new Promise((resolve, reject) => {
				const readStream = fs.createReadStream(path.resolve(INJECT_SOURCE_DIR, 'inject.js'));
				const writeStream = fs.createWriteStream(path.resolve(INJECT_PATH, '..', 'betterdiscord.js'));
				readStream.on('error', reject);
				writeStream.on('error', reject);
				writeStream.on('finish', resolve);
				readStream.pipe(writeStream);
			}).then(() => {
				fs.writeFileSync(INJECT_PATH, 'true');
				alert("Finished! Please restart discord!");
			});
		}

	}
	
	unload() {}
	
	start() {
		console.log("[DISCORD VIBRANCY] Plugin Starting...");
	}
}
