import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Heart,
  MessageCircle,
  Share2,
  MapPin,
  Calendar,
  Clock,
} from "lucide-react";

interface PostCardProps {
  userAvatar?: string;
  userName?: string;
  userHandle?: string;
  postTime?: string;
  postContent?: string;
  postImages?: string[];
  postType?: "photo" | "ride_log" | "route";
  rideDetails?: {
    distance?: string;
    duration?: string;
    location?: string;
    date?: string;
  };
  routeDetails?: {
    startPoint?: string;
    endPoint?: string;
    difficulty?: "easy" | "moderate" | "hard" | "extreme";
    scenicSpots?: string[];
    pitStops?: string[];
  };
  likes?: number;
  comments?: number;
  shares?: number;
}

const PostCard = ({
  userAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=rider1",
  userName = "Rahul Sharma",
  userHandle = "@speedrider",
  postTime = "2 hours ago",
  postContent = "Just completed an amazing ride through the Western Ghats. The Royal Enfield performed beautifully on those curves!",
  postImages = [
    "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&q=80",
    "https://images.unsplash.com/photo-1558981359-219d6364c9c8?w=800&q=80",
  ],
  postType = "photo",
  rideDetails = {
    distance: "120 km",
    duration: "3.5 hours",
    location: "Western Ghats, Maharashtra",
    date: "Today",
  },
  routeDetails = {
    startPoint: "Mumbai",
    endPoint: "Lonavala",
    difficulty: "moderate",
    scenicSpots: ["Khandala Viewpoint", "Tiger Point"],
    pitStops: ["Mountain Cafe", "Roadside Dhaba"],
  },
  likes = 42,
  comments = 8,
  shares = 3,
}: PostCardProps) => {
  return (
    <Card className="w-full mb-6 bg-white dark:bg-gray-900 overflow-hidden shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center">
          <Avatar className="h-10 w-10 mr-3">
            <AvatarImage src={userAvatar} alt={userName} />
            <AvatarFallback>{userName?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-semibold">{userName}</div>
            <div className="text-sm text-gray-500 flex items-center">
              <span>{userHandle}</span>
              <span className="mx-1">•</span>
              <span>{postTime}</span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pb-3">
        {/* Post text content */}
        {postContent && <p className="mb-4">{postContent}</p>}

        {/* Post type specific content */}
        {postType === "ride_log" && (
          <div className="bg-gray-50 p-3 rounded-lg mb-4">
            <h4 className="font-medium mb-2">Ride Details</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                <span>{rideDetails?.location}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                <span>{rideDetails?.date}</span>
              </div>
              <div className="flex items-center">
                <svg
                  className="h-4 w-4 mr-2 text-gray-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
                <span>{rideDetails?.distance}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-gray-500" />
                <span>{rideDetails?.duration}</span>
              </div>
            </div>
          </div>
        )}

        {postType === "route" && (
          <div className="bg-gray-50 p-3 rounded-lg mb-4">
            <h4 className="font-medium mb-2">Route Details</h4>
            <div className="mb-2">
              <div className="flex items-center mb-1">
                <span className="font-medium mr-2">From:</span>{" "}
                {routeDetails?.startPoint}
              </div>
              <div className="flex items-center mb-1">
                <span className="font-medium mr-2">To:</span>{" "}
                {routeDetails?.endPoint}
              </div>
              <div className="flex items-center mb-1">
                <span className="font-medium mr-2">Difficulty:</span>
                <span
                  className={`px-2 py-0.5 text-xs rounded ${getDifficultyColor(routeDetails?.difficulty)}`}
                >
                  {routeDetails?.difficulty?.toUpperCase()}
                </span>
              </div>
            </div>

            {routeDetails?.scenicSpots &&
              routeDetails.scenicSpots.length > 0 && (
                <div className="mb-2">
                  <span className="font-medium">Scenic Spots:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {routeDetails.scenicSpots.map((spot, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded"
                      >
                        {spot}
                      </span>
                    ))}
                  </div>
                </div>
              )}

            {routeDetails?.pitStops && routeDetails.pitStops.length > 0 && (
              <div>
                <span className="font-medium">Pit Stops:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {routeDetails.pitStops.map((stop, index) => (
                    <span
                      key={index}
                      className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded"
                    >
                      {stop}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Post images */}
        {postImages && postImages.length > 0 && (
          <div
            className={`grid ${postImages.length > 1 ? "grid-cols-2 gap-2" : "grid-cols-1"}`}
          >
            {postImages.map((image, index) => (
              <div
                key={index}
                className="rounded-lg overflow-hidden aspect-video"
              >
                <img
                  src={image}
                  alt={`Post image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </CardContent>

      <CardFooter className="border-t pt-3 flex justify-between">
        <Button variant="ghost" size="sm" className="flex items-center gap-1">
          <Heart className="h-5 w-5" />
          <span>{likes}</span>
        </Button>
        <Button variant="ghost" size="sm" className="flex items-center gap-1">
          <MessageCircle className="h-5 w-5" />
          <span>{comments}</span>
        </Button>
        <Button variant="ghost" size="sm" className="flex items-center gap-1">
          <Share2 className="h-5 w-5" />
          <span>{shares}</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

// Helper function to get color based on difficulty
const getDifficultyColor = (difficulty?: string) => {
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

export default PostCard;
