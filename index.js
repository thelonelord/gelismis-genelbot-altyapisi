const ms = require("parse-ms");
const Discord = require("discord.js");
const client = new Discord.Client({
 restTimeOffset: 100,
  messageCacheMaxSize: 50,
    disableMentions: 'everyone'
});
require("discord-buttons")(client);
const bot = new Discord.Client();
const { MessageEmbed } = require("discord.js");
const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);
const chalk = require("chalk");
const { GiveawaysManager } = require('discord-giveaways');
const fs = require("fs");
const { stripIndents } = require("common-tags");
require("moment-duration-format");
const moment = require("moment");
const db = require("quick.db");
const jimp = require("jimp");
const ayarlar = 
require("./ayarlar.json");
const a = require("./ayarlar.json");
var prefix = ayarlar.prefix;
require("./util/eventLoader")(client);
client.config = require("./ayarlar.json");

client.ayarlar = {
  official_sahip: "",
  sahip: "",
  sahip2: "",
  sahip3: "",
  isim: "R8",
  desteksunucu: "",//destek sunucusu davet bağlantısı girin
  dbltoken: "",
  prefix: ayarlar.prefix,
  version: "2.0.2"
};

client.emojiler = {
  onay8: "",
  carpi8: "",
  uyari8: "",
  soru8: "",
  rol8: "",
  kullanici8: "",
  kanal8: "",
  giris8: "",
  cikis8: "",
  bilgi8: "",
  ayar8: ""
};
let kanalid = ""; //BOT EKLENDİ/ATILDII KANAL ID GİRİN
const log = message => {
console.log(`${chalk.yellow(`+`)} ${message}`);
};

client.on("ready", async () => {
  console.log ('_________________________________________');
  console.log (`Kullanıcı İsmi     : ${client.user.username}`);
  console.log (`Sunucular          : ${client.guilds.cache.size.toLocaleString()} Sunucu`);
  console.log (`Kullanıcılar       : ${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()} Kullanıcı`);
  console.log (`Komut Sayısı       : ${client.commands.size} Komut Var`);
  console.log (`Prefix             : ${ayarlar.prefix}`);
  console.log (`Durum              : ${client.user.presence.status}!`);
  console.log (`Kuruluş Tarihi     : ${moment(client.user.createdAt).format(" DD MMMM YYYY dddd (hh:mm:ss)")}`);
  console.log (`Ram Kullanımı      : ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`);
  console.log ('_________________________________________');
   client.user.setStatus("online");
  var oyun = [
    "❔  r/yardım yazarak botun komutlarını gör.",
    "📧  r/davet yazarak botu sunucuna ekle.",
    "🆕  r/yenilikler son güncellemelere göz at.",
    "📞  r/destek yazarak destek sunucusuna katıl.",
    "❌  r/hata-bildir ile bottaki hataları bildirin",
    "📮  r/öneri ile bota eklenmesini istediğiniz, önerileri bildirebilirsiniz.",
    "🍃 Sonbahar fırtınası yakında..."
  ];
  setInterval(function() {
    var random = Math.floor(Math.random() * (oyun.length - 0 + 1) + 0);
    client.user.setActivity(oyun[random]);
  }, 35000);
});

process.on('uncaughtException', function (err) {
  console.error(err);
}); 


//ÇEKİLİŞ
if(!db.get("giveaways")) db.set("giveaways", []);

const GiveawayManagerWithOwnDatabase = class extends GiveawaysManager {

    async getAllGiveaways(){
        return db.get("giveaways");
    }

    async saveGiveaway(messageID, giveawayData){
        db.push("giveaways", giveawayData);
        return true;
    }

    async editGiveaway(messageID, giveawayData){
        const giveaways = db.get("giveaways");
        const newGiveawaysArray = giveaways.filter((giveaway) => giveaway.messageID !== messageID);
        newGiveawaysArray.push(giveawayData);
        db.set("giveaways", newGiveawaysArray);
        return true;
    }

    async deleteGiveaway(messageID){
        const newGiveawaysArray = db.get("giveaways").filter((giveaway) => giveaway.messageID !== messageID);
        db.set("giveaways", newGiveawaysArray);
        return true;
    }
};
const manager = new GiveawayManagerWithOwnDatabase(client, {
  storage: false,
  updateCountdownEvery: 25000,
  default: {
    botsCanWin: false,
    embedColor: ayarlar.renk,
    embedColorEnd: ayarlar.renk,
    reaction: "🎉"
  }
});
client.giveawaysManager = manager;

const userMap = new Map();

// PREFIX SİSTEMİ
client.on('message', async msg => {
    if (msg.content.toLowerCase() === `<@botid>` || msg.content.toLowerCase() === `<@botid>`) return msg.channel.send( new Discord.MessageEmbed()
      .setColor(ayarlar.renk)
      .setDescription (`Prefix: ${prefix}`)
      .setFooter("R8"));
});
 
//SPAM SİSTEMİ 
client.on("message", async message => {
   if(!message.guild) return;
const sys = db.get(`antispam_${message.guild.id}`)
    if(message.author.bot) return;
if(sys === "acik") {

    if(message.member.permissions.has("MANAGE_MESSAGES") || message.member.permissions.has("ADMINISTRATOR")) return;
    if(userMap.has(message.author.id)) {
    const userdata = userMap.get(message.author.id);
    let msgcount = userdata.msgcount;
    ++msgcount;
    if(parseInt(msgcount) === 5) {
      message.channel.bulkDelete('5')
    message.channel.send(`<@${message.author.id}> spam yapmayı durdur.`)
    
    } else {
    
    userdata.msgcount = msgcount;
    userMap.set(message.author.id, userdata)
    
         }
         
        }else {
    userMap.set(message.author.id, {
    msgcount: 1,
    lastMessage: message,
    timer: null
    
     });
    setTimeout(() => {
      userMap.delete(message.author.id);
    }, 5000);
    }
} else return;

});

//client.en = require("./en.js");

//client.tr = require("./tr.js");

//KANAL KORUMA SİSTEMİ 
client.on("channelDelete", channel => {
  if (db.has(`kanalk_${channel.guild.id}`) === false) return;
  let kategoriID = channel.parentID;
  channel
    .clone({ name: channel.name, reason: "Kanal Koruma Sistemi." })
    .then(channels => {
      let ganal = channel.guild.channels.cache.find("name", channel.name);
      channels.setParent(
        channel.guild.channels.cache.find(
          channelss => channelss.id === kategoriID
        )
      );
      channels.send(
        new Discord.MessageEmbed()
          .setColor(ayarlar.renk)
          .setDescription(
            "Bu kanal silindi ve kanal koruma sistemi sayesinde tekrar oluşturuldu.\nKanalın adı, kanalın konusu, kanalın kategorisi, kanalın izinleri başarıyla ayarlandı."
          )
      );
    });
});

client.on("ready", () => {
  client.guilds.cache.forEach(guildd => {
    guildd.members.cache.forEach(async member => {
      const VeriÇekicip = await db.fetch(member.guild.id);
      if (!VeriÇekicip) return;
      if (Date.now() <= VeriÇekicip.Bitişp || VeriÇekicip) {
        let kalan = VeriÇekicip.Bitişp - Date.now();
        setTimeout(() => {
          db.delete(member.guild.id);
        }, kalan);
      }
    });
  });
});

client.on("ready", () => {
  client.guilds.cache.forEach(guild => {
    guild.members.cache.forEach(async member => {
      const VeriÇekici = await db.fetch(member.user.id);
      if (!VeriÇekici) return;
      if (Date.now() <= VeriÇekici.Bitiş || VeriÇekici) {
        let kalan = VeriÇekici.Bitiş - Date.now();
        setTimeout(() => {
          db.delete(member.user.id);
        }, kalan);
      }
    });
  });
});

//SNIPE SİSTEMİ
client.on("messageDelete", message => {
  db.set(`snipe.mesaj.${message.guild.id}`, message.content);
  db.set(`snipe.id.${message.guild.id}`, message.author.id);
});

