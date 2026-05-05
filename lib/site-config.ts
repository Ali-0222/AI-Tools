export const siteConfig = {
  name: "Toolbee Pro",
  url: "https://toolbeepro.com",
  email: "toolbeepro@gmail.com",
  googleAnalyticsId: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID ?? "G-RJTFPY0G35",
  googleSiteVerification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ?? "",
  bingSiteVerification: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION ?? "",
  adsenseAccount: "ca-pub-2873527744568249",
  adsensePublisher: "pub-2873527744568249"
} as const;
