import React from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactInfo } from "@/components/contact/ContactInfo";
import { FadeIn } from "@/components/motion/FadeIn";
import { getProfile, getSocials } from "@/lib/data";

export const metadata = {
  title: "Contact",
  description:
    "Direct communication channel to get in touch with Mani Kumar for full-stack engineering roles, advisory, or research inquiries.",
};

export default async function ContactPage() {
  const profile = await getProfile();
  const socials = await getSocials();

  return (
    <PageContainer maxWidth="wide" className="pt-28 sm:pt-36 pb-16 sm:pb-24">
      <FadeIn>
        <div className="mb-8 sm:mb-12">
          <SectionHeading
            eyebrow="05 // COMMUNICATION CHANNEL"
            title="Connect & Collaborate"
            description="Have a technical inquiry, project proposal, or research question? Send a direct message payload or connect on verified platforms."
          />
        </div>
      </FadeIn>

      <FadeIn delay={0.2} className="mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <ContactForm />
          <ContactInfo profile={profile} socials={socials} />
        </div>
      </FadeIn>
    </PageContainer>
  );
}
