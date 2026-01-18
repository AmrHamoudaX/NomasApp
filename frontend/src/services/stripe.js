import axios from "axios";

const baseUrl = "/api/stripe/create-checkout-session";

export default async function fetchClientSecret({ cart, guestInfo }) {
  //Create a Checkout Session
  const response = await axios.post(baseUrl, { cart, guestInfo });
  return response.data.clientSecret;
}
