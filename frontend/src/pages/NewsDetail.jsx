import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { news } from "../data/news";
import ParallaxBackground from "../components/ParallaxBackground";
import WaveDivider from "../components/WaveDivider";

export default function NewsDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [newsItem, setNewsItem] = useState(null);
  const [relatedNews, setRelatedNews] = useState([]);

  useEffect(() => {
    // Find the news item by id
    const item = news.find((n) => n.id === parseInt(id));
    if (item) {
      setNewsItem(item);

      // Find related news (same category, excluding current)
      const related = news
        .filter((n) => n.category === item.category && n.id !== item.id)
        .slice(0, 3);
      setRelatedNews(related);
    } else {
      // If news not found, redirect to news page
      navigate("/news");
    }
  }, [id, navigate]);

  if (!newsItem) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">📰</div>
          <h2 className="text-xl font-bold mb-2">Loading...</h2>
        </div>
      </div>
    );
  }

  return (
    <main>
      {/* Hero Section */}
      <ParallaxBackground
        speed={0.3}
        backgroundImage={newsItem.image}
        overlayColor="from-primary-950/90 to-primary-900/80"
        height="min-h-[60vh]"
      >
        <div className="container-custom pt-32 pb-16">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-3 py-1 bg-primary-600/80 backdrop-blur-sm text-white text-sm font-semibold rounded-full mb-4">
                {newsItem.category}
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                {newsItem.title}
              </h1>
              <div className="flex items-center justify-center gap-4 text-white/80 text-sm">
                <time>
                  {new Date(newsItem.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </time>
                <span>•</span>
                <span>By {newsItem.author}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </ParallaxBackground>

      {/* Content Section */}
      <section className="section-padding bg-white dark:bg-gray-800">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-8"
            >
              <Link
                to="/news"
                className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:underline font-medium"
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
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Back to News
              </Link>
            </motion.div>

            {/* Article Content */}
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="prose prose-lg dark:prose-invert max-w-none"
            >
              {/* Featured Image */}
              <div className="relative rounded-2xl overflow-hidden mb-8 shadow-xl">
                <img
                  src={newsItem.image}
                  alt={newsItem.title}
                  className="w-full h-auto object-cover"
                />
                {newsItem.featured && (
                  <span className="absolute top-4 right-4 px-3 py-1 bg-yellow-400 text-yellow-900 text-sm font-bold rounded-full">
                    Featured
                  </span>
                )}
              </div>

              {/* Article Text */}
              <div className="space-y-6 text-gray-700 dark:text-gray-300 leading-relaxed">
                <p className="text-xl font-medium text-primary-600 dark:text-primary-400">
                  {newsItem.excerpt}
                </p>

                {/* This would be the full content - you can expand this based on your data structure */}
                <p>{newsItem.content}</p>

                <blockquote className="border-l-4 border-primary-500 pl-4 italic text-gray-600 dark:text-gray-400">
                  "This is a significant milestone for our municipality as we
                  continue to work towards sustainable development and improved
                  services for our constituents."
                </blockquote>
              </div>

              {/* Author Info */}
              <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {newsItem.author.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {newsItem.author}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Municipal Information Office
                    </p>
                  </div>
                </div>
              </div>
            </motion.article>
          </div>
        </div>
      </section>

      {/* Related News Section */}
      {relatedNews.length > 0 && (
        <>
          <WaveDivider color="#faf8f5" className="dark:hidden" flip />
          <section className="section-padding bg-cream dark:bg-gray-900">
            <div className="container-custom">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <span className="text-sm font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wider">
                  You Might Also Like
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mt-2 text-gray-900 dark:text-white">
                  Related News
                </h2>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedNews.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Link to={`/news/${item.id}`}>
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
                          <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
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
                          </div>
                        </div>
                      </motion.article>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}
    </main>
  );
}
