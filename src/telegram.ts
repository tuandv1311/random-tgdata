import { createHmac } from "crypto";

export const randomTelegramData = () => {
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

export const generateHashString = (data: Record<string, string>) => {
  const values = Object.entries(data).map(([key, value]) => `${key}=${value}`);
  values.sort((a, b) => a.localeCompare(b));

  return values.join("\n");
};

export const generateHash = (data: string): string => {
  const botId = "BOT_TOKEN";
  // const hasher1 = createHmac("sha256", "WebAppData");
  // hasher1.update(botId);
  // const secretKey = hasher1.digest();
  // console.log(secretKey);

  // const hasher2 = createHmac("sha256", secretKey);
  // hasher2.update(data);
  // return hasher2.digest("hex");
  const secretKey = createHmac("sha256", "WebAppData").update(botId).digest();
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
