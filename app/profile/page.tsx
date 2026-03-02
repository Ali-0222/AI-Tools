import { Metadata } from "next";
import { ProfilePage } from "@/components/profile/profile-page";

export const metadata: Metadata = {
  title: "My Profile",
  description: "View your saved CV templates and profile details."
};

export default function ProfileRoute() {
  return (
    <main className="px-4 py-12">
      <ProfilePage />
    </main>
  );
}
