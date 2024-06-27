import { db } from "@/server/db";
import { users, type User } from "@/server/db/schema";
import { revalidatePath } from "next/cache";

export default async function UserList() {
  const dbUsers = await new Promise<User[]>((resolve) =>
    setTimeout(() => db.select().from(users).all().then(resolve), 3000)
  );
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
