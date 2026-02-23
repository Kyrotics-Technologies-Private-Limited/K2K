// User interface
export interface User {
  uid: string;
  name: string | null;
  email: string | null;
  phone: string;
  createdAt?: Date;
  updatedAt?: Date;
  profilePicture?: string;
  needsProfileCompletion?: boolean;
}