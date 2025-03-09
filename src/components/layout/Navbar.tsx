import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  Home,
  User,
  Users,
  Map,
  ShoppingBag,
  Bell,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  Moon,
  Sun,
} from "lucide-react";
import { useTheme } from "../ThemeProvider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface NavbarProps {
  userName?: string;
  userAvatar?: string;
  notificationCount?: number;
  messageCount?: number;
}

const Navbar = ({
  userName = "Rahul Sharma",
  userAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=user123",
  notificationCount = 3,
  messageCount = 5,
}: NavbarProps) => {
  const { theme, setTheme } = useTheme();

  return (
    <nav className="w-full h-[70px] bg-white border-b border-gray-200 fixed top-0 left-0 z-50 px-4 md:px-6 dark:bg-gray-900 dark:border-gray-800">
      <div className="h-full max-w-[1400px] mx-auto flex items-center justify-between">
        {/* Logo and Search */}
        <div className="flex items-center gap-4 md:gap-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-1.5 rounded-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.5 2.8C1.4 11.3 1 12.1 1 13v3c0 .6.4 1 1 1h2" />
                <path d="M6 17h4" />
                <path d="M14 17h4" />
                <circle cx="5" cy="17" r="2" />
                <circle cx="19" cy="17" r="2" />
              </svg>
            </div>
            <span className="text-xl font-bold hidden md:block bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
              WheelSocial
            </span>
          </Link>

          <div className="relative hidden md:flex items-center max-w-md w-full">
            <Search className="absolute left-3 h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Search riders, vehicles, routes..."
              className="pl-9 w-full max-w-xs"
            />
          </div>
        </div>

        {/* Main Navigation - Desktop */}
        <div className="hidden md:flex items-center justify-center gap-1">
          <Link to="/">
            <Button
              variant="ghost"
              className="flex flex-col items-center gap-1 h-auto py-2"
            >
              <Home size={18} />
              <span className="text-xs">Feed</span>
            </Button>
          </Link>
          <Link to="/profile">
            <Button
              variant="ghost"
              className="flex flex-col items-center gap-1 h-auto py-2"
            >
              <User size={18} />
              <span className="text-xs">Profile</span>
            </Button>
          </Link>
          <Link to="/communities">
            <Button
              variant="ghost"
              className="flex flex-col items-center gap-1 h-auto py-2"
            >
              <Users size={18} />
              <span className="text-xs">Communities</span>
            </Button>
          </Link>
          <Link to="/routes">
            <Button
              variant="ghost"
              className="flex flex-col items-center gap-1 h-auto py-2"
            >
              <Map size={18} />
              <span className="text-xs">Routes</span>
            </Button>
          </Link>
          <Link to="/marketplace">
            <Button
              variant="ghost"
              className="flex flex-col items-center gap-1 h-auto py-2"
            >
              <ShoppingBag size={18} />
              <span className="text-xs">Marketplace</span>
            </Button>
          </Link>
        </div>

        {/* User Actions */}
        <div className="flex items-center gap-1 md:gap-2">
          {/* Search Icon (Mobile) */}
          <Button variant="ghost" size="icon" className="md:hidden">
            <Search className="h-5 w-5" />
          </Button>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </Button>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {notificationCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  >
                    {notificationCount}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-[300px] overflow-auto">
                <div className="p-3 hover:bg-gray-50 cursor-pointer dark:hover:bg-gray-800">
                  <div className="flex items-start gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=priya" />
                      <AvatarFallback>PR</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm">
                        <span className="font-medium">Priya Patel</span>{" "}
                        commented on your post
                      </p>
                      <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                    </div>
                  </div>
                </div>
                <div className="p-3 hover:bg-gray-50 cursor-pointer dark:hover:bg-gray-800">
                  <div className="flex items-start gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=mumbairiders" />
                      <AvatarFallback>MR</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm">
                        <span className="font-medium">Mumbai Riders Club</span>{" "}
                        has a new event this weekend
                      </p>
                      <p className="text-xs text-gray-500 mt-1">5 hours ago</p>
                    </div>
                  </div>
                </div>
                <div className="p-3 hover:bg-gray-50 cursor-pointer dark:hover:bg-gray-800">
                  <div className="flex items-start gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=vikram" />
                      <AvatarFallback>VS</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm">
                        <span className="font-medium">Vikram Singh</span> liked
                        your route
                      </p>
                      <p className="text-xs text-gray-500 mt-1">Yesterday</p>
                    </div>
                  </div>
                </div>
              </div>
              <DropdownMenuSeparator />
              <div className="p-2 text-center">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full text-blue-600 hover:text-blue-800"
                >
                  View all notifications
                </Button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Messages */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <MessageSquare className="h-5 w-5" />
                {messageCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  >
                    {messageCount}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Messages</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-[300px] overflow-auto">
                <div className="p-3 hover:bg-gray-50 cursor-pointer dark:hover:bg-gray-800">
                  <div className="flex items-start gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=priya" />
                      <AvatarFallback>PR</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center">
                        <p className="font-medium text-sm">Priya Patel</p>
                        <span className="text-xs text-gray-500">10:42 AM</span>
                      </div>
                      <p className="text-xs text-gray-600 truncate">
                        Hey, are you joining the weekend ride to Lonavala?
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-3 hover:bg-gray-50 cursor-pointer dark:hover:bg-gray-800">
                  <div className="flex items-start gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=arjun" />
                      <AvatarFallback>AM</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center">
                        <p className="font-medium text-sm">Arjun Mehta</p>
                        <span className="text-xs text-gray-500">Yesterday</span>
                      </div>
                      <p className="text-xs text-gray-600 truncate">
                        I'm interested in your Ninja 650. Is it still available?
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-3 hover:bg-gray-50 cursor-pointer dark:hover:bg-gray-800">
                  <div className="flex items-start gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=vikram" />
                      <AvatarFallback>VS</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center">
                        <p className="font-medium text-sm">Vikram Singh</p>
                        <span className="text-xs text-gray-500">
                          2 days ago
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 truncate">
                        Thanks for sharing that route map. It was really
                        helpful!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <DropdownMenuSeparator />
              <div className="p-2 text-center">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full text-blue-600 hover:text-blue-800"
                >
                  View all messages
                </Button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-2 p-1 md:p-2"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src={userAvatar} alt={userName} />
                  <AvatarFallback>{userName?.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="hidden md:block text-sm font-medium">
                  {userName}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link to="/profile">
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem
                onClick={() => {
                  // Find the settings dialog in the current page and open it
                  const settingsButton = document.querySelector(
                    '[aria-label="Open settings"]',
                  );
                  if (settingsButton) {
                    (settingsButton as HTMLButtonElement).click();
                  }
                }}
              >
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <Link to="/">
                <DropdownMenuItem
                  onClick={() => alert("Logged out successfully")}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
