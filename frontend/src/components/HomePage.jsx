import { React } from "react";
import { Heart, ChevronRight, Star, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();
  const { featuredProducts } = useOutletContext();
  const categories = [
    { name: "Baseball Caps", count: 124, color: "from-blue-500 to-blue-600" },
    { name: "Snapbacks", count: 89, color: "from-red-500 to-red-600" },
    { name: "Trucker Caps", count: 67, color: "from-green-500 to-green-600" },
    { name: "Beanies", count: 45, color: "from-purple-500 to-purple-600" },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-900 to-gray-800 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "url(https://images.pexels.com/photos/267301/pexels-photo-267301.jpeg?auto=compress&cs=tinysrgb&w=1920)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-medium">
                New Collection Available
              </span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold mb-6">
              Premium Caps
              <br />
              For Your Style
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl">
              Discover the finest collection of caps. From classic designs to
              modern streetwear, find your perfect fit.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate("/products")}
                className="bg-white text-gray-900 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all flex items-center justify-center space-x-2"
              >
                <span>Shop Now</span>
                <ChevronRight className="w-5 h-5" />
              </button>
              <button className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all border border-white/20">
                View Collections
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* End Hero Section */}

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Shop by Category
          </h2>
          <p className="text-gray-600">
            Find the perfect cap for every occasion
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity`}
              ></div>
              <div className="relative">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {category.name}
                </h3>
                <p className="text-gray-600 mb-4">{category.count} products</p>
                <div className="flex items-center text-gray-900 font-semibold group-hover:translate-x-2 transition-transform">
                  <span>Explore</span>
                  <ChevronRight className="w-5 h-5 ml-1" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* End Categories */}

      {/* Featured Products */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-3">
                Featured Products
              </h2>
              <p className="text-gray-600">
                Handpicked favorites from our collection
              </p>
            </div>
            <button className="hidden sm:flex items-center space-x-2 text-gray-900 font-semibold hover:text-gray-600 transition-colors">
              <span>View All</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredProducts &&
              featuredProducts.map((product) => (
                <div
                  key={product.id}
                  className="group bg-gray-50 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative aspect-square overflow-hidden bg-gray-200">
                    <img
                      src={
                        product.images.find((img) => img.imageRole == "main")
                          .imageUrl
                      }
                      alt={product.describtion}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <button className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                      <Heart className="w-5 h-5 text-gray-900" />
                    </button>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center space-x-1 mb-2">
                      <Star className="w-full h-4 text-center  fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-semibold text-gray-900">
                        {/* {product.rating} */}
                      </span>
                      <span className="text-sm text-gray-500">
                        {/* ({product.sales} sold) */}
                      </span>
                    </div>
                    <h3 className="text-lg text-center font-bold text-gray-900 line-clamp-2 min-h-[3.5rem]">
                      {product.description}
                    </h3>
                    <div className="flex flex-col items-center flex-1 gap-3">
                      <span className="text-2xl font-bold text-gray-900">
                        ${product.price}
                      </span>
                      <button className="bg-gray-900 text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-800 transition-colors w-full">
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
      {/* End Featured Products */}

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Join Our Community</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Get exclusive access to new releases, special offers, and style
            tips.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <button className="bg-white text-gray-900 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
      {/* End CTA Section */}
    </>
  );
}

export default HomePage;