//ÜYE KORUMA SİSTEMİ
client.on("guildMemberAdd", async member => {
  const database = require("quick.db");
  if (member.user.bot) return;

  const kanal = member.guild.channels.cache.get(
    (await database.fetch(`fake-channel.${member.guild.id}`)) || 0
  );
  const zaman = await database.fetch(`fake-time.${member.guild.id}`);
  const rol = member.guild.roles.cache.get(
    (await database.fetch(`fake-role.${member.guild.id}`)) || 0
  );
  if (!kanal || !zaman || !rol) return;

  if (member.user.createdAt.getTime() < require("ms")(zaman)) {
    member.roles.add(rol.id);
    const embed = new Discord.MessageEmbed()
      .setColor(ayarlar.renk)
      .setTitle("👥 Üye Koruması")
      .setDescription(
        `:shield: **${member.user.tag}** hesabı ${zaman} tarihinden önce oluşturulduğu için ${rol} rolü verildi.`
      );
    return kanal.send(embed);
  } else return;
});

client.on("roleDelete", async role => {
  let kanal5 = await db.fetch(`rolk_${role.guild.id}`);
  if (!kanal5) return;
  const entry = await role.guild
    .fetchAuditLogs({ type: "ROLE_DELETE" })
    .then(audit => audit.entry.first().executor);
  if (entry.executor.id == client.user.id) return;
  // if (entry.executor.id == role.guild.owner.id) return;

  role.guild.members.cache.get(entry.first().executor.id).hasPermissions; 
(!entry.executor.hasPermission("ROLE_DELETE")) 
  role.guild.roles.create({
    name: role.name,
    color: role.hexColor,
    permissions: role.permissions
  });
  let rolkoruma = new Discord.MessageEmbed()
    .setColor(ayarlar.renk)
    .setTitle(`Rol Silindi`)
    .setDescription(
      `Silinen rol adı ${role.name}, Rol koruma sistemi açık olduğu için rolü tekrar oluşturdum.`
    );
  client.channels.cache.get(kanal5).send(rolkoruma);
});

const logs = require("discord-logs");
logs(client);

client.on("guildMemberOnline", (member, newStatus) => {
  if (member.user.bot) return;
  db.set(`Member.${member.user.id}`, Date.now());
});

client.on("guildMemberOffline", (member, oldStatus) => {
  if (member.user.bot) return;
  db.set(`Member2.${member.user.id}`, Date.now());
  });

client.on("message", message => {
  const prefix = ayarlar.prefix;
  const arg = message.content.split(" ").slice(1);

  if (message.content.startsWith(prefix + "promosyon-kod-oluştur")) {
    if (!arg[0])
      return message.channel.send(
        "Oluşturmak istediğin promosyon kodunun ismini girmedin."
      );
    if (!arg[1])
      return message.channel.send(
        "Oluşturlacak promosyon kodunun ne kadar coin vereceğini belirtmedin."
      );
    if (isNaN(arg[1]))
      return message.channel.send(
        "Oluşturlacak promosyon kodunun ne kadar coin vereceğini belirtmedin."
      );

    db.push("promosyon", {
      name: arg[0],
      howgive: Number(arg[1])
    });

    return message.channel.send("Başarılı!");
  }

  if (message.content.startsWith(prefix + "promosyon-kodu-kullan")) {
    const data = db.fetch("promosyon");
    if (!data || data.length <= 0)
      return message.channel.send("Hiç promosyon kodu oluşturulmamış.");
    if (!arg[0])
      return message.channel.send(
        "Kullanmak istediğin promosyon kodunun ismini girmelisin."
      );
    if (!data.some(c => c.name.toLowerCase() === arg.join(" ").toLowerCase()))
      return message.channel.send("Yanlış bir promosyon kodu girdin.");
    const finded = data.find(
      c => c.name.toLowerCase() === arg.join(" ").toLowerCase()
    );

    db.add(`paracık_${message.author.id}`, +finded.howgive); 
    return message.reply(`${finded.howgive.toLocaleString()} TL'yi kaptın.`);
  }
});

//Kayit sistem
client.on("guildMemberAdd", async (member, guild, message) => {
  let kayıtsız = await db.fetch(`isimkayıtsızRol.${member.guild.id}`);
  if (!kayıtsız || kayıtsız.toLowerCase() === "yok") return;
  else {
    try {
      member.roles.add(member.guild.roles.cache.get(kayıtsız));
    } catch (e) {
      console.log(e);
    }
  }
});

client.on("guildBanAdd", async (guild, user) => {
  let modlogs = db.get(`modlogkanaly_${guild.id}`);
  const modlogkanal = guild.channels.cache.find(kanal => kanal.id === modlogs);
  if (!modlogs) return;
  if (modlogs) {
    let embed = new Discord.MessageEmbed()
      .setColor(ayarlar.renk)
      .setAuthor("Üye sunucudan yasaklandı")
      .setThumbnail(user.avatarURL() || user.defaultAvatarURL)
      .addField(`Yasaklanan kişi`, `\`\`\` ${user.tag} \`\`\` `)
      //  .setFooter(`${botadi} | Mod-Log Sistemi`)
      .setTimestamp();
    modlogkanal.send(embed);
  }
});

client.on("guildBanRemove", async (guild, user) => {
  let modlogs = db.get(`modlogkanaly_${guild.id}`);
  const modlogkanal = guild.channels.cache.find(kanal => kanal.id === modlogs);
  if (!modlogs) return;
  if (modlogs) {
    let embed = new Discord.MessageEmbed()
      .setColor(ayarlar.renk)
      .setAuthor("Üyenin yasağı kaldırıldı")
      .setThumbnail(user.avatarURL() || user.defaultAvatarURL)
      .addField(`Yasağı kaldırılan kişi`, `\`\`\` ${user.tag} \`\`\` `)
      // .setFooter(`${botadi} | Mod-Log Sistemi`)
      .setTimestamp();
    modlogkanal.send(embed);
  }
});

client.on("channelCreate", async channel => {
   
  let modlogs = db.get(`modlogkanaly_${channel.guild.id}`);
     if (!modlogs)return;
  let entry = await channel.guild
    .fetchAuditLogs({ type: "CHANNEL_CREATE" })
    .then(audit => audit.entries.first());
  let user = client.users.cache.get(entry.executor.id);
  const modlogkanal = channel.guild.channels.cache.find(
    kanal => kanal.id === modlogs
  );
  if (!modlogs) return;
  if (modlogs) {
    if (channel.type === "text") {
      let embed = new Discord.MessageEmbed()
        .setColor(ayarlar.renk)
        .setAuthor("Kanal Oluşturuldu")
        .addField(`Oluşturulan Kanalın İsmi : `, `${channel.name}`)
        .addField(`Oluşturulan Kanalın Türü : `, `Yazı`)
        .addField(`Kanalı Oluşturan : `, `<@${user.id}>`)
        //   .setFooter(`${botadi} | Mod-Log Sistemi`)
        .setTimestamp();
      modlogkanal.send(embed);
    }
    if (channel.type === "voice") {
      let embed = new Discord.MessageEmbed()
        .setColor(ayarlar.renk)
        .setAuthor("Kanal Oluşturuldu")
        .addField(`Oluşturulan Kanalın İsmi : `, `${channel.name}`)
        .addField(`Oluşturulan Kanalın Türü : `, `Ses`)
        .addField(`Kanalı Oluşturan : `, `<@${user.id}>`)
        //   .setFooter(`${botadi} | Mod-Log Sistemi`)
        .setTimestamp();
      modlogkanal.send(embed);
    }
  }
});

client.on("channelDelete", async channel => {
  let entry = await channel.guild
    .fetchAuditLogs({ type: "CHANNEL_DELETE" })
    .then(audit => audit.entries.first());
  let user = client.users.cache.get(entry.executor.id);
  let modlogs = db.get(`modlogkanaly_${channel.guild.id}`);
  const modlogkanal = channel.guild.channels.cache.find(
    kanal => kanal.id === modlogs
  );
  if (!modlogs) return;
  if (modlogs) {
    if (channel.type === "text") {
      let embed = new Discord.MessageEmbed()
        .setColor(ayarlar.renk)
        .setAuthor("Kanal Silindi")
        .addField(`Silinen Kanalın İsmi : `, `${channel.name}`)
        .addField(`Silinen Kanalın Türü : `, `Yazı`)
        .addField(`Kanalı Silen : `, `<@${user.id}>`)
        //.setFooter(`${botadi} | Mod-Log Sistemi`)
        .setTimestamp();
      modlogkanal.send(embed);
    }
    if (channel.type === "voice") {
      let embed = new Discord.MessageEmbed()
        .setColor(ayarlar.renk)
        .setAuthor("Kanal Silindi")
        .addField(`Silinen Kanalın İsmi : `, `${channel.name}`)
        .addField(`Silinen Kanalın Türü : `, `Ses`)
        .addField(`Kanalı Silen : `, `<@${user.id}>`)
        //  .setFooter(`${botadi} | Mod-Log Sistemi`)
        .setTimestamp();
      modlogkanal.send(embed);
    }
  }
});

