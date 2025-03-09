import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { TrendingUp, MapPin, ThumbsUp, ExternalLink } from "lucide-react";

interface TrendingPost {
  id: string;
  title: string;
  author: string;
  authorAvatar: string;
  likes: number;
  type: "photo" | "route" | "ride";
  imageUrl?: string;
}

interface TrendingRoute {
  id: string;
  name: string;
  distance: string;
  difficulty: "Easy" | "Moderate" | "Hard";
  location: string;
  likes: number;
  imageUrl: string;
}

interface TrendingSectionProps {
  trendingPosts?: TrendingPost[];
  trendingRoutes?: TrendingRoute[];
}

const TrendingSection = ({
  trendingPosts = [
    {
      id: "1",
      title: "My new Royal Enfield Classic 350",
      author: "Rahul Sharma",
      authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul",
      likes: 245,
      type: "photo",
      imageUrl:
        "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=400&q=80",
    },
    {
      id: "2",
      title: "Weekend ride to Lonavala",
      author: "Priya Patel",
      authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
      likes: 189,
      type: "ride",
      imageUrl:
        "https://images.unsplash.com/photo-1511988617509-a57c8a288659?w=400&q=80",
    },
  ],
  trendingRoutes = [
    {
      id: "1",
      name: "Mumbai to Pune Expressway",
      distance: "94 km",
      difficulty: "Moderate",
      location: "Maharashtra",
      likes: 432,
      imageUrl:
        "https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=400&q=80",
    },
    {
      id: "2",
      name: "Manali to Leh Highway",
      distance: "479 km",
      difficulty: "Hard",
      location: "Himachal Pradesh",
      likes: 876,
      imageUrl:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80",
    },
  ],
}: TrendingSectionProps) => {
  return (
    <Card className="w-full bg-white dark:bg-gray-900 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-500 dark:to-indigo-600 text-white">
        <CardTitle className="flex items-center text-lg">
          <TrendingUp className="mr-2 h-5 w-5" />
          Trending Now
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-sm mb-2 text-gray-700">
              Popular Posts
            </h3>
            <div className="space-y-3">
              {trendingPosts.map((post) => (
                <div key={post.id} className="flex items-start space-x-3">
                  <div className="h-12 w-12 rounded-md overflow-hidden flex-shrink-0">
                    <img
                      src={
                        post.imageUrl ||
                        "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=400&q=80"
                      }
                      alt={post.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {post.title}
                    </p>
                    <div className="flex items-center mt-1">
                      <img
                        src={post.authorAvatar}
                        alt={post.author}
                        className="h-4 w-4 rounded-full mr-1"
                      />
                      <span className="text-xs text-gray-500">
                        {post.author}
                      </span>
                      <div className="flex items-center ml-2">
                        <ThumbsUp className="h-3 w-3 text-gray-400 mr-1" />
                        <span className="text-xs text-gray-500">
                          {post.likes}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="mt-2 text-xs w-full justify-start text-blue-600"
            >
              <ExternalLink className="h-3 w-3 mr-1" />
              View all trending posts
            </Button>
          </div>

          <Separator />

          <div>
            <h3 className="font-medium text-sm mb-2 text-gray-700">
              Popular Routes
            </h3>
            <div className="space-y-3">
              {trendingRoutes.map((route) => (
                <div key={route.id} className="flex items-start space-x-3">
                  <div className="h-12 w-12 rounded-md overflow-hidden flex-shrink-0">
                    <img
                      src={route.imageUrl}
                      alt={route.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {route.name}
                    </p>
                    <div className="flex items-center mt-1">
                      <MapPin className="h-3 w-3 text-gray-400 mr-1" />
                      <span className="text-xs text-gray-500">
                        {route.location}
                      </span>
                      <span className="mx-1 text-gray-300">•</span>
                      <span className="text-xs text-gray-500">
                        {route.distance}
                      </span>
                      <div className="flex items-center ml-2">
                        <ThumbsUp className="h-3 w-3 text-gray-400 mr-1" />
                        <span className="text-xs text-gray-500">
                          {route.likes}
                        </span>
                      </div>
                    </div>
                    <span
                      className={`text-xs px-1.5 py-0.5 rounded-full mt-1 inline-block ${route.difficulty === "Easy" ? "bg-green-100 text-green-800" : route.difficulty === "Moderate" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"}`}
                    >
                      {route.difficulty}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="mt-2 text-xs w-full justify-start text-blue-600"
            >
              <ExternalLink className="h-3 w-3 mr-1" />
              Explore all popular routes
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrendingSection;
