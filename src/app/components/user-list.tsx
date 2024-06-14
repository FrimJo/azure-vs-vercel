import { db } from "@/server/db";
import { users } from "@/server/db/schema";

export const dynamic = "force-dynamic";

export default async function UserList() {
  const dbUsers = await db.select().from(users).all();
  return (
    <>
      <span>Length: {dbUsers.length}</span>
      {dbUsers.map((user) => (
        <div key={user.id}>{user.firstName}</div>
      ))}
    </>
  );
}
