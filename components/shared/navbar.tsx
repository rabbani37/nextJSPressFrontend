'use client';

import Link from 'next/link';
import { LogOut, Settings, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useEffect, useState } from 'react';
import logOut from '@/service/logout';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

// Navigation items configuration
const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Dashbord', href: '/dashbord' },
  { label: 'News', href: '/news' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Contact', href: '/contact' },
];

// User dropdown menu items
const userMenuItems = [
  { label: 'Profile', icon: User, action: 'profile' },
  { label: 'Settings', icon: Settings, action: 'settings' },
];



type TUser = {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    id?: string;
    name: string;
    email: string;
    active_status: string;
    role: string;
    created_at: string;
    updated_at: string;
    profile: {
      id?: string;
      profile_photo: string;
      bio: string;
      user_id: string;
      created_at: string;
      updated_at: string;
    }
  }

}

type TNavbarProps = { user: TUser }




export function Navbar(user: TNavbarProps) {
  const [isLogout, setIsLogout] = useState(false)
  const router = useRouter()

  const handleUserMenuAction = async (action: string) => {
    console.log(`User clicked: ${action}`);
    // Add your handler logic here

    if (action === "logout") {
      await logOut();
      setIsLogout(true)
    }
  };

  useEffect(() => {

    if (isLogout) {
      toast.success("User Logged out Successfully");
      router.push("/login")
    }

  }, [isLogout, router])

  return (
    <nav className="border-b bg-background">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-semibold text-lg">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
            L
          </div>
          <span className="hidden sm:inline">NextJS Press</span>
        </Link>

        {/* Navigation Links - Hidden on mobile, shown on md and up */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button variant="ghost" className="text-foreground hover:text-foreground">
                {item.label}
              </Button>
            </Link>
          ))}
        </div>

        {/* User Dropdown */}
        {user.user.success ?(
           <DropdownMenu>


          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0">
              <Avatar className="h-10 w-10">
                <AvatarImage src="" alt="User" />
                <AvatarFallback><small>Profiel</small></AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-56">
            {/* User Info */}
            <div className="flex items-center gap-2 px-2 py-1.5">
              <Avatar className="h-8 w-8">
                <AvatarImage src="" alt="User" />
                <AvatarFallback><small>Profiel</small></AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-0.5">
                <p className="text-sm font-medium">{user?.user.data?.name || "No Name"}</p>
                <p className="text-xs text-muted-foreground">{user?.user.data?.email || "No Email"}</p>
              </div>
            </div>

            <DropdownMenuSeparator />

            {/* Menu Items */}
            {userMenuItems.map((item) => {
              const Icon = item.icon;
              return (
                <DropdownMenuItem
                  key={item.action}
                  onClick={() => handleUserMenuAction(item.action)}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  <span>{item.label}</span>
                </DropdownMenuItem>
              );
            })}

            <DropdownMenuSeparator />

            {/* Logout */}
            <DropdownMenuItem onClick={() => {
              handleUserMenuAction('logout')
            }}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>

        </DropdownMenu>
        ) : <Button><Link href={"/login"}>Login</Link></Button>}
      </div>
    </nav>
  );
}
