const { SlashCommandBuilder } = require('@discordjs/builders');
const { DiscordAPIError } = require('discord.js');
const { MessageEmbed } = require('discord.js')
const fetch = require("node-fetch")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('epic')
        .setDescription('Replies with epic!')
	.addStringOption(option => option.setName('type').setRequired(true).addChoice('Enhanced', 'enhanced').addChoice('Natural', 'natural')),
    async execute(interaction) {
	  await interaction.reply('Sending...')
	  function getcolor() {
            let colors = ['0x5865F2', '0x57F287', '0xFEE75C', '0xEB459E', '0xED4245', '0xFFFFFF', '0x000000']
            return colors[Math.floor(Math.random() * colors.length)];
          }
        let type = interaction.options.getString('type');
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
                        color: getcolor(),
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
