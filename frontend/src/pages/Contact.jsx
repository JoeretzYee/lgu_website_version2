import { useState } from "react";
import { motion } from "framer-motion";
import AnimatedSection, { StaggerItem } from "../components/AnimatedSection";
import ParallaxBackground from "../components/ParallaxBackground";
import WaveDivider from "../components/WaveDivider";
import { departments } from "../data/officials";

function HeroSection() {
  return (
    <ParallaxBackground
      speed={0.3}
      backgroundImage="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1600&h=800&fit=crop"
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
            Get In Touch
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-2 mb-4">
            Contact Us
          </h1>
          <p className="text-lg text-primary-100/80 max-w-2xl mx-auto">
            We're here to help. Reach out to us through any of the channels
            below.
          </p>
        </motion.div>
      </div>
    </ParallaxBackground>
  );
}

const contactInfo = [
  {
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
    title: "Address",
    details: ["Purok 9, Barangay Poblacion, Nabunturan, Philippines, 8800"],
  },
  {
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
        />
      </svg>
    ),
    title: "Phone",
    details: ["0946 246 1787", "Mon-Thurs 7AM-6PM"],
  },
  {
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
    title: "Email",
    details: ["informationofficenabunturan@gmail.com", "."],
  },
  {
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    title: "Office Hours",
    details: [
      "Monday - Thurs: 7:00AM - 6:00PM",
      "Saturday,Sunday & Holidays: Closed",
    ],
  },
];

function ContactCards() {
  return (
    <section className="section-padding bg-white dark:bg-gray-800 -mt-16 relative z-10">
      <div className="container-custom">
        <AnimatedSection stagger staggerDelay={0.1}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info) => (
              <StaggerItem key={info.title}>
                <motion.div
                  className="card dark:card-dark p-6 text-center group"
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-12 h-12 bg-primary-100 dark:bg-primary-800 rounded-xl flex items-center justify-center mx-auto mb-4 text-primary-600 dark:text-primary-400 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                    {info.icon}
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                    {info.title}
                  </h3>
                  {info.details.map((d, i) => (
                    <p
                      key={i}
                      className="text-sm text-gray-500 dark:text-gray-400"
                    >
                      {d}
                    </p>
                  ))}
                </motion.div>
              </StaggerItem>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.firstName.trim()) errs.firstName = "First name is required";
    if (!formData.email.trim()) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errs.email = "Invalid email";
    if (!formData.message.trim()) errs.message = "Message is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const submissions = JSON.parse(
      localStorage.getItem("contact-submissions") || "[]",
    );
    submissions.push({ ...formData, date: new Date().toISOString() });
    localStorage.setItem("contact-submissions", JSON.stringify(submissions));
    setSubmitted(true);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
    setTimeout(() => setSubmitted(false), 5000);
  };

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const inputClass = (field) => `
    w-full px-4 py-3 border rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white 
    placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 
    transition-all text-sm
    ${errors[field] ? "border-red-400 dark:border-red-500 focus:ring-red-500/50" : "border-gray-200 dark:border-gray-600"}
  `;

  return (
    <section className="section-padding bg-cream dark:bg-gray-900">
      <div className="container-custom">
        <div className="grid lg:grid-cols-1 gap-12">
          {/* <AnimatedSection animation="fadeRight">
            <span className="text-sm font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wider">
              Send us a message
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6 text-gray-900 dark:text-white">
              How Can We Help?
            </h2>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-8 text-center"
              >
                <div className="text-5xl mb-4">✅</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Message Sent!
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Thank you for reaching out. We'll respond within 1-2 business
                  days.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      First Name *
                    </label>
                    <motion.input
                      whileFocus={{ scale: 1.01 }}
                      type="text"
                      value={formData.firstName}
                      onChange={handleChange("firstName")}
                      placeholder="Juan"
                      className={inputClass("firstName")}
                    />
                    {errors.firstName && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xs text-red-500 mt-1"
                      >
                        {errors.firstName}
                      </motion.p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Last Name
                    </label>
                    <motion.input
                      whileFocus={{ scale: 1.01 }}
                      type="text"
                      value={formData.lastName}
                      onChange={handleChange("lastName")}
                      placeholder="Dela Cruz"
                      className={inputClass("lastName")}
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email *
                    </label>
                    <motion.input
                      whileFocus={{ scale: 1.01 }}
                      type="email"
                      value={formData.email}
                      onChange={handleChange("email")}
                      placeholder="you@email.com"
                      className={inputClass("email")}
                    />
                    {errors.email && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xs text-red-500 mt-1"
                      >
                        {errors.email}
                      </motion.p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Phone
                    </label>
                    <motion.input
                      whileFocus={{ scale: 1.01 }}
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange("phone")}
                      placeholder="0912 345 6789"
                      className={inputClass("phone")}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Subject
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    type="text"
                    value={formData.subject}
                    onChange={handleChange("subject")}
                    placeholder="What is this about?"
                    className={inputClass("subject")}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Message *
                  </label>
                  <motion.textarea
                    whileFocus={{ scale: 1.01 }}
                    rows={5}
                    value={formData.message}
                    onChange={handleChange("message")}
                    placeholder="Tell us how we can help you..."
                    className={inputClass("message") + " resize-none"}
                  />
                  {errors.message && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs text-red-500 mt-1"
                    >
                      {errors.message}
                    </motion.p>
                  )}
                </div>

                <motion.button
                  type="submit"
                  className="w-full btn-primary justify-center"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  Send Message
                </motion.button>
              </form>
            )}
          </AnimatedSection> */}

          <AnimatedSection animation="fadeLeft" delay={0.2}>
            <div className="space-y-6">
              {/* Map Placeholder */}
              <div className="rounded-2xl overflow-hidden shadow-lg bg-primary-100 dark:bg-gray-800 aspect-[4/3] flex items-center justify-center relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-200/50 to-primary-100/50 dark:from-primary-900/30 dark:to-gray-800" />
                <div className="relative text-center p-8">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
                  >
                    <svg
                      className="w-8 h-8 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </motion.div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                    Municipality of Nabunturan
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Purok 9, Barangay Poblacion, Nabunturan, Phillippines, 8800
                  </p>
                </div>
              </div>

              {/* Department Contacts */}
              <div className="card dark:card-dark  p-6">
                <h3 className="font-bold text-gray-900 dark:text-white mb-4">
                  Department Hotlines
                </h3>
                <div className="space-y-3">
                  {departments.slice(0, 10).map((dept) => (
                    <motion.div
                      key={dept.id}
                      className="flex items-center justify-between py-2 border-b border-gray-50 dark:border-gray-700 last:border-0"
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {dept.name}
                        </p>
                        <p className="text-xs text-gray-400">{dept.head}</p>
                      </div>
                      <a
                        href={`tel:${dept.phone.replace(/[^0-9+]/g, "")}`}
                        className="text-sm font-medium text-primary-600 dark:text-primary-400 hover:underline"
                      >
                        {dept.phone}
                      </a>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

export default function Contact() {
  return (
    <main>
      <HeroSection />
      <ContactCards />
      <ContactForm />
    </main>
  );
}
