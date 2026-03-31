import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection, { StaggerItem } from "../components/AnimatedSection";
import ParallaxBackground from "../components/ParallaxBackground";
import WaveDivider from "../components/WaveDivider";
import { officials, departments, timeline } from "../data/officials";
import { accordionContent } from "../utils/animationVariants";

function HeroSection() {
  return (
    <ParallaxBackground
      speed={0.3}
      backgroundImage="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1600&h=800&fit=crop"
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
            About Us
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-2 mb-4">
            Our Municipality
          </h1>
          <p className="text-lg text-primary-100/80 max-w-2xl mx-auto">
            Discover the rich history, dedicated leaders, and vibrant community
            that make Greenfield a model of progressive local governance.
          </p>
        </motion.div>
      </div>
    </ParallaxBackground>
  );
}

function MissionVision() {
  const [flipped, setFlipped] = useState(null);

  const cards = [
    {
      title: "Our Mission",
      content:
        "Provide a systematic and accessible records on all Real Property assessments and to deliver basic services to the constituents of Nabunturan.",
      icon: "🎯",
      color: "from-primary-600 to-primary-800",
    },
    {
      title: "Our Vision",
      content:
        "A dynamic and active partner in the revenue generation in sustaining socio-economic growth and development operating within the Municipality of Nabunturan.",
      icon: "👁️",
      color: "from-emerald-600 to-primary-700",
    },
    {
      title: "Goal",
      content:
        "Through continued effort between taxpayers and the Local Government for the realization in uplifting the living condition of Nabunturanos.",
      icon: "💎",
      color: "from-primary-700 to-primary-900",
    },
  ];

  return (
    <section className="section-padding bg-white dark:bg-gray-800">
      <div className="container-custom">
        <AnimatedSection className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Mission, Vision & Goals
          </h2>
        </AnimatedSection>
        <AnimatedSection stagger staggerDelay={0.15}>
          <div className="grid md:grid-cols-3 gap-8">
            {cards.map((card) => (
              <StaggerItem key={card.title}>
                <motion.div
                  className={`relative bg-gradient-to-br ${card.color} rounded-2xl p-8 text-white text-center min-h-[280px] flex flex-col justify-center cursor-pointer group`}
                  whileHover={{ scale: 1.03, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="text-5xl mb-4"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    {card.icon}
                  </motion.div>
                  <h3 className="text-xl font-bold mb-3">{card.title}</h3>
                  <p className="text-white/90 text-sm leading-relaxed">
                    {card.content}
                  </p>
                </motion.div>
              </StaggerItem>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

function HistoryTimeline() {
  return (
    <section className="section-padding bg-cream dark:bg-gray-900">
      <div className="container-custom">
        <AnimatedSection className="text-center mb-16">
          <span className="text-sm font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wider">
            Our Journey
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 text-gray-900 dark:text-white">
            History of Municipality of Nabunturan
          </h2>
        </AnimatedSection>

        <div className="relative max-w-3xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-1/2 md:-translate-x-0.5 top-0 bottom-0 w-0.5 bg-primary-200 dark:bg-primary-800" />

          {timeline.map((item, i) => (
            <AnimatedSection
              key={item.year}
              animation={i % 2 === 0 ? "fadeRight" : "fadeLeft"}
              delay={i * 0.1}
              className={`relative flex items-center mb-12 ${
                i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Dot */}
              <motion.div
                className="absolute left-4 md:left-1/2 w-4 h-4 bg-primary-500 rounded-full -translate-x-1/2 z-10 ring-4 ring-primary-100 dark:ring-primary-900"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 20,
                  delay: i * 0.1,
                }}
              />

              {/* Content */}
              <div
                className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${i % 2 === 0 ? "md:text-right md:pr-8" : "md:text-left md:pl-8"}`}
              >
                <span className="inline-block px-3 py-1 bg-primary-100 dark:bg-primary-800 text-primary-700 dark:text-primary-300 text-sm font-bold rounded-full mb-2">
                  {item.year}
                </span>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {item.event}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

function OfficialsSection() {
  return (
    <section className="section-padding bg-white dark:bg-gray-800">
      <div className="container-custom">
        <AnimatedSection className="text-center mb-12">
          <span className="text-sm font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wider">
            Leadership
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 text-gray-900 dark:text-white">
            Municipal Officials
          </h2>
        </AnimatedSection>

        <AnimatedSection stagger staggerDelay={0.1}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {officials.map((official) => (
              <StaggerItem key={official.id}>
                <motion.div
                  className="group relative overflow-hidden rounded-2xl shadow-xl"
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <img
                      src={official.image}
                      alt={official.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    {/* Dark Overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
                  </div>

                  {/* Content */}
                  <div className="relative p-6 pt-40 min-h-[400px] flex flex-col justify-end text-white text-center">
                    <h3 className="text-xl font-bold mb-1 group-hover:text-primary-300 transition-colors">
                      {official.name}
                    </h3>
                    <p className="text-sm text-primary-300 font-medium mb-2">
                      {official.position}
                    </p>
                    {/* <p className="text-sm text-white/80 leading-relaxed mb-4 line-clamp-3">
                      {official.bio}
                    </p> */}
                    {/* <div className="flex flex-wrap gap-1">
                      {official.achievements.slice(0, 2).map((a, i) => (
                        <span
                          key={i}
                          className="text-xs px-2 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full"
                        >
                          {a}
                        </span>
                      ))}
                    </div> */}
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

function DepartmentsSection() {
  const [expanded, setExpanded] = useState(null);

  return (
    <section className="section-padding bg-cream dark:bg-gray-900">
      <div className="container-custom">
        <AnimatedSection className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Municipal Departments
          </h2>
          <p className="mt-3 text-gray-500 dark:text-gray-400">
            Contact information for all municipal departments
          </p>
        </AnimatedSection>

        <div className="max-w-3xl mx-auto space-y-3">
          {departments.map((dept, i) => (
            <AnimatedSection key={dept.id} animation="fadeUp" delay={i * 0.05}>
              <div className="card dark:card-dark overflow-hidden">
                <button
                  onClick={() =>
                    setExpanded(expanded === dept.id ? null : dept.id)
                  }
                  className="w-full flex items-center justify-between p-4 text-left"
                  aria-expanded={expanded === dept.id}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary-100 dark:bg-primary-800 rounded-xl flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-primary-600 dark:text-primary-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                        {dept.name}
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {dept.head}
                      </p>
                    </div>
                  </div>
                  <motion.svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    animate={{ rotate: expanded === dept.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </motion.svg>
                </button>
                <AnimatePresence>
                  {expanded === dept.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 pt-0 border-t border-gray-100 dark:border-gray-700">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3">
                          <div className="text-xs">
                            <span className="text-gray-400 block mb-0.5">
                              Phone
                            </span>
                            <span className="font-medium text-gray-700 dark:text-gray-300">
                              {dept.phone}
                            </span>
                          </div>
                          <div className="text-xs">
                            <span className="text-gray-400 block mb-0.5">
                              Email
                            </span>
                            <span className="font-medium text-primary-600 dark:text-primary-400">
                              {dept.email}
                            </span>
                          </div>
                          <div className="text-xs">
                            <span className="text-gray-400 block mb-0.5">
                              Location
                            </span>
                            <span className="font-medium text-gray-700 dark:text-gray-300">
                              {dept.floor}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function About() {
  return (
    <main>
      <HeroSection />
      <MissionVision />
      <WaveDivider color="#faf8f5" />
      <HistoryTimeline />
      <OfficialsSection />
      <WaveDivider color="white" flip />
      <DepartmentsSection />
    </main>
  );
}
