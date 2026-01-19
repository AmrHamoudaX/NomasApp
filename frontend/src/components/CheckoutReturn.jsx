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

  useEffect(() => {
    if (!sessionId) {
      setStatus("error");
      setError("Missing session ID.");
      return;
    }

    async function verifyPayment() {
      try {
        const res = await fetch(
          `/api/stripe/verify-session?session_id=${sessionId}`,
        );

        if (!res.ok) {
          throw new Error("Payment verification failed.");
        }

        const data = await res.json();

        if (data.status === "paid") {
          setStatus("success");
          clearCart(); // ✅ clear cart only after success
        } else {
          setStatus("error");
          setError("Payment was not completed.");
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
        {status === "loading" && (
          <>
            <Loader className="mx-auto h-12 w-12 animate-spin text-gray-500" />
            <h2 className="mt-4 text-xl font-semibold">
              Confirming your payment…
            </h2>
            <p className="mt-2 text-gray-500">Please don’t close this page.</p>
          </>
        )}

        {status === "success" && (
          <>
            <CheckCircle className="mx-auto h-14 w-14 text-green-500" />
            <h2 className="mt-4 text-2xl font-bold text-green-600">
              Payment Successful!
            </h2>
            <p className="mt-2 text-gray-600">
              Thank you for your order. We’ll start processing it right away.
            </p>

            <button
              onClick={() => navigate("/products")}
              className="mt-6 w-full rounded-lg bg-black px-4 py-3 text-white hover:bg-gray-800"
            >
              Continue Shopping
            </button>
          </>
        )}

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
