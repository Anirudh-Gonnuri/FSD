import UsersList from "../components/UsersList";

export default function UsersPage() {
  return (
    <div>
      <h2 className="text-3xl font-semibold text-indigo-400 mb-6">Registered Users</h2>
      <UsersList />
    </div>
  );
}
