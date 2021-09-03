const { Client, Message } = require('discord.js');
const { DiscordSR } = require('discord-speech-recognition');

const client = new Client();
const discordSR = new DiscordSR(client);

client.on('message', msg => {
  if (msg.member?.voice.channel) {
    msg.member.voice.channel.join();
  }
})

client.on('speech', msg => {
  console.log(msg.content)
  if(msg.content?.toLowerCase() === "bom dia") {
    msg.author.send("bom dia rapaiz")
  }
  if(msg.content?.toLowerCase() === "tchau") {
    msg.author.send("flw")
    msg.member.voice.channel.leave()
  }
})

client.login("Token do Bot")
