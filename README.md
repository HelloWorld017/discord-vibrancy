# discord-vibrancy

![Imgur](https://i.imgur.com/6IxuQaW.png)  
A simple plugin to make them transparent & blurry.

----

## Warning
* This plugin injects a code to BetterDiscord to modify discord as fast as possible.  
* This plugin **ONLY WORKS IN WINDOWS**.  
* There is a possibility to damage discord client.  
* **USE IT AT YOUR OWN RISK.**

## How To Install
* Download [BetterDiscord](https://betterdiscord.net) and install.
* Just download it from [releases](https://github.com/HelloWorld017/discord-vibrancy/releases) and unzip at %appdata%\BetterDiscord.  
	* You should merge folders to install.
* Turn off discord **completely** and turn on.  
* Go to settings>plugins and check `DiscordVibrancy`.  
* Go to settings>themes and check `Transparenter`.  
* Turn off discord **completely** and turn on.  
* If discord says to restart, turn off discord **completely** and turn on.

## How this work?
1. The BetterDiscord plugin injects a code to BetterDiscord code.  
2. When discord turns on, injected code replaces cache of electron to a [Proxy](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Proxy) Object.  
3. When discord requires electron and creates a new broswer window, proxy intercepts the function call and make the window transparent & blurred.
