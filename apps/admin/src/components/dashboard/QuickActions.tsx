import { motion } from "framer-motion";
import { Card } from "@/components/ui";
import {
  ClipboardCheck,
  Package,
  Star,
  Megaphone,
} from "lucide-react";

const actions = [
  {
    title: "Orders",
    description: "Track active purchase orders and approvals.",
    value: "128 Live",
    icon: ClipboardCheck,
  },
  {
    title: "Back Orders",
    description: "Prioritize fulfillment and supplier updates.",
    value: "26 Awaiting",
    icon: Package,
  },
  {
    title: "Exclusive Parts",
    description: "Limited inventory for high-demand SKUs.",
    value: "42 Units",
    icon: Star,
  },
  {
    title: "News & Offers",
    description: "Latest promos for dealer networks.",
    value: "6 New",
    icon: Megaphone,
  },
];

const QuickActions = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {actions.map((action) => {
        const Icon = action.icon;
        return (
          <motion.div
            key={action.title}
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 280, damping: 18 }}
          >
            <Card className="group h-full border border-white/10 bg-[color:var(--color-navy-800)]/80 p-5 text-white/80 shadow-[var(--shadow-soft)] transition hover:shadow-[var(--shadow-bloom)]">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-white/50">
                    {action.title}
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold text-white">
                    {action.value}
                  </h3>
                </div>
                <motion.div
                  whileHover={{ rotate: -6, scale: 1.08 }}
                  className="rounded-2xl border border-white/10 bg-white/10 p-3 text-white"
                >
                  <Icon className="h-5 w-5" />
                </motion.div>
              </div>
              <p className="mt-4 text-sm text-white/70">{action.description}</p>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
};

export { QuickActions };
