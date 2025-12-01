import dotenv from "dotenv";
dotenv.config();

const required = (name: string): string => {
  const value = process.env[name];
  if (!value) throw new Error(`Missing environment variable: ${name}`);
  return value;
};

export const config = {
  mac: required("MAC_ADDRESS"),
  token: required("ACCESS_TOKEN"),
  port: Number(required("PORT")),
};
