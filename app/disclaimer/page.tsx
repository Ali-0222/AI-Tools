import { Metadata } from "next";
import { StaticPage } from "@/components/static-page";

export const metadata: Metadata = {
  title: "Disclaimer",
  description:
    "Read the disclaimer for Easy Web Tools regarding informational use, tool accuracy, and limitation of liability.",
  alternates: {
    canonical: "/disclaimer"
  }
};

export default function DisclaimerPage() {
  return (
    <StaticPage
      title="Disclaimer"
      description="The tools and information on this site are provided for general informational and convenience purposes."
    >
      <p>
        Easy Web Tools provides browser-based utilities as-is. While the tools are designed to be useful and practical, no guarantee is made regarding completeness, accuracy, or suitability for a particular purpose.
      </p>
      <p>
        Users are responsible for checking generated output before relying on it. This is especially important for document handling, calculations, or data formatting.
      </p>
      <p>
        The website owner is not liable for loss, damages, or consequences resulting from the use or inability to use the tools or information provided on the site.
      </p>
    </StaticPage>
  );
}
