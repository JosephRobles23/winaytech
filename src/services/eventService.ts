import { Event } from '../types';

const EVENTS_KEY = 'entrepreneur_events';

export const eventService = {
  getEvents: (): Event[] => {
    const events = localStorage.getItem(EVENTS_KEY);
    if (!events) {
      const initialEvents: Event[] = [
        {
          id: 1,
          title: 'Women in Tech Workshop - Lima',
          description:
            'Join us for an inspiring workshop on technology and entrepreneurship at the Lima Innovation Hub.',
          imageUrl:
            'https://images.unsplash.com/photo-1522071820081-009f0129c71c',
          date: '2024-04-15T14:00:00',
          latitude: -12.046374, // Miraflores, Lima
          longitude: -77.042793,
          attendees: 20,
          organizerId: 1,
        },
        {
          id: 2,
          title: 'Female Founders Meetup - San Isidro',
          description:
            'Network with successful female entrepreneurs and share experiences in the heart of Lima\'s business district.',
          imageUrl:
            'https://images.unsplash.com/photo-1515187029135-18ee286d815b',
          date: '2024-04-20T18:00:00',
          latitude: -12.088621, // San Isidro, Lima
          longitude: -77.036780,
          attendees: 17,
          organizerId: 2,
        },
      ];
      localStorage.setItem(EVENTS_KEY, JSON.stringify(initialEvents));
      return initialEvents;
    }
    return JSON.parse(events);
  },

  updateAttendees: (eventId: number): void => {
    const events = eventService.getEvents();
    const updatedEvents = events.map((event) =>
      event.id === eventId
        ? { ...event, attendees: event.attendees + 1 }
        : event
    );
    localStorage.setItem(EVENTS_KEY, JSON.stringify(updatedEvents));
  },
};