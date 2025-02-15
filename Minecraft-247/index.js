const keep_alive = require("./keep_alive.js"); // Keeps the bot running
const mineflayer = require("mineflayer");
const { pathfinder, Movements, goals } = require("mineflayer-pathfinder");

let botNumber = 1; // Counter for unique usernames

function createBot() {
  const bot = mineflayer.createBot({
    host: "WEARESOBACKKK.aternos.me",
    port: 57758,
    username: `Lbozo${botNumber}`, // New username each time
    version: false,
  });

  bot.loadPlugin(pathfinder);

  bot.once("spawn", () => {
    bot.chat("/register 1234567890 "); // First message
    setTimeout(() => bot.chat("hello"), 2000); // Second message after 2 sec
    startRandomMovement();
  });

  function startRandomMovement() {
    const mcData = require("minecraft-data")(bot.version);
    const movements = new Movements(bot, mcData);
    bot.pathfinder.setMovements(movements);

    setInterval(() => {
      if (!bot.entity) return;
      const x = bot.entity.position.x + (Math.random() * 20 - 10);
      const z = bot.entity.position.z + (Math.random() * 20 - 10);
      const y = bot.entity.position.y;
      bot.pathfinder.setGoal(new goals.GoalBlock(x, y, z));
    }, Math.random() * 5000 + 5000);
  }

  bot.on("death", () => {
    setTimeout(() => bot.emit("respawn"), 3000); // Respawn after 3 sec
  });

  bot.on("end", () => {
    botNumber++; // Increase username count
    createBot(); // Instantly reconnect with new name
  });
}

createBot();
