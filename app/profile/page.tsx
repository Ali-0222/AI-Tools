import { Metadata } from "next";
import { ProfilePage } from "@/components/profile/profile-page";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "My Profile",
  description: "View your saved CV templates and profile details.",
  path: "/profile",
  noIndex: true
});

export default function ProfileRoute() {
  return (
    <main className="px-4 py-12">
      <ProfilePage />
    </main>
  );
}
