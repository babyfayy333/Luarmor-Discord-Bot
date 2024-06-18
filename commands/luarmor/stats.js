const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { get_api_status } = require('../../modules/luarmor.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Get the bot\s latency.'),
	async execute(interaction) {
        const api_status = await get_api_status();
        const embed = new EmbedBuilder()
            .setTitle('`🏓` Pong!')
            .setDescription(`> Discord delay: \`Reply took ${Date.now() - interaction.createdTimestamp}ms\`\n> API status: \`${api_status.message}\``)
            .setColor('#e5336d');
        await interaction.reply({ embeds: [embed] });
	},
};