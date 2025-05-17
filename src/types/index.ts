import type { Timestamp as FirestoreTimestamp } from 'firebase/firestore'; // For server-side (functions)
// For client-side, 'firebase/firestore' also exports Timestamp, or use Date and convert.

export type UserRole = 'admin' | 'owner' | 'staff' | 'display' | null;

export interface AppUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  role: UserRole;
  barId?: string; // For owners, staff, display to associate with a specific bar
}

export interface Bar {
  id: string; // documentId
  name: string;
  ownerId: string; // UID of the owner
  // other bar settings like address, currency, etc.
}

export interface Drink {
  id: string; // documentId
  // barId: string; // If drinks are in a subcollection, barId is implicit from path
  name: string;
  category: string;
  description?: string;
  imageUrl?: string;
  basePrice: number; // The standard price set by the owner
  currentPrice: number; // The dynamically adjusted price
  previousPrice?: number; // Price before the most recent update, for UI indicators
  lastPriceUpdate: FirestoreTimestamp | Date; // Timestamp of the last price change
  totalSold: number; // Lifetime sales count for this drink
  // Potentially, parameters for dynamic pricing if not global for the bar:
  // priceSensitivityFactor?: number; // 'k' or similar
  // demandLevel?: 'low' | 'medium' | 'high'; // Could be manually set or AI-driven
}

export interface OrderItem {
  drinkId: string;
  drinkName: string; // Denormalized for easier display on order details/history
  quantity: number;
  pricePerUnit: number; // Price of the drink at the time of order
  // totalOrderItemPrice = quantity * pricePerUnit
}

export interface Order {
  id: string; // documentId
  barId: string; // ID of the bar where the order was placed
  items: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  createdAt: FirestoreTimestamp | Date; // Timestamp of order creation
  createdBy: string; // UID of the user (staff/owner) who created the order
  // customerId?: string; // If there's a customer concept
}
