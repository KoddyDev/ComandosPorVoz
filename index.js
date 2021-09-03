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
  const array = [
    {
      message: "bom dia",
      resposta: 'bom dia rapaiz'
    },
    {
      message: "oi",
      resposta: 'oi, ja tomou um café?'
    },
    {
      message: "já sim",
      resposta: 'que bom'
    },
    {
      message: "tchau",
      resposta: 'flw, até a proxima',
      trigger: function(msg){ msg.member.voice.channel.leave()}
    },
    
  ]

  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    if(msg.content?.toLocaleLowerCase().includes(element.message)) {
      msg.author.send(element.resposta)
      if(element.trigger) {
        element.trigger(msg)
      }
    }
  }
})

client.login("Token do seu bot aqui")
