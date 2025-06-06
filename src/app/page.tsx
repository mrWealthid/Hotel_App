"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  // const router = useRouter();

  // router.push('/dashboard');
  return (
    <section className="min-h-screen">
      <header className="flex  justify-between">
        <h2 className="text-2xl">Dashboard</h2>
      </header>
    </section>
  );
}