client.on("roleDelete", async role => {
  let modlogs = db.get(`modlogkanaly_${role.guild.id}`);
  let who = await role.guild
    .fetchAuditLogs({ type: "ROLE_DELETE" })
    .then(audit => audit.entries.first());
  let user = client.users.cache.get(who.executor.id);
  const modlogkanal = role.guild.channels.cache.find(
    kanal => kanal.id === modlogs
  );
  if (!modlogs) return;
  if (modlogs) {
    let embed = new Discord.MessageEmbed()
      .setColor(a.renk)
      .setAuthor("Rol Silindi")
      .addField(`Silinen Rolün İsmi : `, `${role.name}`)
      .addField(`Rolü Silen : `, `<@${user.id}>`)
      //  .setFooter(`${botadi} | Mod-Log Sistemi`)
      .setTimestamp();
    modlogkanal.send(embed);
  }
});

client.on("emojiDelete", async emoji => {
  let modlogs = db.get(`modlogkanaly_${emoji.guild.id}`);
  const entry = await emoji.guild.fetchAuditLogs({ type: "EMOJI_DELETE" }).then(audit => audit.entries.first())
  let user = client.users.cache.get(entry.executor.id);
  const modlogkanal = emoji.guild.channels.cache.find(
    kanal => kanal.id === modlogs
  );
  if (!modlogs) return;
  if (modlogs) {
    let embed = new Discord.MessageEmbed()
      .setColor(a.renk)
      .setAuthor("Emoji Silindi")
      .addField(`Silinen Emojinin İsmi : `, `${emoji.name}`)
      .addField(`Emojiyi Silen : `, `<@${user.id}>`)
      //   .setFooter(`${botadi} | Mod-Log Sistemi`)
      .setTimestamp();
    modlogkanal.send(embed);
  }
});

client.on("roleCreate", async role => {
  let modlogs = db.get(`modlogkanaly_${role.guild.id}`);
  let entry = await role.guild
    .fetchAuditLogs({ type: "ROLE_CREATE" })
    .then(audit => audit.entries.first());
  let user = client.users.cache.get(entry.executor.id);
  const modlogkanal = role.guild.channels.cache.find(
    kanal => kanal.id === modlogs
  );
  if (!modlogs) return;
  if (modlogs) {
    let embed = new Discord.MessageEmbed()
      .setColor(a.renk)
      .setAuthor("Rol Oluşturuldu")
      .addField(`Oluşturulan Rolün İsmi : `, `${role.name}`)
      .addField(`Rolü Oluşturan : `, `<@${user.id}>`)
      //   .setFooter(`${botadi} | Mod-Log Sistemi`)
      .setTimestamp();
    modlogkanal.send(embed);
  }
});

 client.on('emojiCreate', async emoji => {
   let modlogs = db.get(`modlogkanaly_${emoji.guild.id}`)
   const entry = await emoji.guild.fetchAuditLogs({ type: "EMOJI_CREATE" }).then(audit => audit.entries.first())
   let user = client.users.cache.get(entry.executor.id)
    const modlogkanal = emoji.guild.channels.cache.find(kanal => kanal.id === modlogs);
    if(!modlogs) return;
    if(modlogs) {
      let embed = new Discord.MessageEmbed()
      .setColor(ayarlar.renk)
      .setAuthor("Bir Emoji Oluşturuldu")
      .addField(`Oluşturulan Emojinin İsmi : `, `${emoji.name}`)
      .addField(`Emoji Silen : `, `<@${user.id}>`)
    /*  .setFooter(`${botadi} | Mod-Log Sistemi`)
      .setTimestamp()*/
      modlogkanal.send(embed)
    }
  });

//MESAJ LOG
client.on("messageUpdate", async (oldMessage, newMessage) => {
  if (newMessage.author.bot) return;
  if (newMessage.content.startsWith(prefix)) return;
  
  let sc = await db.fetch(`modlogkanaly_${newMessage.guild.id}`);
  
  if(!sc) return;
  if (sc) {
  let scbul = newMessage.guild.channels.cache.get(sc);
  if (!scbul) {
  }
  if (oldMessage.content == newMessage.content) return;
  let embed = new Discord.MessageEmbed()
    .setColor(a.renk)
    .setAuthor(`Mesaj Düzenlendi`, newMessage.author.avatarURL())
    .addField("Kullanıcı", newMessage.author)
    .addField("Eski Mesaj", "```" + oldMessage.content + "```")
    .addField("Yeni Mesaj", "```" + newMessage.content + "```")
    .addField("Kanal Adı", newMessage.channel.name)
    .addField("Mesaj ID", newMessage.id)
    .addField("Kullanıcı ID", newMessage.author.id);
  //  .setFooter(`Bilgilendirme  • bügün saat ${newMessage.createdAt.getHours() +
  //    3}:${newMessage.createdAt.getMinutes()}`
  //  );
  scbul.send(embed);
  }});

client.on("messageDelete", async deletedMessage => {
  if (deletedMessage.author.bot || deletedMessage.channel.type === "dm") return;
  if (deletedMessage.content.startsWith(prefix)) return;
  let sc = await db.fetch(`modlogkanaly_${deletedMessage.guild.id}`);
  if (!sc) return;
  if (sc) {
  let scbul = deletedMessage.guild.channels.cache.get(sc);
  if (!scbul) {
  }
  let embed = new Discord.MessageEmbed()
    .setColor(a.renk)
    .setAuthor(`Mesaj Silindi`, deletedMessage.author.avatarURL())
    .addField("Kullanıcı", deletedMessage.author)
    .addField("Silinen Mesaj", "```" + deletedMessage.content + "```")
    .addField("Kanal Adı", deletedMessage.channel.name)
    .addField("Mesaj ID", deletedMessage.id)
    .addField("Kullanıcı ID", deletedMessage.author.id);
  scbul.send(embed);
  }});

client.on("guildMemberAdd", member => {
  let sistem = db.fetch(`otorol_${member.guild.id}`);

  if (sistem === "acik") {
    let rol = db.fetch(`orol_${member.guild.id}`);
    let kanal = db.fetch(`okanal_${member.guild.id}`);

    member.roles.add(rol);

    client.channels.cache
      .get(kanal)
      .send(
        new Discord.MessageEmbed()
          .setDescription(
            `<a:giris:780445045470789664> Sunucuya hoşgeldin ${
              member.user.tag
            }, ${member.guild.roles.cache.get(rol)} rolün verildi`
          )
          .setColor(ayarlar.renk)
      );
  } else if (sistem != "acik") {
    return;
  }
});

//Anti Raid
client.on("guildMemberAdd", async member => {
  let kanal =
    (await db.fetch(`antiraidK_${member.guild.id}`)) == "anti-raid-aç";
  if (!kanal) return;
  var owner = member.guild.owner;
  if (member.user.bot === true) {
    if (db.fetch(`botizin_${member.guild.id}.${member.id}`) == "aktif") {
      let embedd = new Discord.MessageEmbed()
        .setColor(a.renk)
        .setThumbnail(member.user.avatarURL())
        .setDescription(
          `**${member.user.tag}** (${member.id}) adlı bota yetki verdi eğer kaldırmak istiyorsanız **${prefix}bot-izni kaldır Bot_ID**.`
        );
      owner.send(embedd);
    } else {
      let izinverilmemişbot = new Discord.MessageEmbed()
        .setColor(ayarlar.renk)
        .setThumbnail(member.user.avatarURL())
        .setDescription(
          "**" +
            member.user.tag +
            "**" +
            " (" +
            member.id +
            ") " +
            "adlı bot sunucuya eklendi ve sunucudan atıldı.\nAtılmasını istemiyorsanız **" +
            prefix +
            "bot-izni ver Bot_ID**"
        );
      member.kick(); 
      owner.send(izinverilmemişbot);
    }
  }
});

let gorunmez = "görünmez";
let bosta = "boşta";
let rahatsizetmeyin = "rahatsız etmeyin";
let cevrimici = "çevrimiçi"; //EMOJİLER

