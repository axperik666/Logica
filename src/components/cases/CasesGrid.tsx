"use client";

import { useMemo, useState } from "react";
import CaseCard from "./CaseCard";
import { casesData } from "@/lib/casesData";
import { motion } from "framer-motion";

const niches = [
  "Все",
  "Медицина",
  "E-commerce",
  "EdTech",
  "Beauty",
  "Строительство",
  "Недвижимость",
  "Фитнес",
  "Производство",
  "Авто",
  "HoReCa",
  "IT / SaaS"
];

export default function CasesGrid() {
  const [activeFilter, setActiveFilter] = useState("Все");

  const filteredCases = useMemo(() => {
    if (activeFilter === "Все") return casesData;
    return casesData.filter((c) => c.niche === activeFilter);
  }, [activeFilter]);

  return (
    <section id="cases" className="py-20 md:py-28 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-5 md:px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white mb-4">
            Real Results
          </h2>
          <p className="text-xl md:text-2xl text-gray-400">15 proven cases with video proof</p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-10 md:mb-14">
          {niches.map((niche) => (
            <motion.button
              key={niche}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveFilter(niche)}
              className={`px-6 py-3 rounded-2xl text-sm font-medium transition-all whitespace-nowrap ${
                activeFilter === niche
                  ? "bg-white text-black shadow-lg"
                  : "bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white border border-white/10"
              }`}
            >
              {niche}
            </motion.button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredCases.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.04 }}
              viewport={{ once: true }}
            >
              <CaseCard
                client={item.client}
                niche={item.niche}
                result={item.result}
                description={item.description}
                video={item.video}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
