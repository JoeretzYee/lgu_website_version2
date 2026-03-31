import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useMouseParallax } from "../hooks/useScrollAnimation";
import AnimatedSection, { StaggerItem } from "../components/AnimatedSection";
import ParallaxBackground from "../components/ParallaxBackground";
import WaveDivider from "../components/WaveDivider";
import { StatsSection } from "../components/StatsCounter";
import municipyo from "@/assets/images/municipyo.jpg";
import heartOfTheValley from "@/assets/images/theheartofthevalley.jpg";
import water_fountain from "@/assets/images/water_fountain.jpg";
import simballay from "@/assets/images/simbalay.jpg";
import thailand from "@/assets/images/mayor_thailand.png";
import mayor from "@/assets/officials/mayor.jpg";

import {
  staggerContainer,
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  textReveal,
  floatingElement,
  cardHover,
} from "../utils/animationVariants";
import { news, announcements } from "../data/news";
import { services } from "../data/services";

const heroWords = ["Serbisyo", "Uban", "Sa", "Gugma"];
const stats = [
  { end: 76339, label: "Population", suffix: "+", icon: "👥" },
  { end: 28, label: "Barangays", suffix: "", icon: "🏘️" },
  // { end: 48, label: "Active Projects", suffix: "+", icon: "🏗️" },
];

const quickLinks = [
  {
    title: "Civil Registry",
    desc: "Birth, marriage & death certificates",
    icon: "📄",
    path: "/services",
  },
  {
    title: "Business Permits",
    desc: "Apply & renew business permits",
    icon: "🏪",
    path: "/services",
  },
  {
    title: "Social Services",
    desc: "Financial & livelihood assistance",
    icon: "🤝",
    path: "/services",
  },
  {
    title: "Health Services",
    desc: "Medical & health programs",
    icon: "🏥",
    path: "/services",
  },
  {
    title: "Environmental",
    desc: "Tree planting & conservation",
    icon: "🌳",
    path: "/services",
  },
  {
    title: "Transparency",
    desc: "Budgets, reports & disclosures",
    icon: "📊",
    path: "/transparency",
  },
];

function HeroSection() {
  const [ref, mousePos] = useMouseParallax(0.015);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const heroImages = [
    { src: municipyo, alt: "Municipyo" },
    { src: heartOfTheValley, alt: "Nabunturan scenic view 2" },
    { src: water_fountain, alt: "Nabunturan scenic view 3" },
    { src: simballay, alt: "Nabunturan scenic view 3" },
    { src: thailand, alt: "Nabunturan scenic view 3" },
    // Add more images as needed
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 10000); // 3 seconds

    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      {/* <div className="absolute inset-0 bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800" /> */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            {/* Infinite Zoom Animation */}
            <motion.div
              className="w-full h-full"
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{
                duration: 8,
                ease: "linear",
                repeat: Infinity,
                repeatType: "reverse", // This makes it zoom in and out infinitely
              }}
            >
              <img
                src={heroImages[currentImageIndex].src}
                alt={heroImages[currentImageIndex].alt}
                className="w-full h-full object-cover"
                loading="eager"
              />
            </motion.div>

            {/* Dark Overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/60" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Animated Floating Elements */}
      <div
        ref={ref}
        className="absolute inset-0 overflow-hidden pointer-events-none"
      >
        {[
          {
            size: "w-64 h-64",
            top: "10%",
            left: "5%",
            delay: 0,
            opacity: "opacity-5",
          },
          {
            size: "w-48 h-48",
            top: "60%",
            left: "80%",
            delay: 1,
            opacity: "opacity-10",
          },
          {
            size: "w-32 h-32",
            top: "30%",
            left: "70%",
            delay: 2,
            opacity: "opacity-5",
          },
          {
            size: "w-40 h-40",
            top: "70%",
            left: "15%",
            delay: 0.5,
            opacity: "opacity-8",
          },
          {
            size: "w-24 h-24",
            top: "20%",
            left: "45%",
            delay: 1.5,
            opacity: "opacity-5",
          },
        ].map((el, i) => (
          <motion.div
            key={i}
            className={`absolute ${el.size} rounded-full bg-primary-400 ${el.opacity}`}
            style={{
              x: mousePos.x * (i + 1) * 0.5,
              y: mousePos.y * (i + 1) * 0.5,
            }}
            animate={{ y: [0, -30, 0], x: [0, 10, 0] }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: el.delay,
            }}
          />
        ))}

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container-custom relative z-10 pt-24 pb-16">
        <div className="max-w-4xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary-800/50 backdrop-blur-sm border border-primary-700/30 rounded-full mb-6"
          >
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            {/* <span className="text-sm text-primary-200">Serving since 1945</span> */}
          </motion.div>

          {/* Animated Title */}
          <div className="overflow-hidden mb-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              {heroWords.map((word, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={textReveal}
                  initial="hidden"
                  animate="visible"
                  className="inline-block mr-3"
                >
                  {word === "Greener" ? (
                    <span className="text-primary-300">{word}</span>
                  ) : (
                    word
                  )}
                </motion.span>
              ))}
            </h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-lg md:text-xl text-primary-100/80 max-w-2xl mb-8 leading-relaxed"
          >
            Welcome to Municipality of Nabunturan — your gateway to transparent
            governance, sustainable development, and thriving community
            services.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            <Link to="/services">
              <motion.button
                className="px-8 py-3.5 bg-primary-500 hover:bg-primary-400 text-white font-semibold rounded-xl shadow-lg shadow-primary-500/30 transition-colors"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                Access Services
              </motion.button>
            </Link>
            <Link to="/about">
              <motion.button
                className="px-8 py-3.5 border-2 border-white/30 hover:border-white/60 text-white font-semibold rounded-xl backdrop-blur-sm transition-colors"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                Learn More
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-1.5">
          <motion.div
            className="w-1.5 h-1.5 bg-white rounded-full"
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}

