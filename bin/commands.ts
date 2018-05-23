import { Bravia } from "./../lib";

const ipAddr = process.env.IP_ADDR;
const key = process.env.PSK_KEY;

const bravia = new Bravia(ipAddr, key);

bravia.client.fetchCommands().then((res: any) => {
  console.log(res);
});
