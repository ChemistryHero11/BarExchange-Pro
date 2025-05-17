export type UserRole = 'admin' | 'owner' | 'staff' | 'display' | null;

export interface AppUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  role: UserRole;
  barId?: string; // For owners, staff to associate with a specific bar
}
