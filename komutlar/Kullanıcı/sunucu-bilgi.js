const { MessageEmbed } = require("discord.js");
const moment = require("moment");
moment.locale("tr");

exports.run = async (client, message, args) => {

  let kuruluş = `${moment(message.guild.createdAt).format("LL")} | ${moment(
    message.guild.createdAt
  ).fromNow()}`;
  let region = message.guild.region
    .replace("europe", "Avrupa")
    .replace("russia", "Rusya")
    .replace("japan", "Japonya")
    .replace("india", "Hindistan")
    .replace("hongkong", "Hong Kong")
    .replace("brazil", "Brezilya")
    .replace("sydney", "Sydney")
    .replace("southafrica", "Güney Afrika")
    .replace("singapore", "Singapur")
    .replace("us-south", "Güney Amerika")
    .replace("us-central", "Amerika")
    .replace("us-east", "Doğu Amerika")
    .replace("us-west", "Batı Amerika");

  let verification = message.guild.verificationLevel
    .replace("NONE", "Yok")
    .replace("LOW", "Düşük")
    .replace("MEDIUM", "Orta")
    .replace("VERY_HIGH", "Çok yüksek")
    .replace("HIGH", "Yüksek");

  let Features = {
    ANIMATED_ICON: "Animasyonlu ikon",
    BANNER: "Sunucu afişi",
    COMMERCE: "Ticaret özellikleri",
    COMMUNITY: "Topluluk",
    DISCOVERABLE: "Keşfedilebilir",
    FEATURABLE: "Özellikli",
    INVITE_SPLASH: "Davet arkaplanı",
    NEWS: "Duyuru kanalları",
    PARTNERED: "Partner sunucu",
    VANITY_URL: "Özel link",
    VERIFIED: "Doğrulanmış sunucu",
    WELCOME_SCREEN_ENABLED: "Hoş geldin ekranı",
    MEMBER_VERIFICATION_GATE_ENABLED: "Üye doğrulaması",
    VIP_REGIONS: "384kbps sesli kanal özelliği",
    PREVIEW_ENABLED: "Önizleme aktif"
  };

  const embed = new MessageEmbed()
    .setTitle(message.guild.name)
    .setThumbnail(message.guild.iconURL({ dynamic: true }))
    .setColor(`#0000c8`)
    .addField(
      `≽ Sunucu bilgisi`,
      `
ID **>** ${message.guild.id}
Sahip **>** ${client.users.cache.get(message.guild.owner.id).tag} **(**${
        message.guild.owner.id
      }**)**
Ses bölgesi **>** ${region}
Doğrulama seviyesi **>** ${verification}
Sunucu oloşturulma tarihi **>** ${kuruluş}
K.U Kanalı **>** ${message.guild.afkChannel || "Bulunmuyor"}
K.U Zaman Aşımı **>** ${message.guild.afkTimeout || "Bilinmeyen"} saniye

`
    )
    .addField(
      `≽ Sunucu istatistikleri`,
      `
Üyeler **>** ${message.guild.members.cache.size} üye **(**${
        message.guild.members.cache.filter(x => x.user.bot == true).size
      } bot**)**
Rol sayısı **>** ${message.guild.roles.cache.size}
Kanallar **>** ${
        message.guild.channels.cache.filter(x => x.type == "category").size
      } kategori, ${
        message.guild.channels.cache.filter(x => x.type == "text").size
      } yazı kanalı, ${
        message.guild.channels.cache.filter(x => x.type == "voice").size
      } ses kanalı
Takviye sayısı **>** ${message.guild.premiumSubscriptionCount}
Takviye seviyesi **>** ${message.guild.premiumTier}
`
    )
    .addField(
      `≽ Sunucu özellikleri (${message.guild.features.length})`,
      `${message.guild.features
        .map(a => Features[a] || a)
        .join(", ") || "Sunucu özelliği yok"}`
    )
  
  .addField(
      `≽ Kullanıcılar (${message.guild.members.cache.size})`,
      `emoji ${
        message.guild.members.cache.filter(m => m.user.presence.status === "online")
          .size
      } Çevrimiçi \n  ${
        message.guild.members.cache.filter(m => m.user.presence.status === "idle")
          .size
      } Boşta \n ${
        message.guild.members.cache.filter(
          m => m.user.presence.status === "streaming"
        ).size
      } Yayında \n ${
        message.guild.members.cache.filter(m => m.user.presence.status === "dnd").size
      } Rahatsız Etmeyin \n<:OFFLINE8:789739423851085894> ${
        message.guild.members.cache.filter(m => m.user.presence.status === "offline")
          .size
      } Çevrimdışı/Görünmez \n ${
        message.guild.members.cache.filter(m => m.user.bot).size
      } Bot`
    )
  
    .setFooter(message.author.tag, message.author.avatarURL({ dynamic: true }))
    .setTimestamp();

  message.channel.send(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [
    "sunucu-bilgi",
    "sunucubilgi",
    "server-info",
    "server",
    "serverinfo",
    "serverinformation",
    "server-information"
  ],
  permLevel: 0,
kategori: "genel"
};

exports.help = {
  name: "sunucu",
  description: "Bulunduğun sunucu hakkında bilgi verir.",
  usage: "sunucu"
};