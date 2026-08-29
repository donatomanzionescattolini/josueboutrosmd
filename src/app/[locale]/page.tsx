import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n";
import { EditorialHome } from "@/components/editorial-home";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  return <EditorialHome locale={locale} />;
}
