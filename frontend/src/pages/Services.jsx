import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection, { StaggerItem } from "../components/AnimatedSection";
import ParallaxBackground from "../components/ParallaxBackground";
import WaveDivider from "../components/WaveDivider";
import { services, serviceCategories } from "../data/services";
import { accordionContent } from "../utils/animationVariants";

function HeroSection() {
  return (
    <ParallaxBackground
      speed={0.3}
      backgroundImage="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1600&h=800&fit=crop"
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
            Government Services
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-2 mb-4">
            Our Services
          </h1>
          <p className="text-lg text-primary-100/80 max-w-2xl mx-auto">
            Access a comprehensive range of government services designed to
            serve you efficiently.
          </p>
        </motion.div>
      </div>
    </ParallaxBackground>
  );
}

function ServiceRequestModal({ service, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const submissions = JSON.parse(
      localStorage.getItem("service-submissions") || "[]",
    );
    submissions.push({
      ...formData,
      serviceId: service.id,
      date: new Date().toISOString(),
    });
    localStorage.setItem("service-submissions", JSON.stringify(submissions));
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto p-6"
        initial={{ scale: 0.8, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 20 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label="Close"
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8"
          >
            <div className="text-5xl mb-4">✅</div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Request Submitted!
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              We'll get back to you within 3-5 working days.
            </p>
          </motion.div>
        ) : (
          <>
            <div className="text-4xl mb-2">{service.icon}</div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
              {service.title}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              Request for this service
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                {
                  key: "name",
                  label: "Full Name",
                  type: "text",
                  placeholder: "Juan Dela Cruz",
                },
                {
                  key: "email",
                  label: "Email",
                  type: "email",
                  placeholder: "you@email.com",
                },
                {
                  key: "phone",
                  label: "Phone",
                  type: "tel",
                  placeholder: "0912 345 6789",
                },
              ].map((field) => (
                <div key={field.key}>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {field.label}
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    type={field.type}
                    required
                    placeholder={field.placeholder}
                    value={formData[field.key]}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        [field.key]: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all text-sm"
                  />
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Message
                </label>
                <motion.textarea
                  whileFocus={{ scale: 1.01 }}
                  rows={3}
                  placeholder="Describe your request..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      message: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all text-sm resize-none"
                />
              </div>
              <motion.button
                type="submit"
                className="w-full btn-primary justify-center"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                Submit Request
              </motion.button>
            </form>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}

function ServicesList({ category }) {
  const [expandedId, setExpandedId] = useState(null);
  const [modalService, setModalService] = useState(null);

  const filtered =
    category === "All Services"
      ? services
      : services.filter((s) => s.category === category);

  return (
    <>
      <AnimatedSection stagger staggerDelay={0.1}>
        <div className="grid md:grid-cols-2 gap-6">
          {filtered.map((service) => (
            <StaggerItem key={service.id}>
              <motion.div
                className="card dark:card-dark group"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="text-3xl">{service.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-primary-700 dark:group-hover:text-primary-300 transition-colors">
                            {service.title}
                          </h3>
                          <span className="text-xs text-primary-600 dark:text-primary-400 font-medium">
                            {service.category}
                          </span>
                        </div>
                        <span className="shrink-0 px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-medium rounded-full">
                          Active
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 leading-relaxed">
                    {service.description}
                  </p>

                  <div className="flex gap-4 text-xs text-gray-500 dark:text-gray-400 mb-4">
                    <span>⏱️ {service.processingTime}</span>
                    <span>💰 {service.fees}</span>
                  </div>

                  {/* Requirements Accordion */}
                  <div className="border-t border-gray-100 dark:border-gray-700 pt-4">
                    <button
                      onClick={() =>
                        setExpandedId(
                          expandedId === service.id ? null : service.id,
                        )
                      }
                      className="flex items-center justify-between w-full text-sm font-medium text-gray-700 dark:text-gray-300"
                      aria-expanded={expandedId === service.id}
                    >
                      <span>Requirements ({service.requirements.length})</span>
                      <motion.svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        animate={{
                          rotate: expandedId === service.id ? 180 : 0,
                        }}
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
                      {expandedId === service.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <ul className="mt-2 space-y-1.5">
                            {service.requirements.map((req, i) => (
                              <motion.li
                                key={i}
                                className="flex items-start gap-2 text-xs text-gray-500 dark:text-gray-400"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.05 }}
                              >
                                <svg
                                  className="w-3.5 h-3.5 text-primary-500 mt-0.5 shrink-0"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                  />
                                </svg>
                                {req}
                              </motion.li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* <motion.button
                    onClick={() => setModalService(service)}
                    className="mt-4 w-full py-2.5 bg-primary-50 hover:bg-primary-100 dark:bg-primary-900/20 dark:hover:bg-primary-900/40 text-primary-700 dark:text-primary-300 font-medium text-sm rounded-xl transition-colors"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    Request This Service
                  </motion.button> */}
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </div>
      </AnimatedSection>

      <AnimatePresence>
        {modalService && (
          <ServiceRequestModal
            service={modalService}
            onClose={() => setModalService(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

export default function Services() {
  const [activeCategory, setActiveCategory] = useState("All Services");

  return (
    <main>
      <HeroSection />
      <section className="section-padding bg-white dark:bg-gray-800">
        <div className="container-custom">
          {/* Category Tabs */}
          <AnimatedSection className="mb-10">
            <div className="flex flex-wrap justify-center gap-2">
              {serviceCategories.map((cat) => (
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
          </AnimatedSection>

          {/* Animated Tab Indicator */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <ServicesList category={activeCategory} />
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </main>
  );
}
