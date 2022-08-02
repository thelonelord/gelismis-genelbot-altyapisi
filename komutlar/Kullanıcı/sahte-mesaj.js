const Discord = require('discord.js');

exports.run = async (client, message, args) => {
  
  if (message.deletable) await message.delete();
  if (!message.guild.me.permissions.has('MANAGE_MESSAGES')) return message.channel.send(`${message.author} \`Webhookları Yönet\` ve \`Mesajları Yönet\` iznim yok.`).then(a => a.delete({timeout: 4500}));

  let ÇekilecekKullanıcı = message.mentions.members.first() 
  if (!ÇekilecekKullanıcı) return message.channel.send(`📧 Bir kullanıcı etiketlemelisin`).then(a => a.delete({timeout: 4500}));
  let YazılacakMesaj = args.slice(1).join(' ');
  if (!YazılacakMesaj) return message.channel.send(`:pencil: Etiketlediğin kullanıcı ne yazmalı`).then(a => a.delete({timeout: 4500}));
  
  if (YazılacakMesaj.includes("@everyone")) return message.channel.send(`${message.author} Everyone yazdırmazsın.`).then(a => a.delete({timeout: 4500}));
  if (YazılacakMesaj.includes("@here")) return message.channel.send(`${message.author} Here yazdırmazsın.`).then(a => a.delete({timeout: 4500}));
  
  let Kullanıcı = await client.users.fetch(ÇekilecekKullanıcı.id);
  let isim = (ÇekilecekKullanıcı.displayName  ||ÇekilecekKullanıcı.username)
  try { 
  message.channel.createWebhook( isim , {
      avatar: Kullanıcı.avatarURL()}) 
    .then(async (wb) => {
        const Webhook = new Discord.WebhookClient(wb.id, wb.token);
        await Webhook.send(YazılacakMesaj); 
        setTimeout(() => {
          Webhook.delete()
        }, 2000);
    })  
  } catch (err) {
   // message.channel.send(err);
};
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["sahtemesaj","sahte-mesaj"],
  permLevel: 0,
 
};

exports.help = {
  name: 'fake-mesaj',
};
/*https://codare.fun/kod?id=25RLtdpzsB adresindeki komudun id ile değil etiketleme ile çalışan hali
kullanıcının görünen adı ile çalışıyor (yani
dcdeki adı ahmet ama sunucudaki takma adı ahmet1 ise ahmet 1 olarak çalışır, takma adı yoksa ahmet olarak gözükür) */