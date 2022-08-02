const Discord = require('discord.js')

exports.run = (client, message, args) => {

 

  let command;
  if (client.commands.has(args.slice(0).join(' '))) {
    command = args.slice(0).join(' ');
  } else if (client.aliases.has(args.slice(0).join(' '))) {
    command = client.aliases.get(args.slice(0).join(' '));
  }

  if (!args[0]) return message.reply("Komut ismi yazmalısın")
  if (!command) {

    return message.reply("Botta `" + args.slice(0).join(' ') + "` komutunu bulamıyorum");
  } else {

    message.channel.send("`" + command + "` adlı komut yeniden başlatılıyor...")
      .then(message => {

        client.reload(command)
          .then(() => {
            message.edit("`" + command + "` komutu yeniden başlatıldı");
          })

          .catch(e => {
            message.edit(`komut klasöründe \`${command}.js\` dosyası bulanamadı.`);
          });
      });
  }
    
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
   permLevel: 5,
}

exports.help = {
    name: 'reload',
    description: '',
    usage: '',

}
