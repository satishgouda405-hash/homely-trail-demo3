import { unsplash } from './lib/utils';

/* ------------------------------------------------------------------ */
/* Navigation                                                          */
/* ------------------------------------------------------------------ */

export const navLinks = [
  { label: 'Browse Stays', href: '#stays' },
  { label: 'Properties', href: '#properties' },
  { label: 'About', href: '#about' },
];

export const locations = [
  'Bengaluru',
  'Jaipur',
  'Kochi',
  'Goa',
  'Dehradun',
  'Pune',
  'Mysuru',
];

/* ------------------------------------------------------------------ */
/* Platforms                                                           */
/* ------------------------------------------------------------------ */

export const platforms = [
  { name: 'Booking.com', rating: 4.5, reviews: '230+' },
  { name: 'Goibibo', rating: 4.5, reviews: '230+' },
  { name: 'Airbnb', rating: 4.5, reviews: '230+' },
  { name: 'Google', rating: 4.5, reviews: '230+' },
];

/* ------------------------------------------------------------------ */
/* Locations                                                           */
/* ------------------------------------------------------------------ */

export const locationChips = [
  {
    name: 'HSR Layout',
    count: 12,
    image: unsplash('photo-1600607687939-ce8a6c25118c', 320),
    alt: 'Sunlit living room of a homestay in HSR Layout',
  },
  {
    name: 'Downtown',
    count: 18,
    image: unsplash('photo-1512917774080-9991f1c4c750', 320),
    alt: 'White modern villa in Downtown',
  },
  {
    name: 'Riverfront',
    count: 9,
    image: unsplash('photo-1568605114967-8130f3a36994', 320),
    alt: 'Cottage exterior near the riverfront',
  },
  {
    name: 'Old Town',
    count: 14,
    image: unsplash('photo-1570129477492-45c003edd2be', 320),
    alt: 'Heritage bungalow in Old Town',
  },
  {
    name: 'Greenfield',
    count: 11,
    image: unsplash('photo-1560448075-bb485b067938', 320),
    alt: 'Bright apartment interior in Greenfield',
  },
  {
    name: 'Tech Park',
    count: 7,
    image: unsplash('photo-1502672023488-70e25813eb80', 320),
    alt: 'Compact modern studio near Tech Park',
  },
  {
    name: 'Lakeside',
    count: 6,
    image: unsplash('photo-1556228453-efd6c1ff04f6', 320),
    alt: 'Warm wooden interior by the lake',
  },
  {
    name: 'Market Street',
    count: 8,
    image: unsplash('photo-1556228720-195a672e8a03', 320),
    alt: 'Cosy loft on Market Street',
  },
];

/* ------------------------------------------------------------------ */
/* Properties                                                          */
/* ------------------------------------------------------------------ */