client.on("guildCreate", guild => {
  setTimeout(async () => {
    let entry = await guild
      .fetchAuditLogs({ type: "BOT_ADD" })
      .then(audit => audit.entries.first());
    setTimeout(() => {
      const eklendi = new Discord.MessageEmbed()
        .setColor(a.renk)
        .setAuthor("Bot bir sunucuya eklendi.")
        .setImage(
          guild.banner
            ? guild.banner
            : "https://i1.wp.com/blog.travian.com/wp-content/uploads/2020/05/discord.png?fit=980%2C504&ssl=1 "
        )
        .setThumbnail(guild.iconURL({ dynamic: true }))
        .addField(
          "Sunucu Bilgileri",
          `**\`⤷\`** __Sunucu Adı:__ ${
            guild.name
          }\n**\`⤷\`** __Sunucu IDsi:__ ${
            guild.id
          }\n**\`⤷\`** __Sunucu Sahibi:__ ${
            guild.owner.user
          }\n> Botu Ekleyen: ${
            entry ? entry.executor : "Ekleyeni Bulamadım."
          }\n**\`⤷\`** __Sunucu Oluşturma Tarihi:__ ${moment(
            guild.createdTimestamp
          ).format("Do MMMM YYYY")}\n**\`⤷\`** __Özel URL:__ ${
            guild.vanityURLCode
              ? `discord.gg/${guild.vanityURLCode} ( \`${guild.vanityURLUses}\` )`
              : "Özel URL Yok"
          }\n**\`⤷\`** __Sunucu Açıklaması:__ ${
            guild.description ? guild.description : "Sunucu Açıklaması Yok."
          }\n**\`⤷\`** __Sunucu Bölgesi:__ ${guild.region
            .replace("russia", "Rusya")
            .replace("brazil", "Brezilya")
            .replace("europe", "Avrupa")
            .replace("india", "Hindistan")
            .replace("japan", "Japonya")
            .replace("singapore", "Singapur")
            .replace("south africa", "Güney Afrika")
            .replace("sydney", "Sidney")
            .replace("us central", "Amerika Birleşik Devletleri")
            .replace("us east", "Amerika Birleşik Devletleri (  Doğu )")
            .replace("us south", "Amerika Birleşik Devletleri ( Güney )")
            .replace(
              "us west",
              "Amerika Birleşik Devletleri ( Batı )"
            )}\n**\`⤷\`** __Sistem Kanalı:__ ${
            guild.systemChannelID
              ? `<#${guild.systemChannelID}>`
              : "Sistem Kanalı Bulunmuyor."
          }\n**\`⤷\`** __AFK Sistemi:__ ${
            guild.afkChannelID
              ? `<#${guild.afkChannelID}> ( \`${guild.afkTimeout}\` )`
              : "Afk Sistemi Devredışı."
          }\n**\`⤷\`** __Kurallar Kanalı:__ ${
            guild.rulesChannelID
              ? `<#${guild.rulesChannelID}>`
              : "Senkronize Kurallar Kanalı Yok."
          }`
        )
        .addField(
          "Sunucu Bilgileri 2",
          `**\`⤷\`** __Toplam Kanal Sayısı: __\`${
            guild.channels.cache.size
          }\`\n> Yazı Kanallar: \`${
            guild.channels.cache.filter(champ => champ.type == "text").size
          }\`\n> Ses Kanallar: \`${
            guild.channels.cache.filter(champ => champ.type == "voice").size
          }\`\n> Duyuru Kanallar: \`${
            guild.channels.cache.filter(champ => champ.type == "news").size
          }\`\n**\`⤷\`** __Toplam Rol Sayısı:__ \`${
            guild.roles.cache.size
          }\`\n> Yetkili Rol Sayısı: \`${
            guild.roles.cache.filter(
              a =>
                a.permissions.has("ADMINISTRATOR") ||
                a.permissions.has("MANAGE_CHANNELS") ||
                a.permissions.has("MANAGE_ROLES") ||
                a.permissions.has("MANAGE_EMOJIS") ||
                a.permissions.has("MANAGE_GUILD") ||
                a.permissions.has("MANAGE_WEBHOOKS")
            ).size
          }\`\n**\`⤷\`** __Toplam Emoji Sayısı:__ \`${
            guild.emojis.cache.size
          }\`\n> Animasyonlu Emoji: \`${
            guild.emojis.cache.filter(a => a.animated).size
          }\`\n> Animasyonsuz Emoji: \`${
            guild.emojis.cache.filter(a => !a.animated).size
          }\``
        )
        .addField(
          "Kullanıcı Bilgileri",
          `**\`⤷\`** __Toplam Üye Sayısı:__ \`${
            guild.memberCount
          }\`\n> İnsan Üye Sayısı: \`${
            guild.members.cache.filter(a => !a.user.bot).size
          }\`\n> Bot Üye Sayısı: \`${
            guild.members.cache.filter(a => a.user.bot).size
          }\`\n> Çevrimiçi Üye Sayısı: \`${
            guild.members.cache.filter(a => a.presence.status !== "offline")
              .size
          }\`\n**\`${
            guild.members.cache.filter(a => a.presence.status == "online").size
          }\`${cevrimici} - \`${
            guild.members.cache.filter(a => a.presence.status == "idle").size
          }\`${bosta} - \`${
            guild.members.cache.filter(a => a.presence.status == "dnd").size
          }\`${rahatsizetmeyin} - \`${
            guild.members.cache.filter(a => a.presence.status == "offline").size
          }\`${gorunmez}**`
        );
      return client.channels.cache.get(kanalid).send(eklendi);
    }, 1000);
  }, 1000);
});

