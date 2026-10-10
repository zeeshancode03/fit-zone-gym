import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "sonner";
import { Navbar } from "@/components/gym/Navbar";
import { Hero } from "@/components/gym/Hero";
import { Programs } from "@/components/gym/Programs";
import { Trainers } from "@/components/gym/Trainers";
import { Pricing } from "@/components/gym/Pricing";
import { Calculator } from "@/components/gym/Calculator";
import { Footer } from "@/components/gym/Footer";

const title = "IRONVOLT — 24/7 Strength & Conditioning Gym";
const description =
  "Train at IRONVOLT: 3D-powered programs for bodybuilding, cardio, crossfit and MMA, certified coaches, and no-contract memberships.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="bg-background min-h-screen">
      <Navbar />
      <Hero />
      <Programs />
      <Trainers />
      <Calculator />
      <Pricing />
      <Footer />
      <Toaster theme="dark" position="top-center" />
    </main>
  );
}
