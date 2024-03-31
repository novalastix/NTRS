const { SlashCommandBuilder,PermissionFlagsBits,ActivityType } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('activity')
		.setDescription('Update Bot Activity')
		.addStringOption(option =>
			option.setName('status')
			.setDescription('Set status icon')
			.setRequired(true)
			.addChoices(
				{name:'Online',value:'online'},
				{name:'Idle',value:'idle'},
				{name:'Do Not Disturb',value:'dnd'},
			))
		.addStringOption(option =>
			option.setName('message')
			.setDescription('Set activity message')
			.setRequired(false))
		.addStringOption(option =>
			option.setName('type')
			.setDescription('Set activity type (message required)')
			.setRequired(false)
			.addChoices(
				{name:'Playing',value:'play'},
				{name:'Watching',value:'watch'},
				{name:'Listening',value:'listen'},
				{name:'Competing',value:'comp'},
				{name:'Streaming',value:'stream'},
			))
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
	async execute(interaction) {
        await interaction.deferReply({ ephemeral: true });

		const status = interaction.options.getString('status');
		const message = interaction.options.getString('message') || null;
		const type = interaction.options.getString('type') || 'play'
		const activities = {
			"play": ActivityType.Playing,
			"watch": ActivityType.Watching,
			"listen": ActivityType.Listening,
			"comp": ActivityType.Competing,
			"stream": ActivityType.Streaming
		}

		try
		{
			if(message != null)
			{
				interaction.client.user.setPresence({ activities: [{ name: message,type: activities[type] }], status: status });
			}
			else
			{
				interaction.client.user.setPresence({ activities: [], status: status });
			}

			await interaction.editReply({content:'Bot activity updated successfully.'});
		}
		catch
		{
			await interaction.editReply({content: 'There was an error updating bot activity.'});
		}
	},
};
