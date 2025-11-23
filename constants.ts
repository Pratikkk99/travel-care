import { Clinic, Review, User, UserRole } from './types';

export const MOCK_USERS: User[] = [
  {
    id: 'u1',
    name: 'Rahul Sharma',
    email: 'rahul@example.com',
    role: UserRole.PATIENT,
    avatarUrl: 'https://picsum.photos/id/1005/200/200'
  },
  {
    id: 'u2',
    name: 'Dr. Anjali Gupta',
    email: 'anjali@lifecare.com',
    role: UserRole.PROVIDER,
    avatarUrl: 'https://picsum.photos/id/1011/200/200'
  },
  {
    id: 'u3',
    name: 'Admin User',
    email: 'admin@pitlabs.com',
    role: UserRole.ADMIN
  }
];

export const MOCK_CLINICS: Clinic[] = [
  {
    id: 'c1',
    name: 'LifeCare Dialysis Center',
    address: '12, MG Road, Indiranagar',
    city: 'Bangalore',
    state: 'Karnataka',
    type: 'Dialysis',
    rating: 4.8,
    reviewCount: 124,
    pricePerSession: 1500,
    description: 'State-of-the-art hemodialysis facility with certified nephrologists on call. Clean, hygienic, and tourist-friendly.',
    amenities: ['Wi-Fi', 'Wheelchair Access', 'TV', 'Private Suites'],
    imageUrl: 'https://picsum.photos/seed/clinic1/800/600',
    verified: true,
    latitude: 12.9716,
    longitude: 77.5946
  },
  {
    id: 'c2',
    name: 'City Blood Transfusion Unit',
    address: '45, Link Road, Bandra West',
    city: 'Mumbai',
    state: 'Maharashtra',
    type: 'Thalassemia',
    rating: 4.5,
    reviewCount: 89,
    pricePerSession: 800,
    description: 'Dedicated thalassemia support center providing safe blood transfusions and chelation therapy support.',
    amenities: ['Emergency Care', 'Counseling', 'Play Area'],
    imageUrl: 'https://picsum.photos/seed/clinic2/800/600',
    verified: true,
    latitude: 19.0760,
    longitude: 72.8777
  },
  {
    id: 'c3',
    name: 'Wellness Kidney Care',
    address: 'Sector 18, Near Metro Station',
    city: 'Noida',
    state: 'Uttar Pradesh',
    type: 'Dialysis',
    rating: 4.2,
    reviewCount: 56,
    pricePerSession: 1200,
    description: 'Affordable and reliable kidney care center. Open 24/7 for emergency sessions.',
    amenities: ['24/7 Open', 'Parking', 'Cafeteria'],
    imageUrl: 'https://picsum.photos/seed/clinic3/800/600',
    verified: false,
    latitude: 28.5355,
    longitude: 77.3910
  },
  {
    id: 'c4',
    name: 'Goa Renal Retreat',
    address: 'Calangute-Baga Road',
    city: 'Goa',
    state: 'Goa',
    type: 'Dialysis',
    rating: 4.9,
    reviewCount: 210,
    pricePerSession: 2500,
    description: 'Combine your vacation with care. Luxury dialysis suites overlooking the serene landscape.',
    amenities: ['Luxury Suites', 'Pick-up/Drop', 'Dietary Consult'],
    imageUrl: 'https://picsum.photos/seed/clinic4/800/600',
    verified: true,
    latitude: 15.2993,
    longitude: 74.1240
  },
  {
    id: 'c5',
    name: 'Chennai Kidney Institute',
    address: 'Anna Nagar West',
    city: 'Chennai',
    state: 'Tamil Nadu',
    type: 'Dialysis',
    rating: 4.7,
    reviewCount: 150,
    pricePerSession: 1350,
    description: 'Advanced renal care facility specializing in travel dialysis for international and domestic tourists.',
    amenities: ['Interpreter Service', 'ISO Certified', 'Insurance Accepted'],
    imageUrl: 'https://picsum.photos/seed/clinic5/800/600',
    verified: true,
    latitude: 13.0827,
    longitude: 80.2707
  },
  {
    id: 'c6',
    name: 'Capital Thalassemia Care',
    address: 'Lajpat Nagar II',
    city: 'Delhi',
    state: 'Delhi',
    type: 'Thalassemia',
    rating: 4.6,
    reviewCount: 92,
    pricePerSession: 600,
    description: 'Non-profit supported unit providing highly subsidized transfusion services for travelers.',
    amenities: ['Subsidized Cost', 'Community Hall', 'Refreshments'],
    imageUrl: 'https://picsum.photos/seed/clinic6/800/600',
    verified: true,
    latitude: 28.5685,
    longitude: 77.2405
  },
  {
    id: 'c7',
    name: 'Hyderabad Renal Center',
    address: 'Banjara Hills, Road No. 12',
    city: 'Hyderabad',
    state: 'Telangana',
    type: 'Multi-Specialty',
    rating: 4.4,
    reviewCount: 75,
    pricePerSession: 1800,
    description: 'Premium multi-specialty clinic offering hemodialysis and general physician consultations.',
    amenities: ['Valet Parking', 'Premium Lounge', 'Lab Services'],
    imageUrl: 'https://picsum.photos/seed/clinic7/800/600',
    verified: true,
    latitude: 17.3850,
    longitude: 78.4867
  }
];

export const MOCK_REVIEWS: Review[] = [
  {
    id: 'r1',
    clinicId: 'c1',
    userId: 'u101',
    userName: 'Amit Patel',
    rating: 5,
    comment: 'Excellent service! The staff was very accommodating of my travel schedule.',
    date: '2024-01-15'
  },
  {
    id: 'r2',
    clinicId: 'c1',
    userId: 'u102',
    userName: 'Sarah Jenkins',
    rating: 4,
    comment: 'Clean facility, but wait time was a bit long.',
    date: '2024-02-20'
  }
];