client.on("guildDelete", guild => {
  setTimeout(async () => {
    const cikarildi = new Discord.MessageEmbed()
      .setColor(a.renk)
      .setAuthor("Bot bir sunucudan çıktı/çıkarıldı.")
      .setImage(
        guild.banner
          ? guild.banner
          : "https://i1.wp.com/blog.travian.com/wp-content/uploads/2020/05/discord.png?fit=980%2C504&ssl=1 "
      )
      .setThumbnail(guild.iconURL({ dynamic: true }))
      .addField(
        "Sunucu Bilgileri",
        `**\`⤷\`** __Sunucu Adı:__ ${guild.name}\n**\`⤷\`** __Sunucu IDsi:__ ${
          guild.id
        }\n**\`⤷\`** __Sunucu Sahibi:__ ${
          guild.owner.user
        }\n**\`⤷\`** __Sunucu Oluşturma Tarihi:__ ${moment(
          guild.createdTimestamp
        ).format("Do MMMM YYYY")}\n**\`⤷\`** __Özel URL:__ ${
          guild.vanityURLCode
            ? `discord.gg/${guild.vanityURLCode} ( \`${guild.vanityURLUses}\` )`
            : "Özel URL Yok"
        }\n**\`⤷\`** __Sunucu Açıklaması:__ ${
          guild.description ? guild.description : "Sunucu Açıklaması Yok."
        }\n**\`⤷\`** __Sunucu Bölgesi:__ ${guild.region
          .replace("russia", "Rusya")
          .replace("brazil", "Brezilya")
          .replace("europe", "Avrupa")
          .replace("india", "Hindistan")
          .replace("japan", "Japonya")
          .replace("singapore", "Singapur")
          .replace("south africa", "Güney Afrika")
          .replace("sydney", "Sidney")
          .replace("us central", "Amerika Birleşik Devletleri")
          .replace("us east", "Amerika Birleşik Devletleri (  Doğu )")
          .replace("us south", "Amerika Birleşik Devletleri ( Güney )")
          .replace(
            "us west",
            "Amerika Birleşik Devletleri ( Batı )"
          )}\n**\`⤷\`** __Sistem Kanalı:__ ${
          guild.systemChannelID
            ? `<#${guild.systemChannelID}>`
            : "Sistem Kanalı Bulunmuyor."
        }\n**\`⤷\`** __AFK Sistemi:__ ${
          guild.afkChannelID
            ? `<#${guild.afkChannelID}> ( \`${guild.afkTimeout}\` )`
            : "Afk Sistemi Devredışı."
        }\n**\`⤷\`** __Kurallar Kanalı:__ ${
          guild.rulesChannelID
            ? `<#${guild.rulesChannelID}>`
            : "Senkronize Kurallar Kanalı Yok."
        }`
      );
    return client.channels.cache.get(kanalid).send(cikarildi);
  }, 1000);
});

//YENİ HESABA ROL
client.on("guildMemberAdd", async member => {
  let kanal = await db.fetch(`kanal_${member.guild.id}`);
  let rol = await db.fetch(`rol_${member.guild.id}`);
  let security = await db.fetch(`koruma_${member.guild.id}`);
  let user = client.users.cache.get(member.id);

  if (security == "kapali") return;
  if (security == "acik") {
    const zaman = new Date().getTime() - user.createdAt.getTime();

    if (zaman < 259200000) {
      client.channels
        .get(kanal)
        .send(
          `${member} isimli kullanıcının hesabı yeni olduğu için ${rol} rolü verildi.`
        );
      member
        .send("Hesabın yeni açıldığı için size rol verildi.")
        .catch(() => console.log(`DMsi Kapalı.`));
      member.roles.add(rol);
    }
  }
});

client.on("message", async message => {
  /* var onay = client.emojis.cache.get(client.emojiler.evet);
  var red = client.emojis.cache.get(client.emojiler.hayır);*/
  const prefixMention = new RegExp(`^<@!?${client.user.id}>`);
  if (message.channel.type === "dm") return;

  if (message.author.bot) return;

  var user = message.mentions.users.first() || message.author;
  if (!message.guild) user = message.author;

  var user = message.mentions.users.first() || message.author;
  if (!message.guild) user = message.author;

  let i =
    (await db.fetch(`prefix_${message.guild.id}`)) || client.ayarlar.prefix;

  let prefix;
  if (i) {
    prefix = message.content.match(prefixMention)
      ? message.content.match(prefixMention)[0] + " "
      : i;
  } else {
    prefix = message.content.match(prefixMention)
      ? message.content.match(prefixMention)[0] + " "
      : `${message.guild.commandPrefix}`;
  }

  if (message.author.bot) return;
  if (message.author.id === client.user.id) return;
  if (message.content.indexOf(prefix) !== 0) return;
  const args = message.content.substring(prefix.length).split(" ");
  const command = args.shift().toLowerCase();

  if (command === "rozet-parar") {
    if (message.author.id !== "727372765782343701")
      return message.channek.send(``);
    const i = await db.set(
      `memberBadge6_${user.id}`,
      "https://cdn.discordapp.com/attachments/531535859594297364/533260601162465280/paraR.png"
    );
    return message.channel.send(` Kullanıcıya yıldırım rozeti verilmiştir.`);
  }

  if (command === "rozet-onayla") {
    if (message.author.id !== "727372765782343701")
      return message.channek.send(``);
    const i = await db.set(
      `memberBadge_${user.id}`,
      "https://cdn.discordapp.com/attachments/474685686075621376/480845736347435015/401725450470031362.png"
    );
    return message.channel.send(` Kullanıcıya onay rozeti verilmiştir.`);
  }

  if (command === "rozet-konay" || command === "rozet-konayla") {
    if (message.author.id !== "727372765782343701")
      return message.channel.send(``);
    const i = await db.set(
      `memberBadge_${user.id}`,
      "https://cdn.discordapp.com/attachments/461622592688619520/472923575049781268/profile.png"
    );
    return message.channel.send(`Kullanıcıdan onay rozeti alınmıştır.`);
  }

  if (command === "rozet-yetkili" || command === "rozet-ekip") {
    if (message.author.id !== "727372765782343701")
      return message.channel.send(``);
    const i = await db.set(
      `memberBadge2_${user.id}`,
      "https://cdn.discordapp.com/attachments/474685686075621376/480845736347435009/401723658491527168.png"
    );
    return message.channel.send(
      `Kullanıcıya başarıyla yetkili rozeti verilmiştir.`
    );
  }

  if (command === "rozet-kyetkili" || command === "rozet-kekip") {
    if (message.author.id !== "727372765782343701")
      return message.channel.send(``);
    const i = await db.set(
      `memberBadge2_${user.id}`,
      "https://cdn.discordapp.com/attachments/461622592688619520/472923575049781268/profile.png"
    );
    return message.channel.send(`Kullanıcıdan ekip rozeti alınmıştır.`);
  }

  if (command === "rozet-destekci" || command === "rozet-destekçi") {
    if (message.author.id !== "727372765782343701")
      return message.channel.send(``);
    const i = await db.set(
      `memberBadge3_${user.id}`,
      "https://cdn.discordapp.com/attachments/474685686075621376/480845737006202881/401725034453925889.png"
    );
    return message.channel.send(`Kullanıcıya destekçi rozeti verilmiştir.`);
  }

  if (command === "rozet-kdestekci" || command === "rozet-kdestekçi") {
    if (message.author.id !== "727372765782343701")
      return message.channel.send(``);
    const i = await db.set(
      `memberBadge3_${user.id}`,
      "https://cdn.discordapp.com/attachments/461622592688619520/472923575049781268/profile.png"
    );
    return message.channel.send(`Kullanıcıdan destekçi rozeti alınmıştır.`);
  }

  if (command === "rozet-mod" || command === "rozet-moderator") {
    if (message.author.id !== "727372765782343701")
      return message.channel.send(``);
    const i = await db.set(
      `memberBadge4_${user.id}`,
      "https://cdn.discordapp.com/attachments/474685686075621376/480845735647117312/401724520806875139.png"
    );
    return message.channel.send(`Kullanıcıya moderator rozeti verilmiştir.`);
  }

  if (command === "rozet-kmod" || command === "rozet-kmoderator") {
    if (message.author.id !== "727372765782343701")
      return message.channel.send(``);
    const i = await db.set(
      `memberBadge4_${user.id}`,
      "https://cdn.discordapp.com/attachments/461622592688619520/472923575049781268/profile.png"
    );
    return message.channel.send(`Kullanıcıdan moderator rozeti alınmıştır.`);
  }
});

client.setMaxListeners(50)


const data = require("quick.db");

client.on("guildMemberAdd", async member => {
  let user = member.user;
  let guild = member.guild;

  const systemTagData = await data.fetch(`yasaklı.tag.${guild.id}`);
  const systemRoleData = await data.fetch(`yasaklı.tag.role.${guild.id}`);
  if (!systemRoleData || !systemTagData) return;

  const systemTag = String(systemTagData);
  const systemRole = guild.roles.cache.get(systemRoleData);

  let userUsername = user.username;
  if (!userUsername.includes(systemTag)) return;
  member.roles.cache.forEach(role => member.roles.remove(role.id));
  await member.roles.add(systemRole.id);
  member.send(
    new Discord.MessageEmbed()
      .setTitle("Yasaklı Tag")
      .setColor(a.renk)
      .setDescription(`> \`${guild.name}\` *Sunucusu için yasaklı tagdasınız.*`)
      .addField(
        "• Bilgilendirme",
        "**Sunucu içerisindeki yetkililere ulaşarak yasaklı tagdan çıkmanızı sağlayabilirsiniz!"
      )
  );
});