function MayorSection() {
  return (
    <section className="section-padding bg-white dark:bg-gray-800">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <AnimatedSection animation="fadeRight">
            <div className="relative">
              <div className="relative w-full max-w-md mx-auto aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={mayor}
                  alt="Myrocel balili"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-950/60 to-transparent" />
              </div>
              {/* Decorative */}
              <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-primary-200 dark:border-primary-700 rounded-2xl -z-10" />
              <motion.div
                className="absolute -top-4 -left-4 w-20 h-20 bg-primary-100 dark:bg-primary-900 rounded-xl -z-10"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fadeLeft" delay={0.2}>
            <span className="text-sm font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wider">
              Message from the Mayor
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6 text-gray-900 dark:text-white">
              A Warm Welcome to{" "}
              <span className="gradient-text">Municipality of Nabunturan</span>
            </h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
              <p>
                Dear fellow Nabunturan residents and visitors, it is my great
                honor to welcome you to our official municipal website — a
                digital gateway to the services, programs, and opportunities our
                local government offers.
              </p>
              <p>
                Our administration remains committed to transparency,
                sustainability, and inclusive growth. We are building a
                community that thrives economically while preserving our natural
                heritage for future generations.
              </p>
              <p>
                I invite everyone to explore this platform, access our services
                conveniently online, and participate actively in shaping the
                future of our beloved municipality.
              </p>
            </div>
            <div className="mt-6">
              <p className="font-bold text-gray-900 dark:text-white">
                Hon. Myrocel G. Balili
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Municipal Mayor
              </p>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

function QuickLinksSection() {
  return (
    <section className="section-padding bg-cream dark:bg-gray-900">
      <div className="container-custom">
        <AnimatedSection className="text-center mb-12">
          <span className="text-sm font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wider">
            Quick Access
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 text-gray-900 dark:text-white">
            Government Services
          </h2>
          <p className="mt-3 text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Access essential government services and information quickly and
            conveniently.
          </p>
        </AnimatedSection>

        <AnimatedSection stagger staggerDelay={0.1}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickLinks.map((link) => (
              <StaggerItem key={link.title}>
                <Link to={link.path}>
                  <motion.div
                    className="card dark:card-dark p-6 h-full group cursor-pointer"
                    variants={cardHover}
                    initial="rest"
                    whileHover="hover"
                  >
                    <div className="text-4xl mb-4">{link.icon}</div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-700 dark:group-hover:text-primary-300 transition-colors">
                      {link.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {link.desc}
                    </p>
                    <div className="mt-4 flex items-center gap-1 text-sm font-medium text-primary-600 dark:text-primary-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      Learn more
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </motion.div>
                </Link>
              </StaggerItem>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

function AnnouncementsSection() {
  const [current, setCurrent] = useState(0);
  const highPriority = announcements.filter((a) => a.priority === "high");

  useEffect(() => {
    if (highPriority.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % highPriority.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [highPriority.length]);

  return (
    <section className="bg-primary-700 dark:bg-primary-900 py-4 no-print">
      {/* <div className="container-custom">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 shrink-0">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2.5 h-2.5 bg-red-400 rounded-full"
            />
            <span className="text-sm font-bold text-white uppercase tracking-wider">
              Alerts
            </span>
          </div>
          <div className="overflow-hidden flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="text-sm text-primary-100"
              >
                <span className="font-semibold">
                  {highPriority[current]?.title}:{" "}
                </span>
                {highPriority[current]?.message}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div> */}
    </section>
  );
}

function NewsSection() {
  const featuredNews = news.filter((n) => n.featured).slice(0, 3);

  return (
    <section className="section-padding bg-white dark:bg-gray-800">
      <div className="container-custom">
        <AnimatedSection className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-sm font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wider">
              Latest Updates
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 text-gray-900 dark:text-white">
              News & Announcements
            </h2>
          </div>
          <Link
            to="/news"
            className="text-primary-600 dark:text-primary-400 font-medium hover:underline flex items-center gap-1"
          >
            View all news
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </AnimatedSection>

        <AnimatedSection stagger staggerDelay={0.15}>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredNews.map((item) => (
              <StaggerItem key={item.id}>
                <Link to="/news">
                  <motion.article
                    className="card dark:card-dark group cursor-pointer h-full flex flex-col"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="relative overflow-hidden aspect-[16/10]">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                      <span className="absolute top-3 left-3 px-2.5 py-1 bg-primary-600 text-white text-xs font-semibold rounded-lg">
                        {item.category}
                      </span>
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <time className="text-xs text-gray-400 mb-2">
                        {new Date(item.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </time>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-primary-700 dark:group-hover:text-primary-300 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 flex-1">
                        {item.excerpt}
                      </p>
                    </div>
                  </motion.article>
                </Link>
              </StaggerItem>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

function StatsBar() {
  return (
    <ParallaxBackground
      speed={0.2}
      backgroundImage="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1600&h=600&fit=crop"
      overlayColor="from-primary-950/90 to-primary-900/80"
      className="py-12"
    >
      <div className="container-custom">
        <StatsSection stats={stats} />
      </div>
    </ParallaxBackground>
  );
}

function GreenInitiativeSection() {
  return (
    <section className="section-padding bg-gradient-to-b from-primary-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <AnimatedSection animation="fadeRight">
            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  img: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop",
                  label: "Reforestation",
                },
                {
                  img: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400&h=300&fit=crop",
                  label: "Clean Energy",
                },
                {
                  img: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&h=300&fit=crop",
                  label: "Waste Management",
                },
                {
                  img: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400&h=300&fit=crop",
                  label: "Water Conservation",
                },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-lg group"
                  whileHover={{ scale: 1.03 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                >
                  <img
                    src={item.img}
                    alt={item.label}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-900/60 to-transparent" />
                  <span className="absolute bottom-3 left-3 text-white text-sm font-semibold">
                    {item.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fadeLeft" delay={0.2}>
            <span className="text-sm font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wider">
              Municipality of Nabunturan 2026
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6 text-gray-900 dark:text-white">
              Our Environmental{" "}
              <span className="gradient-text">Commitment</span>
            </h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
              <p>
                Municipality of Nabunturan is at the forefront of environmental
                sustainability. Our municipality 2026 plan aims to reduce carbon
                emissions by 50%, achieve 100% solid waste diversion, and plant
                1 million trees by 2026.
              </p>
              <ul className="space-y-2">
                {[
                  "Solar-powered municipal facilities",
                  "Bike lane network expansion (25km target)",
                  "River rehabilitation and cleanup programs",
                  "Community recycling and composting initiatives",
                  "Urban garden and green space development",
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    className="flex items-start gap-2"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <svg
                      className="w-5 h-5 text-primary-500 mt-0.5 shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
            <Link to="/projects" className="inline-block mt-6">
              <motion.button
                className="btn-primary"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                View Our Projects
              </motion.button>
            </Link>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AnnouncementsSection />
      <MayorSection />
      <WaveDivider color="#faf8f5" className="dark:hidden" />
      <QuickLinksSection />
      <StatsBar />
      <NewsSection />
      <WaveDivider color="white" flip />
      {/* <GreenInitiativeSection /> */}
    </main>
  );
}
