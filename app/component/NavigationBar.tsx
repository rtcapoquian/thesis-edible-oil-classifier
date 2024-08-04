"use client";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button"; // Import the Button component

type NavItem = {
  label: string;
  path: string;
};

import { Roboto } from 'next/font/google';

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
});

const navItems: NavItem[] = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Projects", path: "/projects" },
  { label: "Contact", path: "/contact" },
];

export default function NavigationBar() {
  const pathname = usePathname(); // Get the current route

  // Function to check if the nav item is active
  const isActive = (path: string) => pathname === path;

  return (
    <NavigationMenu className="p-4 flex mx-auto items-center">
      <NavigationMenuList className="flex space-x-4 flex-grow">
        {navItems.map((item) => (
          <NavigationMenuItem key={item.path}>
            <Link href={item.path} legacyBehavior passHref>
              <NavigationMenuLink
                className={`${navigationMenuTriggerStyle()} ${isActive(item.path) ? 'text-gray-400' : ''}`}
              >
                {item.label}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
      {/* Example usage of the Button component */}
      {/* Add any additional buttons or functionality here if needed */}
    </NavigationMenu>
  );
}
