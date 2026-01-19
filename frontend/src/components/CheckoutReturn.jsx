import { useEffect, useState } from "react";
import {
  useNavigate,
  useSearchParams,
  useOutletContext,
} from "react-router-dom";
import { CheckCircle, XCircle, Loader } from "lucide-react";

export default function CheckoutReturn() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const navigate = useNavigate();
  const { clearCart } = useOutletContext();

  const [status, setStatus] = useState("loading"); // loading | success | error
  const [error, setError] = useState(null);
  const [order, setOrder] = useState(null); // store order for summary

  useEffect(() => {
    if (!sessionId) {
      setStatus("error");
      setError("Missing session ID.");
      return;
    }

    async function verifyPayment() {
      try {
        const res = await fetch(`/api/orders/by-session/${sessionId}`);
        if (!res.ok) throw new Error("Payment verification failed.");

        const data = await res.json();

        if (data.status === "success") {
          setStatus("success");
          setOrder(data.order); // ✅ store order for summary
          clearCart();
        } else if (data.status === "pending") {
          // 🔁 wait 2 seconds and try again (polling)
          setTimeout(verifyPayment, 2000);
        } else {
          setStatus("error");
          setError(data.message || "Payment could not be verified.");
        }
      } catch (err) {
        setStatus("error");
        setError(err.message);
      }
    }

    verifyPayment();
  }, [sessionId, clearCart]);

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg text-center">
        {/* Loading state */}
        {status === "loading" && (
          <>
            <Loader className="mx-auto h-12 w-12 animate-spin text-gray-500" />
            <h2 className="mt-4 text-xl font-semibold">
              Confirming your payment…
            </h2>
            <p className="mt-2 text-gray-500">Please don’t close this page.</p>
          </>
        )}

        {/* Success state */}
        {status === "success" && order && (
          <>
            <CheckCircle className="mx-auto h-14 w-14 text-green-500" />
            <h2 className="mt-4 text-2xl font-bold text-green-600">
              Payment Successful!
            </h2>
            <p className="mt-2 text-gray-600">
              Thank you, <strong>{order.fullName}</strong>! We’ve received your
              payment.
            </p>

            {/* Order Summary */}
            <div className="mt-6 text-left border-t pt-4">
              <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
              <p>
                <strong>Email:</strong> {order.email}
              </p>
              <p>
                <strong>Phone:</strong> {order.phoneNumber}
              </p>
              <p>
                <strong>Address:</strong> {order.addressLine1}
                {order.addressLine2 ? `, ${order.addressLine2}` : ""},{" "}
                {order.city}
              </p>
              <p>
                <strong>Total:</strong> AED {order.totalAmount}
              </p>
              {order.shippingFee > 0 && (
                <p>
                  <strong>Shipping:</strong> AED {order.shippingFee}
                </p>
              )}
              <p>
                <strong>Status:</strong> {order.status}
              </p>
            </div>

            <button
              onClick={() => navigate("/products")}
              className="mt-6 w-full rounded-lg bg-black px-4 py-3 text-white hover:bg-gray-800"
            >
              Continue Shopping
            </button>
          </>
        )}

        {/* Error state */}
        {status === "error" && (
          <>
            <XCircle className="mx-auto h-14 w-14 text-red-500" />
            <h2 className="mt-4 text-2xl font-bold text-red-600">
              Payment Failed
            </h2>
            <p className="mt-2 text-gray-600">
              {error || "Something went wrong with your payment."}
            </p>

            <button
              onClick={() => navigate("/checkout")}
              className="mt-6 w-full rounded-lg bg-black px-4 py-3 text-white hover:bg-gray-800"
            >
              Try Again
            </button>
          </>
        )}
      </div>
    </div>
  );
}
