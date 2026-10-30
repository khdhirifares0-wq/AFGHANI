const express = require('express');
const cors = require('cors');
const { Client, GatewayIntentBits } = require('discord.js');

const app = express();
app.use(cors());
app.use(express.json());

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers]
});

const TOKEN = "MTQ3MzA4NjMzNTUzODY5MjI4OQ.GTFBC4.RW0LFyydjoNee1tzDEM0siAhdMKVhAWyqRvP08"; 
const SERVER_ID = "821153079079469076";

client.on('ready', () => {
  console.log(`Bot ready: ${client.user.tag}`);
});

app.get('/api/server-info', (req, res) => {
  const guild = client.guilds.cache.get(SERVER_ID);
  if (!guild) return res.status(404).json({ error: 'Server not found' });
  res.json({ name: guild.name, memberCount: guild.memberCount });
});

client.login(TOKEN);

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
