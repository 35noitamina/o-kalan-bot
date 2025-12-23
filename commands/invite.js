import { SlashCommandBuilder } from 'discord.js';
export default {
  data: new SlashCommandBuilder()
    .setName('invite')
    .setDescription('招待リンクを作成します。'),
  async execute(interaction) {
    const invite = await interaction.channel.createInvite();
    await interaction.reply(invite.url);
  }
};
