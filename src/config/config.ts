const dbUri = process.env.DATABASE_URL;
const jwtSecretKey = process.env.JWT_SECRET_KEY 

if (!dbUri) {
  throw new Error("DATABASE_URL is not defined in the environment variables");
}

if (!jwtSecretKey) {
  throw new Error("JWT_SECRET_KEY is not defined in the environment variables");
}

export const config = {
  databaseUrl: dbUri,
  jwtSecretKey
} as const;
