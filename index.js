const { Client, Message } = require('discord.js');
const { DiscordSR } = require('discord-speech-recognition');
const discordTTS = require('discord-tts');
const client = new Client();
const discordSR = new DiscordSR(client);

client.on('message', msg => {
  if (msg.member?.voice.channel && msg.content === "entrar") {
    msg.member.voice.channel.join();
  }
})

client.on('speech', msg => {
  console.log(msg.content)
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
      message: "tudo bem com você",
      resposta: 'tudo e com ti?'
    },
    {
      message: "tchau",
      resposta: 'flw, até a proxima',
      trigger: function(msg){ msg.member.voice.channel.leave()}
    },
    
  ]

  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    if(msg.content === null) return msg.author.send("Não consegui identificar, repita por favor?")
    if(msg.content?.toLocaleLowerCase().includes(element.message)) {
      const broadcast = client.voice.createBroadcast();
      const channelId = msg.member.voice.channelID;
      const channel = client.channels.cache.get(channelId);
      channel.join().then(connection => {
          broadcast.play(discordTTS.getVoiceStream(element.resposta, { lang: 'pt'}));
          const dispatcher = connection.play(broadcast);
          msg.author.send(element.message)
      });
      if(element.trigger) {
        element.trigger(msg)
      }
    }
  }
})

client.login("Token do Seu BOT")
