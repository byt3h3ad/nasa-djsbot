const { SlashCommandBuilder } = require('@discordjs/builders');
const { DiscordAPIError } = require('discord.js');
const { MessageEmbed } = require('discord.js')
const fetch = require("node-fetch")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('epic')
        .setDescription('Replies with epic!'),
    async execute(interaction) {
		await interaction.reply('Sending...')
        let type = 'enhanced';
        fetch(`https://epic.gsfc.nasa.gov/api/${type}`)
            .then(res => res.json())
            .then(data => {
                let time = data[0].date;
                time = time.slice(0, 10);
                time = time.split("-").join("/");
                let title = data[0].caption;
                for (i of data) {
                    let img = `https://epic.gsfc.nasa.gov/archive/${type}/${time}/png/${i.image}.png`
                    let tim = i.date
                    const botembed = {
                        color: 0x0099ff,
                        author: {
                            name: `${interaction.user.username}`,
                            icon_url: `${interaction.user.displayAvatarURL({ dynamic: true })}`,
                        },
                        title: 'Earth Polychromatic Camera',
                        url: 'https://epic.gsfc.nasa.gov',
                        description: `${title} at ${tim}.`,
                        image: {
                            url: `${img}`
                        },
                        timestamp: new Date(),                       
                    }
                    interaction.channel.send({ embeds: [botembed]});
                }
            })
    },
};