import axios, { AxiosInstance } from "axios";

enum RequestPaths {
  System = "/system",
  IRCC = "/IRCC"
}

interface Commands {
  [index: string]: string;
}

export const PayloadTemplate = (commandCode: string) => {
  return (
    '<?xml version="1.0"?>' +
    '<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/" s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">' +
    "<s:Body>" +
    '<u:X_SendIRCC xmlns:u="urn:schemas-sony-com:service:IRCC:1">' +
    "<IRCCCode>" +
    commandCode +
    "</IRCCCode>" +
    "</u:X_SendIRCC>" +
    "</s:Body>" +
    "</s:Envelope>"
  );
};

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

  async request(command: string) {
    const code = await this.getCommandCode(command);
    const payload = PayloadTemplate(code);

    await this.client
      .post(RequestPaths.IRCC, payload, {
        headers: {
          "Content-Type": "text/xml; charset=UTF-8",
          "X-Auth-PSK": this.key,
          SOAPACTION: '"urn:schemas-sony-com:service:IRCC:1#X_SendIRCC"'
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  }

  async hasCommand(command: string): Promise<boolean> {
    const r = await this.fetchCommands().then((response: Commands) => {
      return response[command] !== undefined;
    });

    return r;
  }

  async getCommandCode(command: string): Promise<string> {
    const code = await this.fetchCommands().then(
      (response: Commands): string => {
        if (this.hasCommand(command)) {
          return response[command];
        }
      }
    );

    if (!code) {
      throw new Error("command is not found");
    }

    return code;
  }

  async fetchCommands(lower = true): Promise<Commands> {
    const result = this.client.post(RequestPaths.System, {
      id: 20,
      method: "getRemoteControllerInfo",
      version: "1.0",
      params: []
    });

    const commands = await result.then((response: any): Commands => {
      const commandList: Commands = {};
      response.data.result[1].map((item: { name: string; value: string }) => {
        if (item === undefined) {
          return false;
        }

        let name = item.name;
        if (lower) {
          name = item.name.toLowerCase();
        }
        commandList[name] = item.value;
      });

      return commandList;
    });

    return commands;
  }
}
