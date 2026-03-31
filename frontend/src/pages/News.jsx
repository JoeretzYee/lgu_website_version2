import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection, { StaggerItem } from "../components/AnimatedSection";
import ParallaxBackground from "../components/ParallaxBackground";
import WaveDivider from "../components/WaveDivider";
import { news, newsCategories, announcements } from "../data/news";

function HeroSection() {
  const featured = news.find((n) => n.featured) || news[0];
  return (
    <ParallaxBackground
      speed={0.3}
      backgroundImage={featured.image}
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
            Stay Informed
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-2 mb-4">
            News & Announcements
          </h1>
          <p className="text-lg text-primary-100/80 max-w-2xl mx-auto">
            Keep up to date with the latest happenings, programs, and
            announcements from Nabunturan Municipality.
          </p>
        </motion.div>
      </div>
    </ParallaxBackground>
  );
}

function AnnouncementsBar() {
  const highPriority = announcements.filter((a) => a.priority === "high");
  return (
    <section className="bg-red-50 dark:bg-red-900/20 border-b border-red-100 dark:border-red-800/30">
      <div className="container-custom py-4">
        <div className="flex items-start gap-3">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-3 h-3 bg-red-500 rounded-full mt-0.5 shrink-0"
          />
          <div className="space-y-2 flex-1">
            {highPriority.map((a, i) => (
              <motion.div
                key={a.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-2"
              >
                <span className="text-xs font-bold text-red-600 dark:text-red-400 shrink-0">
                  {a.date}
                </span>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-semibold">{a.title}:</span> {a.message}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function NewsGrid({ activeCategory, searchQuery }) {
  const filtered = useMemo(() => {
    return news.filter((n) => {
      const matchesCategory =
        activeCategory === "All" || n.category === activeCategory;
      const matchesSearch =
        !searchQuery ||
        n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeCategory + searchQuery}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
      >
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">📭</div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              No articles found
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Try a different search or category.
            </p>
          </div>
        ) : (
          <AnimatedSection stagger staggerDelay={0.1}>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((item) => (
                <StaggerItem key={item.id}>
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
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span className="absolute top-3 left-3 px-2.5 py-1 bg-primary-600 text-white text-xs font-semibold rounded-lg">
                        {item.category}
                      </span>
                      {item.featured && (
                        <span className="absolute top-3 right-3 px-2 py-0.5 bg-yellow-400 text-yellow-900 text-xs font-bold rounded">
                          Featured
                        </span>
                      )}
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex items-center gap-3 text-xs text-gray-400 mb-2">
                        <time>
                          {new Date(item.date).toLocaleDateString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </time>
                        <span>•</span>
                        <span>By {item.author}</span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-primary-700 dark:group-hover:text-primary-300 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-3 flex-1">
                        {item.excerpt}
                      </p>
                      <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                        <Link to={`/news/${item.id}`}>
                          <span className="text-sm font-medium text-primary-600 dark:text-primary-400 group-hover:underline flex items-center gap-1">
                            Read more
                            <svg
                              className="w-4 h-4 transition-transform group-hover:translate-x-1"
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
                          </span>
                        </Link>
                      </div>
                    </div>
                  </motion.article>
                </StaggerItem>
              ))}
            </div>
          </AnimatedSection>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

export default function News() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <main>
      <HeroSection />
      <AnnouncementsBar />
      <section className="section-padding bg-white dark:bg-gray-800">
        <div className="container-custom">
          {/* Filters */}
          <AnimatedSection className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
            <div className="flex flex-wrap gap-2">
              {newsCategories.map((cat) => (
                <motion.button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    activeCategory === cat
                      ? "bg-primary-700 text-white shadow-lg shadow-primary-700/30"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {cat}
                </motion.button>
              ))}
            </div>

            {/* Search */}
            <div className="relative">
              <AnimatePresence>
                {searchOpen && (
                  <motion.input
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 250, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    type="text"
                    placeholder="Search news..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50"
                    autoFocus
                  />
                )}
              </AnimatePresence>
              <motion.button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 bg-gray-100 dark:bg-gray-700 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Search"
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
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </motion.button>
            </div>
          </AnimatedSection>

          <NewsGrid activeCategory={activeCategory} searchQuery={searchQuery} />
        </div>
      </section>
    </main>
  );
}
