# lattice-mini-event-booking-system
Event booking system for lattice nodejs dev

## Files Location
1. **schema.prisma**: `prisma/schema.prisma`

2. **migration.sql**: `prisma/migrations/20260323140009_init/migration.sql`

3. **postman_collection.json**: `postman_collection.json`

4. **swagger.yaml**: `swagger.yaml`

## Setup

0. Requirements
- Node.js (version 18 or above)
- MySQL database
- pnpm package manager
- Already created user inside user table, if not:
```sql
INSERT INTO user (name, email) VALUES ('John Doe', 'johndoe@gmail.com')
```
or
```typescript
// import prisma client instance
await prisma.user.create({
  data: {
    name: 'John Doe',
    email: 'johndoe@gmail.com',
  },
});
```

1. Clone the repository
```bash
git clone https://github.com/ManjeetSingh-02/lattice-mini-event-booking-system
```

2. Navigate to the project directory
```bash
cd lattice-mini-event-booking-system
```

3. Install dependencies
```bash
pnpm install
```

4. Create a `.env` file in root
- Add the following env variables and make sure to replace all the placeholders in `.env` file with actual values
```env
ORIGIN_URL=http://localhost:5173
PORT=3000
DATABASE_URL=mysql://username:password@host:port/db_name
DATABASE_USER=username
DATABASE_PASSWORD=password
DATABASE_HOST=host
DATABASE_PORT=port
DATABASE_NAME=db_name
NODE_ENV=development
COOKIE_SECRET=minimum_of_32_char_cookie_secret
```

5. Run the database migrations

- For development mode
```bash
pnpm prisma migrate dev --name init
```
- For production mode
```bash
pnpm prisma migrate deploy
```

6. Generate Prisma client
```bash
pnpm prisma generate
```

7. Run the application

- For running the application in development mode
```bash
pnpm dev
```
- For building the application in production mode
```bash
pnpm build
```
- For running the application in production mode
```bash
pnpm start
```