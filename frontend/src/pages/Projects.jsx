import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection, { StaggerItem } from "../components/AnimatedSection";
import ParallaxBackground from "../components/ParallaxBackground";
import WaveDivider from "../components/WaveDivider";
import { useCounter } from "../hooks/useCounter";
import { projects, projectCategories } from "../data/projects";

function HeroSection() {
  return (
    <ParallaxBackground
      speed={0.3}
      backgroundImage="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&h=800&fit=crop"
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
            Development & Progress
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-2 mb-4">
            Our Projects
          </h1>
          <p className="text-lg text-primary-100/80 max-w-2xl mx-auto">
            Track the progress of infrastructure, environmental, and community
            development projects across Greenfield.
          </p>
        </motion.div>
      </div>
    </ParallaxBackground>
  );
}

function ProgressCircle({ progress, size = 120, strokeWidth = 8 }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  const color =
    progress === 100
      ? "#22c55e"
      : progress >= 60
        ? "#4caf50"
        : progress >= 30
          ? "#f59e0b"
          : "#ef4444";

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90" width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          className="text-gray-200 dark:text-gray-700"
          strokeWidth={strokeWidth}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          whileInView={{ strokeDashoffset: offset }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xl font-bold text-gray-900 dark:text-white">
          {progress}%
        </span>
      </div>
    </div>
  );
}

function ProjectCard({ project, index }) {
  const [showDetails, setShowDetails] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const statusColors = {
    Completed:
      "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400",
    "In Progress":
      "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400",
    Planning:
      "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400",
  };

  return (
    <StaggerItem key={project.id}>
      <motion.div
        className="card dark:card-dark overflow-hidden"
        whileHover={{ y: -5 }}
        transition={{ duration: 0.3 }}
      >
        {/* Image Carousel */}
        <div className="relative aspect-[16/9] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImage}
              src={project.images[currentImage]}
              alt={project.title}
              className="w-full h-full object-cover"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              loading="lazy"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <span
            className={`absolute top-3 left-3 px-2.5 py-1 text-xs font-semibold rounded-lg ${statusColors[project.status] || ""}`}
          >
            {project.status}
          </span>
          {project.images.length > 1 && (
            <div className="absolute bottom-3 right-3 flex gap-1">
              {project.images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentImage(i)}
                  className={`w-2 h-2 rounded-full transition-all ${currentImage === i ? "bg-white w-6" : "bg-white/50"}`}
                  aria-label={`Image ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        <div className="p-6">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div>
              <span className="text-xs text-primary-600 dark:text-primary-400 font-medium">
                {project.category}
              </span>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                {project.title}
              </h3>
            </div>
            <ProgressCircle
              progress={project.progress}
              size={60}
              strokeWidth={4}
            />
          </div>

          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">
            {project.description}
          </p>

          <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-2.5">
              <span className="text-gray-400 block">Budget</span>
              <span className="font-semibold text-gray-700 dark:text-gray-300">
                {project.budget}
              </span>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-2.5">
              <span className="text-gray-400 block">Spent</span>
              <span className="font-semibold text-gray-700 dark:text-gray-300">
                {project.spent}
              </span>
            </div>
          </div>

          <button
            onClick={() => setShowDetails(!showDetails)}
            className="w-full py-2 text-sm font-medium text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-xl transition-colors"
          >
            {showDetails ? "Hide Details" : "View Timeline"}
          </button>

          <AnimatePresence>
            {showDetails && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="pt-4 mt-4 border-t border-gray-100 dark:border-gray-700">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                    Project Milestones
                  </h4>
                  <div className="space-y-3">
                    {project.milestones.map((milestone, i) => (
                      <motion.div
                        key={i}
                        className="flex items-start gap-3"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                            milestone.completed
                              ? "bg-green-500 text-white"
                              : "border-2 border-gray-300 dark:border-gray-600"
                          }`}
                        >
                          {milestone.completed && (
                            <svg
                              className="w-3 h-3"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={3}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          )}
                        </div>
                        <div>
                          <span className="text-xs text-gray-400 block">
                            {milestone.date}
                          </span>
                          <span
                            className={`text-sm ${milestone.completed ? "text-gray-700 dark:text-gray-300" : "text-gray-400 dark:text-gray-500"}`}
                          >
                            {milestone.title}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </StaggerItem>
  );
}

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("All Projects");

  const filtered =
    activeCategory === "All Projects"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  const completedCount = projects.filter(
    (p) => p.status === "Completed",
  ).length;
  const totalBudget = projects.reduce((sum, p) => {
    const val = p.budget.replace(/[^0-9]/g, "");
    return sum + parseInt(val);
  }, 0);

  return (
    <main>
      <HeroSection />

      {/* Summary Stats */}
      <section className="bg-white dark:bg-gray-800 py-12 border-b border-gray-100 dark:border-gray-700">
        <div className="container-custom">
          <AnimatedSection stagger staggerDelay={0.1}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                { value: projects.length, label: "Total Projects" },
                { value: completedCount, label: "Completed" },
                {
                  value: projects.filter((p) => p.status === "In Progress")
                    .length,
                  label: "In Progress",
                },
                {
                  value: `₱${(totalBudget / 1000000).toFixed(0)}M`,
                  label: "Total Budget",
                },
              ].map((stat) => (
                <StaggerItem key={stat.label}>
                  <div className="text-2xl md:text-3xl font-bold text-primary-700 dark:text-primary-300">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {stat.label}
                  </div>
                </StaggerItem>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="section-padding bg-cream dark:bg-gray-900">
        <div className="container-custom">
          <AnimatedSection className="mb-10">
            <div className="flex flex-wrap justify-center gap-2">
              {projectCategories.map((cat) => (
                <motion.button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    activeCategory === cat
                      ? "bg-primary-700 text-white shadow-lg shadow-primary-700/30"
                      : "bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {cat}
                </motion.button>
              ))}
            </div>
          </AnimatedSection>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <AnimatedSection stagger staggerDelay={0.15}>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filtered.map((project, i) => (
                    <ProjectCard project={project} index={i} key={project.id} />
                  ))}
                </div>
              </AnimatedSection>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </main>
  );
}
