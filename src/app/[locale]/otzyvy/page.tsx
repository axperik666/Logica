import type { Metadata } from "next";
import { Testimonials } from "@/components/sections/Testimonials";

export const metadata: Metadata = {
  title: "Отзывы",
  description: "Отзывы клиентов LOGICA Marketing — рост, ROI и прозрачная работа."
};

export default function TestimonialsPage() {
  return <Testimonials />;
}

