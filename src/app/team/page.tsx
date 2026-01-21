import { Metadata } from "next";
import { TeamClient } from "./TeamClient";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Meet the Team | TextGauge Developer Tools",
  description:
    "Meet Denes Vaghani, founder of TextGauge. Learn about our mission to build free, privacy-first developer tools. 17+ tools, 100% browser-based, zero data uploads.",
  keywords: [
    "TextGauge team",
    "Denes Vaghani",
    "developer tools founder",
    "privacy-focused developer",
    "AI-accelerated development",
    "software engineer",
    "browser-based tools creator"
  ],
  alternates: {
    canonical: "https://www.countcharacters.org/team",
  },
  openGraph: {
    title: "Meet the Team Behind TextGauge | Free Developer Tools",
    description:
      "Denes Vaghani is building the next generation of privacy-focused developer tools. 17+ tools, 247+ automated tests, 100% client-side processing.",
    type: "profile",
    images: [
      {
        url: "https://www.countcharacters.org/images/team/denes-vaghani.jpg",
        width: 400,
        height: 400,
        alt: "Denes Vaghani - Founder of TextGauge",
      }
    ],
  },
  twitter: {
    card: "summary",
    title: "Meet the Team Behind TextGauge",
    description: "Building privacy-first developer tools. 17+ tools, 100% browser-based.",
    images: ["https://www.countcharacters.org/images/team/denes-vaghani.jpg"],
  },
  authors: [{ name: "Denes Vaghani", url: "https://www.linkedin.com/in/denesvaghani/" }],
};

// Person Schema for E-E-A-T (Google's Experience, Expertise, Authoritativeness, Trustworthiness)
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://www.countcharacters.org/team#founder",
  name: "Denes Vaghani",
  url: "https://www.countcharacters.org/team",
  image: "https://www.countcharacters.org/images/team/denes-vaghani.jpg",
  sameAs: [
    "https://www.linkedin.com/in/denesvaghani/",
    "https://github.com/denesvaghani"
  ],
  jobTitle: "Founder & Lead Developer",
  worksFor: {
    "@type": "Organization",
    name: "TextGauge",
    url: "https://www.countcharacters.org"
  },
  knowsAbout: [
    "Web Development",
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "AI Integration",
    "Privacy-First Architecture",
    "Developer Tools"
  ],
  description: "Software engineer and founder of TextGauge, building free privacy-first developer tools including JSON formatters, image compressors, and code utilities."
};

// AboutPage Schema for content credibility
const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": "https://www.countcharacters.org/team",
  name: "Meet the Team Behind TextGauge",
  description: "Learn about the founder building privacy-first developer tools used by thousands of developers worldwide.",
  mainEntity: {
    "@id": "https://www.countcharacters.org/team#founder"
  },
  publisher: {
    "@type": "Organization",
    name: "TextGauge",
    url: "https://www.countcharacters.org"
  },
  datePublished: "2024-01-01",
  dateModified: new Date().toISOString().split('T')[0]
};

export default function TeamPage() {
  return (
    <>
      {/* Person Schema for E-E-A-T */}
      <Script
        id="person-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      {/* AboutPage Schema */}
      <Script
        id="about-page-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
      />
      <TeamClient />
    </>
  );
}
