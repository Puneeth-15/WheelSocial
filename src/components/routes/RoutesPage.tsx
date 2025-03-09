import React from "react";
import Navbar from "../layout/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Search,
  Route,
  MapPin,
  Clock,
  ThumbsUp,
  Bookmark,
  Share2,
} from "lucide-react";

interface RouteProps {
  id: string;
  title: string;
  description: string;
  startPoint: string;
  endPoint: string;
  distance: string;
  duration: string;
  difficulty: "easy" | "moderate" | "hard" | "extreme";
  imageUrl: string;
  createdBy: {
    name: string;
    avatar: string;
  };
  likes: number;
  saves: number;
  scenicSpots?: string[];
  pitStops?: string[];
  isSaved?: boolean;
}

interface RoutesPageProps {
  routes?: RouteProps[];
  savedRoutes?: RouteProps[];
}

const RoutesPage = ({
  routes = [
    {
      id: "1",
      title: "Mumbai to Lonavala Scenic Route",
      description:
        "A beautiful weekend ride through the Western Ghats with stunning valley views and multiple photo spots.",
      startPoint: "Mumbai",
      endPoint: "Lonavala",
      distance: "95 km",
      duration: "2.5 hours",
      difficulty: "easy" as const,
      imageUrl:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
      createdBy: {
        name: "Rahul Sharma",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=rahul",
      },
      likes: 245,
      saves: 78,
      scenicSpots: ["Khandala Viewpoint", "Lion's Point", "Bhushi Dam"],
      pitStops: ["Mountain Cafe", "Sunny's Restaurant"],
      isSaved: true,
    },
    {
      id: "2",
      title: "Manali to Leh Highway",
      description:
        "The ultimate motorcycle adventure through the Himalayas. High altitude passes, breathtaking landscapes, and challenging roads.",
      startPoint: "Manali",
      endPoint: "Leh",
      distance: "479 km",
      duration: "2 days",
      difficulty: "extreme" as const,
      imageUrl:
        "https://images.unsplash.com/photo-1516939884455-1445c8652f83?w=800&q=80",
      createdBy: {
        name: "Vikram Singh",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=vikram",
      },
      likes: 876,
      saves: 432,
      scenicSpots: [
        "Rohtang Pass",
        "Baralacha La",
        "Gata Loops",
        "More Plains",
        "Tanglang La",
      ],
      pitStops: ["Jispa", "Sarchu", "Pang", "Upshi"],
      isSaved: false,
    },
    {
      id: "3",
      title: "Bangalore to Coorg Coffee Estates",
      description:
        "A refreshing ride through the coffee plantations of Coorg with misty hills and lush greenery.",
      startPoint: "Bangalore",
      endPoint: "Madikeri",
      distance: "265 km",
      duration: "5 hours",
      difficulty: "moderate" as const,
      imageUrl:
        "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80",
      createdBy: {
        name: "Priya Patel",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=priya",
      },
      likes: 389,
      saves: 156,
      scenicSpots: ["Abbey Falls", "Raja's Seat", "Dubare Elephant Camp"],
      pitStops: ["Kamat Restaurant", "Coffee Day Estate"],
      isSaved: true,
    },
    {
      id: "4",
      title: "Chennai to Pondicherry Coastal Ride",
      description:
        "A relaxing coastal route with beautiful ocean views, French colonial architecture, and seafood stops.",
      startPoint: "Chennai",
      endPoint: "Pondicherry",
      distance: "170 km",
      duration: "3.5 hours",
      difficulty: "easy" as const,
      imageUrl:
        "https://images.unsplash.com/photo-1566438480900-0609be27a4be?w=800&q=80",
      createdBy: {
        name: "Karthik Rajan",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=karthik",
      },
      likes: 215,
      saves: 89,
      scenicSpots: [
        "Mahabalipuram Temples",
        "Alamparai Fort",
        "Promenade Beach",
      ],
      pitStops: ["Bay of Buddha", "Seagull Restaurant"],
      isSaved: false,
    },
    {
      id: "5",
      title: "Jaipur to Udaipur Royal Route",
      description:
        "Experience the royal heritage of Rajasthan with palaces, forts, and desert landscapes.",
      startPoint: "Jaipur",
      endPoint: "Udaipur",
      distance: "393 km",
      duration: "7 hours",
      difficulty: "moderate" as const,
      imageUrl:
        "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&q=80",
      createdBy: {
        name: "Arjun Mehta",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=arjun",
      },
      likes: 456,
      saves: 201,
      scenicSpots: ["Pushkar Lake", "Ajmer Sharif Dargah", "Chittorgarh Fort"],
      pitStops: ["Natraj Dining Hall", "Rajwada Restaurant"],
      isSaved: false,
    },
  ],
  savedRoutes = [],
}: RoutesPageProps) => {
  // Filter saved routes if not provided
  const mySavedRoutes =
    savedRoutes.length > 0
      ? savedRoutes
      : routes.filter((route) => route.isSaved);

  // Helper function to get color based on difficulty
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 text-green-800";
      case "moderate":
        return "bg-blue-100 text-blue-800";
      case "hard":
        return "bg-orange-100 text-orange-800";
      case "extreme":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const renderRouteCard = (route: RouteProps) => (
    <Card key={route.id} className="overflow-hidden">
      <div className="aspect-video w-full overflow-hidden relative">
        <img
          src={route.imageUrl}
          alt={route.title}
          className="w-full h-full object-cover"
        />
        <Badge
          className={`absolute top-3 right-3 ${getDifficultyColor(route.difficulty)}`}
        >
          {route.difficulty.toUpperCase()}
        </Badge>
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{route.title}</CardTitle>
            <div className="flex items-center gap-1 mt-1 text-sm text-gray-500">
              <MapPin className="h-3.5 w-3.5" />
              <span>
                {route.startPoint} to {route.endPoint}
              </span>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Bookmark
              className={`h-5 w-5 ${route.isSaved ? "fill-current" : ""}`}
            />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {route.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <Route className="h-4 w-4 mr-1 text-gray-400" />
            <span>{route.distance}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="h-4 w-4 mr-1 text-gray-400" />
            <span>{route.duration}</span>
          </div>
        </div>

        {route.scenicSpots && route.scenicSpots.length > 0 && (
          <div className="mb-3">
            <p className="text-xs text-gray-500 mb-1">Scenic Spots:</p>
            <div className="flex flex-wrap gap-1">
              {route.scenicSpots.map((spot, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="text-xs font-normal"
                >
                  {spot}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage
                src={route.createdBy.avatar}
                alt={route.createdBy.name}
              />
              <AvatarFallback>{route.createdBy.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="text-xs text-gray-600">
              {route.createdBy.name}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center text-xs text-gray-500">
              <ThumbsUp className="h-3.5 w-3.5 mr-1" />
              <span>{route.likes}</span>
            </div>
            <div className="flex items-center text-xs text-gray-500">
              <Bookmark className="h-3.5 w-3.5 mr-1" />
              <span>{route.saves}</span>
            </div>
            <Button variant="ghost" size="icon" className="h-7 w-7">
              <Share2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950">
      <Navbar />

      <div className="pt-[90px] pb-10 px-4 md:px-6 max-w-[1200px] mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">Routes</h1>
          <Button>
            <Route className="h-4 w-4 mr-2" />
            Create Route
          </Button>
        </div>

        <Tabs defaultValue="discover" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="discover">Discover</TabsTrigger>
            <TabsTrigger value="saved">Saved Routes</TabsTrigger>
          </TabsList>

          <TabsContent value="discover">
            <div className="mb-6 flex flex-col md:flex-row gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input placeholder="Search routes..." className="pl-9" />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  All Difficulties
                </Button>
                <Button variant="outline" size="sm">
                  All Distances
                </Button>
                <Button variant="outline" size="sm">
                  All Regions
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {routes.map((route) => renderRouteCard(route))}
            </div>
          </TabsContent>

          <TabsContent value="saved">
            {mySavedRoutes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mySavedRoutes.map((route) => renderRouteCard(route))}
              </div>
            ) : (
              <div className="text-center py-10">
                <h3 className="text-lg font-medium">No saved routes yet</h3>
                <p className="text-gray-500 mt-2">
                  Save routes you like to access them easily later
                </p>
                <Button
                  className="mt-4"
                  onClick={() =>
                    document.querySelector('[data-value="discover"]')?.click()
                  }
                >
                  Discover Routes
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default RoutesPage;
