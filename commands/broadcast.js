const {SlashCommandBuilder, PermissionFlagsBits, ModalBuilder ,TextInputBuilder, TextInputStyle,ActionRowBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('broadcast')
		.setDescription('Broadcast Server Message')
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
	async execute(interaction) {
        try
        {
            const broadcast = new ModalBuilder()
			.setCustomId('broadcastModal')
			.setTitle('Broadcast Server Message');

            const channel = new TextInputBuilder()
			.setCustomId('broadcastChannel')
			.setLabel("Broadcast Location")
            .setPlaceholder('Enter Channel ID')
			.setStyle(TextInputStyle.Short)
            .setRequired(true);

            const title = new TextInputBuilder()
			.setCustomId('broadcastTitle')
			.setLabel("Broadcast Title")
			.setStyle(TextInputStyle.Short)
            .setRequired(true);

            const message = new TextInputBuilder()
			.setCustomId('broadcastMessage')
			.setLabel("Broadcast Message")
			.setStyle(TextInputStyle.Paragraph)
            .setRequired(true);

            broadcast.addComponents(
                new ActionRowBuilder().addComponents(channel),
                new ActionRowBuilder().addComponents(title),
                new ActionRowBuilder().addComponents(message));

            await interaction.showModal(broadcast);
        }
        catch(e)
        {
            console.log(e);
        }
	},
};