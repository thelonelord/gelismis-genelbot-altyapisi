var kelimeler = [
  //aşağı
  "adana",
  "papağan",
  "kitap",
  "kanepe",
  "meyve",
  "inek",
  "tavuk",
  "sepet",
  "domates",
  "kayısı",
  "kutu",
  "kutupayısı",
  "battaniye",
  "sünger",
  "masa",
  "sandalye",
  "biber",
  "karpuz",
  "kayısı",
  "üzüm",
  "patlıcan",
  "roket",
  "füze",
  "kedi",
  "kuş",
  "köpek",
  "saksı",
  "kiraz",
  "muz",
  "sandalye",
  "masa",
  "vişne",
  "portakal",
  "pencere",
  "kapı",
  "dolap",
  "buzdolabı",
  "ayı",
  "papağan",
  "yorgan",
  "kanepe",
  "tepe",
  "dağ",
  "paraşüt",
  "yastık",
  "kitap",
  "kitaplık",
  "araba",
  "filamingo",
  "barut",
  "balık",
  "asker",
  "işçi",
  "kıyafet",
  "pantalon",
  "çiçek",
  "çilek",
  "kolonya",
  "perde",
  "duvar",
  "kiremit",
  "ağaçkakan",
  "zürafa",
  "suaygırısı",
  "patates",
  "halı",
  "kilim",
  "iplik",
  "uzay",
  "gezegen",
  "gezgin",
  "tembel",
  "kumanda",
  "kunduz",
  "rakun",
  "radyo",
  "motor",
  "gemi",
  "kağıt",
  "parşömen",
  "hortum",
  "meyvesuyu",
  "pamuk",
  "havuz",
  "defter",
  "silgi",
  "kalemtıraş",
  "semaver",
  "çaydanlık",
  "klavye",
  "fare",
  "mikrofon",
  "kamera",
  "çanak",
  "televizyon",
  "uydu",
  "güneş",
  "okyanus",
  "deniz",
  "gökyüzü"
];

const Discord = require("discord.js");
const database = require("quick.db");
const a = require("../../ayarlar.json");

exports.run = async (client, message, args) => {
  if (!args[0])
    return message.channel.send(
      new Discord.MessageEmbed()
        .setColor(a.renk)
        .setDescription(
          ":pencil: Yazan kazanır oynamak istediğin kişiyi etiketlemelisin."
        )
    );
  if (!message.mentions.members.first())
    return message.channel.send(
      new Discord.MessageEmbed()
        .setColor(a.renk)
        .setDescription(
          "� Yazan kazanır oynamak istediğiniz kişiyi etiketlemelisin.."
        )
    );
  const member = message.mentions.members.first();
  if (member.user.id === message.author.id)
    return message.channel.send(
      "Kendiniz dışında bir kişiyle oynayabilirsiniz."
    );

  message.channel
    .send(
    new Discord.MessageEmbed()
   .setColor(a.renk) 
   .setDescription(`:e_mail: ${member}, **Seni Yazan Kazanır oynamaya davet etti. Daveti kabul ediyor musun?**
   `))
    .then(async sent => {
      await sent.react("🟢");
      await sent.react("🔴");

      const filter = (reaction, user) => user.id === member.id;
      sent
        .awaitReactions(filter, { max: 1, time: 30000, errors: ["time"] })
        .then(collected => {
          collected = collected.first();
          if (collected._emoji.name === "🔴")
            return (
              message.channel.send(new Discord.MessageEmbed().setColor(a.renk).setDescription("⏱ Etiketlenen kişi yanıt vermediğinden davet iptal edildi.")
         )   );
          sent.delete();
          message.channel.send(new Discord.MessageEmbed().setColor(a.renk).setDescription("Hazırlanan kelime geliyor...")).then(sent2 => {
            setTimeout(() => {
              const kelime = random(kelimeler);
              const mf = response => {
                return response.content.toLowerCase() === kelime.toLowerCase();
              };

              message.channel.send(new Discord.MessageEmbed().setColor(a.renk).setDescription(`:pencil: ${kelime} yazın!`));
              message.channel
                .awaitMessages(mf, { max: 1, time: 30000, errors: ["time"] })
                .then(answer => {
                  sent2.delete();

                  return message.channel
                    .send(new Discord.MessageEmbed().setColor(a.renk).setDescription(`🏆 Tebrikler ${answer.first().author} kazandın!`))
                    .then(m => m.delete({ timeout: 15000 }));
                })
                .catch(() => message.channel.send("Kimse kazanamadı."));
            }, 3000);
          });
        })
        .catch(
          error => console.log(error) && message.channel.send("💤 Kimse cevap vermedi")
        );
    });

  function random(map) {
    if (!map) return;
    return map[Math.floor(Math.random() * map.length)];
  }
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["yazankazanır"],
  permLevel: 0
};

exports.help = {
  name: "yazan-kazanır"
};
