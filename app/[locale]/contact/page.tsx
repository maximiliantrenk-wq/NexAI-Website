import type { Metadata } from "next";
import { Mail, Phone, CalendarClock, MapPin, Clock } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { PageHero } from "@/components/sections/page-hero";
import { ContactForm } from "@/components/sections/contact-form";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Contact" });
  return { title: t("meta.title") };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ContactContent />;
}

function ContactContent() {
  const hero = useTranslations("Contact.hero");
  const info = useTranslations("Contact.info");

  const infoItems = [
    { icon: Mail, label: info("emailLabel"), value: info("email"), href: `mailto:${info("email")}` },
    { icon: Phone, label: info("phoneLabel"), value: info("phone"), href: `tel:${info("phone").replace(/\s/g, "")}` },
    { icon: MapPin, label: info("locationLabel"), value: info("location") },
    { icon: Clock, label: info("responseLabel"), value: info("response") },
  ];

  return (
    <>
      <PageHero
        eyebrow={hero("eyebrow")}
        title={hero("title")}
        description={hero("description")}
      />
      <Section className="pt-4">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
            <ContactForm />

            <div className="flex flex-col gap-8">
              {infoItems.map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-line bg-white/[0.03]">
                    <item.icon className="size-5 text-blue-bright" />
                  </span>
                  <div>
                    <p className="eyebrow">{item.label}</p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="mt-1.5 block text-[15px] text-fg transition-colors hover:text-blue-bright"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="mt-1.5 text-[15px] text-fg">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}

              <div className="surface-card mt-2 rounded-2xl p-6">
                <span className="grid size-11 place-items-center rounded-xl bg-gradient-to-br from-blue to-purple">
                  <CalendarClock className="size-5 text-white" />
                </span>
                <p className="mt-4 text-[15px] font-medium text-fg">
                  {info("bookLabel")}
                </p>
                <a
                  href="#"
                  className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-blue-bright hover:underline"
                >
                  {info("book")} →
                </a>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
