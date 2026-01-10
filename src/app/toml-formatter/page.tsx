import { Metadata } from "next";
import TomlFormatterClient from "./TomlFormatterClient";

export const metadata: Metadata = {
  title: "TOML Formatter & Validator | Beautify & Fix TOML Online",
  description: "Free online TOML Formatter and Validator. Fix TOML syntax errors, format configuration files (Cargo.toml, pyproject.toml), and beautify TOML instantly.",
  alternates: {
    canonical: "https://www.countcharacters.org/toml-formatter",
  },
  openGraph: {
    title: "TOML Formatter & Validator | Beautify & Fix TOML Online",
    description: "Free online TOML Formatter and Validator. Fix TOML syntax errors, format configuration files (Cargo.toml, pyproject.toml), and beautify TOML instantly.",
    url: "https://www.countcharacters.org/toml-formatter",
    siteName: "countcharacters.org",
    type: "website",
  },
};

export default function Page() {
  return <TomlFormatterClient />;
}
