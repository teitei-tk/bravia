#!/usr/bin/env node

function main(command) {
  const Bravia = require("./../build/lib").Bravia;
  const ipAddr = process.env.IP_ADDR;
  const key = process.env.PSK_KEY;

  const client = new Bravia(ipAddr, key);
  return client.request(command);
}

const program = require('commander');

let c = undefined;
program.arguments('<cmd>').action((cmd, env) => {
  c = cmd;
  main(c).then(() => { process.exit(0); }).catch((err) => {
    console.error(err);
    process.exit(1);
  });
});

program.parse(process.argv);
