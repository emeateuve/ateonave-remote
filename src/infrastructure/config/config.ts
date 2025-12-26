import "dotenv/config";

export const config = {
  api: {
    port: process.env.PORT,
    token: process.env.API_TOKEN,
    launcher: process.env.LAUNCHER_API,
  },
  alexa: {
    port: process.env.PORT,
    token: process.env.ALEXA_TOKEN,
    launcher: process.env.LAUNCHER_ALEXA,
  },
  mac: process.env.MAC_ADDRESS,
  broadcast: process.env.BROADCAST_ADDRESS,
  ssh: {
    host: process.env.SSH_HOST,
    port: process.env.SSH_PORT,
    privateKey: process.env.SSH_PRIVATE_KEY_LOCATION,
    username: process.env.SSH_USERNAME,
  },
};
