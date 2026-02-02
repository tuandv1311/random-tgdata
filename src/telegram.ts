import { createHmac } from "crypto";

export type Mode = "test" | "prod";

const BOT_TOKEN = process.env.BOT_TOKEN || "BOT_TOKEN";

export const randomTelegramData = (mode: Mode = "test") => {
  if (mode === "prod") {
    return randomTelegramDataProd();
  }
  return randomTelegramDataTest();
};

const randomTelegramDataTest = () => {
  const user = {
    id: randomIntFromInterval(1000000000, 9999999999),
    first_name: "Tuan",
    last_name: "Nguye",
    username: "uyen_bn",
    language_code: "en",
    allows_write_to_pm: true,
    photourl:
      "https:\\/\\/t.me\\/i\\/userpic\\/320\\/SJt39NnWMPOm5F1tf676eR5Jp-cg3FypHhSQBZj04w.svg",
  };

  const data: Record<string, string> = {
    user: JSON.stringify(user),
    chat_instance: randomIntFromInterval(
      1000000000000000000,
      4000000000000000000
    ).toString(),
    chat_type: "private",
    auth_date: Math.floor(Date.now() / 1000).toString(),
    signature: generateRandomSignature(),
  };

  const hashString = generateHashString(data);
  console.log(hashString);
  const hash = generateHash(hashString);

  data.hash = hash;
  return [new URLSearchParams(Object.entries(data)).toString(), data];
};

const randomTelegramDataProd = () => {
  const user = {
    id: randomIntFromInterval(1000000000, 9999999999),
    first_name: "V",
    last_name: "",
    username: "bluechip1311",
    language_code: "en",
    allows_write_to_pm: true,
    photo_url:
      "https://t.me/i/userpic/320/OpE7fJhP-ueprobbAIyGRixtP5ED9_EETmNlkyFZ0lE.svg",
  };

  // Telegram uses \/ for forward slashes in JSON (PHP-style JSON encoding)
  const userJson = JSON.stringify(user).replace(/\//g, "\\/");

  const data: Record<string, string> = {
    query_id: generateRandomQueryId(),
    user: userJson,
    auth_date: Math.floor(Date.now() / 1000).toString(),
    signature: generateRandomSignature(),
  };

  const hashString = generateHashString(data);
  const hash = generateHash(hashString, BOT_TOKEN);

  data.hash = hash;
  return new URLSearchParams(Object.entries(data)).toString();
};

export const generateHashString = (data: Record<string, string>) => {
  const values = Object.entries(data).map(([key, value]) => `${key}=${value}`);
  values.sort((a, b) => a.localeCompare(b));

  return values.join("\n");
};

export const generateHash = (
  data: string,
  botToken: string = "BOT_TOKEN"
): string => {
  const secretKey = new Uint8Array(
    createHmac("sha256", "WebAppData").update(botToken).digest()
  );
  return createHmac("sha256", secretKey).update(data).digest("hex");
};

function randomIntFromInterval(min: number, max: number) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function generateRandomSignature(): string {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
  let result = "";
  for (let i = 0; i < 86; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

function generateRandomQueryId(): string {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
  let result = "";
  for (let i = 0; i < 24; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
