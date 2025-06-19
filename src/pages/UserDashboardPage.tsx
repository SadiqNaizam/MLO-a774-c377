import React, { useState } from 'react';
import Header from '@/components/layout/Header'; // Custom Header
import Sidebar from '@/components/layout/Sidebar'; // Custom Sidebar
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import {
  Sheet,
  SheetContent,
  // SheetTrigger, // Trigger is in Header
} from '@/components/ui/sheet';
import { Link } from 'react-router-dom';
import { Home, Settings, Users, BarChart3, PackagePlus } from 'lucide-react'; // Example icons

const UserDashboardPage: React.FC = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  React.useEffect(() => {
    console.log('UserDashboardPage loaded');
  }, []);

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      {/* Desktop Sidebar (uses custom Sidebar component) */}
      <Sidebar className="hidden border-r bg-background md:block" />

      <div className="flex flex-col">
        {/* Header (uses custom Header component) */}
        <Header onToggleSidebar={() => setIsMobileSidebarOpen((prev) => !prev)} />

        {/* Mobile Sidebar (uses Sheet and custom Sidebar component) */}
        <Sheet open={isMobileSidebarOpen} onOpenChange={setIsMobileSidebarOpen}>
          <SheetContent side="left" className="p-0 w-[220px] sm:w-[280px]">
            {/* The custom Sidebar component is rendered inside the sheet */}
            <Sidebar />
          </SheetContent>
        </Sheet>

        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-muted/40">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold md:text-2xl">Dashboard Overview</h1>
            <Button size="sm" asChild>
              <Link to="/dashboard/create-item"> <PackagePlus className="mr-2 h-4 w-4" /> Add New Item</Link>
            </Button>
          </div>

          {/* Example NavigationMenu for secondary actions or views */}
          <NavigationMenu className="mb-4">
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/dashboard/overview" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Overview
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/dashboard/reports" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Reports
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/dashboard/activity" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Activity
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Users
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+2,350</div>
                <p className="text-xs text-muted-foreground">
                  +180.1% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Key Metric
                </CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,245</div>
                <p className="text-xs text-muted-foreground">
                  +33% from last period
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Quick Settings</CardTitle>
                <Settings className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">
                  Access your profile and application settings.
                </p>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/account/settings">Go to Settings</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

           <Card className="mt-6">
              <CardHeader>
                <CardTitle>Welcome to your Dashboard!</CardTitle>
                <CardDescription>
                  This is your main hub to manage application features and your profile. Explore the navigation to get started.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <img src="https://source.unsplash.com/random/800x400?office,desk" alt="Welcome Banner" className="rounded-lg shadow-md" />
                <p className="mt-4 text-muted-foreground">
                  Placeholder content: Use this space to display important announcements, quick links, or summaries.
                </p>
              </CardContent>
            </Card>

        </main>
      </div>
    </div>
  );
};

export default UserDashboardPage;