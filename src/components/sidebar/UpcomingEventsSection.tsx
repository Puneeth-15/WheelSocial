import React from "react";
import { Calendar, Clock, MapPin } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface EventProps {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  groupName: string;
  attendees: number;
}

interface UpcomingEventsSectionProps {
  events?: EventProps[];
}

const UpcomingEventsSection = ({
  events = [
    {
      id: "1",
      title: "Weekend Mountain Ride",
      date: "Sat, Jun 15",
      time: "7:00 AM",
      location: "Nandi Hills, Bangalore",
      groupName: "Bangalore Bikers Club",
      attendees: 24,
    },
    {
      id: "2",
      title: "Classic Car Meetup",
      date: "Sun, Jun 16",
      time: "9:00 AM",
      location: "Cubbon Park, Bangalore",
      groupName: "Vintage Wheels India",
      attendees: 18,
    },
    {
      id: "3",
      title: "Track Day Experience",
      date: "Sat, Jun 22",
      time: "6:30 AM",
      location: "Madras Motor Race Track",
      groupName: "Speed Demons",
      attendees: 32,
    },
  ],
}: UpcomingEventsSectionProps) => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-4 w-full border border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Upcoming Events</h2>
        <Button
          variant="ghost"
          size="sm"
          className="text-blue-600 hover:text-blue-800"
        >
          View All
        </Button>
      </div>

      <div className="space-y-3">
        {events.map((event) => (
          <Card
            key={event.id}
            className="overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-500 transition-colors"
          >
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-sm font-medium">
                {event.title}
              </CardTitle>
              <p className="text-xs text-gray-500">{event.groupName}</p>
            </CardHeader>
            <CardContent className="p-4 pt-2">
              <div className="flex flex-col space-y-2 text-xs">
                <div className="flex items-center">
                  <Calendar className="h-3.5 w-3.5 mr-2 text-gray-500" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-3.5 w-3.5 mr-2 text-gray-500" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-3.5 w-3.5 mr-2 text-gray-500" />
                  <span className="truncate">{event.location}</span>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
                <span className="text-xs text-gray-500">
                  {event.attendees} attending
                </span>
                <Button size="sm" variant="outline" className="h-7 text-xs">
                  RSVP
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default UpcomingEventsSection;
