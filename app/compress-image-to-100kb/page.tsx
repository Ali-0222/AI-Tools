import { ToolLandingPage, buildToolLandingMetadata } from "@/components/tool-landing-page";
import { getRequiredLandingPage } from "@/lib/landing-pages";

const pageData = getRequiredLandingPage("compress-image-to-100kb");

export const metadata = buildToolLandingMetadata(pageData);

export default function CompressImageTo100kbPage() {
  return <ToolLandingPage page={pageData} />;
}
