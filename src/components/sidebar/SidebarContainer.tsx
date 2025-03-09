import React from "react";
import TrendingSection from "./TrendingSection";
import SuggestedGroupsSection from "./SuggestedGroupsSection";
import UpcomingEventsSection from "./UpcomingEventsSection";

interface SidebarContainerProps {
  showTrending?: boolean;
  showSuggestedGroups?: boolean;
  showUpcomingEvents?: boolean;
  className?: string;
}

const SidebarContainer = ({
  showTrending = true,
  showSuggestedGroups = true,
  showUpcomingEvents = true,
  className = "",
}: SidebarContainerProps) => {
  return (
    <aside
      className={`w-full max-w-[320px] space-y-6 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-sm ${className}`}
    >
      {showTrending && <TrendingSection />}

      {showSuggestedGroups && (
        <div className="mt-6">
          <SuggestedGroupsSection />
        </div>
      )}

      {showUpcomingEvents && (
        <div className="mt-6">
          <UpcomingEventsSection />
        </div>
      )}
    </aside>
  );
};

export default SidebarContainer;