client.on("message", async (msg, member, guild) => {
  let i = await db.fetch(`ss_${msg.guild.id}`);
  if (db.has(`ss_${msg.guild.id}`) === true) {
    if (db.has(msg.author.id)) {
      if (msg.content.toLowerCase() === "sa") {
        msg.channel.send(
          `<a:sekilligalp:727045194033266730> Aleyküm Selam, \`${msg.author.tag}\` Hoşgeldin <a:sekilligalp:727045194033266730>`
        );
        // db.add(`slmal_${msg.author.id}`, 1);
      }
      if (msg.content.toLowerCase() === "selam") {
        msg.channel.send(
          `<a:sekilligalp:727045194033266730>Aleyküm Selam, \`${msg.author.tag}\` Hoşgeldin <a:sekilligalp:727045194033266730>`
        );
        //   db.add(`slmal_${msg.author.id}`, 1);
      }
      if (msg.content.toLowerCase() === "s.a") {
        msg.channel.send(
          `<a:sekilligalp:727045194033266730> Aleyküm Selam, \`${msg.author.tag}\` Hoşgeldin <a:sekilligalp:727045194033266730>`
        );
        // db.add(`slmal_${msg.author.id}`, 1);
      }
      if (msg.content.toLowerCase() === "selamun aleyküm") {
        msg.channel.send(
          `<a:sekilligalp:727045194033266730> Aleyküm Selam, \`${msg.author.tag}\` Hoşgeldin <a:sekilligalp:727045194033266730>`
        );
        //   db.add(`slmal_${msg.author.id}`, 1);
      }
      if (msg.content.toLowerCase() === "selamün aleyküm") {
        msg.channel.send(
          `<a:sekilligalp:727045194033266730> Aleyküm Selam, \`${msg.author.tag}\` Hoşgeldin <a:sekilligalp:727045194033266730>`
        );
        //   db.add(`slmal_${msg.author.id}`, 1);
      }
    } else if (msg.content.toLowerCase() === "sa") {
      msg.channel.send(
        new Discord.MessageEmbed()
          .setColor(ayarlar.renk)
          .setDescription(`:wave: ${msg.author} **Aleyküm Selam Hoşgeldin!**`)
      );
      //  db.add(`slmal_${msg.author.id}`, 1);
    } else if (msg.content.toLowerCase() === "hoşçakal") {
      msg.channel.send(
        new Discord.MessageEmbed()
          .setColor(ayarlar.renk)
          .setDescription(`:wave: **Görüşürüz,** ${msg.author}`)
      );
    } else if (msg.content.toLowerCase() === "görüşürüz") {
      msg.channel.send(
        new Discord.MessageEmbed()
          .setColor(ayarlar.renk)
          .setDescription(`:wave: **Görüşürüz,** ${msg.author}`)
      );
    } else if (msg.content.toLowerCase() === "selam") {
      msg.channel.send(
        new Discord.MessageEmbed()

          .setColor(ayarlar.renk)
          .setDescription(`:wave: ${msg.author} **Aleyküm Selam Hoşgeldin!**`)
      );
      // db.add(`slmal_${msg.author.id}`, 1);
    }
  }
});

client.on("message", async message => {
  if (!message.guild) return;
  let acikmi = await db.fetch(`${message.guild.id}.capsengel`);
  if (!acikmi) return;
  if (message.author.bot) return;
  if (message.member.hasPermission("MANAGE_MESSAGES")) return;
  let matched = message.content.replace(/[^A-Z]/g, "").length;
  let yuzde = percentage(matched, message.content.length);
  if (Math.round(yuzde) > acikmi.yuzde) {
    message.delete();
   
    message.channel.send(
      new Discord.MessageEmbed()
        .setColor(ayarlar.renk)
        .setDescription(
          `<@${message.author.id}> Fazla büyük harf kullanmalısın.`
        )
    ); 
  } else {
    return;
  }
});

client.on("message", async msg => {
  //const args = msg.content.slice.split(' ');
  const args = msg.content.trim().split(/ +/g);
  const fAK = await db.fetch(`filtreAK_${msg.guild.id}`);
  let mesaj = args.slice(1).join(" ");
  const filtre = await db.fetch(`filtre_${msg.guild.id}`);
  const kufur = [
    "göt",
    "amk",
    "amq",
    "aq",
    "orospu",
    "oruspu",
    "oç",
    "sikerim",
    "yarrak",
    "piç",
    "amq",
    "sik",
    "amcık",
    "çocu",
    "sex",
    "seks",
    "amına",
    "orospu çocuğu",
    "siktir git",
    "piç"
  ];

  const reklam = [
    ".ml",
    "discord.gg/",
    "discordapp/",
    "discordgg/",
    ".com",
    ".net",
    ".xyz",
    ".tk",
    ".pw",
    ".io",
    ".me",
    ".gg",
    "www.",
    "https",
    "http",
    ".gl",
    ".org",
    ".com.tr",
    ".biz",
    ".party",
    ".rf.gd",
    ".az",
    ".gg/",
    "glitch.me",
    "glitch.com"
  ];

  const link = [".gg/","discord.gg/", "discordapp/", "discordgg/", "discord.gg"];

  let kufures = await db.fetch(`kuyarr_${msg.author.id}`);
  let linkes = await db.fetch(`luyarr_${msg.author.id}`);
  let ads = msg.author.id;
  if (fAK == "açık") {
    const fltr = filtre;
    if (fltr.some(word => msg.content.includes(word))) {
      if (!msg.member.hasPermission("BAN_MEMBERS")) {
        msg.delete();

        var k = new Discord.MessageEmbed()
          .setColor(a.renk)
          .setAuthor("Filtre Sistemi")
          .setDescription(`Bu kelime bu sunucuda yasaklandı!`);
        msg.channel.send(k).then(message => message.delete(5000));

        return;
      }
    }
  }
  if (!msg.guild) return;

  if (msg.author.bot) return;

  if (db.has(`capsE_${msg.guild.id}`) === true) {
    //burda caspE olcak
    let x = /\w*[A-Z]\w*[A-Z]\w*/g;
    if (msg.content.match(x)) {
      if (!msg.member.hasPermission("ADMINISTRATOR")) {
        msg.delete();

        let y = await msg.channel.send(
          `Hey <@${msg.author.id}>, Büyük Harfle Mesaj Yazamazsn!`
        );
        y.delete(5000);
        return;
      }
    }
  }

  if (!msg.guild) return;

  if (db.has(`küfürE_${msg.guild.id}`) === true) {
    if (kufur.some(word => msg.content.toLowerCase().includes(word))) {
      if (!msg.member.hasPermission("ADMINISTRATOR")) {
        msg.delete();

        var k = new Discord.MessageEmbed()
          .setColor(ayarlar.renk)
      
          .setDescription(
            `<@${msg.author.id}>, Bu sunucuda küfürler **${client.user.username}** tarafından engellenmektedir.`
          );
        db.add(`kuyarr_${msg.author.id}`, 1);
        msg.channel.send(k).then(message => message.delete(5000));
      }
    }
  }

    if (db.has(`re_${msg.guild.id}`) === true) {
    if (reklam.some(word => msg.content.toLowerCase().includes(word))) {
      if (!msg.member.hasPermission("ADMINISTRATOR")) {
        msg.delete();

        var ke = new Discord.MessageEmbed()
          .setColor(ayarlar.renk)
         
          .setDescription(
            `<@${msg.author.id}>, Bu sunucuda bağlantılar **${client.user.username}** tarafından engellenmektedir.`
          );
        msg.channel.send(ke).then(message => message.delete(5000));
      }
    }
  }
  
  if (db.has(`linkE_${msg.guild.id}`) === true) {
    if (reklam.some(word => msg.content.toLowerCase().includes(word))) {
      if (!msg.member.hasPermission("ADMINISTRATOR")) {
        msg.delete();
        var ke = new Discord.MessageEmbed()
          .setColor(ayarlar.renk)
     
          .setDescription(
            `<@${msg.author.id}>, Sunucuda reklamlar **${client.user.username}** tarafından engellenmektedir.`
          );

        db.add(`luyarr_${msg.author.id}`, 1);
        msg.channel.send(ke).then(message => message.delete(5000));
      }
    }
  }
});

client.on("guildMemberRemove", async member => {
  const channel = db.fetch(`sKanal_${member.guild.id}`);
  if (db.has(`sayac_${member.guild.id}`) === false) return;
  if (db.has(`sKanal_${member.guild.id}`) === false) return;

  if (db.has(`üyelikk_${member.user.id}`)) {
    const embed = new Discord.MessageEmbed()
      .setColor(a.renk)

      .setDescription(
        `<a:sekilligalp:727045194033266730> Gold üye kayboldu. \`${
          member.user.tag
        }\` \`${db.fetch(
          `sayac_${member.guild.id}`
        )}\` üye olmamıza son \`${db.fetch(`sayac_${member.guild.id}`) -
          member.guild.members.cache.size}\` Kişi Kaldı `
      );

    if (!member.guild.channels.cache.get(channel)) return;

    member.guild.channels.cache.get(channel).send(embed);
  } else
    member.guild.channels
      .cache.get(channel)
      .send(
        `**${member.user.tag}** Sunucudan ayrıldı! \`${db.fetch(
          `sayac_${member.guild.id}`
        )}\` üye olmamıza son \`${db.fetch(`sayac_${member.guild.id}`) -
          member.guild.members.cache.size}\` üye kaldı!`
      );
});

