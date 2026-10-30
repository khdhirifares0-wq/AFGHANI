const express = require('express');
const cors = require('cors');
const { Client, GatewayIntentBits } = require('discord.js');

const app = express();

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}));

app.use(express.json());

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers
  ]
});

const TOKEN = "حط_التوكن_متاعك_هنا"; 
const SERVER_ID = "حط_الايدي_متاع_السيرفر_هنا";

client.on('ready', () => {
  console.log(`Bot logged in as ${client.user.tag}!`);
});

app.get('/api/server-info', (req, res) => {
  const guild = client.guilds.cache.get(SERVER_ID);
  
  if (!guild) {
    return res.status(404).json({ error: 'Server not found or bot not in server' });
  }

  res.json({
    name: guild.name,
    memberCount: guild.memberCount,
    icon: guild.iconURL()
  });
});

client.login(TOKEN);

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});}`));
