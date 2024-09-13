import { createHmac } from "crypto";
import { v4 as uuidv4 } from "uuid";

export const randomTelegramData = () => {
  const user = {
    id: randomIntFromInterval(Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER),
    first_name: "Minh",
    last_name: "Hoang",
    username: "hoang_mint",
    language_code: "en",
    is_premium: false,
    allows_write_to_pm: true,
  };

  const data: Record<string, string> = {
    query_id: uuidv4(),
    user: JSON.stringify(user),
    auth_date: Date.now().toString(),
  };

  const hashString = generateHashString(data);
  const hash = generateHash(hashString);

  data.hash = hash;
  return [new URLSearchParams(Object.entries(data)).toString(), data];
};

export const generateHashString = (data: Record<string, string>) => {
  const values = Object.entries(data).map(([key, value]) => `${key}=${value}`);
  values.sort((a, b) => a.localeCompare(b));

  return values.join("\n");
};

export const generateHash = (data: string): string => {
  const botId = "<YOUR_BOT_ID_HERE>";
  const hasher1 = createHmac("sha256", "WebAppData");
  hasher1.update(botId);
  const secretKey = hasher1.digest("binary");

  const hasher2 = createHmac("sha256", secretKey);
  hasher2.update(data);
  return hasher2.digest("hex");
};

function randomIntFromInterval(min: number, max: number) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
