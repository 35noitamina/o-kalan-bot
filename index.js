import fs from "fs";
import path from "path";
import { Client, GatewayIntentBits, Events } from "discord.js";
import express from "express";
import aisatu from "./commands/aisatu.js";
import invite from "./commands/invite.js";
import UpdateCommands from "./update-commands.js";
UpdateCommands();
var client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent,],
});
client.login(process.env.TOKEN);

client.on("clientReady", () => {
  console.log(`サーバーが起動しました!!`);
  console.log(`招待URL:https://discord.com/api/oauth2/authorize?client_id=${process.env.ApplicationID}&permissions=8&scope=applications.commands+bot`)
});
var app = express();
app.get("/", (req, res) => {
  res.send(`ok`);
});
var port = 3000;
app.listen(port, () => {
  console.log(`Good morning!!`);
});
client.on(Events.MessageCreate, async message => {
    if (message.author.bot) return;//react
    if (["ぬるぽ", "ヌルポ", "ﾇﾙﾎﾟ"].includes(message.content)) {
        await message.reply('ｶﾞｯ');
    }//react
    if (keywords.some(["ない"] => message.content.includes(key))) return;
    if (keywords.some(["ktkr","できた","出来た","でけた","やったー"] => message.content.includes(key))){
        await message.react('👏');
    }

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return
    if (interaction.commandName == aisatu.data.name) {
        try {
            await aisatu.execute(interaction);
        } catch (error) {
            console.error(error);
            await interaction.reply({content: 'コマンド実行時にエラーになりました。',ephemeral:true});
        }
    }else if (interaction.commandName == invite.data.name) {
        try {
            await invite.execute(interaction);
        } catch (error) {
            console.error(error);
            await interaction.reply({content: 'コマンド実行時にエラーになりました。',ephemeral:true});
        }
    }else {
        await interaction.reply(`不明なコマンドが実行されました。`)
    }
});
