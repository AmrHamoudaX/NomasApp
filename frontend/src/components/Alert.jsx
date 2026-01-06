function Alert({ text, status = "Info" }) {
  console.log(status);
  const alertStatus = {
    Info: "bg-blue-50 text-blue-800",
    Success: "bg-green-50 text-green-800",
    Error: "bg-red-50 text-red-800",
  };
  console.log(alertStatus["info"]);
  return (
    <div
      className={`p-4 mt-6 mb-6 text-sm text-fg-brand-strong rounded-base ${alertStatus[status]}`}
    >
      <span className="font-medium">{status}! </span>
      {text}
    </div>
  );
}

export default Alert;
