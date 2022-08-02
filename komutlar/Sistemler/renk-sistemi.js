const Discord = require("discord.js");
const db = require("quick.db");
const ayarlar = require("../../ayarlar.json");
let rol1;
let rol2;
let rol3;
let rol4;
let rol5;
let rol6;
let rol7;

exports.run = async (client, message, args) => {
  message.channel.send(`Renk sistemini kurmak istediğine emin misiniz?`);
  let loop = false;
  let loopv2 = false;
  while (!loop && !loopv2) {
    const response = await message.channel.awaitMessages(
      aut => aut.author.id === message.author.id,
      { max: 1, time: 15 * 1000 }
    );
    const res = response.first().content;
    if (res == "hayır" || res == "h")
      return message.channel.send("Komut iptal edildi!");
    if (res !== "evet" && res !== "e") {
      message.channel.send(
        "❓ Lütfen sadece **evet (e)** veya **hayır (h)** ile cevap verin."
      );
    }
    if (res == "evet" || res == " e") loop = true;
  }
  if (loopv2) {
    try {
      let testtt = await db.fetch(
        `renksistemijs+calaninanaskm_${message.guild.id}`
      );
      if (!testtt)
        return message.reply(
          `Renk Sistemi Zaten Deaktif! Aktifleştirmek İçin: \`${ayarlar.prefix}renk-sistemi\``
        );

      let tol1 = db.fetch(`renksiyah_${message.guild_id}`);
      let tol2 = db.fetch(`renkmavi_${message.guild_id}`);
      let tol3 = db.fetch(`renkkırmızı_${message.guild_id}`);
      let tol4 = db.fetch(`renkyeşil_${message.guild_id}`);
      let tol5 = db.fetch(`renksarı_${message.guild_id}`);
      let tol6 = db.fetch(`renkturuncu_${message.guild_id}`);
      let tol7 = db.fetch(`renkmor_${message.guild_id}`);
      let rol1 = message.guild.roles.cache.find(x => x.id === tol1);
      let rol2 = message.guild.roles.cache.find(x => x.id === tol2);
      let rol3 = message.guild.roles.cache.find(x => x.id === tol3);
      let rol4 = message.guild.roles.cache.find(x => x.id === tol4);
      let rol5 = message.guild.roles.cache.find(x => x.id === tol5);
      let rol6 = message.guild.roles.cache.find(x => x.id === tol6);
      let rol7 = message.guild.roles.cache.find(x => x.id === tol7);
      console.log(tol1);
      rol1.delete();
      rol2.delete();
      rol3.delete();
      rol4.delete();
      rol5.delete();
      rol6.delete();
      rol7.delete();
      db.delete(`renksistemijs+calaninanaskm_${message.guild.id}`);
      await db.delete(`renksiyah_${message.guild.id}`);
      await db.delete(`renkmavi_${message.guild.id}`);
      await db.delete(`renkkırmızı_${message.guild.id}`);
      await db.delete(`renkyeşil_${message.guild.id}`);
      await db.delete(`renksarı_${message.guild.id}`);
      await db.delete(`renkturuncu_${message.guild.id}`);
      await db.delete(`renkmor_${message.guild.id}`);
      let kanalllllll = message.guild.channels.cache.find(x =>
        x.name.includes(`renk-sistemi`)
      );
      kanalllllll.delete().then(sl => {
        message.reply(`Başarılı bir şekilde renk sistemi sıfırlandı!`);
      });
    } catch (err) {
      if (err) {
        message.reply(
          `Bir hata oluştu! Lütfen botun yetkisini kontrol ediniz.`
        );
        console.log(err);
      }
    }
  }
  if (loop) {
    try {
      //let testtt = await db.fetch(`renksistemijs+calaninanaskm_${message.guild.id}`)
      //if(testtt) return message.reply(`Renk Sistemi Zaten Aktif! Deaktifleştirmek İçin: \`${ayarlar.prefix}renk-sistemi\``)
      rol1 = await message.guild.roles.create({
        name: "Siyah",
        color: "#0f0f0f",
        permissisons: []
      });
      rol2 = await message.guild.roles.create({
        name: "Mavi",
        color: "#0096ff",
        permissisons: []
      });
      rol3 = await message.guild.roles.create({
        name: "Kırmızı",
        color: "#ff0000",
        permissisons: []
      });
      rol4 = await message.guild.roles.create({
        name: "Yeşil",
        color: "#00ff20",
        permissisons: []
      });
      rol5 = await message.guild.roles.create({
        name: "Sarı",
        color: "#e8ff00",
        permissisons: []
      });
      rol6 = await message.guild.roles.create({
        name: "Turuncu",
        color: "#ff4d00",
        permissisons: []
      });
      rol7 = await message.guild.roles.create({
        name: "Mor",
        color: "#7f0bba",
        permissisons: []
      });
      message.guild.channels
        .create(`${client.user.username} Renk Sistemi`, "text")
        .then(async chan => {
          let everyonerol = message.guild.roles.cache.find(
            x => x.name === "@everyone"
          );
          await chan.createOverwrite(everyonerol, {
            WIEW_CHANNEL: true,
            VIEW_CHANNEL: true,
            READ_MESSAGE_HISTORY: true,
            SEND_MESSAGES: false,
            ADD_REACTIONS: false
          });
          rol1 = message.guild.roles.cache.find(x => x.name === "Siyah");
          rol2 = message.guild.roles.cache.find(x => x.name === "Mavi");
          rol3 = message.guild.roles.cache.find(x => x.name === "Kırmızı");
          rol4 = message.guild.roles.cache.find(x => x.name === "Yeşil");
          rol5 = message.guild.roles.cache.find(x => x.name === "Sarı");
          rol6 = message.guild.roles.cache.find(x => x.name === "Turuncu");
          rol7 = message.guild.roles.cache.find(x => x.name === "Mor");

          db.set(`renksistemijs+calaninanaskm_${message.guild.id}`, "aktif");
          await db.set(`renksiyah_${message.guild.id}`, rol1.id);
          await db.set(`renkmavi_${message.guild.id}`, rol2.id);
          await db.set(`renkkırmızı_${message.guild.id}`, rol3.id);
          await db.set(`renkyeşil_${message.guild.id}`, rol4.id);
          await db.set(`renksarı_${message.guild.id}`, rol5.id);
          await db.set(`renkturuncu_${message.guild.id}`, rol6.id);
          await db.set(`renkmor_${message.guild.id}`, rol7.id);
          chan
            .send(
              `${client.user.username} • Renk Sistemi\nSadece 1 tane renk seçebilirsiniz! Eğer 2. rengi seçmeye çalışırsanız bot engeller. Lütfen seçiminizi doğru kullanınız.`
            )
            .then(async anamsg => {
              db.set(`anarenkmesaj_${message.guild.id}`, anamsg.id);
              anamsg.react("⬛"); //siyah
              await anamsg.react("🟦"); //mavi
              await anamsg.react("🟥"); //kırmızı
              await anamsg.react("🟩"); //yeşil
              await anamsg.react("🟨"); //sarı
              await anamsg.react("🟧"); //turuncu
              await anamsg.react("🟪"); //mor
              message.channel.send(
                `Bütün sistemler kuruldu! Eğer rol isimlerini değiştirirseniz komut aktif olmaz.`
              );
            });
        });
    } catch (err) {
      if (err) {
        message.reply(
          `Bir hata oluştu! Lütfen botun yetkisini kontrol ediniz.`
        );
        console.log(err);
      }
    }
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["renksistemi"],
  permLevel: 0
};
exports.help = {
  name: "renk-sistemi",
  description: "Renk sistemini ayarlarsınız",
  usage: "renk-sistemi"
};
