'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

export default function Header() {
  const { data: session } = useSession();

  // console.log(session?.user.)

  return (
    <header className="flex h-[5rem] border-2 items-center justify-between px-5">
      <h1>Header</h1>

      <div className="flex gap-5">
        <Popover>
          <PopoverTrigger>Cart</PopoverTrigger>
          <PopoverContent className="mr-16">products here.</PopoverContent>
        </Popover>
        <DropdownMenu>
          <DropdownMenuTrigger>
            {session?.user && (
              <Avatar>
                <AvatarImage src={session?.user?.image!} alt="profile" />
                <AvatarFallback>Profile</AvatarFallback>
              </Avatar>
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>
              <SignOut />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

function SignOut() {
  const router = useRouter();

  async function onSignOut() {
    await signOut();
    router.push('/api/auth/signin');
  }

  return <button onClick={onSignOut}>Logout</button>;
}
