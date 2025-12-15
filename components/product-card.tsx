"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import type { Product } from "@/context/cart-context"
import { useCart } from "@/hooks/use-cart"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()

  return (
    <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative aspect-square bg-white p-4">
        <img src={product.image || "/placeholder.svg"} alt={product.title} className="w-full h-full object-contain" />
      </div>
      <CardContent className="flex-1 flex flex-col p-4 gap-3">
        <div className="flex-1">
          <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">{product.category}</p>
          <h3 className="font-semibold text-sm line-clamp-2 text-balance mb-2">{product.title}</h3>
          <p className="text-xs text-muted-foreground line-clamp-2">{product.description}</p>
        </div>
        <div className="flex items-center justify-between gap-2">
          <span className="text-2xl font-bold text-foreground">${product.price.toFixed(2)}</span>
          <Button onClick={() => addToCart(product)} size="sm" className="gap-2">
            <ShoppingCart className="w-4 h-4" />
            Agregar
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
