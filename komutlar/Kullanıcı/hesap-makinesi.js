const discord = require("discord.js");

const {
    MessageButton,
    MessageActionRow
} = require('discord-buttons');
const mathjs = require("mathjs")

exports.run = async (client, message, args) => {

    let res = ""
    let res2 = ""

    function Add(stringget) {
        if (res == "İşlem Giriniz") res = ""
        res += stringget
    }

    function Calc(deger) {
        try {
            return mathjs.evaluate(deger)
        } catch (e) {
            return "Hata!"
        }
    }

    function Get() {
        return res
    }

    function Del() {
        if (res == "İşlem Giriniz") {
            return res
        } else {
            res = res.substring(0, res.length - 1)
            return res
        }
    }

    function C() {
        res = "İşlem Giriniz"
        return res
    }
    const colorpalet = ["red", "grey", "grey", "red", "grey", "blurple", "blurple", "blurple", "grey", "blurple", "blurple", "blurple", "grey", "blurple", "blurple", "blurple", "grey", "grey", "blurple", "green"]
    const buttonlabels = ["C", "(", ")", "<=", "÷", "7", "8", "9", "X", "4", "5", "6", "-", "1", "2", "3", "+", ",", "0", "📏"]
    const buttonsarr = []
    const row2but = []
    const row3but = []
    const row4but = []
    const row5but = []
    let counter = 0
    let target = buttonsarr
    colorpalet.forEach(function (element, i) {
        if (counter == 4) {
            target = row2but
        } else if (counter == 8) {
            target = row3but
        } else if (counter == 12) {
            target = row4but
        } else if (counter == 16) {
            target = row5but
        }

        const but = new MessageButton()
            .setStyle(element)
            .setID(buttonlabels[i])
            .setLabel(buttonlabels[i])
        target.push(but)
        counter++
    });

    const row = new MessageActionRow()
        .addComponents(buttonsarr)

    const row2 = new MessageActionRow()
        .addComponents(row2but)

    const row3 = new MessageActionRow()
        .addComponents(row3but)

    const row4 = new MessageActionRow()
        .addComponent(row4but)

    const row5 = new MessageActionRow()
        .addComponents(row5but)


    message.channel.send("```İşlem Giriniz```", {
        components: [row, row2, row3, row4, row5]
    }).then(async function (mesaj) {
        mesaj.createButtonCollector(user => user.clicker.user.id == message.author.id).on('collect', async (button) => {
            res2 = res.replaceAll("÷", "/").replaceAll("X", "*").replaceAll(",", ".")
            const labels = ["C", "<=", "📏"]
            if (!labels.includes(button.id)) {
                Add(button.id)
                const getval = Get()
                mesaj.edit("```" + getval + "```")
                button.reply.defer()
            }


            if (button.id == "C") {
                mesaj.edit("```" + C() + "```")
                button.reply.defer()
            } else if (button.id == "<=") {
                mesaj.edit("```" + Del() + "```")
                button.reply.defer()
            } else if (button.id == "📏") {
                mesaj.edit("```" + Get() + "=" + Calc(res2) + "```")
                button.reply.defer()
            }
        })
    })



}


exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["hesapmakinesi"],
    permLevel: 0
};
exports.help = {
    name: "hesap-makinesi",
    description: "hesapla işte",
    usage: "hesapla"
};