import { useState } from "react";
import { Search, User, Menu, X, ShoppingBag, Heart } from "lucide-react";

function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center">
                <ShoppingBag className="w-6 h-6 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-2xl font-bold text-gray-900">NOMAS</span>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <a
                href="#"
                className="text-gray-900 font-semibold hover:text-gray-600 transition-colors"
              >
                Home
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Shop
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Collections
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                About
              </a>
            </nav>

            <div className="hidden md:flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Search className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Heart className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ShoppingBag className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <User className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-4 py-3 space-y-3">
              <a href="#" className="block text-gray-900 font-semibold">
                Home
              </a>
              <a href="#" className="block text-gray-600">
                Shop
              </a>
              <a href="#" className="block text-gray-600">
                Collections
              </a>
              <a href="#" className="block text-gray-600">
                About
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
export default NavBar;