client.on("message", async msg => {
  if (!msg.guild) return;

  let prefix =
    (await db.fetch(`prefix_${msg.guild.id}`)) || client.ayarlar.prefix;

  if (!msg.guild.channels.cache.get(db.fetch(`destekK_${msg.guild.id}`)))
    return;
  var s = "tr";
  var r = "Destek Ekibi";
  var k = "destek-kanalı";
  if (db.has(`dil_${msg.guild.id}`) === true) {
    var s = "en";
    var r = "Support Team";
    var k = "support-channel";
  }
  const dil = s;

  let rol = "";
  let kanal = "";

  if (db.has(`destekK_${msg.guild.id}`) === true) {
    kanal = msg.guild.channels.cache.get(db.fetch(`destekK_${msg.guild.id}`))
      .name;
  }

  if (db.has(`destekK_${msg.guild.id}`) === false) {
    kanal = k;
  }

  if (db.has(`destekR_${msg.guild.id}`) === true) {
    rol = msg.guild.roles.cache.get(db.fetch(`destekR_${msg.guild.id}`));
  }

  if (db.has(`destekR_${msg.guild.id}`) === false) {
    rol = r;
  }

  const reason = msg.content
    .split(" ")
    .slice(1)
    .join(" ");
  if (msg.channel.name == kanal) {
    if (msg.author.bot) return;
    /*if (!msg.guild.roles.cache.some("name", rol)) return msg.reply(client[dil].desteksistem.rolyok.replace("{rol}", r)).then(m2 => {
            m2.delete(5000)});*/
    if (
      msg.guild.channels.cache.find(
        c =>
          c.name ===
          `${client[dil].desteksistem.talep}-${msg.author.discriminator}`
      )
    ) {
      msg.author.send(
        client[dil].desteksistem.aciktalepozel
          .replace("{kisi}", msg.author.tag)
          .replace(
            "{kanal}",
            `${msg.guild.channels.cache.get(
              msg.guild.channels.cache.find(
                c =>
                  c.name ===
                  `${client[dil].desteksistem.talep}-${msg.author.discriminator}`
              ).id
            )}`
          )
      );
      msg.guild.channels
        .cache.find(
          c =>
            c.name ===
            `${client[dil].desteksistem.talep}-${msg.author.discriminator}`
        )
        .send(
          client[dil].desteksistem.aciktalep
            .replace("{kisi}", msg.author.tag)
            .replace("{sebep}", msg.content)
        );

      msg.delete();
      return;
    }
    if (
      msg.guild.channels.cache.find(
        c => c.name === client[dil].desteksistem.kategori
      )
    ) {
      msg.guild.channels
        .create(
          `${client[dil].desteksistem.talep}-${msg.author.discriminator}`,
          "text"
        )
        .then(c => {
          const category = msg.guild.channels.cache.find(
            c => c.name === client[dil].desteksistem.kategori
          );
          c.setParent(category.id);
          let role = msg.guild.roles.cache.find(r => r.name === rol.name);
          let role2 = msg.guild.roles.cache.find(r => r.name === "@everyone");
          c.createOverwrite(role, {
            SEND_MESSAGES: true,
            VIEW_CHANNEL: true
          });
          c.createOverwrite(role2, {
            SEND_MESSAGES: false,
            VIEW_CHANNEL: false
          });
          c.createOverwrite(msg.author, {
            SEND_MESSAGES: true,
            VIEW_CHANNEL: true
          });

          const embed = new Discord.MessageEmbed()
            .setColor(a.renk)
            .setAuthor(
              `${client.user.username} | Destek Sistemi`,
              client.user.avatarURL()
            )
            .setTitle(`_Merhaba ${msg.author.username}!_`)
            .addField(
              `» Destek Talebi Hakkında Bilgilendirme «`,
              `Yetkililerimiz en yakın zamanda burada sorunun ile ilgilenecektir! \nDestek talebini kapatmak için \`${prefix}talep-kapat\` yazabilirsiniz`
            )
            .addField(`» Destek Talebi Sebebi «`, `${msg.content}`, true)
            .addField(
              `» Destek Talebini Açan Kullanıcı «`,
              `<@${msg.author.id}>`,
              true
            )
            .setFooter(
              `${msg.guild.name} adlı sunucu ${client.user.username} Destek Sistemi'ni kullanıyor teşekkürler!`,
              msg.guild.iconURL()
            );
          c.send({ embed: embed });
          c.send(
            `**${msg.author.tag}** adlı kullanıcı \`${msg.content}\` sebebi ile Destek Talebi açtı!`
          );
          msg.delete();
        })
        .catch(console.error);
    }
  }

  if (msg.channel.name == kanal) {
    if (
      !msg.guild.channels.cache.find(
        c => c.name === client[dil].desteksistem.kategori
      )
    ) {
      msg.guild.channels
        .create(client[dil].desteksistem.kategori, "category")
        .then(category => {
          category.setPosition(1);
          let every = msg.guild.roles.cache.find(c => c.name === "@everyone");
          category.createOverwrite(every, {
            VIEW_CHANNEL: false,
            SEND_MESSAGES: false,
            READ_MESSAGE_HISTORY: false
          });
          msg.guild.channels
            .create(
              `${client[dil].desteksistem.talep}-${msg.author.discriminator}`,
              "text"
            )
            .then(c => {
              c.setParent(category.id);
              let role = msg.guild.roles.cache.find(c => c.name === rol.name);
              let role2 = msg.guild.roles.cache.find(
                c => c.name === "@everyone"
              );
              c.createOverwrite(role, {
                SEND_MESSAGES: true,
                VIEW_CHANNEL: true
              });
              c.createOverwrite(role2, {
                SEND_MESSAGES: false,
                VIEW_CHANNEL: false
              });
              c.createOverwrite(msg.author, {
                SEND_MESSAGES: true,
                VIEW_CHANNEL: true
              });

              const embed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setAuthor(
                  `${client.user.username} | Destek Sistemi`,
                  client.user.avatarURL()
                )
                .setTitle(`_Merhaba ${msg.author.username}!_`)
                .addField(
                  `» Destek Talebi Hakkında Bilgilendirme «`,
                  `Yetkililerimiz en yakın zamanda burada sorunun ile ilgilenecektir! \nDestek talebini kapatmak için \`${prefix}talep-kapat\` yazabilirsiniz`
                )
                .addField(`» Destek Talebi Sebebi «`, `${msg.content}`, true)
                .addField(
                  `» Destek Talebini Açan Kullanıcı «`,
                  `<@${msg.author.id}>`,
                  true
                )
                .setFooter(
                  `${msg.guild.name} adlı sunucu ${client.user.username} Destek Sistemi'ni kullanıyor teşekkürler!`,
                  msg.guild.iconURL()
                );
              c.send({ embed: embed });
              c.send(
                `**${msg.author.tag}** adlı kullanıcı \`${msg.content}\` sebebi ile Destek Talebi açtı!`
              );
              msg.delete();
            })
            .catch(console.error);
        });
    }
  }
});

client.on("message", async message => {
  if (
    !message.guild.channels.cache.get(db.fetch(`destekK_${message.guild.id}`))
  )
    return;

  if (!message.guild) return;

  let prefix =
    (await db.fetch(`prefix_${message.guild.id}`)) || client.ayarlar.prefix;

  var s = "tr";
  var r = "Destek Ekibi";
  if (db.has(`dil_${message.guild.id}`) === true) {
    var s = "en";
    var r = "Support Team";
  }
  const dil = s;

  if (message.content.toLowerCase().startsWith(prefix + `talep-kapat`)) {
    if (!message.channel.name.startsWith(`${client[dil].desteksistem.talep}-`))
      return message.channel.send(
        `Bu komut sadece Destek Talebi kanallarında kullanılabilir.`
      );

    const embed = new Discord.MessageEmbed()
      .setColor(a.renk)
      .setAuthor(`Destek Talebi Kapatma İşlemi!`)
      .setDescription(
        `Destek talebini kapatma işlemini onaylamak için, \n10 saniye içinde \`evet\` yazınız.`
      )
      .setFooter(
        `${client.user.username} | Destek Sistemi`,
        client.user.avatarURL()
      );
    message.channel.send({ embed }).then(m => {
      message.channel
        .awaitMessages(response => response.content === "evet", {
          max: 1,
          time: 10000,
          errors: ["time"]
        })
        .then(collected => {
          message.channel.delete();
        })
        .catch(() => {
          m.edit("Destek talebi kapatma isteği zaman aşımına uğradı.").then(
            m2 => {
              m2.delete();
            },
            3000
          );
        });
    });
  }
});

//3

