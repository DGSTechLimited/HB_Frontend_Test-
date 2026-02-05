import { motion } from "framer-motion";
import { Badge, Table, TableCell, TableHead, TableRow } from "@/components/ui";
import { ArrowUpRight } from "lucide-react";

const orders = [
  {
    id: "HB-3941",
    dealer: "Ardent Motors",
    parts: "12 SKU",
    date: "Feb 3, 2026",
    status: "Created",
    value: "$24,980",
  },
  {
    id: "HB-3942",
    dealer: "Northline Auto",
    parts: "8 SKU",
    date: "Feb 2, 2026",
    status: "Processing",
    value: "$14,560",
  },
  {
    id: "HB-3943",
    dealer: "Vantage Supply",
    parts: "24 SKU",
    date: "Feb 1, 2026",
    status: "Shipped",
    value: "$38,410",
  },
  {
    id: "HB-3944",
    dealer: "Axis Mobility",
    parts: "5 SKU",
    date: "Jan 31, 2026",
    status: "Processing",
    value: "$8,940",
  },
];

type StatusVariant = "success" | "warning" | "info";

const statusVariant = (status: string): StatusVariant => {
  if (status === "Shipped") return "success";
  if (status === "Processing") return "warning";
  return "info";
};

const RecentOrdersTable = () => {
  return (
    <div className="space-y-4">
      <div className="hidden md:block">
        <Table>
          <TableHead>
            <tr>
              <th className="px-4 py-2">Order</th>
              <th className="px-4 py-2">Dealer</th>
              <th className="px-4 py-2">Parts</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2 text-right">Value</th>
            </tr>
          </TableHead>
          <tbody className="text-sm">
            {orders.map((order) => (
              <TableRow
                key={order.id}
                className="group hover:bg-white/10"
              >
                <TableCell className="rounded-l-2xl font-semibold text-white">
                  {order.id}
                </TableCell>
                <TableCell>{order.dealer}</TableCell>
                <TableCell>{order.parts}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>
                  <Badge variant={statusVariant(order.status)}>
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell className="rounded-r-2xl text-right font-semibold text-white">
                  <span className="inline-flex items-center gap-2">
                    {order.value}
                    <span className="opacity-0 transition group-hover:opacity-100">
                      <span className="inline-flex items-center gap-1 text-xs text-[color:var(--color-accent)]">
                        View <ArrowUpRight className="h-3 w-3" />
                      </span>
                    </span>
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </div>

      <div className="grid gap-3 md:hidden">
        {orders.map((order) => (
          <motion.div
            key={order.id}
            whileHover={{ y: -4 }}
            className="rounded-2xl border border-white/10 bg-white/5 p-4 text-white/80"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-white">{order.id}</p>
              <Badge variant={statusVariant(order.status)}>
                {order.status}
              </Badge>
            </div>
            <p className="mt-2 text-sm text-white/70">{order.dealer}</p>
            <div className="mt-3 flex items-center justify-between text-xs uppercase tracking-[0.2em] text-white/50">
              <span>{order.parts}</span>
              <span>{order.date}</span>
            </div>
            <div className="mt-3 flex items-center justify-between text-sm text-white">
              <span>{order.value}</span>
              <button
                type="button"
                className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--color-accent)]"
              >
                View <ArrowUpRight className="h-3 w-3" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export { RecentOrdersTable };
