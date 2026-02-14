import { useAuth } from "@/_core/hooks/useAuth";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getLoginUrl } from "@/const";
import { Link, useLocation } from "wouter";
import { Button } from "./ui/button";
import { LogOut, Zap } from "lucide-react";
import { DashboardLayoutSkeleton } from './DashboardLayoutSkeleton';

const navItems = [
  { label: "Generate", path: "/generate" },
  { label: "History", path: "/history" },
  { label: "Analytics", path: "/analytics" },
  // { label: "Pricing", path: "/billing" }, // Archived for now
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { loading, user, logout } = useAuth();
  const [location] = useLocation();

  if (loading) {
    return <DashboardLayoutSkeleton />
  }

  /* Archive Mode: Auth skipped
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-8 p-8 max-w-md w-full">
          <div className="flex flex-col items-center gap-6">
            <h1 className="text-2xl font-semibold tracking-tight text-center">
              Sign in to continue
            </h1>
            <p className="text-sm text-muted-foreground text-center max-w-sm">
              Access to this dashboard requires authentication. Continue to launch the login flow.
            </p>
          </div>
          <Button
            onClick={() => {
              const url = getLoginUrl();
              if (url === window.location.pathname) {
                // Mock mode fallback - just force a reload which might trigger mock auth
                window.location.reload(); 
              } else {
                window.location.href = url;
              }
            }}
            size="lg"
            className="w-full shadow-lg hover:shadow-xl transition-all"
          >
            Sign in
          </Button>
        </div>
      </div>
    );
  }
  */

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center shrink-0">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg tracking-tight">OutreachIQ</span>
            </div>
          </Link>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location === item.path;
              return (
                <Link key={item.path} href={item.path}>
                  <div className={`
                    px-4 py-2 text-sm font-medium rounded-full transition-all cursor-pointer
                    ${isActive
                      ? "bg-white/10 text-white"
                      : "text-foreground/60 hover:text-foreground hover:bg-white/5"
                    }
                  `}>
                    {item.label}
                  </div>
                </Link>
              );
            })}
          </nav>

          {/* User Profile */}
          {/* Archive Mode: Profile hidden
          <div className="flex items-center gap-4">
            <span className="hidden md:block text-sm text-foreground/60 font-medium">Profile</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  <Avatar className="h-9 w-9 border border-white/10">
                    <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-500 text-white text-xs font-medium">
                      {user?.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-black/90 border-white/10 backdrop-blur-xl text-foreground">
                <div className="p-2 border-b border-white/10 mb-1">
                  <p className="text-sm font-medium truncate">{user.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                </div>
                <DropdownMenuItem
                  onClick={logout}
                  className="cursor-pointer text-destructive focus:text-destructive hover:bg-white/10 focus:bg-white/10"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          */}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-6">
        {children}
      </main>
    </div>
  );
}
