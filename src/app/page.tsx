import { Suspense } from "react";
import UserList from "./components/user-list";

export default function Home() {
  return (
    <main>
      <h2>Users</h2>
      <Suspense fallback="Loading...">
        <UserList />
      </Suspense>
    </main>
  );
}
