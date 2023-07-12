const { Events } = require('discord.js');
const { defaultroleId, guildId } = require('../config.json');

module.exports = {
	name: Events.GuildMemberAdd,
	execute(guildMember) {
		if(guildMember.guild.id == guildId)
		{
			guildMember.roles.add(defaultroleId)
		}
	},
};