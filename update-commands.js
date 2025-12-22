import { REST, Routes } from "discord.js";
import fs from "fs";
import path from "path";
import "dotenv/config";
const commands = [];
const foldersPath = path.join(process.cwd(), "commands");
const commandFiles = fs
  .readdirSync(foldersPath)
  .filter((file) => file.endsWith(".js") || file.endsWith(".mjs"));
export default async () => {
  for (const file of commandFiles) {
    const filePath = path.join(foldersPath, file);
    const module = await import(`file://${filePath}`);
    const command = module.default || module;
    if (command.data) {
      commands.push(command.data.toJSON());
    }
  }
  const rest = new REST().setToken(process.env.TOKEN);
  try {
    console.log(
      `[INIT] ${commands.length}つのスラッシュコマンドを更新します。`,
    );
    await rest.put(Routes.applicationCommands(process.env.ApplicationID), {
      body: commands,
    });
    console.log(
      `[INIT] ${commands.length}つのスラッシュコマンドを更新しました。`,
    );
  } catch (error) {
    console.error(error);
  }
};
