"use client"

import { Card, CardContent, CardHeader, Typography } from '@mui/material'
import Button from '@mui/material/Button';
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react"
import { useCart } from "@/hooks/use-cart"

interface ShoppingCartProps {
  isOpen: boolean
  onClose: () => void
}

export function ShoppingCart({ isOpen, onClose }: ShoppingCartProps) {
  const { cart, removeFromCart, updateQuantity, clearCart, getTotalPrice, getTotalItems } = useCart()

  const totalItems = getTotalItems()
  const totalPrice = getTotalPrice()

  return (
    <>
      {/* Cart Sidebar */}
      {isOpen && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />
          <Card className="fixed top-0 right-0 h-full w-full md:w-96 z-50 rounded-none border-0 flex flex-col">
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <Typography className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5" />
                  Carrito ({totalItems})
                </Typography>
                <Button variant="outlined" onClick={onClose}>
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto p-4">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center gap-4">
                  <ShoppingBag className="w-16 h-16 text-muted-foreground" />
                  <p className="text-muted-foreground">Tu carrito está vacío</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-3 border rounded-lg p-3">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        className="w-20 h-20 object-contain bg-white rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm line-clamp-2 mb-1">{item.title}</h4>
                        <p className="text-sm font-bold mb-2">${item.price.toFixed(2)}</p>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outlined"
                         
                            className="h-7 w-7 bg-transparent"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="outlined"
                    
                            className="h-7 w-7 bg-transparent"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                          <Button
                            color="secondary"
                            sx={{ minWidth: 'auto', p: 0 }}
                            className="h-7 w-7 ml-auto"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
            {cart.length > 0 && (
              <div className="border-t p-4 space-y-3">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total:</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <Button className="w-full">
                  Proceder al Pago
                </Button>
                <Button variant="outlined" className="w-full bg-transparent" onClick={clearCart}>
                  Vaciar Carrito
                </Button>
              </div>
            )}
          </Card>
        </>
      )}
    </>
  )
}
