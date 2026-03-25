import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection, { StaggerItem } from "../components/AnimatedSection";
import ParallaxBackground from "../components/ParallaxBackground";
import WaveDivider from "../components/WaveDivider";
import { useCounter } from "../hooks/useCounter";

function HeroSection() {
  return (
    <ParallaxBackground
      speed={0.3}
      backgroundImage="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&h=800&fit=crop"
      overlayColor="from-primary-950/85 to-primary-900/70"
      height="min-h-[50vh]"
    >
      <div className="container-custom pt-32 pb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-sm font-semibold text-primary-300 uppercase tracking-wider">
            Open Government
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-2 mb-4">
            Transparency
          </h1>
          <p className="text-lg text-primary-100/80 max-w-2xl mx-auto">
            Access public documents, budget information, and government
            financial disclosures.
          </p>
        </motion.div>
      </div>
    </ParallaxBackground>
  );
}

const budgetData = [
  { category: "Infrastructure", amount: 45000000, color: "#2e7d32" },
  { category: "Social Services", amount: 32000000, color: "#4caf50" },
  { category: "Health", amount: 28000000, color: "#66bb6a" },
  { category: "Education", amount: 22000000, color: "#81c784" },
  { category: "Environment", amount: 15000000, color: "#a5d6a7" },
  { category: "Administration", amount: 8000000, color: "#c8e6c9" },
];

const documents = [
  {
    id: 1,
    title: "Annual Budget 2025",
    type: "PDF",
    size: "2.4 MB",
    date: "Jan 15, 2025",
    icon: "📊",
  },
  {
    id: 2,
    title: "Statement of Receipts & Expenditures (SRE)",
    type: "PDF",
    size: "1.8 MB",
    date: "Mar 10, 2025",
    icon: "💰",
  },
  {
    id: 3,
    title: "Commission on Audit Report 2024",
    type: "PDF",
    size: "5.2 MB",
    date: "Feb 28, 2025",
    icon: "📋",
  },
  {
    id: 4,
    title: "Procurement Plans 2025",
    type: "PDF",
    size: "3.1 MB",
    date: "Jan 20, 2025",
    icon: "📦",
  },
  {
    id: 5,
    title: "Full Disclosure Policy Documents",
    type: "ZIP",
    size: "12.5 MB",
    date: "Mar 01, 2025",
    icon: "🔒",
  },
  {
    id: 6,
    title: "Citizen's Charter",
    type: "PDF",
    size: "1.2 MB",
    date: "Dec 15, 2024",
    icon: "📖",
  },
  {
    id: 7,
    title: "Sangguniang Bayan Resolutions",
    type: "PDF",
    size: "800 KB",
    date: "Mar 15, 2025",
    icon: "📜",
  },
  {
    id: 8,
    title: "Local Revenue Collection Report",
    type: "XLS",
    size: "650 KB",
    date: "Mar 18, 2025",
    icon: "📈",
  },
];

const years = ["2025", "2024", "2023", "2022"];
const yearReports = {
  2025: {
    budget: "₱150M",
    collected: "₱142M",
    projects: 48,
    population: "125,000",
  },
  2024: {
    budget: "₱138M",
    collected: "₱131M",
    projects: 42,
    population: "122,000",
  },
  2023: {
    budget: "₱125M",
    collected: "₱120M",
    projects: 38,
    population: "119,500",
  },
  2022: {
    budget: "₱115M",
    collected: "₱108M",
    projects: 35,
    population: "117,000",
  },
};

