import env from "./config";

export const config = {
  PORT: env.PORT || 5000,
  MONGO_URI: env.MONGO_URI,
  JWT_SECRET: env.JWT_SECRET,
  JWT_EXPIRES_IN: env.JWT_EXPIRES_IN || '30d',
} as const;
