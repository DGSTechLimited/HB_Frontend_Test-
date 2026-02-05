import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { HeroBanner } from "@/components/hero/HeroBanner";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { RecentOrdersTable } from "@/components/dashboard/RecentOrdersTable";
import { Card } from "@/components/ui";
import {
  Clock,
  Truck,
  ShieldCheck,
  BadgeCheck,
} from "lucide-react";

const stats = [
  {
    title: "Open 24/7",
    description: "Always-on support for dealer operations.",
    icon: Clock,
  },
  {
    title: "Fast Shipping",
    description: "Priority lanes for critical parts.",
    icon: Truck,
  },
  {
    title: "OEM Quality",
    description: "Certified components, premium standards.",
    icon: ShieldCheck,
  },
  {
    title: "Verified Sellers",
    description: "Authenticated suppliers only.",
    icon: BadgeCheck,
  },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Dashboard = () => {
  return (
    <div className="-m-6 rounded-2xl bg-[color:var(--color-navy-900)] text-white">
      <div className="space-y-10 p-6">
        <div className="-mx-6 -mt-6">
          <HeroBanner />
        </div>

        <Navbar />

        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="grid gap-4 md:grid-cols-2 xl:grid-cols-4"
        >
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <motion.div key={stat.title} variants={itemVariants}>
                <Card className="flex h-full items-start gap-4 border border-white/10 bg-white/5 p-4 text-white/80">
                  <div className="rounded-2xl border border-white/10 bg-white/10 p-3 text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">
                      {stat.title}
                    </h3>
                    <p className="mt-1 text-xs text-white/60">
                      {stat.description}
                    </p>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.section>

        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="space-y-4"
        >
          <motion.div variants={itemVariants}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-white/50">
                  Performance
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-white">
                  Quick Actions
                </h2>
              </div>
            </div>
          </motion.div>
          <motion.div variants={itemVariants}>
            <QuickActions />
          </motion.div>
        </motion.section>

        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="space-y-4"
        >
          <motion.div variants={itemVariants}>
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-white/50">
                Operations
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-white">
                Recent Orders
              </h2>
            </div>
          </motion.div>
          <motion.div variants={itemVariants}>
            <RecentOrdersTable />
          </motion.div>
        </motion.section>
      </div>
    </div>
  );
};

export default Dashboard;
