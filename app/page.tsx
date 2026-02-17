import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Link href="/dashboard">Dashboard</Link>
      <Link href="/login">Login</Link>
      <Link href="/register">Register</Link>
    </div>
  );
}
