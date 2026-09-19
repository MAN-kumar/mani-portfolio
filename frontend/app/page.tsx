import React from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { HomePageContent } from "@/components/home/HomePageContent";
import {
  getProfile,
  getFeaturedProjects,
  getSkills,
  getResearch,
  getJourney,
} from "@/lib/data";

export default async function HomePage() {
  const profile = await getProfile();
  const featuredProjects = await getFeaturedProjects();
  const skills = await getSkills();
  const researchList = await getResearch();
  const journeyItems = await getJourney();

  return (
    <PageContainer maxWidth="wide">
      <HomePageContent
        profile={profile}
        featuredProjects={featuredProjects}
        skills={skills}
        researchList={researchList}
        journeyItems={journeyItems}
      />
    </PageContainer>
  );
}
