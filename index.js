const discord = require('discord.js')
const fetch = require('node-fetch')
const translate = require('@iamtraction/google-translate')
const client = new discord.Client()
const prefixTrans = '-'
const prefixChat = '-c '
const prefixRead = '-r '

const message_error = require('./message_error')
require('dotenv').config()



client.once('ready', () => {
  console.log('bot is running')
})

client.on('message', message => {
  if (!(message.content.startsWith(prefixTrans) || !message.content.startsWith(prefixChat)) ||
    message.author.bot)
    return

  if (message.content.startsWith(prefixChat)) {
    let command = message.content.slice(prefixChat.length)
    fetch(`https://api.monkedev.com/fun/chat?msg=${command}&uid=${message.author.id}`)
      .then(response => response.json())
      .then(data => {
        message.channel.send(data.response)
      })
      .catch(error => {
        message.channel.send(message_error.random_array_member)
      })
    return
  }

  if (message.content.startsWith(prefixRead)) {
    let command = message.content.slice(prefixRead.length)
    if (`${command}` == 'all comic') {
      fetch(`https://comicreaderapi.herokuapp.com/api/comics`)
        .then(response => response.json())
        .then(data => {
          var string = JSON.stringify(data)
          var objectValue = JSON.parse(string)
          for (const i of objectValue) {
            message.channel.send(i['title'] + ': ' + i['endpoint'])
          }
        })
        .catch(err => {
          message.channel.send(message_error.random_array_member)
          console.error(err)
        })
      return
    }
    if (`${command}`.startsWith('all chapter')) {
      let endpoint = `${command}`.slice(11).trim()
      fetch(`https://comicreaderapi.herokuapp.com/api/${endpoint}`)
        .then(response => response.json())
        .then(data => {
          var string = JSON.stringify(data)
          var objectValue = JSON.parse(string)
          for (const i of objectValue[0]['chapter_list']) {
            message.channel.send(i['chapter_title'] + ': ' + i['chapter_endpoint'])
          }
        })
        .catch(err => {
          message.channel.send(message_error.random_array_member)
          console.error(err)
        })
      return
    }
    fetch(`https://comicreaderapi.herokuapp.com/api/chapter/${command}`)
      .then(response => response.json())
      .then(data => {
        var string = JSON.stringify(data)
        var objectValue = JSON.parse(string)
        for (const i of objectValue[0]['chapter_image']) {
          message.channel.send(i)
        }
      })
      .catch(err => {
        message.channel.send(message_error.random_array_member)
        console.error(err)
      })
    return
  }

  if (message.content.startsWith(prefixTrans)) {
    let command = message.content.slice(prefixTrans.length)

    translate(command, {
      from: 'vi',
      to: 'en'
    }).then(res => {
      message.channel.send(res.text)
    }).catch(err => {
      message.channel.send(message_error.random_array_member)
      console.error(err)
    })
    return
  }

})

client.login(process.env.TOKEN)