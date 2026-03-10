import { ToolLandingPage, buildToolLandingMetadata } from "@/components/tool-landing-page";
import { getRequiredLandingPage } from "@/lib/landing-pages";

const pageData = getRequiredLandingPage("merge-pdf-files-free-online-without-watermark");

export const metadata = buildToolLandingMetadata(pageData);

export default function MergePdfFilesFreeOnlineWithoutWatermarkPage() {
  return <ToolLandingPage page={pageData} />;
}
