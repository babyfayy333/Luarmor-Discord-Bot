const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { get_api_status } = require('../../modules/luarmor.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Get the bot\s latency.'),
	async execute(interaction) {
        const api_status = await get_api_status().active;
        const embed = new EmbedBuilder()
            .setTitle('Pong!')
            .setDescription(`> The discord bot is online\n> The API is ${api_status ? 'up and running!' : 'currently down!'}`)
            .setColor('#0099ff');
        await interaction.reply({ embeds: [embed] });
	},
};
