import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Camera, MapPin, Route, Send } from "lucide-react";

interface CreatePostCardProps {
  onPostCreate?: (postData: {
    type: "photo" | "ride" | "route";
    content: string;
    media?: File[];
  }) => void;
}

const CreatePostCard = ({ onPostCreate = () => {} }: CreatePostCardProps) => {
  const [activeTab, setActiveTab] = useState<"photo" | "ride" | "route">(
    "photo",
  );
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    // In a real implementation, this would handle file uploads and more complex data
    onPostCreate({
      type: activeTab,
      content: content,
    });

    // Reset form
    setContent("");
  };

  return (
    <Card className="w-full bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 mb-6 shadow-sm">
      <CardContent className="p-4">
        <div className="flex items-center gap-3 mb-4">
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=user123"
            alt="User Avatar"
            className="w-10 h-10 rounded-full"
          />
          <div className="text-sm font-medium">What's on your mind?</div>
        </div>

        <Tabs
          defaultValue="photo"
          value={activeTab}
          onValueChange={(value) =>
            setActiveTab(value as "photo" | "ride" | "route")
          }
          className="w-full"
        >
          <TabsList className="grid grid-cols-3 mb-4 w-full">
            <TabsTrigger value="photo" className="flex items-center gap-2">
              <Camera size={16} />
              <span>Photo</span>
            </TabsTrigger>
            <TabsTrigger value="ride" className="flex items-center gap-2">
              <MapPin size={16} />
              <span>Ride Log</span>
            </TabsTrigger>
            <TabsTrigger value="route" className="flex items-center gap-2">
              <Route size={16} />
              <span>Route</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="photo" className="space-y-4">
            <Textarea
              placeholder="Share photos of your vehicle or recent adventures..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[100px]"
            />
            <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
              <Camera className="mx-auto h-8 w-8 text-gray-400" />
              <p className="mt-2 text-sm text-gray-500">
                Click to upload photos
              </p>
              <p className="text-xs text-gray-400 mt-1">
                PNG, JPG, GIF up to 10MB
              </p>
              {/* This would be connected to a file input in a real implementation */}
            </div>
          </TabsContent>

          <TabsContent value="ride" className="space-y-4">
            <Textarea
              placeholder="Share details about your recent ride (distance, time, experience)..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[100px]"
            />
            <div className="flex gap-3">
              <Button variant="outline" className="flex items-center gap-2">
                <MapPin size={16} />
                <span>Add Location</span>
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Camera size={16} />
                <span>Add Photos</span>
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="route" className="space-y-4">
            <Textarea
              placeholder="Share a great route you've discovered..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[100px]"
            />
            <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
              <Route className="mx-auto h-8 w-8 text-gray-400" />
              <p className="mt-2 text-sm text-gray-500">
                Click to map your route
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Add waypoints, difficulty, and scenic spots
              </p>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end mt-4">
          <Button
            onClick={handleSubmit}
            className="flex items-center gap-2"
            disabled={!content.trim()}
          >
            <Send size={16} />
            <span>Post</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CreatePostCard;
