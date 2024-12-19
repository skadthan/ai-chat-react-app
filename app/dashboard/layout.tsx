'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { Button } from "@/components/ui/button";
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'unauthenticated') {
    router.push('/login');
    return null;
  }

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push('/login');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md">
        <nav className="mt-5">
          <Link href="/dashboard">
            <Button variant="ghost" className="w-full justify-start">Chat</Button>
          </Link>
          <Link href="/dashboard/profile">
            <Button variant="ghost" className="w-full justify-start">User Profile</Button>
          </Link>
          {session?.user?.role === 'admin' && (
            <Link href="/dashboard/admin">
              <Button variant="ghost" className="w-full justify-start">Admin Configuration</Button>
            </Link>
          )}
          <Button variant="ghost" className="w-full justify-start" onClick={handleSignOut}>
            Logout
          </Button>
        </nav>
      </aside>
      <main className="flex-1 p-10">
        {children}
      </main>
    </div>
  );
}

