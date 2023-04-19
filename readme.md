# MChat

MChat is a lightweight chat app built entirely in TypeScript, including a typed database (thanks to Drizzle ORM). The frontend utilizes the React framework, while the backend employs Express. Websockets are implemented using socket.io.

## Frontend

The frontend was created using Vite and the React framework, with TypeScript providing added type safety. Styling was accomplished with Tailwind CSS. Upon loading, the frontend connects to the backend via an endpoint to retrieve messages from the database.

## Backend

The backend leverages TypeScript and the Express framework. Day.js is used to synchronize the server data with the Brazil Timezone.

One standout package is [Drizzle ORM](https://github.com/drizzle-team/drizzle-orm), which ensures type safety even for the database.

### Database

The database is hosted on PlanetScale. As mentioned earlier, Drizzle ORM plays a crucial role in simplifying table declarations and extracting types from them. For example:

```typescript
import { InferModel } from "drizzle-orm";
import {
  mysqlTable,
  serial,
  text,
  varchar,
  timestamp,
} from "drizzle-orm/mysql-core";

export const messages = mysqlTable("messages", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 256 }),
  message: text("message"),
  timestamp: timestamp("timestamp"),
});

export type NewMessage = InferModel<typeof messages, "insert">;
```

Drizzle ORM makes querying the database feel natural, staying true to its philosophy: "If you know SQL, you know Drizzle ORM."

```typescript
const getAll = async () => {
  const connection = await db;
  const result = await connection.select().from(messages);

  return result;
};
```

### Dockerfile

The backend is hosted on Google Cloud Run, which can retain state for 5 minutes (to maintain the user group list).

```dockerfile
FROM node:lts
WORKDIR /usr/src/app
RUN npm install -g pnpm
COPY package*.json ./
COPY pnpm-lock.yaml ./
RUN pnpm install
COPY src ./src
COPY tsconfig.json ./
COPY .env ./
RUN pnpm run build
RUN pnpm install --prod
EXPOSE 3000
CMD [ "node", "dist/server.js" ]
```
