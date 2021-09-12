const { SlashCommandBuilder } = require('@discordjs/builders');
const { DiscordAPIError } = require('discord.js');
const { MessageEmbed } = require('discord.js')
const fetch = require("node-fetch")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mars')
        .setDescription('Replies with latest Mars pics from Curiosity!'),
    async execute(interaction) {
                function getcolor() {
                    let colors = ['0x5865F2', '0x57F287', '0xFEE75C', '0xEB459E', '0xED4245', '0xFFFFFF', '0x000000']
                    return colors[Math.floor(Math.random() * colors.length)];
          }
        let replyembed = {
            color: getcolor(),
            author: {
                name: `${interaction.user.username}`,
                icon_url: `${interaction.user.displayAvatarURL({ dynamic: true })}`,
            },
            title: 'Curiosity',
            url: 'https://mars.nasa.gov/msl/home/',
            fields: [
                {
                    name: 'Launch date',
                    value: '2011-11-26',
                },
                {
                    name: 'Landing date',
                    value: '2012-08-06',
                },

            ],
            image: {
                url: 'https://i.imgur.com/JxfHsNz.png'
            },
            timestamp: new Date()
        }
        await interaction.reply({ embeds: [replyembed]});
        photos(1);
        function photos(page) {
            fetch(`https://mars-photos.herokuapp.com/api/v1/rovers/curiosity/latest_photos?api_key=DEMO_KEY&page=${page}`)
            .then(res => res.json())
            .then(data => {
              //console.log(data)
              if (data.latest_photos.length != 0) {
                for (let i of data.latest_photos) {
                    const botembed = {
                        color: getcolor(),
                        author: {
                            name: `${interaction.user.username}`,
                            icon_url: `${interaction.user.displayAvatarURL({ dynamic: true })}`,
                        },
                        title: `${i.camera.full_name}`,
                        description: `${i.earth_date}`,
                        image: {
                            url: `${i.img_src}`
                        },
                        timestamp: new Date(),                       
                    }
                    interaction.channel.send({ embeds: [botembed]});                        
                    }
                }
              page += 1
              photos(page);
              })
          };
    }
}
