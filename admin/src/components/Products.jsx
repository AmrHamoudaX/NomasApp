import { useEffect } from "react";
import { useState } from "react";
import productService from "../services/products";
import imageService from "../services/images";

function Products() {
  const [products, setProducts] = useState(null);
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [formImg, setFormImg] = useState("");

  useEffect(() => {
    async function allProducts() {
      try {
        const allProducts = await productService.getAll();
        setProducts(allProducts);
      } catch (err) {
        console.error(err);
      }
    }
    allProducts();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const product = await productService.create({
        description: productName,
        price: price,
        stockQuantity,
        categoryId: categoryId,
      });
      formImg.append("productId", product.id);
      const imageUploaded = await imageService.upload(formImg, product.id);
      setImageUrl(imageUploaded);
      setProducts(products.concat(product));
    } catch (error) {
      console.error(error.message);
    }
    setProductName("");
    setPrice("");
    setStockQuantity("");
    setCategoryId("");
  }

  async function handleDelete(e) {
    try {
      productService.deleteId(e.target.id);
      setProducts(products.filter((product) => product.id != e.target.id));
    } catch (error) {
      console.log(error);
    }
  }

  async function handleFile(e) {
    try {
      const files = e.currentTarget.files;
      if (!files || files.length === 0) {
        throw new Error("You must select an image to upload.");
      }
      const file = files[0];
      const formData = new FormData();
      formData.append("file", file);
      setFormImg(formData);
      return formData;
    } catch (error) {
      console.error(error.message);
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-5">
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="category"
            id="category"
            value={productName}
            className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
            placeholder=" "
            onChange={(e) => setProductName(e.target.value)}
            required
          />
          <label
            htmlFor="floating_email"
            className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
          >
            Product name
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="category"
            id="category"
            value={price}
            className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
            placeholder=" "
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <label
            htmlFor="floating_email"
            className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
          >
            Price
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="category"
            id="category"
            value={stockQuantity}
            className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
            placeholder=" "
            onChange={(e) => setStockQuantity(e.target.value)}
            required
          />
          <label
            htmlFor="floating_email"
            className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
          >
            Stock Quantity
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="category"
            id="category"
            value={categoryId}
            className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
            placeholder=" "
            onChange={(e) => setCategoryId(e.target.value)}
            required
          />
          <label
            htmlFor="floating_email"
            className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
          >
            Category Id
          </label>
        </div>
        <div>
          <input type="file" accept="image/*" onChange={handleFile} />
        </div>
        <button
          type="submit"
          className="text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
        >
          Submit
        </button>
      </form>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            All Products
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products &&
              products.map((product) => (
                <div key={product.id} className="group relative">
                  <img
                    alt={product.description}
                    src={
                      product.images
                        ? product.images.map((img) => img.imageUrl)
                        : null
                    }
                    className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
                  />
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-sm text-gray-700">
                        <a href={product.href}>
                          <span aria-hidden="true" className="inset-0" />
                          {product.name}
                        </a>
                      </h3>
                    </div>
                    <p className="font-bold text-gray-900 w-full text-center">
                      {product.description}
                    </p>
                  </div>
                  <button
                    id={product.id}
                    type="button"
                    className="text-sm bg-cyan-100 hover:bg-gray-100 text-gray-800 font-semibold py-0.5 px-3 border border-gray-400 rounded shadow ml-30 "
                    onClick={handleDelete}
                  >
                    Delete
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
export { Products };
