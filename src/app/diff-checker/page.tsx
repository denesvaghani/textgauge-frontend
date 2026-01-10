import { Metadata } from "next";
import DiffCheckerClient from "./DiffCheckerClient";

export const metadata: Metadata = {
  title: "Text Diff Checker Online | Compare Two Files & Texts",
  description: "Free online Diff Checker tool. Compare two text files, code snippets, or JSON/YAML/XML files. Find differences instantly with line-by-line comparison. Secure, client-side processing.",
  alternates: {
    canonical: "https://www.countcharacters.org/diff-checker",
  },
  openGraph: {
    title: "Text Diff Checker Online | Compare Two Files & Texts",
    description: "Free online Diff Checker tool. Compare two text files, code snippets, or JSON/YAML/XML files. Find differences instantly.",
    url: "https://www.countcharacters.org/diff-checker",
    siteName: "countcharacters.org",
    type: "website",
  },
};

export default function Page() {
  return <DiffCheckerClient />;
}
