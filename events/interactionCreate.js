const { Events,EmbedBuilder } = require('discord.js');

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if (interaction.isChatInputCommand())
		{
			const command = interaction.client.commands.get(interaction.commandName);

			if (!command) {
				console.error(`No command matching ${interaction.commandName} was found.`);
				return;
			}

			try {
				await command.execute(interaction);
			} catch (error) {
				console.error(`Error executing ${interaction.commandName}`);
				console.error(error);
			}

		}
		else if(interaction.isModalSubmit())
		{
			if (interaction.customId === 'broadcastModal') {
				try
				{
					await interaction.deferReply({ ephemeral: true });

					const channelID = interaction.fields.getTextInputValue('broadcastChannel');
					const title = interaction.fields.getTextInputValue('broadcastTitle');
					const message = interaction.fields.getTextInputValue('broadcastMessage');
					const channel = interaction.client.channels.cache.get(channelID);

					const broadcast = new EmbedBuilder()
					.setColor([255, 255, 255])
					.setTitle(title)
					.setDescription(message);

					await channel.send({ embeds: [broadcast] });

					await interaction.editReply({ content: 'Broadcast Successful.' });
				}
				catch(e)
				{
					console.log(e);
					await interaction.editReply({ content: 'Broadcast Failed.' });
				}
			}
		}
	},
};