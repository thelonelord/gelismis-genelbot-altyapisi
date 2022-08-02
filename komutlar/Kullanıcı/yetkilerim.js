const Discord = require("discord.js");
const { stripIndents } = require("common-tags");
const ayarlar = require("../../ayarlar.json");

exports.run = async (client, msg, args) => {
  let yönetici;
  let dkaydı;
  let sunucuyuyönet;
  let rolleriyönet;
  let kanallarıyönet;
  let üyeleriat;
  let ban;
  let davet;
  let kadeğiştir;
  let kayönet;
  let emoji;
  let webhook;
  let kanallarıgör;
  let mesajgönder;
  let tts;
  let mesajyönet;
  let bağlantı;
  let dosya;
  let geçmiş;
  let everhere;
  let hariciemoji;
  let tepkiekle;
  //Ses İzinleri
  let bağlan;
  let konuş;
  let video;
  let sustur;
  let sağırlaştır;
  let taşı;
  let seskullan;
  let önceliklikonuşmacı;

  //yönetici
  if (msg.member.hasPermission("ADMINISTRATOR"))
    yönetici = `:white_check_mark:`;
  if (!msg.member.hasPermission("ADMINISTRATOR")) yönetici = `:x:`;

  //Denetim K.
  if (msg.member.hasPermission("VIEW_AUDIT_LOG")) dkaydı = `:white_check_mark:`;
  if (!msg.member.hasPermission("VIEW_AUDIT_LOG")) dkaydı = `:x:`;

  //Sunucu yönet
  if (msg.member.hasPermission("MANAGE_GUILD"))
    sunucuyuyönet = `:white_check_mark:`;
  if (!msg.member.hasPermission("MANAGE_GUILD")) sunucuyuyönet = `:x:`;

  //Rolleri Yönett :D
  if (msg.member.hasPermission("MANAGE_ROLES"))
    rolleriyönet = `:white_check_mark:`;
  if (!msg.member.hasPermission("MANAGE_ROLES")) rolleriyönet = `:x:`;

  //Kanalları Yönet :D:D:SA:DASD:asD:sa
  if (msg.member.hasPermission("MANAGE_CHANNELS"))
    kanallarıyönet = `:white_check_mark:`;
  if (!msg.member.hasPermission("MANAGE_CHANNELS")) kanallarıyönet = `:x:`;

  //üyeleri at qwewqeqwe
  if (msg.member.hasPermission("KICK_MEMBERS"))
    üyeleriat = `:white_check_mark:`;
  if (!msg.member.hasPermission("KICK_MEMBERS")) üyeleriat = `:x:`;

  //üyeleri engelle ASD:asD:AS:Das
  if (msg.member.hasPermission("BAN_MEMBERS")) ban = `:white_check_mark:`;
  if (!msg.member.hasPermission("BAN_MEMBERS")) ban = `:x:`;

  //davet o.
  if (msg.member.hasPermission("CREATE_INSTANT_INVITE"))
    davet = `:white_check_mark:`;
  if (!msg.member.hasPermission("CREATE_INSTANT_INVITE")) davet = `:x:`;

  //kullanıcı adı değiştir
  if (msg.member.hasPermission("CHANGE_NICKNAME"))
    kadeğiştir = `:white_check_mark:`;
  if (!msg.member.hasPermission("CHANGE_NICKNAME")) kadeğiştir = `:x:`;

  //ka yönet :)
  if (msg.member.hasPermission("MANAGE_NICKNAMES"))
    kayönet = `:white_check_mark:`;
  if (!msg.member.hasPermission("MANAGE_NICKNAMES")) kayönet = `:x:`;

  //emojileri yönet
  if (msg.member.hasPermission("MANAGE_EMOJIS")) emoji = `:white_check_mark:`;
  if (!msg.member.hasPermission("MANAGE_EMOJIS")) emoji = `:x:`;

  //webhookları yönet kankasss :SADaSD:AS:Das
  if (msg.member.hasPermission("MANAGE_WEBHOOKS"))
    webhook = `:white_check_mark:`;
  if (!msg.member.hasPermission("MANAGE_WEBHOOKS")) webhook = `:x:`;

  //met ses oku gör işte len :D
  if (msg.member.hasPermission("VIEW_CHANNEL"))
    kanallarıgör = `:white_check_mark:`;
  if (!msg.member.hasPermission("VIEW_CHANNEL")) kanallarıgör = `:x:`;

  //mesaj gönderme looo
  if (msg.member.hasPermission("SEND_MESSAGES"))
    mesajgönder = `:white_check_mark:`;
  if (!msg.member.hasPermission("SEND_MESSAGES")) mesajgönder = `:x:`;

  //TTS
  if (msg.member.hasPermission("SEND_TTS_MESSAGES")) tts = `:white_check_mark:`;
  if (!msg.member.hasPermission("SEND_TTS_MESSAGES")) tts = `:x:`;

  //mesajları yönetme looo :ASD:Asd:ASd
  if (msg.member.hasPermission("MANAGE_MESSAGES"))
    mesajyönet = `:white_check_mark:`;
  if (!msg.member.hasPermission("MANAGE_MESSAGES")) mesajyönet = `:x:`;

  //BAĞLANTI YERLEŞTİR :D
  if (msg.member.hasPermission("EMBED_LINKS")) bağlantı = `:white_check_mark:`;
  if (!msg.member.hasPermission("EMBED_LINKS")) bağlantı = `:x:`;

  //dosya ekle
  if (msg.member.hasPermission("ATTACH_FILES")) dosya = `:white_check_mark:`;
  if (!msg.member.hasPermission("ATTACH_FILES")) dosya = `:x:`;

  //GEÇMİŞİ GÖRÜMTÜLEEEEE :d
  if (msg.member.hasPermission("READ_MESSAGE_HISTORY"))
    geçmiş = `:white_check_mark:`;
  if (!msg.member.hasPermission("READ_MESSAGE_HISTORY")) geçmiş = `:x:`;

  //ever here felan filan
  if (msg.member.hasPermission("MENTION_EVERYONE"))
    everhere = `:white_check_mark:`;
  if (!msg.member.hasPermission("MENTION_EVERYONE")) everhere = `:x:`;

  //harici emojiiiiii
  if (msg.member.hasPermission("USE_EXTERNAL_EMOJIS"))
    hariciemoji = `:white_check_mark:`;
  if (!msg.member.hasPermission("USE_EXTERNAL_EMOJIS")) hariciemoji = `:x:`;

  //tepki ekle
  if (msg.member.hasPermission("ADD_REACTIONS"))
    tepkiekle = `:white_check_mark:`;
  if (!msg.member.hasPermission("ADD_REACTIONS")) tepkiekle = `:x:`;

  ///SES İZİNLERİ\\\

  //bağlan
  if (msg.member.hasPermission("CONNECT")) bağlan = `:white_check_mark:`;
  if (!msg.member.hasPermission("CONNECT")) bağlan = `:x:`;

  //konuş
  if (msg.member.hasPermission("SPEAK")) konuş = `:white_check_mark:`;
  if (!msg.member.hasPermission("SPEAK")) konuş = `:x:`;

  //yayın
  if (msg.member.hasPermission("STREAM")) video = `:white_check_mark:`;
  if (!msg.member.hasPermission("STREAM")) video = `:x:`;

  //sustur
  if (msg.member.hasPermission("MUTE_MEMBERS")) sustur = `:white_check_mark:`;
  if (!msg.member.hasPermission("MUTE_MEMBERS")) sustur = `:x:>`;

  //sağırlaştır
  if (msg.member.hasPermission("DEAFEN_MEMBERS"))
    sağırlaştır = `:white_check_mark:`;
  if (!msg.member.hasPermission("DEAFEN_MEMBERS")) sağırlaştır = `:x:`;

  //taşı
  if (msg.member.hasPermission("MOVE_MEMBERS")) taşı = `:white_check_mark:`;
  if (!msg.member.hasPermission("MOVE_MEMBERS")) taşı = `:x:`;

  //ses kullanmama ömasdmas şdkasşd kşasd
  if (msg.member.hasPermission("USE_VAD")) seskullan = `:white_check_mark:`;
  if (!msg.member.hasPermission("USE_VAD")) seskullan = `:x:`;

  //öncesi sonrası yok karşiiiim
  if (msg.member.hasPermission("PRIORITY_SPEAKER"))
    önceliklikonuşmacı = `:white_check_mark:`;
  if (!msg.member.hasPermission("PRIORITY_SPEAKER")) önceliklikonuşmacı = `:x:`;
  const embed = new Discord.MessageEmbed()
    /*.setTitle('JBot ┃ Yetkilerim')
  .setColor('GREEN')
  .setThumbnail(msg.author.avatarURL({ dynamic: true, format: 'png', size: 1024}))
  */
    // .setFooter(msg.author.username, msg.author.avatarURL({ dynamic: true, format: 'png', size: 1024}))
    .setDescription(
      `**__GENEL İZİNLER__**\n\n${yönetici} **┃ Yönetici\n${dkaydı} ┃ Denetim Kaydını Görüntüle\n${sunucuyuyönet} ┃ Sunucuyu Yönet\n${rolleriyönet} ┃ Rolleri Yönet\n${kanallarıyönet} ┃ Kanalları Yönet\n${üyeleriat} ┃ Üyeleri At\n${ban} ┃ Üyeleri Engelle\n${davet} ┃ Davet Oluştur\n${kadeğiştir} ┃ Kullanıcı Adı Değiştir\n${kayönet} ┃ Kullanıcı Adlarını Yönet\n${emoji} ┃ Emojileri Yönet\n${webhook} ┃ Webhook'ları Yönet\n${kanallarıgör} ┃ Metin Kanallarını Oku ve Ses Kanallarını Gör**\n\n**__YAZI İZİNLERİ__**\n\n**${mesajgönder} ┃ Mesaj Gönder\n${tts} ┃ Metin Okuma Mesajı Gönder\n${mesajyönet} ┃ Mesajları Yönet\n${bağlantı} ┃ Bağlantı Yerleştir\n${dosya} ┃ Dosya Ekle\n${geçmiş} ┃ Mesaj Geçmişini Oku\n${everhere} ┃ @everyone, @here kullan ve Tüm Rollerden bahset\n${hariciemoji} ┃ Harici Emojiler Kullan\n${tepkiekle} ┃ Tepki Ekle**\n\n**__SESLİ KONUŞMA İZİNLERİ__**\n\n**${bağlan} ┃ Bağlan\n${konuş} ┃ Konuş\n${video} ┃ Video\n${sustur} ┃ Üyeleri Sustur\n${sağırlaştır} ┃ Üyeleri Sağırlaştır\n${taşı} ┃ Üyeleri Taşı\n${seskullan} ┃ Ses Eylemini Kullan\n${önceliklikonuşmacı} ┃ Öncelikli Konuşmacı**`
    );
  msg.channel.send(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["izinlerim"],
  permLevel: 0
};

exports.help = {
  name: "yetkilerim"
};
