
const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  if (message.content.startsWith("create")) {
    const url = message.content.split("create")[1].trim();

    message.reply({
      content: "Generating",
    });

    try {
      const response = await fetch(
        "https://urlshortner-5fj1.onrender.com/url/discord",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            url: url,
          }),
        }
      );

      
      if (!response.ok) {
        throw new Error("Network response was not ok: " + response.status);
      }

     
      const data = await response.json();

      return message.reply({
        content: "Generated Short Url is " + data.shortUrl,
      });
    } catch (error) {
      message.reply({
        content: error.message,
      });
    }
  }
 
  message.reply({
    content: `Hello ${message.author.username} i am bot`,
  });
});

client.on("interactionCreate", (interaction) => {
  interaction.reply("pong!!");
});

client.login(process.env.DISCORD_TOKEN);
