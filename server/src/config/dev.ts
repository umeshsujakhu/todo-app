import env from "./config";

export const config = {
  PORT: env.PORT || 3000,
  MONGO_URI: env.MONGO_URI,
} as const;