client.on("message", async message => {
  if (message.channel.type === "dm") return;
  if (
    (await data.fetch(`afk.${message.author.id}.${message.guild.id}`)) ==
    undefined
  )
    return;
  const ms = require("ms");

  if (message.content.length > 2) {
    const sebepp = await data.fetch(
      `sebep.${message.author.id}.${message.guild.id}`
    );
    const sp = await data.fetch(
      `giriş.${message.author.id}.${message.guild.id}`
    );
    const asd = await data.fetch(
      `display.${message.author.id}.${message.guild.id}`
    );

    let atılmaay = moment(Date.now() + 10800000).format("MM");
    let atılmagün = moment(Date.now() + 10800000).format("DD");
    let atılmasaat = moment(Date.now() + 10800000).format("HH:mm:ss");
    let atılma = `\`${atılmagün} ${atılmaay
      .replace(/01/, "Ocak")
      .replace(/02/, "Şubat")
      .replace(/03/, "Mart")
      .replace(/04/, "Nisan")
      .replace(/05/, "Mayıs")
      .replace(/06/, "Haziran")
      .replace(/07/, "Temmuz")
      .replace(/08/, "Ağustos")
      .replace(/09/, "Eylül")
      .replace(/10/, "Ekim")
      .replace(/11/, "Kasım")
      .replace(/12/, "Aralık")} ${atılmasaat}\``;

    message.guild.members.cache.get(message.author.id).setNickname(asd);
    message.channel.send(
      new Discord.MessageEmbed()
        .setTitle(`${message.author.username}, hoşgeldin!`)
        .setColor(a.renk)
        .setDescription(`K.U modundan başarıyla çıktın.`)
        .addField("Giriş sebebin:", sebepp)
        .addField("K.U olma süren:", sp)
        .addField("Çıkış zamanın:", atılma)
    );
    data.delete(`afk.${message.author.id}.${message.guild.id}`);
    data.delete(`sebep.${message.author.id}.${message.guild.id}`);
    data.delete(`giriş.${message.author.id}.${message.guild.id}`);
    data.delete(`display.${message.author.id}.${message.guild.id}`);
  }
});

client.on("message", async msg => {
  const request = require("node-superfetch");
  const ms2 = require("parse-ms");
  let timeout = 600000;
  let dakdest = 1;
  let i = db.fetch(`üyelikk_${msg.author.id}`);
  if (db.has(`üyelikk_${msg.author.id}`) == true) {
    if (dakdest !== null && timeout - (Date.now() - dakdest) > 0) {
      let time = ms2(timeout - (Date.now() - dakdest));
    } else {
      if (msg.author.bot) return;
      if (msg.content.length > 64) {
        var embed = new Discord.MessageEmbed()
       
          .setDescription(
            `<a:sekilligalp:727045194033266730> Hizzaya Geçin! Bir Gold Üye Belirdi! <@${msg.author.id}>`
          )
          .setColor("GOLD");
        msg.channel.send(embed).then(message => {
          message.delete(4000);
        });
      }
    }
  } else if (i == undefined) {
  }
  if (!i) return;
});
/*
client.on("guildMemberAdd", async member => {
  let user = client.users.cache.get(member.id);
  let chan = client.channels.cache.get(
    db.fetch(`guvenlik3_${member.guild.id}`)
  );
  const Canvas = require("canvas");
  const canvas = Canvas.createCanvas(360, 100);
  const ctx = canvas.getContext("2d");
  let memberChannel = await db.fetch(`guvenlik3_${member.guild.id}`);
  const resim1 = await Canvas.loadImage(
    "https://cdn.discordapp.com/attachments/809498334946656276/852819789403127818/20210611_110038.jpg"
  );
  const resim2 = await Canvas.loadImage(
    "https://cdn.discordapp.com/attachments/809498334946656276/852819789735133225/20210611_105950.jpg"
  );
  const kurulus = new Date().getTime() - user.createdAt.getTime();
  const gün = moment.duration(kurulus).format("D");
  var kontrol;
  if (kurulus > 1296000000) kontrol = resim2;
  if (kurulus < 1296000000) kontrol = resim1;

  const background = await Canvas.loadImage(
    "https://cdn.discordapp.com/attachments/847461445854953532/852821306936262666/20210611_110655.jpg"
  );
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

   const avatar = await Canvas.loadImage(
      member.user.displayAvatarURL({
        format: 'jpg',
      })
    )
  ctx.drawImage(kontrol, 0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.lineWidth = 4;
  ctx.fill();
  ctx.lineWidth = 4;
  ctx.arc(180, 46, 36, 0, 2 * Math.PI);
  ctx.clip();
  ctx.drawImage(avatar, 143, 10, 73, 72);

  const attachment = new Discord.MessageAttachment(
    canvas.toBuffer(),
    "r8-güvenlik.png"
  );
  if (db.has(`karalist_${user.id}`)) {
    member.guild.channels.cache
      .get(memberChannel)
      .send("Yasaklı kullanıcı geldi. Lütfen DİKKATLİ olun");
    if (!member.guild.channels.cache.get(memberChannel)) return;
  } else if (db.has(member.author.id)) {
    return;
  } else if (!member.guild.channels.cache.get(memberChannel)) return;
  member.guild.channels.cache.get(memberChannel).send(attachment);
});
client.on("guildMemberAdd", async member => {
  let user = client.users.cache.get(member.id);
  let chan = client.channels.cache.get(
    db.fetch(`guvenlik3_${member.guild.id}`)
  );
  const Canvas = require("canvas");
  const canvas = Canvas.createCanvas(360, 100);
  const ctx = canvas.getContext("2d");
  let memberChannel = await db.fetch(`guvenlik3_${member.guild.id}`);
  const resim1 = await Canvas.loadImage(
    "https://cdn.discordapp.com/attachments/809498334946656276/852819789403127818/20210611_110038.jpg"
  );
  const resim2 = await Canvas.loadImage(
    "https://cdn.discordapp.com/attachments/809498334946656276/852819789735133225/20210611_105950.jpg"
  );
  const gold = await Canvas.loadImage(
    "https://www.osmaniyerehberim.com/wp-content/uploads/2018/11/506-gold-uyelik-arkadaslik-sitesi.png"
  );
  const kurulus = new Date().getTime() - user.createdAt.getTime();
  const gün = moment.duration(kurulus).format("D");
  var kontrol;
  if (kurulus > 1296000000) kontrol = resim2;
  if (kurulus < 1296000000) kontrol = resim1;

  const background = await Canvas.loadImage(
    "https://i.hizliresim.com/7Br6Av.jpg"
  );
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

   const avatar = await Canvas.loadImage(
      member.user.displayAvatarURL({
        format: 'jpg',
      })
    )
  ctx.drawImage(kontrol, 0, 0, canvas.width, canvas.height);

  ctx.beginPath();
  ctx.lineWidth = 4;
  ctx.fill();
  ctx.lineWidth = 4;
  ctx.arc(180, 46, 36, 0, 2 * Math.PI);
  ctx.clip();
  ctx.drawImage(avatar, 143, 10, 73, 72);

  const attachment = new Discord.MessageAttachment(
    canvas.toBuffer(),
    "r8güvenlik.png"
  );
  const embed = new Discord.MessageEmbed()
    .setColor(a.renk)

    .setDescription(
      `<a:sekilligalp:727045194033266730>> ${member.user.username} Adlı Gold üye Katıldı. <a:sekilligalp:727045194033266730>`
    );
  if (db.has(user.author.id)) {
    if (!member.guild.channels.cache.get(memberChannel)) return;
    member.guild.channels.cache.get(memberChannel).send(attachment);
    member.guild.channels.cache.get(memberChannel).send(embed);
  } else return;
});
*/

client.commands = new Discord.Collection();
 client.aliases = new Discord.Collection();
 fs.readdir("./komutlar/", (err, files) => {
    if (err) console.error(err);
    files.forEach(f => {
  fs.readdir(`./komutlar/${f}/`, (err, filess) => {
    if (err) console.error(err);
    
    filess.forEach(fs => {
      let props = require(`./komutlar/${f}/${fs}`);
      log(`${props.help.name}`);
      client.commands.set(props.help.name, props);
      props.conf.aliases.forEach(alias => {
        client.aliases.set(alias, props.help.name);
      });
     });
    });
   });
  });


client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};


client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};


client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.login(ayarlar.token);
