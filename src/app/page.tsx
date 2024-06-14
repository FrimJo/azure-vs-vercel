import { db } from "@/server/db";
import { users } from "@/server/db/schema";
import { Suspense } from "react";
import UserList from "./components/user-list";

export default async function Home() {
  const dbUsers = await db.select().from(users).all();
  return (
    <main>
      <h2>Users</h2>
      <Suspense fallback="Loading...">
        <UserList />
      </Suspense>
    </main>
  );
}
