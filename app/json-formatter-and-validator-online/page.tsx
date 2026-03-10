import { ToolLandingPage, buildToolLandingMetadata } from "@/components/tool-landing-page";
import { getRequiredLandingPage } from "@/lib/landing-pages";

const pageData = getRequiredLandingPage("json-formatter-and-validator-online");

export const metadata = buildToolLandingMetadata(pageData);

export default function JsonFormatterAndValidatorOnlinePage() {
  return <ToolLandingPage page={pageData} />;
}
