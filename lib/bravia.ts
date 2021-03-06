import "dotenv/config";

import { Client, Commands } from "./client";
import { AxiosResponse } from "axios";

export class Bravia {
  client: Client;

  constructor(ipAddr: string, key: string) {
    this.client = new Client(ipAddr, key);
  }

  async request(command: string): Promise<boolean> {
    return this.client.request(command);
  }

  async fetchCommands(): Promise<Commands> {
    return this.client.fetchCommands(false);
  }
}
