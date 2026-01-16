import { Metadata } from "next";
import { TeamClient } from "./TeamClient";

export const metadata: Metadata = {
  title: "Meet the Team | TextGauge",
  description:
    "Learn about the experts behind TextGauge. Meet our founder Denes Vaghani and discover our mission to build privacy-first, AI-accelerated developer tools.",
  alternates: {
    canonical: "https://www.countcharacters.org/team",
  },
  openGraph: {
    title: "Meet the Team | TextGauge",
    description:
      "Meet the software engineers building the next generation of privacy-focused developer tools.",
    type: "website",
  },
};

export default function TeamPage() {
  return <TeamClient />;
}
