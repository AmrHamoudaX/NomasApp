import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import categoryService from "../services/categories";

export default function CategoryManagement({ onSelect, selectedCategory }) {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    async function fetchAllCategories() {
      const allCategories = await categoryService.getAll();
      setCategories(allCategories);
    }
    fetchAllCategories();
  }, []);

  async function handleCreate(e) {
    e.preventDefault();
    const category = await categoryService.create({ name });
    setCategories((prev) => [...prev, category]);
    setName("");
  }

  async function handleDelete(id) {
    await categoryService.deleteId(id);
    setCategories((prev) => prev.filter((c) => c.id !== id));
  }

  return (
    <Card className="rounded-2xl shadow-md">
      <CardContent className="p-6 space-y-4">
        <h2 className="text-xl font-semibold">Categories</h2>

        <form onSubmit={handleCreate} className="flex gap-2">
          <Input
            placeholder="New category"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Button type="submit">Add</Button>
        </form>

        <div className="space-y-2">
          {categories.map((category) => {
            const isActive = selectedCategory?.id === category.id;

            return (
              <div
                key={category.id}
                className={`
                  group flex items-center justify-between rounded-lg px-3 py-2 border
                  transition-all duration-200 cursor-pointer
                  ${
                    isActive
                      ? "bg-black text-white border-black shadow-sm"
                      : "hover:bg-gray-100 hover:border-gray-300"
                  }
                `}
              >
                <button
                  onClick={() => onSelect(category)}
                  className="text-left font-medium w-full"
                >
                  {category.name}
                </button>

                <Button
                  size="sm"
                  variant="ghost"
                  className={`
                    opacity-0 group-hover:opacity-100 transition
                    ${isActive ? "text-white hover:bg-white/20" : "text-red-500 hover:bg-red-50"}
                  `}
                  onClick={() => handleDelete(category.id)}
                >
                  Delete
                </Button>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
