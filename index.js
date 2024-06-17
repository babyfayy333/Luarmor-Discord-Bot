// Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits } = require('discord.js');
const { discord_token } = require('./config.json');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, bot => {
	console.log(`[Ready]: Logged in as bot, ${bot.user.tag}!`);
});

client.login(discord_token);