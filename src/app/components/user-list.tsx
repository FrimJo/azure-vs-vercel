import { db } from "@/server/db";
import { users } from "@/server/db/schema";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

export default async function UserList() {
  const dbUsers = await db.select().from(users).all();
  return (
    <>
      <span>Length: {dbUsers.length}</span>
      {dbUsers.map((user) => (
        <div key={user.id}>{user.firstName}</div>
      ))}
      <form
        action={async (formData) => {
          "use server";
          const firstName = formData.get("firstName");
          if (!firstName || typeof firstName !== "string") return;
          await db.insert(users).values({ firstName });
          revalidatePath("/");
        }}
      >
        <input name="firstName" type="text" />
        <button type="submit">add</button>
      </form>
    </>
  );
}
