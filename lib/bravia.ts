import { Client, Commands } from "./client";

export class Bravia {
  client: Client;

  constructor(ipAddr: string, key: string) {
    this.client = new Client(ipAddr, key);
  }

  async request(command: string) {
    return this.client.request(command);
  }

  async fetchCommands(): Promise<Commands> {
    return this.client.fetchCommands(false);
  }
}
