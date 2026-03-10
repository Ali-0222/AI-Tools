import { ToolLandingPage, buildToolLandingMetadata } from "@/components/tool-landing-page";
import { getRequiredLandingPage } from "@/lib/landing-pages";

const pageData = getRequiredLandingPage("compress-image-to-200kb");

export const metadata = buildToolLandingMetadata(pageData);

export default function CompressImageTo200kbPage() {
  return <ToolLandingPage page={pageData} />;
}