export const properties = [
  {
    id: 1,
    title: 'The Courtyard House',
    location: 'HSR Layout, Bengaluru',
    price: 4200,
    rating: 4.9,
    reviews: 128,
    badge: 'Highly Rated',
    guests: '4 guests',
    beds: '2 beds',
    baths: '2 baths',
    image: unsplash('photo-1600607687939-ce8a6c25118c', 900),
    alt: 'Living room with cream sofa and warm timber ceiling at The Courtyard House',
  },
  {
    id: 2,
    title: 'Verdant Villa',
    location: 'Riverfront, Kochi',
    price: 6800,
    rating: 4.8,
    reviews: 96,
    badge: 'Premium',
    guests: '6 guests',
    beds: '3 beds',
    baths: '3 baths',
    image: unsplash('photo-1618221195710-dd6b41faaea6', 900),
    alt: 'Spacious villa lounge with olive green accents',
  },
  {
    id: 3,
    title: 'Old Town Loft',
    location: 'Old Town, Jaipur',
    price: 3650,
    rating: 4.7,
    reviews: 84,
    badge: 'Standard',
    guests: '2 guests',
    beds: '1 bed',
    baths: '1 bath',
    image: unsplash('photo-1600121848594-d8644e57abab', 900),
    alt: 'Attic bedroom with exposed beams at Old Town Loft',
  },
  {
    id: 4,
    title: 'The Glass House',
    location: 'Greenfield, Dehradun',
    price: 5400,
    rating: 4.9,
    reviews: 112,
    badge: 'Highly Rated',
    guests: '4 guests',
    beds: '2 beds',
    baths: '2 baths',
    image: unsplash('photo-1600210492486-724fe5c67fb0', 900),
    alt: 'Glass walled living space opening onto a garden',
  },
  {
    id: 5,
    title: 'Mango Tree Cottage',
    location: 'Downtown, Goa',
    price: 7500,
    rating: 5.0,
    reviews: 74,
    badge: 'Premium',
    guests: '8 guests',
    beds: '4 beds',
    baths: '4 baths',
    image: unsplash('photo-1600566753190-17f0baa2a6c3', 900),
    alt: 'Whitewashed cottage with a mango tree in the courtyard',
  },
  {
    id: 6,
    title: 'Tech Park Suite',
    location: 'Tech Park, Bengaluru',
    price: 2980,
    rating: 4.6,
    reviews: 143,
    badge: 'Standard',
    guests: '2 guests',
    beds: '1 bed',
    baths: '1 bath',
    image: unsplash('photo-1560448204-e02f11c3d0e2', 900),
    alt: 'Compact bright suite with a work desk',
  },
  {
    id: 7,
    title: 'Hillside Studio',
    location: 'Greenfield, Pune',
    price: 2400,
    rating: 4.5,
    reviews: 58,
    badge: 'New',
    guests: '2 guests',
    beds: '1 bed',
    baths: '1 bath',
    image: unsplash('photo-1522708323590-d24dbb6b0267', 900),
    alt: 'Studio with floor to ceiling windows and a reading chair',
  },
];

/* ------------------------------------------------------------------ */
/* Categories                                                          */
/* ------------------------------------------------------------------ */

export const categories = [
  {
    accent: 'Premium',
    rest: 'Spaces',
    count: 24,
    image: unsplash('photo-1616486338812-3dadae4b4ace', 800),
    alt: 'Premium living space with sculptural furniture',
  },
  {
    accent: 'Cozy',
    rest: 'Corners',
    count: 18,
    image: unsplash('photo-1616594039964-ae9021a400a0', 800),
    alt: 'Cosy bedroom corner with layered linen',
  },
  {
    accent: 'Bright',
    rest: 'Views',
    count: 15,
    image: unsplash('photo-1600585152220-90363fe7e115', 800),
    alt: 'Sunlit room looking out over greenery',
  },
  {
    accent: 'Open',
    rest: 'Layouts',
    count: 12,
    image: unsplash('photo-1600210491892-03d54c0aaf87', 800),
    alt: 'Open plan kitchen and dining space',
  },
  {
    accent: 'Modern',
    rest: 'Designs',
    count: 20,
    image: unsplash('photo-1600573472592-401b489a3cdc', 800),
    alt: 'Modern minimalist interior with warm wood',
  },
  {
    accent: 'Family',
    rest: 'Zones',
    count: 9,
    image: unsplash('photo-1600607688969-a5bfcd646154', 800),
    alt: 'Family room with generous seating',
  },
];

/* ------------------------------------------------------------------ */
/* Value props                                                         */
/* ------------------------------------------------------------------ */

