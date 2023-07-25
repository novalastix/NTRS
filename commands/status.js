const { SlashCommandBuilder,EmbedBuilder} = require('discord.js');
const { version } = require('../package.json');
const { defaultroleId } = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('status')
		.setDescription('Check Bot Status'),
	async execute(interaction) {
        await interaction.deferReply({ ephemeral: true });

		const statusEmbed = new EmbedBuilder()
		.setTitle('Antares')
		.addFields(
			{ name: 'Status', value: "<:online:1128811218342268988> Online"},
			{ name: 'Features', value: "Automatically assigns default role"},
			{ name: 'Commands', value: '`/roll`\n`/status`',inline:true},
			{ name: ' Admin Commands', value: '`/broadcast`',inline:true},
			{ name: 'Links', value: '[source](https://github.com/novalastix/NTRS) | [donate](https://ko-fi.com/novalastix)' },
		)
		.setFooter({ text: 'v'+version})
		.setColor(0xFFFFFF)
		.setTimestamp();

		await interaction.editReply({embeds: [statusEmbed]});
	},
};
