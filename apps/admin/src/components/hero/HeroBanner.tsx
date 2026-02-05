import { motion } from "framer-motion";
import { Button } from "@/components/ui";
import heroImage from "@assets/images/loginBg.png";

const HeroBanner = () => {
  return (
    <section className="relative w-full overflow-hidden rounded-2xl bg-[color:var(--color-navy-900)]">
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Premium automotive parts"
          className="h-full w-full object-cover opacity-70"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(7,12,24,0.96)] via-[rgba(7,12,24,0.82)] to-[rgba(7,12,24,0.25)]" />
      </div>

      <div className="relative grid w-full grid-cols-1 items-center gap-10 px-6 py-12 md:grid-cols-[1.15fr_0.85fr] md:px-12 md:py-16">
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: {
              transition: { staggerChildren: 0.12 },
            },
          }}
          className="text-white"
        >
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 16 },
              show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
            }}
            className="text-xs font-semibold uppercase tracking-[0.5em] text-white/60"
          >
            Hotbray B2B Command Center
          </motion.p>
          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 16 },
              show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
            }}
            className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl"
          >
            Premium inventory. Precision delivery. Built for automotive leaders.
          </motion.h1>
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 16 },
              show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
            }}
            className="mt-4 max-w-xl text-base text-white/80 md:text-lg"
          >
            Orchestrate dealer orders, exclusive parts, and logistics in one
            seamless dashboard engineered for speed and reliability.
          </motion.p>
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 16 },
              show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
            }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <Button className="rounded-[16px] bg-[#FF8A00] text-white shadow-[0_16px_32px_-20px_rgba(255,138,0,0.9)] hover:bg-[#ff9a1f] hover:shadow-[0_20px_40px_-18px_rgba(255,138,0,0.85)]">
              Search Parts
            </Button>
            <Button
              variant="secondary"
              className="rounded-[16px] border border-white/70 bg-transparent text-white hover:bg-white/10"
            >
              Exclusive Parts
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative mx-auto h-56 w-56 rounded-3xl border border-white/10 bg-white/5 p-4 shadow-[var(--shadow-bloom)] md:h-72 md:w-72"
          >
            <img
              src={heroImage}
              alt="Detail of premium part"
              className="h-full w-full rounded-2xl object-cover"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 rounded-3xl ring-1 ring-white/20" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export { HeroBanner };
