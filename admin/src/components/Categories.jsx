import { useEffect, useState } from "react";
import categoryService from "../services/categories";

function Categories() {
  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const allCategories = await categoryService.getAll();
        setCategories(allCategories);
      } catch (err) {
        console.error(`Error fetching categories: ${err}`);
      }
    }
    fetchCategories();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const category = await categoryService.create({
        name: categoryName,
      });
      setCategories(categories.concat(category));
    } catch (error) {
      console.error(error.message);
    }
    setCategoryName("");
  }

  async function handleDelete(e) {
    categoryService.deleteId(e.target.id);
    setCategories(categories.filter((category) => category.id != e.target.id));
  }
  return (
    <>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-5">
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="category"
            id="category"
            value={categoryName}
            className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
            placeholder=" "
            onChange={(e) => setCategoryName(e.target.value)}
            required
          />
          <label
            htmlFor="floating_email"
            className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
          >
            Add new Category
          </label>
        </div>
        <button
          type="submit"
          className="text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
        >
          Submit
        </button>
      </form>
      <div className="bg-green-50">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Categories
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {categories
              ? categories.map((category) => (
                  <div key={category.id} className="group relative">
                    <div className="mt-4 flex justify-between">
                      <div>
                        <h3 className="text-sm text-gray-700">
                          <p>
                            <span aria-hidden="true" className="inset-0" />
                            {category.name}
                          </p>
                        </h3>
                      </div>
                      <button
                        id={category.id}
                        type="button"
                        className="text-sm bg-cyan-100 hover:bg-gray-100 text-gray-800 font-semibold py-0.5 px-3 border border-gray-400 rounded shadow ml-30 "
                        onClick={handleDelete}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              : null}
          </div>
        </div>
      </div>
    </>
  );
}
export { Categories };
