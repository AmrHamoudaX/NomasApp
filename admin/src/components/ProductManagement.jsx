import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import productService from "../services/products";
import imageService from "../services/images";
import CategoryManagement from "./CategoryManagement";

export default function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");
  const [formImg, setFormImg] = useState(null);

  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    productService.getAll().then(setProducts);
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!selectedCategory) return alert("Select a category first");

    const product = await productService.create({
      description: productName,
      price,
      stockQuantity,
      categoryId: selectedCategory.id, // <- now we send the selected category
    });

    if (formImg) {
      formImg.append("productId", product.id);
      await imageService.upload(formImg, product.id);
    }

    setProducts((prev) => [...prev, product]);
    setProductName("");
    setPrice("");
    setStockQuantity("");
    setFormImg(null);
    setSelectedCategory(null);
  }

  function handleDelete(product) {
    try {
      console.log(product);
      productService.deleteId(product.id);
      setProducts((prev) => prev.filter((prod) => prod.id !== product.id));
    } catch (error) {
      console.error(error.message);
      console.log("cant delete");
    }
  }

  function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    setFormImg(formData);
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-4xl font-bold mb-6">Product Dashboard</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* PRODUCTS LIST */}
        <section className="lg:col-span-2 space-y-4">
          {products.length === 0 ? (
            <p>No products yet</p>
          ) : (
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {products.map((product) => (
                <Card key={product.id} className="rounded-2xl shadow-sm">
                  <CardContent className="p-4 space-y-3">
                    <img
                      src={product.images?.[0]?.imageUrl}
                      alt={product.description}
                      className="h-40 w-full object-cover rounded-xl"
                    />
                    <h3 className="font-semibold truncate">
                      {product.description}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Category: {product.categoryId}
                    </p>
                    <p className="text-sm text-gray-500">
                      StockQuantity: {product.stockQuantity}
                    </p>
                    <p className="font-bold">${product.price}</p>
                    <Button
                      variant="ghost"
                      className="text-red-500 hover:bg-red-50 hover:text-red-600 transition border"
                      onClick={() => handleDelete(product)}
                    >
                      Delete
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>

        {/* FORM + CATEGORY */}
        <aside className="sticky top-6 h-fit space-y-6">
          {/* CATEGORY SELECT */}
          <CategoryManagement
            onSelect={setSelectedCategory}
            selectedCategory={selectedCategory}
          />

          {/* PRODUCT FORM */}
          {/* <Card className="rounded-2xl shadow-md"> */}
          {/* <Card className="rounded-2xl shadow-sm group hover:shadow-md transition"> */}
          <Card className="rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-200">
            <CardContent className="p-6 space-y-4">
              <h2 className="text-xl font-semibold">Add Product</h2>

              <Input
                placeholder="Product name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                required
              />
              <Input
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
              <Input
                placeholder="Stock quantity"
                value={stockQuantity}
                onChange={(e) => setStockQuantity(e.target.value)}
                required
              />
              <p className="inline-block text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700">
                Selected Category: {selectedCategory?.name || "None"}
              </p>

              <Input type="file" accept="image/*" onChange={handleFile} />
              <Button className="w-full" onClick={handleSubmit}>
                Create Product
              </Button>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}
