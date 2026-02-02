import "dotenv/config";
import { randomTelegramData, Mode } from "./telegram";

const main = () => {
  const mode = (process.env.MODE as Mode) || "test";
  console.log("Hello World");
  console.log(randomTelegramData(mode));
};

main();
