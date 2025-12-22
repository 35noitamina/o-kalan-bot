import { SlashCommandBuilder } from 'discord.js';
export const data = new SlashCommandBuilder()
  .setName('invite')
  .setDescription('招待リンクを作成します。'),
  execute: async function (interaction) {
      const invite = await interaction.channel.createInvite()
      interaction.reply(invite.url)
  }
