import React, { useState } from "react";
import Navbar from "./layout/Navbar";
import FeedContainer from "./feed/FeedContainer";
import SidebarContainer from "./sidebar/SidebarContainer";
import SettingsDialog from "./profile/SettingsDialog";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";

interface HomeProps {
  userName?: string;
  userAvatar?: string;
  notificationCount?: number;
  messageCount?: number;
}

const Home = ({
  userName = "Rahul Sharma",
  userAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=user123",
  notificationCount = 3,
  messageCount = 5,
}: HomeProps) => {
  const { toast } = useToast();
  const [isSettingsDialogOpen, setIsSettingsDialogOpen] = useState(false);
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation Bar */}
      <Navbar
        userName={userName}
        userAvatar={userAvatar}
        notificationCount={notificationCount}
        messageCount={messageCount}
      />

      {/* Main Content */}
      <div className="pt-[90px] pb-10 px-4 md:px-6 max-w-[1400px] mx-auto relative">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Your Feed</h1>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsSettingsDialogOpen(true)}
            className="flex items-center gap-2"
            aria-label="Open settings"
          >
            <Settings className="h-4 w-4" />
            Settings
          </Button>
        </div>
        <div className="flex flex-col md:flex-row gap-6">
          {/* Feed Section */}
          <div className="flex-1 order-2 md:order-1">
            <FeedContainer />
          </div>

          {/* Sidebar Section - Hidden on mobile, shown on desktop */}
          <div className="w-full md:w-auto order-1 md:order-2 hidden md:block">
            <SidebarContainer />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-4 text-center text-sm text-gray-500 dark:bg-gray-900 dark:border-gray-800 dark:text-gray-400">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6">
          <p>© 2023 WheelSocial. All rights reserved.</p>
          <div className="flex justify-center gap-4 mt-2">
            <a
              href="#"
              className="hover:text-blue-600 dark:hover:text-blue-400"
            >
              Terms
            </a>
            <a
              href="#"
              className="hover:text-blue-600 dark:hover:text-blue-400"
            >
              Privacy
            </a>
            <a
              href="#"
              className="hover:text-blue-600 dark:hover:text-blue-400"
            >
              Help
            </a>
            <a
              href="#"
              className="hover:text-blue-600 dark:hover:text-blue-400"
            >
              Contact
            </a>
          </div>
        </div>
      </footer>

      {/* Settings Dialog */}
      <SettingsDialog
        isOpen={isSettingsDialogOpen}
        onClose={() => {
          setIsSettingsDialogOpen(false);
          toast({
            title: "Settings saved",
            description: "Your settings have been saved successfully.",
          });
        }}
      />
    </div>
  );
};

export default Home;
