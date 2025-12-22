const { SlashCommandBuilder } = await import("discord.js");
export default {
  data: new SlashCommandBuilder()
    .setName("aisatu")
    .setDescription("あいさつに反応してbotが返事します。"),
  execute: async function (interaction) {
    await interaction.reply("こんにちは～☆");
  },
};
