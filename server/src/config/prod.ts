import env from "./config";

export const config = {
  PORT: env.PORT || 5000,
  MONGO_URI: env.MONGO_URI,
} as const;
