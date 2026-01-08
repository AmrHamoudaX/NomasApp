export default function OrderItems({ items }) {
  return (
    <div className="border-t pt-4 space-y-2">
      {items.map((item) => (
        <div
          key={item.id}
          className="flex justify-between text-sm bg-gray-50 rounded-lg px-4 py-2"
        >
          <span>{item.product?.description}</span>
          <span>
            {item.quantity} × ${item.price}
          </span>
        </div>
      ))}
    </div>
  );
}
