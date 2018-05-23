import { Client } from "./client";

export class Bravia {
  client: Client;

  constructor(ipAddr: string, key: string) {
    this.client = new Client(ipAddr, key);
  }
}
