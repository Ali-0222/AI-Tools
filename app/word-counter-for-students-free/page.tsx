import { ToolLandingPage, buildToolLandingMetadata } from "@/components/tool-landing-page";
import { getRequiredLandingPage } from "@/lib/landing-pages";

const pageData = getRequiredLandingPage("word-counter-for-students-free");

export const metadata = buildToolLandingMetadata(pageData);

export default function WordCounterForStudentsFreePage() {
  return <ToolLandingPage page={pageData} />;
}
