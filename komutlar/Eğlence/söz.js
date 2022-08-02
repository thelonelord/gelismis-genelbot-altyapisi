const Discord = require("discord.js");
const a = require("../../ayarlar.json");
let sozler = [
  "İnsan sevgiye hükmeder; ama aşk insana hükmeder. - **İskender Pala**",
  "Birine çamur atmadan önce düşün ve sakın unutma; ilk önce senin ellerin kirlenecek. - Lev Nikolayeviç Tolstoy Güzel Cümleler",
  "Yalnızlık paylaşılmaz, paylaşılsa yalnızlık olmaz. - Özdemir Asaf Güzel Cümleler",
  "Rüzgar yelkensiz de olsa gene rüzgardır. Ama rüzgarsız yelken bir bezdir. - Özdemir Asaf Güzel Cümleler",
  "Baktın hayatın tadını çıkaramıyorsun; tadını kaçıranı, hayatından çıkar. - Bob Marley Güzel Cümleler",
  "Gitsem kalmalar saldırıyor, kalsam gitmeler çağırıyor! - **Kahraman Tazeoğlu**",
  "Eğer o muhteşemse, kolay olmayacak. Kolaysa, muhteşem olmayacak. Eğer ona değerse, vazgeçmezsin. Vazgeçersen, sen değmezsin. - Bob Marley Güzel Cümleler",
  "En büyük acı, başkaları ile paylaşmaya cesaret edemediğin acıdır. - Charles Bukowski Güzel Cümleler",
  "Bir insana sırrınızı verdiğinizde, özgürlüğünüzü de verirsiniz... - Elif Şafak Güzel Cümleler",
  "Gerçek bilgi, seciyenin ve medeniyetin temelidir. - Victor Hugo Güzel Cümleler",
  "Korkumuz yok! İnmedi bir gün bile gözlerimize, bir kış akşamı gibi karanlığı korkunun. - Nazım Hikmet Ran Güzel Cümleler",
  "Evet, ben bir hayalperestim. Bir hayalperest yolunu yalnız ay ışığında bulabildiğinden, cezası, şafağı dünyanın geri kalanından daha önce görmesidir. - Oscar Wilde Güzel Cümleler",
  "Kölelik kaldırılmadı, sadece bütün renkleri kapsayacak biçimde genişletildi. - Charles Bukowski Güzel Cümleler",
  "Sevgi ve merhamet, insanlık; hiddet ve şehvet, hayvanlıktır. - Hz. Mevlana Güzel Cümleler",
  "Mutluluğum belki de şundan ileri geliyor: Bende olanlara seviniyor, olmayanların üzerine de düşmüyorum. - **Lev Nikolayeviç Tolstoy**"
];
const cd = new Set();
exports.run = function(client, message, args) {
  if (cd.has(message.author.id)) {
    return message.channel.send(
      new Discord.MessageEmbed()

        .setDescription(
          `Söz komutunu tekrar kullanabilmek için 2 saniye beklemelisin.`
        )
        .setColor(a.renk)
    );
  } else {
    cd.add(message.author.id);
    setTimeout(() => {
      message.delete();

      cd.delete(message.author.id);
    }, 2000);
  }

  message.channel.send(
    new Discord.MessageEmbed()
      .setColor(a.renk)
      //   .setTitle("Güzel Bir Söz!")
      .setDescription(sozler[Math.floor(Math.random() * sozler.length)])
  );
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["söz2"],
  permLevel: 0
};
exports.help = {
  name: "söz",
  description: "Guzel Söz Paylaşır!",
  usage: "güzelsözler"
};
