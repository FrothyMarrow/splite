const Command = require('../Command.js');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = class dadjokeCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'dadjoke',
      usage: 'dadjoke',
      description: 'Finds a random dadjoke.',
      type: client.types.FUN
    });
  }
  async run(message) {
    try {
      const options = {
        method: 'GET',
        headers: { "Accept": "application/json" }
      }
      const res = await fetch('https://icanhazdadjoke.com', options);

      const joke = (await res.json());
      console.log(joke)
      const embed = new MessageEmbed()
        .setDescription(joke)
        .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setColor(message.guild.me.displayHexColor);
      message.channel.send(embed);
    } catch (err) {
      message.client.logger.error(err.stack);
      this.sendErrorMessage(message, 1, 'Please try again in a few seconds', err.message);
    }
  }
};
