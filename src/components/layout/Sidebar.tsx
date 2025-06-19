import React from 'react';
import { Link, useLocation } from 'react-router-dom'; // Assuming react-router-dom
import { cn } from '@/lib/utils'; // For conditional class names
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
// Example icons - replace with actual icons for your navigation
import { Home, Users, Package, Settings, BarChart3, LifeBuoy } from 'lucide-react';

interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
  disabled?: boolean;
  external?: boolean;
}

const mainNavItems: NavItem[] = [
  { href: '/dashboard', label: 'Dashboard', icon: Home },
  { href: '/dashboard/users', label: 'Users', icon: Users },
  { href: '/dashboard/products', label: 'Products', icon: Package },
  { href: '/dashboard/analytics', label: 'Analytics', icon: BarChart3 },
];

const secondaryNavItems: NavItem[] = [
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
  { href: '/support', label: 'Support', icon: LifeBuoy, external: true }, // Example external link
];

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const location = useLocation();
  console.log("Rendering Sidebar component, current path:", location.pathname);

  const renderNavItems = (items: NavItem[]) => {
    return items.map((item) => {
      const isActive = location.pathname === item.href || (item.href !== '/dashboard' && location.pathname.startsWith(item.href));
      const linkContent = (
        <>
          <item.icon className={cn("h-5 w-5", isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground")} />
          <span className={cn("truncate", isActive ? "font-semibold text-primary" : "text-muted-foreground group-hover:text-foreground")}>
            {item.label}
          </span>
        </>
      );

      if (item.external) {
        return (
          <a
            key={item.href}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground",
              item.disabled && "cursor-not-allowed opacity-50"
            )}
          >
            {linkContent}
          </a>
        );
      }

      return (
        <Link
          key={item.href}
          to={item.href}
          className={cn(
            "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground",
            isActive && "bg-accent font-medium text-primary",
            item.disabled && "pointer-events-none opacity-50"
          )}
          aria-current={isActive ? 'page' : undefined}
        >
          {linkContent}
        </Link>
      );
    });
  };

  return (
    <aside className={cn("hidden border-r bg-muted/40 md:block", className)}>
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link to="/dashboard" className="flex items-center gap-2 font-semibold">
            {/* Replace with your app's logo/icon */}
            <Package className="h-6 w-6 text-primary" />
            <span className="">App Name</span>
          </Link>
          {/* Optional: Add a notification bell or other actions here */}
        </div>
        <ScrollArea className="flex-1 py-2">
          <nav className="grid items-start gap-1 px-2 text-sm font-medium lg:px-4">
            {renderNavItems(mainNavItems)}
          </nav>
          {secondaryNavItems.length > 0 && (
            <>
              <div className="my-2 mx-4 h-px bg-border" /> {/* Separator */}
              <nav className="grid items-start gap-1 px-2 text-sm font-medium lg:px-4">
                {renderNavItems(secondaryNavItems)}
              </nav>
            </>
          )}
        </ScrollArea>
        {/* Optional: Sidebar footer content, e.g., user profile quick view or collapse button */}
        {/* <div className="mt-auto p-4 border-t">
            <Button size="sm" variant="ghost" className="w-full justify-start">
                Collapse Sidebar
            </Button>
        </div> */}
      </div>
    </aside>
  );
};

export default Sidebar;