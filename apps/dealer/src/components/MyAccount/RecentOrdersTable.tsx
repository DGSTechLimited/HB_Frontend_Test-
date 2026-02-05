import { Alert, Button, Spin } from "antd";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useOrders } from "@/services/order";

export interface OrderListItem {
  key: string;
  orderNumber: string;
  orderDate: string;
  orderStatus: string;
  totalAmount: string;
  itemCount: number;
  id: number;
}

const statusStyles: Record<string, string> = {
  created: "bg-blue-100 text-blue-700",
  processing: "bg-amber-100 text-amber-700",
  shipped: "bg-emerald-100 text-emerald-700",
  delivered: "bg-emerald-100 text-emerald-700",
  pending: "bg-orange-100 text-orange-700",
  cancelled: "bg-red-100 text-red-700",
};

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

const RecentOrdersTable = () => {
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();
  const { data: ordersData, isLoading, error } = useOrders({
    status: "CREATED",
    type: "recent",
    page: 1,
    limit: 10,
  });

  const orders: OrderListItem[] =
    ordersData?.data.map((order: any) => ({
      id: order.id,
      orderNumber: order.orderNumber,
      orderDate: order.orderDate,
      orderStatus: order.orderStatus,
      totalAmount: order.formattedTotal,
      itemCount: order.itemCount,
    })) || [];

  const handleSeeAllOrders = () => {
    console.log("See all orders clicked");
  };

  const handleViewOrderDetails = (orderNumber: string) => {
    navigate(`/order/${orderNumber}`);
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_14px_36px_-28px_rgba(15,23,42,0.25)]">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
            Recent Orders
          </p>
          <h3 className="mt-2 text-2xl font-semibold text-slate-900">
            Track live dealer activity
          </h3>
        </div>
        <Button
          type="default"
          onClick={handleSeeAllOrders}
          className="h-10 rounded-xl border-slate-200 px-4 text-sm font-semibold text-slate-700 hover:border-slate-300 hover:text-slate-900"
        >
          See All <ArrowUpRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <div className="mt-5">
        {error && (
          <Alert
            message="Error loading orders"
            description={
              error.message || "Failed to fetch orders. Please try again later."
            }
            type="error"
            showIcon
            className="mb-4"
          />
        )}
        {isLoading ? (
          <div className="flex items-center justify-center py-10">
            <Spin size="large" tip="Loading orders..." />
          </div>
        ) : (
          <>
            <div className="hidden w-full md:block">
              <div className="grid grid-cols-6 gap-4 border-b border-slate-100 pb-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                <span>Order</span>
                <span>Date</span>
                <span>Status</span>
                <span className="text-center">Items</span>
                <span className="text-right">Total</span>
                <span className="text-right">Action</span>
              </div>
              <motion.div
                className="mt-3 space-y-3"
                initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                {orders.map((order) => (
                  <motion.div
                    key={order.id}
                    whileHover={reduceMotion ? undefined : { y: -2 }}
                    className="group grid grid-cols-6 items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50 px-5 py-4 transition hover:border-blue-200 hover:bg-white hover:shadow-[0_12px_24px_-22px_rgba(59,130,246,0.35)]"
                  >
                    <span className="font-mono text-sm font-semibold text-slate-900">
                      {order.orderNumber}
                    </span>
                    <span className="text-sm text-slate-500">{formatDate(order.orderDate)}</span>
                    <span
                      className={`inline-flex w-fit items-center rounded-full px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.2em] ${
                        statusStyles[order.orderStatus.toLowerCase()] || "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {order.orderStatus}
                    </span>
                    <span className="text-center text-sm text-slate-600">{order.itemCount}</span>
                    <span className="text-right text-sm font-semibold text-slate-900">{order.totalAmount}</span>
                    <button
                      type="button"
                      onClick={() => handleViewOrderDetails(order.id.toString())}
                      className="ml-auto inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600 opacity-0 transition group-hover:opacity-100 hover:border-blue-200 hover:text-blue-700"
                    >
                      View <Eye className="h-4 w-4" />
                    </button>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            <div className="mt-4 grid gap-3 md:hidden">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_10px_22px_-20px_rgba(15,23,42,0.25)]"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-sm font-semibold text-slate-900">{order.orderNumber}</span>
                    <span
                      className={`inline-flex items-center rounded-full px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.2em] ${
                        statusStyles[order.orderStatus.toLowerCase()] || "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {order.orderStatus}
                    </span>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-sm text-slate-600">
                    <span>{formatDate(order.orderDate)}</span>
                    <span>{order.itemCount} items</span>
                  </div>
                  <div className="mt-4 flex items-center justify-between text-sm font-semibold text-slate-900">
                    <span>{order.totalAmount}</span>
                    <button
                      type="button"
                      onClick={() => handleViewOrderDetails(order.id.toString())}
                      className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-600 hover:border-blue-200 hover:text-blue-700"
                    >
                      View <Eye className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default RecentOrdersTable;
