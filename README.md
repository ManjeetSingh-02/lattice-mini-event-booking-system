# lattice-mini-event-booking-system

Event booking system for lattice nodejs dev

## Setup

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

4. Create a `.env` file in root and add the following env variables
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

5.1 For development mode
```bash
pnpm prisma migrate dev --name init
```
5.2 For production mode
```bash
pnpm prisma migrate deploy
```

6. Generate Prisma client
```bash
pnpm prisma generate
```

7. Run the application

7.1 For running the application in development mode
```bash
pnpm dev
```
7.2 For building the application in production mode
```bash
pnpm build
```
7.3 For running the application in production mode
```bash
pnpm start
```