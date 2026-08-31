import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n";
import { ClinicalBand } from "@/components/clinical-band";
import { FeaturedInsights } from "@/components/featured-insights";
import { HomeCta } from "@/components/home-cta";
import { HomeHero } from "@/components/home-hero";
import { Manifesto } from "@/components/manifesto";
import { Marquee } from "@/components/marquee";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;

  return (
    <>
      <HomeHero locale={locale} />
      <Marquee locale={locale} />
      <Manifesto locale={locale} />
      <FeaturedInsights locale={locale} />
      <ClinicalBand locale={locale} />
      <HomeCta locale={locale} />
    </>
  );
}
