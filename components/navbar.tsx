"use client"

import { ShoppingBag, Store } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/use-cart"

interface NavbarProps {
  onCartClick: () => void
}

export function Navbar({ onCartClick }: NavbarProps) {
  const { getTotalItems } = useCart()
  const totalItems = getTotalItems()

  return (
    <header className="border-b bg-card sticky top-0 z-30 backdrop-blur-sm bg-card/95">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Store className="w-8 h-8 text-primary" />
            <div>
              <h1 className="text-2xl font-bold text-balance">FakeStore</h1>
              <p className="text-xs text-muted-foreground">Tu tienda online</p>
            </div>
          </div>

          <Button variant="outline" size="lg" className="relative bg-transparent" onClick={onCartClick}>
            <ShoppingBag className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full min-w-6 h-6 px-1.5 flex items-center justify-center text-xs font-bold">
                {totalItems}
              </span>
            )}
          </Button>
        </div>
      </div>
    </header>
  )
}
