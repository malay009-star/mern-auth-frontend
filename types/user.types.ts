export interface IUserProfile {
  id: string;
  username: string;
  email: string;
  role: "user" | "admin";
  profileImage: string | null;
  phone: string | null;
  bio: string | null;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProfileApiResponse {
  success: boolean;
  message: string;
  user: IUserProfile;
}
