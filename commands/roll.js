const {SlashCommandBuilder,EmbedBuilder} = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('roll')
		.setDescription('Roll Dice')
        .addStringOption(option => option.setName('custom').setDescription("Enter a custom dice roll separated by commas (e.g. '2d8,1d20'").setRequired(false)),
	async execute(interaction) {
        const name = interaction.user.toString();
        const input = interaction.options.getString('custom') || "1d20";

        let message = name + " rolled " + input + "\n#";
        let total = 0;
        let count = 0;
        try
        {
            if(input.length > 100) throw new Error('Input string cannot be too long.');

            let inputRaw = input.replace(/\s+/g, '');

            let rolls = inputRaw.split(',');

            for(r in rolls)
            {
                let roll = rolls[r];
                [x,y] = roll.split('d');
                let amount = parseInt(x);
                let sides = parseInt(y);
                
                if(isNaN(amount) || isNaN(sides)) throw new Error('Dice amount and sides must be an integer');

                if(amount < 1 || amount > 100) throw new Error('Dice amount must be between 1 and 100.');

                for (i = 0; i < amount; i++)
                {
                    if(sides < 2 || sides > 100) throw new Error('Dice sides must be between 2 and 100.');

                    output = Math.floor(Math.random() * sides) + 1;
                    total += output;

                    message += " `\u00A0"+output+"\u00A0`";

                    count++
                }
            }

            if(count > 1)
            {
                message += "\n### Total: `\u00A0"+total+'\u00A0`';
            }

            if(count > 100)
            {
                throw new Error('Dice amount must be between 1 and 100.');
            }
            
        }
        catch(e)
        {
            await interaction.reply({content: "There was an error parsing your dice string. It should look like `2d8,1d20`",ephemeral:true});
            return;
        }

        await interaction.deferReply({ ephemeral: false });

        const rollEmbed = new EmbedBuilder()
        .setColor(0xFFFFFF)
        .setDescription(message);

        await interaction.editReply({ embeds: [rollEmbed] });
    }
};
