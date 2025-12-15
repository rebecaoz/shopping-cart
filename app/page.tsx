"use client"

import { useState } from "react"
import type { Product } from "@/context/cart-context"
import { ProductCard } from "@/components/product-card"
import { ShoppingCart } from "@/components/shopping-cart"
import { Navbar } from "@/components/navbar"
import { CategoryFilter } from "@/components/category-filter"
import { Loader2 } from "lucide-react"
import { useFetch } from "@/hooks/use-fetch"

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [isCartOpen, setIsCartOpen] = useState(false)

  const url =
    selectedCategory === "all"
      ? "https://fakestoreapi.com/products"
      : `https://fakestoreapi.com/products/category/${selectedCategory}`

  const { data: products, loading, error } = useFetch<Product[]>(url)

  return (
    <div className="min-h-screen bg-background">
      <Navbar onCartClick={() => setIsCartOpen(true)} />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
            <Loader2 className="w-12 h-12 animate-spin text-primary" />
            <p className="text-lg font-medium text-muted-foreground">Cargando productos...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
            <p className="text-lg font-medium text-destructive">Error: {error}</p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-balance mb-2">Nuestros Productos</h2>
              <p className="text-muted-foreground mb-6">{products?.length || 0} productos disponibles</p>

              <CategoryFilter selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products?.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </main>

      <ShoppingCart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  )
}
