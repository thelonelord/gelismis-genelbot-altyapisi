const discord = require("discord.js");
const { MessageButton } = require('discord-buttons');
const a = ("../../ayarlar.json")
const db = require("quick.db")

exports.run = (client, message, args) => {
    
    db.delete(`cevapladimi_${message.author.id}`)

    let sorular = [{
            soru: "Yeniliklerin sürekliliğini zorunlu gören Atatürk İlkesi, aşağıdakilerden hangisidir?",
            siklar: ["milliyetçilik", "cumhuriyetçilik", "laiklik", "halkçılık", "inkılapçılık"],
            dogrucevap: 'D',
        },
        {
            soru: "Millî Mücâdele’nin kazanılmasında, aşağıdaki Atatürk ilkelerinden hangisi daha etkili olmuştur?",
            siklar: ["cumhuriyetçilik", "milliyetçilik", "akılcılık", "devletçilik", "halkçılık"],
            dogrucevap: 'B',
        },
        {
            soru: "Fatih Sultan Mehmed'in Hocası Kimdir?",
            siklar: ["akşemsettin", "mevlana", "şeyh edebali", "tursun bey"],
            dogrucevap: 'A',
        },
        {
            soru: "Aşağıdakilerden hangisi, 27 Mayıs 1960 Askerî Darbesi sonrasında kurulan, Genel Başkanlığını Ragıp Gümüşpala'nın üstlendiği ve Demokrat Partinin devamı niteliğinde olan siyasi partidir? (2018 KPSS SORUSU)",
            siklar: ["milli kalkınma partisi", "adalet partisi", "millet partisi", "hürriyet partisi", "ahali cumhuriyet partisi"],
            dogrucevap: 'B',
        },
        {
            soru: "“ Olmak ya da olmamak, işte bütün mesele bu.” sözüyle tanınan, Hamlet oyununun yazarı İngiliz edebiyatçı aşağıdakilerden hangisidir? (2018 KPSS SORUSU)",
            siklar: ["george eliot", "thomas more", "william shakespeare", "charles dickens", "daniel defoe"],
            dogrucevap: 'C',
        },
    ]; //bu array içindeki soruları kendiniz arttırabilirsiniz yukarıdaki örneklere bakarak yapabileceğinizi düşünüyorum
    var butonlararr = []
    var engcharlar = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'I', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
    let sorurandom = sorular[Math.floor(Math.random() * sorular.length)];
    for (var i = 0; i < sorurandom.siklar.length; i++) {
        var eklenecek = engcharlar[i].toLocaleUpperCase() + " - "
        sorurandom.siklar[i] = eklenecek + sorurandom.siklar[i];
    }
    for (var i = 0; i < sorurandom.siklar.length; i++) {
        var karakterlerdençek = engcharlar[i].toLocaleUpperCase()
        butonlararr.push(new MessageButton().setStyle('green').setLabel(karakterlerdençek).setID(karakterlerdençek))
    }
    const Embed = new discord.MessageEmbed()
        .setTitle(sorurandom.soru)
    .setColor(a.renk)
        .setDescription(
            sorurandom.siklar.join("\n\n")
        )
      
        .setFooter(`Bu Soruya Cevap Vermek İçin 40 Saniyen Var!`
        );
    message.channel.send(Embed, {
        buttons: butonlararr
    }).then(async function (sorucollector) {
        sorucollector.createButtonCollector(user => user.clicker.user.id == message.author.id).on('collect', async (button) => {
            if (button.id.toLowerCase() == sorurandom.dogrucevap.toLowerCase()) {
                const doğru = new discord.MessageEmbed()
                    .setAuthor("✅ Doğru Cevap!")
                    .setDescription("**Doğru Bildiniz!**")
                   .setColor(a.renk)
                message.channel.send(doğru)
                button.reply.defer()
                db.set(`cevapladimi_${message.author.id}`, "evet")
                return sorucollector.delete().catch(() => console.log("mesaj bulunamadı ama handlelandı"))

            } else {
                const yanlış = new discord.MessageEmbed()
                    .setAuthor("❌ Yanlış Cevap!")
                    .setDescription(`**Yanlış Cevap. Doğru Cevap ${sorurandom.dogrucevap.toUpperCase()} Olmalıydı!**`)
                    .setColor("RED")
                message.channel.send(yanlış)
                button.reply.defer()
                db.set(`cevapladimi_${message.author.id}`, "evet")
                return sorucollector.delete().catch(() => console.log("mesaj bulunamadı ama handlelandı"))
            }
        })
        setTimeout(() => {
            if(db.has(`cevapladimi_${message.author.id}`)) return
            sorucollector.delete().catch(() => console.log("mesaj bulunamadı ama handlelandı"))
            const mesajyok = new discord.MessageEmbed()
            .setAuthor("❌ Soru İptal Edildi!")
            .setDescription("**Soruyu Çözmek İçin Verilen 40 Saniye Doldu!**")
            .setColor(a.renk)
             message.channel.send(mesajyok).then(msg => {
                 setTimeout(() => {
                     msg.delete().catch(() => console.log("Bilgi Yarışması - msj bulunamadı."))
                 }, 5000);
             })
        }, 40000);
    })



}; 

exports.conf = {
    enabled: true,
    guildOnly: false,
  aliases: ["bilgiyarışması"],
    permLevel: 4
}

exports.help = {
    name: 'bilgi-yarışması',
    description: '.',
    usage: '.'
}