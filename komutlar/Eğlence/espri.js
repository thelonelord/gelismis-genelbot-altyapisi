const Discord = require("discord.js");
const a = require("../../ayarlar.json");
const client = new Discord.Client();

exports.run = (client, message, args) => {
  //message.channel.send("Espri Yükleniyor..").then(message => {
    var espriler = [
      "Aaaaa siz çok terlemişsiniz durun size terlik getiriyim",
      "Masada hangi örtü kullanılmaz? - Bitki Örtüsü.",
      "Lütfen sessiz olun telefon faturasını yeni yatırdım uyuyor şimdi uyanmasın",
      "En güzel çay hangi dağda içilir? Çay bar-dağı’nda",
      "Geçen gün geçmiş günlerimi aradım ama meşguldü",
      "Geçen gün taksi çevirdim hala dönüyor",
      "Röntgen Filmi çektirdik, yakında sinemalarda.",
      "İnsanların seni ezmesine izin verme. Ehliyet al, sen onları ez...",
      "Hiç bozuk paran var mı?;YOK ÇÜNKÜ HEPSİNİ TAMİR ETTİRDİM.",
      "Örümcek adam ağ atamıyormuş neden?;ÇÜNKÜ AĞ BAĞLANTISI KOPMUŞ.",
      "Facebook hesabın var, niye durum güncellemiyorsun dedim. Abi durumum yok dedi, sarıldık ağlaştık.",
      "Baykuşlar vedalaşırken ne der?BAY BAY BAYKUŞ",
      "Şimdi ben Mevlüt adında bir çocuğu okula göndersem Mevlüt mü okutmuş olacağım.",
      "İngilizler kendi kıllarına ne der?MICHEAL",
      "Sen bana bir adım gel, ben sana bir değil, iki değil, üç değil, tam dört kavanoz bal 100 TL.",
      "Dedem eskiden sevgilisine kızınca güvercini duvara fırlatmış, tabi o zamanlar telefon yok.",
      "İçme aşk şarabından acıdır aman dikkat et kızım babası hocadır.",
      "Okul madem kapandın bir daha açılma çok günah valla.",
      "Babam takdir getir bilgisayarını yenileyeceğim dedi, bende getirdim. Geldi F5′e basıp gitti.",
      "Rock yapmayan kişiye ne denir? -Yaprock ",
      "Ben Yedigün içiyorum sen Onbeşgün iç. :D",
      "Sinemada on dakika ara dedi, aradım aradım açmadı.",
      "Yeni yapılmış resimlere ne denir? -Nevresim",
      "Tebrikler kazandınız, şimdi tencere oldunuz! ",
      "İshal olmuş böceğe ne denir? -Cırcır Böceği",
      "Keklik askere giderse nolur? -Erkeklik",
      "Bizim CD sürücümüz ehliyeti nerden almış acaba ?! ",
      "Yılanlardan korkma, yılmayanlardan kork.",
      "Kırmızı giyen erkeğe ne denir? -Albay  ",
      "Ben kahve içiyorum, Nurgül Yeşilçay.",
      "Bak şu karışıdaki uçak PİSTİ , ama bir türlü temizlemediler.",
      "Top ağlarda, ben ağlamaz mıyım ?",
      "Burger King, bende vezir"
    ];
    var espri = espriler[Math.floor(Math.random() * espriler.length)];
    message.channel.send(new Discord.MessageEmbed().setColor(a.renk).setDescription(`${espri}`));
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [
    "espri",
    "espriyap",
    "yapespri",
    "yapbiespri",
    "espiri",
    "espiriyap"
  ],
  kategori: "eğlence",
  permLevel: 0
};

exports.help = {
  name: "espri",
  description: "Espri Yapar",
  usage: "espri"
};
