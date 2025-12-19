"use client"

import Button from '@mui/material/Button';
import { useFetch } from "@/hooks/use-fetch"

interface CategoryFilterProps {
  selectedCategory: string
  onCategoryChange: (category: string) => void
}

export function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  const { data: categories, loading } = useFetch<string[]>("https://fakestoreapi.com/products/categories")

  if (loading) {
    return (
      <div className="flex gap-2 flex-wrap">
        <Button variant="outlined" disabled>
          Cargando...
        </Button>
      </div>
    )
  }

  return (
    <div className="flex gap-2 flex-wrap">
      <Button variant={selectedCategory === "all" ? "contained" : "outlined"} onClick={() => onCategoryChange("all")}>
        Todos
      </Button>
      {categories?.map((category) => (
        <Button
          key={category}
          variant={selectedCategory === category ? "contained" : "outlined"}
          onClick={() => onCategoryChange(category)}
          className="capitalize"
        >
          {category === "electronics"
            ? "Electrónica"
            : category === "jewelery"
              ? "Joyas"
              : category === "men's clothing"
                ? "Ropa Hombre"
                : category === "women's clothing"
                  ? "Ropa Mujer"
                  : category}
        </Button>
      ))}
    </div>
  )
}
