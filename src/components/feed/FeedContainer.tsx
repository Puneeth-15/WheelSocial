import React, { useState } from "react";
import CreatePostCard from "./CreatePostCard";
import PostCard from "./PostCard";

interface Post {
  id: string;
  userAvatar: string;
  userName: string;
  userHandle: string;
  postTime: string;
  postContent: string;
  postImages?: string[];
  postType: "photo" | "ride_log" | "route";
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
  likes: number;
  comments: number;
  shares: number;
}

interface FeedContainerProps {
  posts?: Post[];
  onPostCreate?: (postData: {
    type: "photo" | "ride" | "route";
    content: string;
    media?: File[];
  }) => void;
}

const FeedContainer = ({
  posts = [
    {
      id: "1",
      userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=rider1",
      userName: "Rahul Sharma",
      userHandle: "@speedrider",
      postTime: "2 hours ago",
      postContent:
        "Just completed an amazing ride through the Western Ghats. The Royal Enfield performed beautifully on those curves!",
      postImages: [
        "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&q=80",
        "https://images.unsplash.com/photo-1558981359-219d6364c9c8?w=800&q=80",
      ],
      postType: "photo",
      likes: 42,
      comments: 8,
      shares: 3,
    },
    {
      id: "2",
      userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=rider2",
      userName: "Priya Patel",
      userHandle: "@priyarider",
      postTime: "5 hours ago",
      postContent:
        "Logged my weekend ride to Lonavala. Beautiful weather and smooth roads!",
      postType: "ride_log",
      rideDetails: {
        distance: "120 km",
        duration: "3.5 hours",
        location: "Western Ghats, Maharashtra",
        date: "Today",
      },
      postImages: [
        "https://images.unsplash.com/photo-1511988617509-a57c8a288659?w=800&q=80",
      ],
      likes: 35,
      comments: 12,
      shares: 5,
    },
    {
      id: "3",
      userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=rider3",
      userName: "Vikram Singh",
      userHandle: "@vikingbiker",
      postTime: "Yesterday",
      postContent:
        "Found this amazing route from Mumbai to Pune with some great scenic spots and pit stops. Highly recommend for weekend warriors!",
      postType: "route",
      routeDetails: {
        startPoint: "Mumbai",
        endPoint: "Pune",
        difficulty: "moderate",
        scenicSpots: ["Khandala Viewpoint", "Tiger Point", "Bhushi Dam"],
        pitStops: ["Mountain Cafe", "Roadside Dhaba", "Sunny's Restaurant"],
      },
      likes: 78,
      comments: 23,
      shares: 15,
    },
  ],
  onPostCreate = () => {},
}: FeedContainerProps) => {
  const [feedPosts, setFeedPosts] = useState<Post[]>(posts);

  const handlePostCreate = (postData: {
    type: "photo" | "ride" | "route";
    content: string;
    media?: File[];
  }) => {
    // Call the parent handler
    onPostCreate(postData);

    // In a real app, we would send this to an API and then update the feed
    // For this demo, we'll just add it to the local state
    const newPost: Post = {
      id: `temp-${Date.now()}`,
      userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=currentUser",
      userName: "Current User",
      userHandle: "@currentuser",
      postTime: "Just now",
      postContent: postData.content,
      postType: postData.type === "ride" ? "ride_log" : postData.type,
      likes: 0,
      comments: 0,
      shares: 0,
    };

    setFeedPosts([newPost, ...feedPosts]);
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-gray-50 dark:bg-gray-800 p-4 rounded-lg relative z-0 shadow-sm">
      <CreatePostCard onPostCreate={handlePostCreate} />

      <div className="space-y-6">
        {feedPosts.map((post) => (
          <PostCard
            key={post.id}
            userAvatar={post.userAvatar}
            userName={post.userName}
            userHandle={post.userHandle}
            postTime={post.postTime}
            postContent={post.postContent}
            postImages={post.postImages}
            postType={post.postType}
            rideDetails={post.rideDetails}
            routeDetails={post.routeDetails}
            likes={post.likes}
            comments={post.comments}
            shares={post.shares}
          />
        ))}
      </div>

      {feedPosts.length === 0 && (
        <div className="text-center py-10 text-gray-500">
          <p className="text-lg">No posts yet</p>
          <p className="text-sm">Be the first to share your experience!</p>
        </div>
      )}
    </div>
  );
};

export default FeedContainer;
