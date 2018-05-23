import axios, { AxiosInstance } from "axios";

enum RequestPaths {
  System = "/system"
}

interface Commands {
  [index: string]: string;
}

export class Client {
  ipAddr: string;
  key: string;
  requestBaseURI: string;
  client: AxiosInstance;

  constructor(ipAddr: string, key: string) {
    this.ipAddr = ipAddr;
    this.key = key;
    this.requestBaseURI = `http://${this.ipAddr}/sony`;

    this.client = axios.create({
      baseURL: this.requestBaseURI,
      responseType: "json"
    });
  }

  async fetchCommands(): Promise<Commands> {
    const result = this.client.post(RequestPaths.System, {
      id: 20,
      method: "getRemoteControllerInfo",
      version: "1.0",
      params: []
    });

    const commands = await result.then((response: any): Commands => {
      return response.data.result[1];
    });

    return commands;
  }
}
