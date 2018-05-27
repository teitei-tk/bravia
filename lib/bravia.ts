import { Client } from "./client";

export class Bravia {
  client: Client;

  constructor(ipAddr: string, key: string) {
    this.client = new Client(ipAddr, key);
  }

  request(command: string) {
    this.client.request(command);
  }

  fetchCommands() {
    this.client.fetchCommands().then(r => {
      console.log(r);
    });
  }
}
