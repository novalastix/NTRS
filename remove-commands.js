const { REST, Routes } = require('discord.js');
const { clientId, guildId, token } = require('./config.json');
const fs = require('node:fs');

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
	try {
		console.log(`Started removing all application (/) commands.`);

		await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: [] },
		);

		const data = await rest.put(
			Routes.applicationCommands(clientId, guildId),
			{ body: [] },
		);

		console.log(`Successfully removed application (/) commands.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();