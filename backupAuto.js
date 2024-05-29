const { exec } = require("child_process");
const fs = require("fs");
const util = require("util");
const execPromise = util.promisify(exec);

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function runBackup() {
  const now = new Date();
  const formattedDate = now.toISOString().slice(0, 16).replace("T", "T");
  console.log(`Actual datetime is ${formattedDate}`);

  try {
    fs.appendFileSync("lastUpdate.txt", `Last update ${formattedDate}\n`);
    await execPromise("git add .");
    await sleep(2 * 60 * 1000);
    await execPromise(`git commit -m 'Auto backup - ${formattedDate}'`);
    await sleep(60 * 1000);
    await execPromise("git push");
  } catch (error) {
    console.error("Error during backup:", error);
  }
}

async function main() {
  // Run backup once before setting the interval
  await runBackup();

  // Set interval to run backup every hour
  setInterval(async () => {
    await runBackup();
  }, 3600 * 1000);
}

main();
