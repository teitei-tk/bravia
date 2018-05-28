#!/usr/bin/env node

function main() {
  const Bravia = require("./../build/lib").Bravia;
  const ipAddr = process.env.IP_ADDR;
  const key = process.env.PSK_KEY;

  const client = new Bravia(ipAddr, key);
  client.fetchCommands().then((commands) => {
    Object.keys(commands).forEach((key) => {
      console.log(key);
    });
  });
}

main();
