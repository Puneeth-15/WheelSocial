import React from "react";
import Navbar from "../layout/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search, Users, UserPlus, Calendar, MapPin } from "lucide-react";

interface GroupProps {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  imageUrl?: string;
  category: string;
  isJoined: boolean;
  upcomingEvents?: number;
}

interface CommunitiesPageProps {
  groups?: GroupProps[];
  joinedGroups?: GroupProps[];
}

const CommunitiesPage = ({
  groups = [
    {
      id: "1",
      name: "Royal Enfield Enthusiasts",
      description:
        "For lovers of the iconic Royal Enfield motorcycles. Share your rides, modifications, and maintenance tips.",
      memberCount: 5280,
      imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=royalenfield",
      category: "Motorcycle Brand",
      isJoined: false,
      upcomingEvents: 3,
    },
    {
      id: "2",
      name: "Mumbai Riders Club",
      description:
        "Local riding group for Mumbai-based bikers. Weekly rides, meetups, and events around the city and nearby destinations.",
      memberCount: 3450,
      imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=mumbairiders",
      category: "Regional Club",
      isJoined: true,
      upcomingEvents: 2,
    },
    {
      id: "3",
      name: "Vintage Car Collectors",
      description:
        "Celebrating classic and vintage automobiles. Discuss restoration, parts sourcing, and showcase your prized possessions.",
      memberCount: 1890,
      imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=vintagecars",
      category: "Special Interest",
      isJoined: false,
      upcomingEvents: 1,
    },
    {
      id: "4",
      name: "Himalayan Adventurers",
      description:
        "For riders who love exploring the Himalayan routes. Share experiences, tips, and plan group expeditions.",
      memberCount: 2760,
      imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=himalayan",
      category: "Adventure",
      isJoined: false,
      upcomingEvents: 2,
    },
    {
      id: "5",
      name: "Superbike Owners India",
      description:
        "Exclusive community for superbike owners in India. Track days, maintenance discussions, and high-performance riding tips.",
      memberCount: 1250,
      imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=superbikes",
      category: "Motorcycle Type",
      isJoined: false,
      upcomingEvents: 4,
    },
    {
      id: "6",
      name: "Bangalore Weekend Riders",
      description:
        "Weekend riding group based in Bangalore. Explore coffee estates, hill stations, and scenic routes around the city.",
      memberCount: 4120,
      imageUrl:
        "https://api.dicebear.com/7.x/avataaars/svg?seed=bangaloreriders",
      category: "Regional Club",
      isJoined: true,
      upcomingEvents: 3,
    },
  ],
  joinedGroups = [],
}: CommunitiesPageProps) => {
  // Filter joined groups if not provided
  const myGroups =
    joinedGroups.length > 0
      ? joinedGroups
      : groups.filter((group) => group.isJoined);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950">
      <Navbar />

      <div className="pt-[90px] pb-10 px-4 md:px-6 max-w-[1200px] mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">Communities</h1>
          <Button>
            <Users className="h-4 w-4 mr-2" />
            Create Group
          </Button>
        </div>

        <Tabs defaultValue="discover" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="discover">Discover</TabsTrigger>
            <TabsTrigger value="mygroups">My Groups</TabsTrigger>
          </TabsList>

          <TabsContent value="discover">
            <div className="mb-6">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input placeholder="Search communities..." className="pl-9" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {groups.map((group) => (
                <Card key={group.id} className="overflow-hidden">
                  <CardHeader className="pb-3">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-12 w-12 border">
                        {group.imageUrl ? (
                          <AvatarImage src={group.imageUrl} alt={group.name} />
                        ) : (
                          <AvatarFallback>
                            {group.name.substring(0, 2)}
                          </AvatarFallback>
                        )}
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-lg">{group.name}</CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge
                            variant="secondary"
                            className="text-xs font-normal"
                          >
                            {group.category}
                          </Badge>
                          <span className="text-sm text-gray-500">
                            {group.memberCount.toLocaleString()} members
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-4">
                    <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                      {group.description}
                    </p>

                    {group.upcomingEvents > 0 && (
                      <div className="flex items-center text-sm text-gray-500 mb-4">
                        <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                        <span>{group.upcomingEvents} upcoming events</span>
                      </div>
                    )}

                    <Button
                      className="w-full"
                      variant={group.isJoined ? "outline" : "default"}
                    >
                      {group.isJoined ? (
                        "View Group"
                      ) : (
                        <>
                          <UserPlus className="h-4 w-4 mr-2" />
                          Join Group
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="mygroups">
            {myGroups.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {myGroups.map((group) => (
                  <Card key={group.id} className="overflow-hidden">
                    <CardHeader className="pb-3">
                      <div className="flex items-start gap-3">
                        <Avatar className="h-12 w-12 border">
                          {group.imageUrl ? (
                            <AvatarImage
                              src={group.imageUrl}
                              alt={group.name}
                            />
                          ) : (
                            <AvatarFallback>
                              {group.name.substring(0, 2)}
                            </AvatarFallback>
                          )}
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-lg">
                            {group.name}
                          </CardTitle>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge
                              variant="secondary"
                              className="text-xs font-normal"
                            >
                              {group.category}
                            </Badge>
                            <span className="text-sm text-gray-500">
                              {group.memberCount.toLocaleString()} members
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-4">
                      {group.upcomingEvents > 0 && (
                        <div className="flex items-center text-sm text-gray-500 mb-4">
                          <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                          <span>{group.upcomingEvents} upcoming events</span>
                        </div>
                      )}

                      <Button className="w-full">View Group</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <h3 className="text-lg font-medium">
                  You haven't joined any groups yet
                </h3>
                <p className="text-gray-500 mt-2">
                  Discover and join communities to connect with other
                  enthusiasts
                </p>
                <Button
                  className="mt-4"
                  onClick={() =>
                    document.querySelector('[data-value="discover"]')?.click()
                  }
                >
                  Discover Groups
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CommunitiesPage;
