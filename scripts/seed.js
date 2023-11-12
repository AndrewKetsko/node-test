const { db } = require("@vercel/postgres");
const { sql } = require("@vercel/postgres");
const { positions, users } = require("./data");

async function seedPositions(client) {
  try {
    await client.sql`
        create extension if not exists "uuid-ossp";
        `;

    const createTable = await client.sql`
        create table if not exists positions (
            _id uuid default uuid_generate_v4() primary key,
            id integer,
            name varchar(60) not null,
        );
        `;

    const insertedPositions = await Promise.all(
      positions.map(async (pos) => {
        return client.sql`
              insert into users (id, name)
              values (${pos.id},${pos.name})
              on conflict (id) do nothing;
              `;
      })
    );
    console.log("positions created & filled");
    return { createTable, positions: insertedPositions };
  } catch (error) {
    console.error("some error:", error);
    throw error;
  }
}

async function seedUsers(client) {
  try {
    await client.sql`
        create extension if not exists "uuid-ossp";
        `;

    const createTable = await client.sql`
        create table if not exists users (
            _id uuid default uuid_generate_v4() primary key,
            id integer,
            name varchar(60) not null,
            email varchar(60) not null unique,
            phone varchar(20) not null,
            position_id integer not null,
            photo varchar(255)
        );
        `;

    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        return client.sql`
              insert into users (id, name, email, phone, position_id, photo)
              values (${user.id},${user.name},${user.email},${user.phone},${user.position_id},${user.photo})
              on conflict (id) do nothing;
              `;
      })
    );
    console.log("users created & filled");
    return { createTable, users: insertedUsers };
  } catch (error) {
    console.error("some error:", error);
    throw error;
  }
}

async function seed() {
  const client = await db.connect();

  await seedPositions(client);
  await seedUsers(client);

  await client.end();
}

seed().catch((e) => {
  console.error("some error:", e);
});
