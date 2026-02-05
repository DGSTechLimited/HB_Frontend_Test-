import { motion, useReducedMotion } from "framer-motion";
import ordersImg from "@/assets/images/quick-actions/orders.svg";
import backOrdersImg from "@/assets/images/quick-actions/back-orders.svg";
import exclusiveImg from "@/assets/images/quick-actions/exclusive.svg";
import offersImg from "@/assets/images/quick-actions/offers.svg";

const actions = [
  {
    title: "Orders",
    metric: "2 active",
    description: "Track approvals and dispatch timelines.",
    image: ordersImg,
  },
  {
    title: "Back Orders",
    metric: "1 pending",
    description: "Monitor priority restock alerts.",
    image: backOrdersImg,
  },
  {
    title: "Exclusive Parts",
    metric: "6 new",
    description: "Limited supply, dealer-first access.",
    image: exclusiveImg,
  },
  {
    title: "News & Offers",
    metric: "3 promos",
    description: "Fresh pricing for partner network.",
    image: offersImg,
  },
];

const QuickActions = () => {
  const reduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.12 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 16 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <motion.section
      className="grid gap-4 md:grid-cols-2 xl:grid-cols-4"
      variants={containerVariants}
      initial={reduceMotion ? "show" : "hidden"}
      animate="show"
    >
      {actions.map((action) => {
        return (
          <motion.div
            key={action.title}
            variants={cardVariants}
            whileHover={reduceMotion ? undefined : { y: -6, scale: 1.015 }}
            whileTap={reduceMotion ? undefined : { scale: 0.98 }}
            className="group relative overflow-hidden rounded-[18px] border border-orange-200/60 bg-white p-5 shadow-[0_14px_28px_-20px_rgba(255,138,0,0.25)] transition hover:-translate-y-1 hover:border-orange-300/70 hover:shadow-[0_18px_36px_-22px_rgba(255,138,0,0.35)] focus-within:ring-2 focus-within:ring-orange-200"
          >
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#FF8A00] via-[#FFB703] to-[#FF8A00]" />
            <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-orange-200/40 blur-2xl transition-all duration-300 group-hover:translate-x-2 group-hover:translate-y-2" />
            <div className="absolute bottom-2 right-2 h-24 w-24 rounded-full bg-orange-300/30 blur-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="relative flex items-start justify-between gap-3 pr-24 sm:pr-28">
              <div className="space-y-2">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-slate-500">
                  {action.title}
                </p>
                <p className="mt-2 text-2xl font-semibold text-slate-900">
                  {action.metric}
                </p>
              </div>
            </div>
            <p className="relative mt-3 text-sm text-slate-600">
              {action.description}
            </p>
            <img
              src={action.image}
              alt={`${action.title} illustration`}
              className={`pointer-events-none absolute bottom-4 right-4 h-16 w-16 opacity-90 transition-transform duration-300 sm:h-20 sm:w-20 ${
                reduceMotion ? "" : "group-hover:-translate-y-1.5 group-hover:scale-105"
              }`}
              loading="lazy"
            />
          </motion.div>
        );
      })}
    </motion.section>
  );
};

export default QuickActions;
