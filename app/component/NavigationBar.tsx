import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
export default function NavigationBar() {
  return (
   <div className=""><NavigationMenu>
   <NavigationMenuList>
     <NavigationMenuItem>
       <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
       <NavigationMenuContent>
         <NavigationMenuLink>Link</NavigationMenuLink>
       </NavigationMenuContent>
     </NavigationMenuItem>
   </NavigationMenuList>
 </NavigationMenu>
 </div>
  );
}
