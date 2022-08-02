const Discord = require("discord.js");

exports.run = (client, message, params) => {const newName = message.content.split(' ');

    if(!message.member.hasPermission("ADMINISTRATOR")){

        return message.channel.send("You don't have the permissions to use this command!");

    }

    

    try{

        client.user.setUsername(newName[1])

            .then(user => message.channel.send(`My new username is **${user.username}**`))

            .catch(console.error);

    }

    catch(error){

        message.channel.send("I could not set my new username :sob:");

    }};

exports.conf = {

  enabled: true,

  guildOnly: false,

  aliases: ["taslak2"],

  permLevel: 0,

  kategori: "taslak"

};

exports.help = {

  name: "taslak2",

  description: "Taslak",

  usage: "taslak"

};

