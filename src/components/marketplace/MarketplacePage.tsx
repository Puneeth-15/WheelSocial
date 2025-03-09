import React from "react";
import Navbar from "../layout/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Search,
  ShoppingBag,
  MapPin,
  Calendar,
  MessageCircle,
  Heart,
} from "lucide-react";

interface ListingProps {
  id: string;
  title: string;
  price: number;
  category: "vehicles" | "parts" | "accessories" | "gear";
  condition: "new" | "like-new" | "good" | "fair" | "poor";
  location: string;
  description: string;
  images: string[];
  postedDate: string;
  seller: {
    id: string;
    name: string;
    avatar: string;
    rating: number;
    verified: boolean;
  };
  isFavorite?: boolean;
}

interface MarketplacePageProps {
  listings?: ListingProps[];
  myListings?: ListingProps[];
  savedListings?: ListingProps[];
}

const MarketplacePage = ({
  listings = [
    {
      id: "1",
      title: "2022 Royal Enfield Classic 350 - Stealth Black",
      price: 195000,
      category: "vehicles" as const,
      condition: "like-new" as const,
      location: "Mumbai, Maharashtra",
      description:
        "Only 5000 km driven. Single owner. All documents up to date. Recently serviced. Minor modifications include custom exhaust and handlebar.",
      images: [
        "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&q=80",
        "https://images.unsplash.com/photo-1558981359-219d6364c9c8?w=800&q=80",
      ],
      postedDate: "2 days ago",
      seller: {
        id: "s1",
        name: "Rahul Sharma",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=rahul",
        rating: 4.8,
        verified: true,
      },
      isFavorite: true,
    },
    {
      id: "2",
      title: "Shoei NXR2 Helmet - Size L - Matt Black",
      price: 35000,
      category: "gear" as const,
      condition: "new" as const,
      location: "Bangalore, Karnataka",
      description:
        "Brand new Shoei NXR2 helmet. Size L. Matt black color. Original packaging with all accessories and documentation included.",
      images: [
        "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800&q=80",
      ],
      postedDate: "1 week ago",
      seller: {
        id: "s2",
        name: "Priya Patel",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=priya",
        rating: 4.9,
        verified: true,
      },
      isFavorite: false,
    },
    {
      id: "3",
      title: "Akrapovic Exhaust for KTM Duke 390",
      price: 28000,
      category: "parts" as const,
      condition: "good" as const,
      location: "Delhi, NCR",
      description:
        "Genuine Akrapovic slip-on exhaust for KTM Duke 390 (2017-2022 models). Used for 1 year. Great sound and performance boost. All mounting hardware included.",
      images: [
        "https://images.unsplash.com/photo-1589750602846-60028879da9b?w=800&q=80",
      ],
      postedDate: "3 days ago",
      seller: {
        id: "s3",
        name: "Vikram Singh",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=vikram",
        rating: 4.6,
        verified: false,
      },
      isFavorite: true,
    },
    {
      id: "4",
      title: "2020 Kawasaki Ninja 650 - Green",
      price: 550000,
      category: "vehicles" as const,
      condition: "good" as const,
      location: "Pune, Maharashtra",
      description:
        "2020 Kawasaki Ninja 650 in excellent condition. 12,000 km on odometer. Recently serviced with new tires. Includes frame sliders and tail tidy modifications.",
      images: [
        "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&q=80",
      ],
      postedDate: "1 day ago",
      seller: {
        id: "s4",
        name: "Arjun Mehta",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=arjun",
        rating: 4.7,
        verified: true,
      },
      isFavorite: false,
    },
    {
      id: "5",
      title: "Motorcycle Tank Bag - Waterproof",
      price: 2500,
      category: "accessories" as const,
      condition: "new" as const,
      location: "Chennai, Tamil Nadu",
      description:
        "Universal fit waterproof motorcycle tank bag. Multiple compartments with clear phone pocket on top. Magnetic attachments with additional straps for security.",
      images: [
        "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=800&q=80",
      ],
      postedDate: "5 days ago",
      seller: {
        id: "s5",
        name: "Karthik Rajan",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=karthik",
        rating: 4.5,
        verified: false,
      },
      isFavorite: false,
    },
    {
      id: "6",
      title: "Riding Jacket - Rynox Air GT 3 - Size XL",
      price: 8500,
      category: "gear" as const,
      condition: "like-new" as const,
      location: "Hyderabad, Telangana",
      description:
        "Rynox Air GT 3 riding jacket in excellent condition. Size XL. All armor included. Worn only a few times. Perfect for summer riding with excellent ventilation.",
      images: [
        "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80",
      ],
      postedDate: "1 week ago",
      seller: {
        id: "s6",
        name: "Neha Gupta",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=neha",
        rating: 4.9,
        verified: true,
      },
      isFavorite: true,
    },
  ],
  myListings = [],
  savedListings = [],
}: MarketplacePageProps) => {
  // Filter saved listings if not provided
  const myFavorites =
    savedListings.length > 0
      ? savedListings
      : listings.filter((listing) => listing.isFavorite);

  // Format price with commas for Indian Rupees
  const formatPrice = (price: number) => {
    return "₹" + price.toLocaleString("en-IN");
  };

  // Get badge color based on condition
  const getConditionColor = (condition: string) => {
    switch (condition) {
      case "new":
        return "bg-green-100 text-green-800";
      case "like-new":
        return "bg-blue-100 text-blue-800";
      case "good":
        return "bg-yellow-100 text-yellow-800";
      case "fair":
        return "bg-orange-100 text-orange-800";
      case "poor":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Get category label
  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "vehicles":
        return "Vehicle";
      case "parts":
        return "Parts";
      case "accessories":
        return "Accessory";
      case "gear":
        return "Riding Gear";
      default:
        return category;
    }
  };

  const renderListingCard = (listing: ListingProps) => (
    <Card key={listing.id} className="overflow-hidden">
      <div className="aspect-video w-full overflow-hidden relative">
        <img
          src={listing.images[0]}
          alt={listing.title}
          className="w-full h-full object-cover"
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 h-8 w-8 bg-white/80 backdrop-blur-sm hover:bg-white/90"
        >
          <Heart
            className={`h-5 w-5 ${listing.isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"}`}
          />
        </Button>
        <Badge className="absolute top-2 left-2 bg-black/70 text-white backdrop-blur-sm">
          {formatPrice(listing.price)}
        </Badge>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-base line-clamp-1 mb-1">
          {listing.title}
        </h3>

        <div className="flex flex-wrap gap-2 mb-2">
          <Badge variant="secondary">
            {getCategoryLabel(listing.category)}
          </Badge>
          <Badge className={getConditionColor(listing.condition)}>
            {listing.condition
              .replace("-", " ")
              .replace(/\b\w/g, (l) => l.toUpperCase())}
          </Badge>
        </div>

        <div className="flex items-center text-sm text-gray-500 mb-2">
          <MapPin className="h-3.5 w-3.5 mr-1" />
          <span className="truncate">{listing.location}</span>
        </div>

        <p className="text-sm text-gray-600 line-clamp-2 mb-3">
          {listing.description}
        </p>

        <div className="flex items-center gap-2">
          <Avatar className="h-6 w-6">
            <AvatarImage
              src={listing.seller.avatar}
              alt={listing.seller.name}
            />
            <AvatarFallback>{listing.seller.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-xs font-medium">{listing.seller.name}</span>
            <div className="flex items-center">
              <span className="text-xs text-yellow-500">★</span>
              <span className="text-xs text-gray-500 ml-0.5">
                {listing.seller.rating}
              </span>
              {listing.seller.verified && (
                <Badge
                  variant="outline"
                  className="ml-1 h-4 px-1 text-[10px] border-blue-500 text-blue-500"
                >
                  Verified
                </Badge>
              )}
            </div>
          </div>
          <span className="text-xs text-gray-400 ml-auto">
            {listing.postedDate}
          </span>
        </div>
      </CardContent>
      <CardFooter className="px-4 py-3 border-t flex justify-between">
        <Button className="w-full">
          <MessageCircle className="h-4 w-4 mr-2" />
          Contact Seller
        </Button>
      </CardFooter>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950">
      <Navbar />

      <div className="pt-[90px] pb-10 px-4 md:px-6 max-w-[1200px] mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">Marketplace</h1>
          <Button>
            <ShoppingBag className="h-4 w-4 mr-2" />
            Post Listing
          </Button>
        </div>

        <Tabs defaultValue="browse" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="browse">Browse</TabsTrigger>
            <TabsTrigger value="mylistings">My Listings</TabsTrigger>
            <TabsTrigger value="saved">Saved</TabsTrigger>
          </TabsList>

          <TabsContent value="browse">
            <div className="mb-6 flex flex-col md:flex-row gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input placeholder="Search marketplace..." className="pl-9" />
              </div>
              <div className="flex gap-2 flex-wrap">
                <Button variant="outline" size="sm">
                  All Categories
                </Button>
                <Button variant="outline" size="sm">
                  All Conditions
                </Button>
                <Button variant="outline" size="sm">
                  Price Range
                </Button>
                <Button variant="outline" size="sm">
                  Location
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {listings.map((listing) => renderListingCard(listing))}
            </div>
          </TabsContent>

          <TabsContent value="mylistings">
            {myListings.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {myListings.map((listing) => renderListingCard(listing))}
              </div>
            ) : (
              <div className="text-center py-10">
                <h3 className="text-lg font-medium">
                  You haven't posted any listings yet
                </h3>
                <p className="text-gray-500 mt-2">
                  Sell your vehicles, parts, or gear to the community
                </p>
                <Button className="mt-4">
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Post Your First Listing
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="saved">
            {myFavorites.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {myFavorites.map((listing) => renderListingCard(listing))}
              </div>
            ) : (
              <div className="text-center py-10">
                <h3 className="text-lg font-medium">No saved listings yet</h3>
                <p className="text-gray-500 mt-2">
                  Save listings you're interested in to find them easily later
                </p>
                <Button
                  className="mt-4"
                  onClick={() =>
                    document.querySelector('[data-value="browse"]')?.click()
                  }
                >
                  Browse Marketplace
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MarketplacePage;
