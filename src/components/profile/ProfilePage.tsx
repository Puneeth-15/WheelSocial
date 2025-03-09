import React, { useState } from "react";
import Navbar from "../layout/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Camera, Edit, Settings, Share2 } from "lucide-react";
import EditProfileDialog from "./EditProfileDialog";
import EditVehicleDialog from "./EditVehicleDialog";
import SettingsDialog from "./SettingsDialog";
import { useToast } from "@/components/ui/use-toast";

interface VehicleProps {
  id: string;
  name: string;
  type: "motorcycle" | "car";
  make: string;
  model: string;
  year: number;
  color: string;
  images: string[];
  specs: Record<string, string>;
}

interface ProfilePageProps {
  userName?: string;
  userAvatar?: string;
  userCoverImage?: string;
  userBio?: string;
  userLocation?: string;
  userJoinDate?: string;
  userFollowers?: number;
  userFollowing?: number;
  userVehicles?: VehicleProps[];
  isOwnProfile?: boolean;
}

const ProfilePage = ({
  userName: initialUserName = "Rahul Sharma",
  userAvatar:
    initialUserAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=user123",
  userCoverImage:
    initialUserCoverImage = "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=1200&q=80",
  userBio:
    initialUserBio = "Passionate Royal Enfield rider exploring the highways and byways of India. Weekend warrior and photography enthusiast.",
  userLocation: initialUserLocation = "Mumbai, Maharashtra",
  userJoinDate = "Joined June 2022",
  userFollowers = 245,
  userFollowing = 132,
  userVehicles = [
    {
      id: "1",
      name: "My Classic 350",
      type: "motorcycle",
      make: "Royal Enfield",
      model: "Classic 350",
      year: 2022,
      color: "Stealth Black",
      images: [
        "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&q=80",
        "https://images.unsplash.com/photo-1558981359-219d6364c9c8?w=800&q=80",
      ],
      specs: {
        Engine: "349cc, Single Cylinder, 4 Stroke",
        Power: "20.2 bhp @ 6100 rpm",
        Torque: "27 Nm @ 4000 rpm",
        Transmission: "5-Speed",
        "Fuel Capacity": "13 L",
        Mileage: "35 kmpl",
        "Kerb Weight": "195 kg",
      },
    },
  ],
  isOwnProfile = true,
}: ProfilePageProps) => {
  const { toast } = useToast();
  const [userName, setUserName] = useState(initialUserName);
  const [userBio, setUserBio] = useState(initialUserBio);
  const [userLocation, setUserLocation] = useState(initialUserLocation);
  const [userAvatar, setUserAvatar] = useState(initialUserAvatar);
  const [userCoverImage, setUserCoverImage] = useState(initialUserCoverImage);
  const [userVehiclesList, setUserVehiclesList] = useState(userVehicles);
  const [isVehicleDialogOpen, setIsVehicleDialogOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<VehicleProps | null>(
    null,
  );
  const [isAddVehicleDialogOpen, setIsAddVehicleDialogOpen] = useState(false);
  const [isSettingsDialogOpen, setIsSettingsDialogOpen] = useState(false);
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950">
      <Navbar userName={userName} userAvatar={userAvatar} />

      <div className="pt-[70px] pb-10">
        {/* Cover Image */}
        <div className="relative h-[200px] md:h-[300px] w-full overflow-hidden">
          <img
            src={userCoverImage}
            alt="Cover"
            className="w-full h-full object-cover"
          />
          {isOwnProfile && (
            <Button
              variant="secondary"
              size="sm"
              className="absolute right-4 bottom-4 bg-white/80 backdrop-blur-sm"
              onClick={() => {
                // In a real app, this would open a file picker
                // For demo, we'll just change to a different image
                const newCoverImage =
                  "https://images.unsplash.com/photo-1511988617509-a57c8a288659?w=1200&q=80";
                setUserCoverImage(newCoverImage);
                toast({
                  title: "Cover photo updated",
                  description:
                    "Your cover photo has been updated successfully.",
                });
              }}
            >
              <Camera className="h-4 w-4 mr-2" />
              Change Cover
            </Button>
          )}
        </div>

        {/* Profile Info */}
        <div className="max-w-[1200px] mx-auto px-4 md:px-6">
          <div className="relative flex flex-col md:flex-row items-start md:items-end -mt-16 md:-mt-20 mb-6 gap-4 md:gap-6">
            <div className="z-10 h-32 w-32 md:h-40 md:w-40 rounded-full overflow-hidden border-4 border-white bg-white relative group">
              <img
                src={userAvatar}
                alt={userName}
                className="w-full h-full object-cover"
              />
              {isOwnProfile && (
                <div
                  className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  onClick={() => {
                    // In a real app, this would open a file picker
                    // For demo, we'll just change to a different avatar
                    const newAvatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=user${Math.floor(Math.random() * 1000)}`;
                    setUserAvatar(newAvatar);
                    toast({
                      title: "Profile picture updated",
                      description:
                        "Your profile picture has been updated successfully.",
                    });
                  }}
                >
                  <Camera className="h-6 w-6 text-white" />
                </div>
              )}
            </div>
            <div className="flex-1 pt-2">
              <h1 className="text-2xl md:text-3xl font-bold">{userName}</h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mt-1">
                <span>{userLocation}</span>
                <span>•</span>
                <span>{userJoinDate}</span>
              </div>
              <div className="flex gap-4 mt-2">
                <div>
                  <span className="font-bold">{userFollowers}</span>
                  <span className="text-gray-600 ml-1">Followers</span>
                </div>
                <div>
                  <span className="font-bold">{userFollowing}</span>
                  <span className="text-gray-600 ml-1">Following</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-2 md:mt-0">
              {isOwnProfile ? (
                <>
                  <EditProfileDialog
                    userName={userName}
                    userBio={userBio}
                    userLocation={userLocation}
                    onSave={(data) => {
                      // Update local state to show changes immediately
                      setUserName(data.name);
                      setUserBio(data.bio);
                      setUserLocation(data.location);

                      // Show toast notification
                      toast({
                        title: "Profile updated",
                        description:
                          "Your profile has been updated successfully.",
                      });
                    }}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsSettingsDialogOpen(true)}
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Button>
                </>
              ) : (
                <>
                  <Button size="sm">Follow</Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </>
              )}
            </div>
          </div>

          <div className="mb-6">
            <p className="text-gray-700">{userBio}</p>
          </div>

          <Tabs defaultValue="vehicles" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="vehicles">Vehicles</TabsTrigger>
              <TabsTrigger value="posts">Posts</TabsTrigger>
              <TabsTrigger value="routes">Routes</TabsTrigger>
              <TabsTrigger value="groups">Groups</TabsTrigger>
            </TabsList>

            <TabsContent value="vehicles" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">My Vehicles</h2>
                {isOwnProfile && (
                  <Button onClick={() => setIsAddVehicleDialogOpen(true)}>
                    <Camera className="h-4 w-4 mr-2" />
                    Add Vehicle
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {userVehiclesList.map((vehicle) => (
                  <Card key={vehicle.id} className="overflow-hidden">
                    <div className="aspect-video w-full overflow-hidden">
                      <img
                        src={vehicle.images[0]}
                        alt={vehicle.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-semibold">
                            {vehicle.name}
                          </h3>
                          <p className="text-gray-600">
                            {vehicle.make} {vehicle.model} {vehicle.year}
                          </p>
                        </div>
                        {isOwnProfile && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              // Open edit vehicle dialog
                              setEditingVehicle(vehicle);
                              setIsVehicleDialogOpen(true);
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                        {Object.entries(vehicle.specs).map(([key, value]) => (
                          <div key={key}>
                            <span className="font-medium text-gray-700">
                              {key}:
                            </span>{" "}
                            <span className="text-gray-600">{value}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex gap-2 mt-4">
                        <Button variant="outline" size="sm">
                          View Gallery
                        </Button>
                        <Button variant="outline" size="sm">
                          Full Specs
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="posts">
              <div className="text-center py-10">
                <h3 className="text-lg font-medium">No posts yet</h3>
                <p className="text-gray-500 mt-2">
                  Posts you create will appear here
                </p>
                {isOwnProfile && (
                  <Button className="mt-4">Create Your First Post</Button>
                )}
              </div>
            </TabsContent>

            <TabsContent value="routes">
              <div className="text-center py-10">
                <h3 className="text-lg font-medium">No routes shared yet</h3>
                <p className="text-gray-500 mt-2">
                  Routes you share will appear here
                </p>
                {isOwnProfile && (
                  <Button className="mt-4">Share Your First Route</Button>
                )}
              </div>
            </TabsContent>

            <TabsContent value="groups">
              <div className="text-center py-10">
                <h3 className="text-lg font-medium">No groups joined yet</h3>
                <p className="text-gray-500 mt-2">
                  Groups you join will appear here
                </p>
                {isOwnProfile && (
                  <Button className="mt-4">Discover Groups</Button>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Edit Vehicle Dialog */}
      <EditVehicleDialog
        vehicle={editingVehicle}
        isOpen={isVehicleDialogOpen}
        onClose={() => {
          setIsVehicleDialogOpen(false);
          setEditingVehicle(null);
        }}
        onSave={(updatedVehicle) => {
          // Update the vehicle in the list
          const updatedVehicles = userVehiclesList.map((v) =>
            v.id === updatedVehicle.id ? updatedVehicle : v,
          );
          setUserVehiclesList(updatedVehicles);

          // Show toast notification
          toast({
            title: "Vehicle updated",
            description: "Your vehicle details have been updated successfully.",
          });
        }}
      />

      {/* Add New Vehicle Dialog */}
      <EditVehicleDialog
        vehicle={null}
        isOpen={isAddVehicleDialogOpen}
        onClose={() => setIsAddVehicleDialogOpen(false)}
        onSave={(newVehicle) => {
          // Add the new vehicle to the list
          setUserVehiclesList([...userVehiclesList, newVehicle]);

          // Show toast notification
          toast({
            title: "Vehicle added",
            description: "Your new vehicle has been added successfully.",
          });
        }}
        isNewVehicle={true}
      />

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

export default ProfilePage;
