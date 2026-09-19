import React from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactInfo } from "@/components/contact/ContactInfo";
import { FadeIn } from "@/components/motion/FadeIn";
import { getProfile, getSocials } from "@/lib/data";

export default async function ContactPage() {
  const profile = await getProfile();
  const socials = await getSocials();

  return (
    <PageContainer maxWidth="wide" className="py-24 sm:py-32">
      <FadeIn>
        <SectionHeading
          eyebrow="GET IN TOUCH"
          title="Connect & Collaborate"
          description="Have a technical inquiry, project proposal, or research question? Send a direct message or connect on social platforms."
        />
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
