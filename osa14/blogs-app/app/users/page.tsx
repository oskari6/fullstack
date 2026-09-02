import Link from "next/link";
import { getUsers } from "../services/users";

const Users = async () => {
  const users = await getUsers();

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id} style={{ gap: 5, display: "flex" }}>
            <Link href={`/users/${user.username}`}>
              <span>{user.name}</span> | <span>{user.username}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Users;
