import React from 'react';
import { Link } from 'react-router-dom'; // Assuming react-router-dom for navigation
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Menu, Search, Settings, User, LogOut, LayoutGrid } from 'lucide-react'; // Example icons

interface HeaderProps {
  onToggleSidebar?: () => void; // Optional prop to toggle a mobile sidebar
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  console.log("Rendering Header component");

  // Placeholder user data - replace with actual authentication logic
  const isAuthenticated = true;
  const userName = "User Name";
  const userEmail = "user@example.com";

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      {onToggleSidebar && (
        <Button
          size="icon"
          variant="outline"
          className="sm:hidden"
          onClick={onToggleSidebar}
          aria-label="Toggle Sidebar"
        >
          <Menu className="h-5 w-5" />
        </Button>
      )}
      <div className="relative ml-auto flex-1 md:grow-0">
        {/* Placeholder for a global search or other actions */}
        {/* <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search..."
          className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
        /> */}
      </div>
      <Link to="/" className="flex items-center gap-2 text-lg font-semibold md:text-base sm:ml-4 order-first sm:order-none">
        <LayoutGrid className="h-6 w-6 text-primary" />
        <span className="sr-only">Your App Name</span>
        <span className="hidden sm:inline-block">AppLogo</span>
      </Link>
      <div className="flex-1" /> {/* Spacer */}
      {isAuthenticated ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="overflow-hidden rounded-full"
              aria-label="User menu"
            >
              <Avatar>
                <AvatarImage src="/placeholder-user.jpg" alt={`@${userName.split(' ').join('')}`} />
                <AvatarFallback>{userName.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{userName}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {userEmail}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/account/profile"> {/* Example link */}
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/account/settings"> {/* Example link */}
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => console.log('Logout action')}> {/* Replace with actual logout logic */}
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button asChild variant="outline">
          <Link to="/login">Login</Link>
        </Button>
      )}
    </header>
  );
};

export default Header;