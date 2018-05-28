#!/usr/bin/env node

function main(command) {
  const Bravia = require("./../build/lib").Bravia;
  const ipAddr = process.env.IP_ADDR;
  const key = process.env.PSK_KEY;

  const client = new Bravia(ipAddr, key);
  return client.request(command);
}

const program = require('commander');

program.description('request available command. use bin/command').arguments('<cmd>').action((cmd, env) => {
  main(cmd).then(() => { process.exit(0); }).catch((err) => {
    console.error(err);
    process.exit(1);
  });
});

program.parse(process.argv);
