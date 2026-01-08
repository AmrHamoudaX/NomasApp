import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import orderService from "../services/orders";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    async function fetchOrders() {
      const allOrders = await orderService.getAll();
      setOrders(allOrders);
    }
    fetchOrders();
  }, []);

  function toggle(id) {
    setExpanded(expanded === id ? null : id);
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-4xl font-bold mb-8">Orders</h1>

      <div className="space-y-4">
        {orders.map((order) => (
          <Card key={order.id} className="rounded-2xl shadow-sm">
            <CardContent className="p-6 space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">
                    Order #{order.id} — {order.fullName}
                  </p>
                  <p className="text-sm text-gray-600">{order.email}</p>
                </div>

                <div className="text-right">
                  <p className="font-bold">${order.totalAmount}</p>
                  <span className="text-sm px-3 py-1 rounded-full bg-gray-100">
                    {order.status}
                  </span>
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => toggle(order.id)}
              >
                {expanded === order.id ? "Hide items" : "View items"}
              </Button>

              {expanded === order.id && (
                <OrderItems items={order.order_items} />
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
