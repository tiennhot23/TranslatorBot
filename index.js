const discord = require('discord.js')
const translate = require('@iamtraction/google-translate');
const client = new discord.Client()
const prefix = '-'
require('dotenv').config()

client.once('ready', () => {
    console.log('bot is running')
})

client.on('message', message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return
    
    const command = message.content.slice(prefix.length)

    translate(command, { from: 'vi', to: 'en' }).then(res => {
        message.channel.send(res.text)
      }).catch(err => {
        message.channel.send('LỖI LỖI LỖI,  đm gõ ng* quá éo dịch được, thông cảm!')
        console.error(err);
      });
})

client.login(process.env.TOKEN)