function BudgetChart() {
  const totalBudget = budgetData.reduce((sum, d) => sum + d.amount, 0);

  return (
    <section className="section-padding bg-white dark:bg-gray-800">
      <div className="container-custom">
        <AnimatedSection className="text-center mb-12">
          <span className="text-sm font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wider">
            Financial Overview
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 text-gray-900 dark:text-white">
            Budget Allocation 2025
          </h2>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <AnimatedSection animation="fadeRight">
            <div className="space-y-4">
              {budgetData.map((item, i) => {
                const percentage = (item.amount / totalBudget) * 100;
                return (
                  <motion.div
                    key={item.category}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {item.category}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        ₱{(item.amount / 1000000).toFixed(0)}M (
                        {percentage.toFixed(0)}%)
                      </span>
                    </div>
                    <div className="h-3 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: item.color }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${percentage}%` }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 1,
                          delay: i * 0.1,
                          ease: "easeOut",
                        }}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fadeLeft" delay={0.2}>
            <div className="grid grid-cols-2 gap-6">
              {[
                { label: "Total Budget", value: "₱150M", icon: "💵" },
                { label: "Revenue Collected", value: "₱142M", icon: "📈" },
                { label: "Active Projects", value: "48", icon: "🏗️" },
                { label: "Collection Rate", value: "94.7%", icon: "✅" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-5 text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.03, y: -3 }}
                >
                  <div className="text-2xl mb-2">{stat.icon}</div>
                  <div className="text-2xl font-bold text-primary-700 dark:text-primary-300">
                    {stat.value}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

function DocumentsSection() {
  return (
    <section className="section-padding bg-cream dark:bg-gray-900">
      <div className="container-custom">
        <AnimatedSection className="text-center mb-12">
          <span className="text-sm font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wider">
            Public Documents
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 text-gray-900 dark:text-white">
            Download Documents
          </h2>
        </AnimatedSection>

        <AnimatedSection stagger staggerDelay={0.08}>
          <div className="grid sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {documents.map((doc) => (
              <StaggerItem key={doc.id}>
                <motion.div
                  className="card dark:card-dark p-4 flex items-center gap-4 group cursor-pointer"
                  whileHover={{ x: 4, scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="text-2xl">{doc.icon}</div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white truncate group-hover:text-primary-700 dark:group-hover:text-primary-300 transition-colors">
                      {doc.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-gray-400 mt-0.5">
                      <span
                        className={`px-1.5 py-0.5 rounded ${
                          doc.type === "PDF"
                            ? "bg-red-100 dark:bg-red-900/30 text-red-600"
                            : doc.type === "XLS"
                              ? "bg-green-100 dark:bg-green-900/30 text-green-600"
                              : "bg-blue-100 dark:bg-blue-900/30 text-blue-600"
                        }`}
                      >
                        {doc.type}
                      </span>
                      <span>{doc.size}</span>
                      <span>•</span>
                      <span>{doc.date}</span>
                    </div>
                  </div>
                  <motion.div
                    className="w-10 h-10 bg-primary-50 dark:bg-primary-900/20 rounded-xl flex items-center justify-center text-primary-600 dark:text-primary-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                    whileHover={{ scale: 1.1 }}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </motion.div>
                </motion.div>
              </StaggerItem>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

function YearlyReports() {
  const [activeYear, setActiveYear] = useState("2025");
  const report = yearReports[activeYear];

  return (
    <section className="section-padding bg-white dark:bg-gray-800">
      <div className="container-custom">
        <AnimatedSection className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Yearly Reports
          </h2>
        </AnimatedSection>

        <AnimatedSection>
          <div className="flex justify-center gap-3 mb-10">
            {years.map((year) => (
              <motion.button
                key={year}
                onClick={() => setActiveYear(year)}
                className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                  activeYear === year
                    ? "bg-primary-700 text-white shadow-lg shadow-primary-700/30"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {year}
              </motion.button>
            ))}
          </div>
        </AnimatedSection>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeYear}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="max-w-2xl mx-auto"
          >
            <div className="card dark:card-dark p-8">
              <div className="grid grid-cols-2 gap-6">
                {[
                  { label: "Total Budget", value: report.budget },
                  { label: "Revenue Collected", value: report.collected },
                  { label: "Total Projects", value: report.projects },
                  { label: "Population", value: report.population },
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    className="text-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="text-2xl font-bold text-primary-700 dark:text-primary-300">
                      {item.value}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {item.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

export default function Transparency() {
  return (
    <main>
      <HeroSection />
      <BudgetChart />
      <WaveDivider color="#faf8f5" />
      <DocumentsSection />
      <WaveDivider color="white" flip />
      <YearlyReports />
    </main>
  );
}
