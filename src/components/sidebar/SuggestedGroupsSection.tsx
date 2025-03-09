import React from "react";
import { Users, UserPlus } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface GroupProps {
  id: string;
  name: string;
  memberCount: number;
  imageUrl?: string;
  description: string;
}

interface SuggestedGroupsSectionProps {
  groups?: GroupProps[];
  title?: string;
}

const SuggestedGroupsSection = ({
  groups = [
    {
      id: "1",
      name: "Royal Enfield Enthusiasts",
      memberCount: 5280,
      imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=royalenfield",
      description: "For lovers of the iconic Royal Enfield motorcycles",
    },
    {
      id: "2",
      name: "Mumbai Riders Club",
      memberCount: 3450,
      imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=mumbairiders",
      description: "Local riding group for Mumbai-based bikers",
    },
    {
      id: "3",
      name: "Vintage Car Collectors",
      memberCount: 1890,
      imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=vintagecars",
      description: "Celebrating classic and vintage automobiles",
    },
  ],
  title = "Suggested Groups",
}: SuggestedGroupsSectionProps) => {
  return (
    <Card className="w-full bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <Users size={18} />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-4">
          {groups.map((group) => (
            <div key={group.id} className="flex items-start gap-3">
              <Avatar className="h-10 w-10 border">
                {group.imageUrl ? (
                  <AvatarImage src={group.imageUrl} alt={group.name} />
                ) : (
                  <AvatarFallback>{group.name.substring(0, 2)}</AvatarFallback>
                )}
              </Avatar>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm truncate">{group.name}</h4>
                <p className="text-xs text-gray-500 truncate">
                  {group.memberCount.toLocaleString()} members
                </p>
                <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                  {group.description}
                </p>
              </div>
              <Button size="sm" variant="outline" className="flex-shrink-0">
                <UserPlus size={14} className="mr-1" />
                Join
              </Button>
            </div>
          ))}
          <Button variant="ghost" className="w-full text-sm mt-2">
            View all groups
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SuggestedGroupsSection;
