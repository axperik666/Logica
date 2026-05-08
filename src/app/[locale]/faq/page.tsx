import type { Metadata } from "next";
import { FAQ } from "@/components/sections/FAQ";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Ответы на частые вопросы о формате работы LOGICA Marketing."
};

export default function FaqPage() {
  return <FAQ />;
}

