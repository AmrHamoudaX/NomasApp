import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isEcommerceOpen, setIsEcommerceOpen] = useState(false);
  const navigate = useNavigate();

  function handleLogout() {
    window.localStorage.removeItem("loggedUser");
    navigate("/login");
  }

  return (
    <>
      {/* Toggle button */}
      <button
        type="button"
        className="sm:hidden p-2 m-3 rounded bg-gray-50 hover:bg-neutral-secondary-medium"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 w-64 h-full
  bg-white border-r border-default
  transform transition-transform duration-300 ease-in-out
  ${isOpen ? "translate-x-0" : "-translate-x-full"}
  sm:translate-x-0`}
      >
        {/* Close button for mobile */}
        <div className="flex justify-end sm:hidden p-2">
          <button onClick={() => setIsOpen(false)}>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Sidebar content */}
        <div className="px-3 py-4 overflow-y-auto h-full">
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                to="/"
                className="flex items-center px-2 py-1.5 text-body rounded hover:bg-neutral-tertiary hover:text-fg-brand"
              >
                <span className="ms-3">Dashboard</span>
              </Link>
            </li>
            <li>
              <button
                type="button"
                className="flex items-center w-full justify-between px-2 py-1.5 text-body rounded-base hover:bg-neutral-tertiary hover:text-fg-brand group"
                onClick={() => setIsEcommerceOpen((prev) => !prev)}
              >
                <div className="flex items-center">
                  <svg
                    className="shrink-0 w-5 h-5 transition duration-75 group-hover:text-fg-brand"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"
                    />
                  </svg>
                  <span className="ms-3 whitespace-nowrap">E-commerce</span>
                </div>
                <svg
                  className={`w-5 h-5 transition-transform duration-200 ${
                    isEcommerceOpen ? "rotate-180" : ""
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 9-7 7-7-7"
                  />
                </svg>
              </button>
              <ul
                className={`py-2 space-y-2 transition-all ${
                  isEcommerceOpen ? "block" : "hidden"
                }`}
              >
                <li>
                  <Link
                    to="/products"
                    className="pl-10 flex items-center px-2 py-1.5 text-body rounded-base hover:bg-neutral-tertiary hover:text-fg-brand group"
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    to="/orders"
                    className="pl-10 flex items-center px-2 py-1.5 text-body rounded-base hover:bg-neutral-tertiary hover:text-fg-brand group"
                  >
                    Orders
                  </Link>
                </li>
                <li>
                  <a
                    href="#"
                    className="pl-10 flex items-center px-2 py-1.5 text-body rounded-base hover:bg-neutral-tertiary hover:text-fg-brand group"
                  >
                    Billing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="pl-10 flex items-center px-2 py-1.5 text-body rounded-base hover:bg-neutral-tertiary hover:text-fg-brand group"
                  >
                    Invoice
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <Link
                to="#"
                className="flex items-center px-2 py-1.5 text-body rounded hover:bg-neutral-tertiary hover:text-fg-brand"
              >
                <span className="ms-3">Inbox</span>
              </Link>
            </li>
            <li>
              <button
                className="flex items-center px-2 py-1.5 text-body rounded hover:bg-neutral-tertiary hover:text-fg-brand"
                onClick={handleLogout}
              >
                <span className="ms-3">Log Out</span>
              </button>
            </li>
          </ul>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 sm:hidden "
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
}

export { Sidebar };
