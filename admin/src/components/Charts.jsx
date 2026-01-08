import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { BarChart, Bar } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function RevenueChart({ data }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

function OrdersStatusChart({ data }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Orders by Status</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="status" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar
              dataKey="count"
              fill="hsl(var(--primary))"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export default function Charts({ orders }) {
  const revenueData = getRevenueByDate(orders);
  const statusData = getOrdersByStatus(orders);

  function getRevenueByDate(orders) {
    const map = {};

    orders.forEach((order) => {
      const date = new Date(order.createdAt).toLocaleDateString();
      map[date] = (map[date] || 0) + Number(order.totalAmount);
    });

    return Object.entries(map).map(([date, revenue]) => ({
      date,
      revenue,
    }));
  }

  function getOrdersByStatus(orders) {
    const map = {};

    orders.forEach((order) => {
      map[order.status] = (map[order.status] || 0) + 1;
    });

    return Object.entries(map).map(([status, count]) => ({
      status,
      count,
    }));
  }
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
      <RevenueChart data={revenueData} />
      <OrdersStatusChart data={statusData} />
    </div>
  );
}