export const values = [
  {
    index: '01',
    accent: 'Affordable',
    rest: 'Stays',
    eyebrow: 'Fair Pricing',
    body: 'Transparent nightly rates with no hidden service fees. Every stay is priced against its neighbourhood, so you pay for the home, not the middleman.',
    price: 'From ₹2,400 / night',
    images: [
      {
        src: unsplash('photo-1600566752355-35792bedcfea', 500),
        alt: 'Warm living room in an affordable homestay',
      },
      {
        src: unsplash('photo-1560185007-c5ca9d2c014d', 500),
        alt: 'Bright bedroom with linen bedding',
      },
    ],
  },
  {
    index: '02',
    accent: 'Homelike',
    rest: 'Comfort',
    eyebrow: 'Thoughtful Stays',
    body: 'A kitchen you will actually cook in, linen washed in sunlight, and a host who leaves the lights on. All the things a hotel forgets.',
    price: '4.9 average guest rating',
    images: [
      {
        src: unsplash('photo-1586023492125-27b2c045efd7', 500),
        alt: 'Comfortable sofa with soft throws',
      },
      {
        src: unsplash('photo-1615873968403-89e068629265', 500),
        alt: 'Reading nook with warm lighting',
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Showcase rooms                                                      */
/* ------------------------------------------------------------------ */

export const rooms = [
  {
    name: 'Living Room',
    size: '420 sq ft',
    image: unsplash('photo-1618221195710-dd6b41faaea6', 1800),
    alt: 'Escapinocle living room with low seating and warm afternoon light',
  },
  {
    name: 'Bedroom',
    size: '260 sq ft',
    image: unsplash('photo-1631049307264-da0ec9d70304', 1800),
    alt: 'Escapinocle bedroom with a linen dressed bed',
  },
  {
    name: 'Kitchen',
    size: '180 sq ft',
    image: unsplash('photo-1600566753376-12c8ab7fb75b', 1800),
    alt: 'Escapinocle kitchen with open shelving',
  },
  {
    name: 'Bath',
    size: '120 sq ft',
    image: unsplash('photo-1616627547584-bf28cee262db', 1800),
    alt: 'Escapinocle bathroom with stone finishes',
  },
];

/* ------------------------------------------------------------------ */
/* Stories                                                             */
/* ------------------------------------------------------------------ */

export const stories = [
  {
    name: 'Ananya Rao',
    date: 'March 2026',
    rating: 5,
    tag: 'Cleanliness',
    property: 'The Courtyard House · HSR Layout',
    quote:
      'The house smelled like fresh coffee and rain. We cooked two proper meals, slept ten hours, and left wishing we had booked one more night.',
    avatar: unsplash('photo-1494790108377-be9c29b29330', 160),
  },
  {
    name: 'Rohan Iyer',
    date: 'February 2026',
    rating: 4.5,
    tag: 'Location',
    property: 'Verdant Villa · Riverfront',
    quote:
      'Five minutes from the water, fifteen from the city, and not a single sound at night. The host had a list of places that actually turned out to be good.',
    avatar: unsplash('photo-1507003211169-0a1dd7228f2d', 160),
  },
  {
    name: 'Meera Nair',
    date: 'January 2026',
    rating: 5,
    tag: 'Host',
    property: 'Old Town Loft · Jaipur',
    quote:
      'I have stayed in a lot of rented homes. This is the first one that felt like someone had thought about where I would put my keys.',
    avatar: unsplash('photo-1534528741775-53994a69daeb', 160),
  },
  {
    name: 'Arjun Mehta',
    date: 'December 2025',
    rating: 5,
    tag: 'Value',
    property: 'The Glass House · Greenfield',
    quote:
      'Four adults, a dog, and a very slow Sunday. The glass wall opens completely, so the garden basically becomes part of the living room.',
    avatar: unsplash('photo-1500648767791-00dcc994a43e', 160),
  },
  {
    name: 'Sana Khan',
    date: 'November 2025',
    rating: 4.5,
    tag: 'Comfort',
    property: 'Mango Tree Cottage · Goa',
    quote:
      'The beds were the kind you sink into. We did nothing for three days and it was exactly the point of the trip.',
    avatar: unsplash('photo-1517841905240-472988babdf9', 160),
  },
  {
    name: 'Vikram Shetty',
    date: 'October 2025',
    rating: 5,
    tag: 'Design',
    property: 'Tech Park Suite · Bengaluru',
    quote:
      'Clean lines, a desk by the window, and coffee within walking distance. I booked two more weeks before I checked out.',
    avatar: unsplash('photo-1506794778202-cad84cf45f1d', 160),
  },
];

/* ------------------------------------------------------------------ */
/* Footer                                                              */
/* ------------------------------------------------------------------ */

export const footerColumns = [
  {
    title: 'Company',
    links: ['About us', 'Careers', 'Press', 'Partners'],
  },
  {
    title: 'Support',
    links: ['Help centre', 'Cancellation options', 'Host guidelines', 'Contact'],
  },
  {
    title: 'Legal',
    links: ['Privacy', 'Terms', 'Cookies', 'Accessibility'],
  },
];

export const socials = [
  { name: 'Instagram', href: '#' },
  { name: 'Facebook', href: '#' },
  { name: 'YouTube', href: '#' },
  { name: 'LinkedIn', href: '#' },
];
