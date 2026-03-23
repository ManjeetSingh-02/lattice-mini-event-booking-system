// internal-imports
import { env } from '../config/env.js';
import { PrismaClient } from './generated/prisma/client.js';

// external-imports
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

// create and export prisma client instance
export const prisma = new PrismaClient({
  adapter: new PrismaMariaDb({
    host: env.DATABASE_HOST,
    user: env.DATABASE_USER,
    password: env.DATABASE_PASSWORD,
    database: env.DATABASE_NAME,
  }),
});
