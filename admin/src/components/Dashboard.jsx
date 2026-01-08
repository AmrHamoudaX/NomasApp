import { useEffect, useState } from "react";
import orderService from "../services/orders";
import StatCard from "./StatCard";
import RecentOrders from "./RecentOrders";
import Charts from "./Charts";

export default function Dashboard() {
  const [orders, setOrders] = useState([]);
  const revenue = orders.reduce((sum, o) => sum + Number(o.totalAmount), 0);

  useEffect(() => {
    orderService.getAll().then(setOrders);
  }, []);

  return (
    <div className="flex-1 p-6">
      {/* <div className="space-y-8"> */}
      <h1 className="text-3xl font-bold mb-6"> Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard title="Revenue" value={`$${revenue.toFixed(2)}`} />
        <StatCard title="Orders" value={orders.length} />
        <StatCard
          title="Pending"
          value={orders.filter((o) => o.status === "pending").length}
        />
      </div>

      {/* Recent orders */}
      <RecentOrders orders={orders.slice(0, 5)} />

      {/* Charts */}
      <Charts orders={orders} />
    </div>
  );
}
