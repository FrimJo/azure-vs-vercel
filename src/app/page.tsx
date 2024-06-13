import { db } from "@/server/db";
import { users } from "@/server/db/schema";

export default async function Home() {
  const dbUsers = await db.select().from(users).all();
  return (
    <main>
      <h1>Users</h1>
      <span>Length: {dbUsers.length}</span>
      {dbUsers.map((user) => (
        <div key={user.id}>{user.firstName}</div>
      ))}
    </main>
  );
}
