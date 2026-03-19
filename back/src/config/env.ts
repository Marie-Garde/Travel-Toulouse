const env = {
  PORT: parseInt(process.env.PORT ?? '3000', 10),
  DATABASE_URL: process.env.DATABASE_URL ?? '',
  JWT_SECRET: process.env.JWT_SECRET ?? '',
  NODE_ENV: process.env.NODE_ENV ?? 'development',
} as const;

if (!env.DATABASE_URL) {
  console.error('DATABASE_URL is missing from environment variables');
  process.exit(1);
}

if (!env.JWT_SECRET) {
  console.error('JWT_SECRET is missing from environment variables');
  process.exit(1);
}

export default env;
