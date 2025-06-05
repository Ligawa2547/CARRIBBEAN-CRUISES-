"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, CreditCard, Plus, Minus, ShoppingCart, Loader2 } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { createMealOrderPayment } from "@/app/actions/payments"
import Footer from "@/components/footer"

interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  category: string
  image: string
}

const menuItems: MenuItem[] = [
  {
    id: "1",
    name: "Caribbean Grilled Lobster",
    description: "Fresh lobster grilled with garlic butter, served with island rice and seasonal vegetables",
    price: 42.99,
    category: "Main Course",
    image: "/images/menu/steak-dish.png",
  },
  {
    id: "2",
    name: "Filet Mignon",
    description: "8oz premium beef tenderloin, truffle mashed potatoes, asparagus, and red wine reduction",
    price: 38.99,
    category: "Main Course",
    image: "/images/menu/steak-dish.png",
  },
  {
    id: "3",
    name: "Caribbean Sunset Cocktail",
    description: "Rum, pineapple juice, orange juice, grenadine, and fresh fruit garnish",
    price: 14.99,
    category: "Drinks",
    image: "/images/menu/cocktail-spritz.png",
  },
  {
    id: "4",
    name: "Classic Mojito",
    description: "White rum, fresh mint, lime juice, sugar, and soda water",
    price: 12.99,
    category: "Drinks",
    image: "/images/menu/cocktail-trio.png",
  },
]

export default function MealOrderPage() {
  const [cart, setCart] = useState<{ [key: string]: number }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [customerInfo, setCustomerInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    deliveryAddress: "",
  })

  const addToCart = (itemId: string) => {
    setCart((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }))
  }

  const removeFromCart = (itemId: string) => {
    setCart((prev) => {
      const newCart = { ...prev }
      if (newCart[itemId] > 1) {
        newCart[itemId]--
      } else {
        delete newCart[itemId]
      }
      return newCart
    })
  }

  const getCartTotal = () => {
    return Object.entries(cart).reduce((total, [itemId, quantity]) => {
      const item = menuItems.find((item) => item.id === itemId)
      return total + (item ? item.price * quantity : 0)
    }, 0)
  }

  const getCartItems = () => {
    return Object.entries(cart)
      .map(([itemId, quantity]) => {
        const item = menuItems.find((item) => item.id === itemId)
        return item ? { ...item, quantity } : null
      })
      .filter(Boolean)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const formData = new FormData()
      formData.append("firstName", customerInfo.firstName)
      formData.append("lastName", customerInfo.lastName)
      formData.append("email", customerInfo.email)
      formData.append("phone", customerInfo.phone)
      formData.append("deliveryAddress", customerInfo.deliveryAddress)
      formData.append("amount", getCartTotal().toString())
      formData.append("items", JSON.stringify(getCartItems()))

      const result = await createMealOrderPayment(formData)

      if (result?.error) {
        alert(result.error)
      } else if (result?.success && result?.paymentUrl) {
        // Redirect to payment URL
        window.location.href = result.paymentUrl
      } else {
        alert("Something went wrong. Please try again.")
      }
    } catch (error) {
      console.error("Order submission error:", error)
      alert("Failed to process order. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-b from-ocean-50 to-cruise-50/30">
      <div className="container py-12 px-4 md:px-6">
        <Link
          href="/menu"
          className="inline-flex items-center text-sm font-medium text-ocean-600 hover:text-ocean-800 mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Menu
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold mb-6">Order Meals</h1>

            <Card className="mb-8 border-0 shadow-md">
              <CardHeader>
                <CardTitle>Select Your Meals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {menuItems.map((item) => (
                    <div key={item.id} className="border rounded-lg p-4">
                      <div className="aspect-video relative mb-4 overflow-hidden rounded-md">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <h3 className="font-semibold mb-2">{item.name}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-ocean-600">${item.price}</span>
                        <div className="flex items-center gap-2">
                          {cart[item.id] ? (
                            <>
                              <Button size="sm" variant="outline" onClick={() => removeFromCart(item.id)}>
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span className="w-8 text-center">{cart[item.id]}</span>
                              <Button size="sm" variant="outline" onClick={() => addToCart(item.id)}>
                                <Plus className="h-4 w-4" />
                              </Button>
                            </>
                          ) : (
                            <Button size="sm" onClick={() => addToCart(item.id)}>
                              Add to Cart
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {Object.keys(cart).length > 0 && (
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle>Customer Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          required
                          disabled={isSubmitting}
                          value={customerInfo.firstName}
                          onChange={(e) => setCustomerInfo((prev) => ({ ...prev, firstName: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          required
                          disabled={isSubmitting}
                          value={customerInfo.lastName}
                          onChange={(e) => setCustomerInfo((prev) => ({ ...prev, lastName: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          required
                          disabled={isSubmitting}
                          value={customerInfo.email}
                          onChange={(e) => setCustomerInfo((prev) => ({ ...prev, email: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone *</Label>
                        <Input
                          id="phone"
                          required
                          disabled={isSubmitting}
                          value={customerInfo.phone}
                          onChange={(e) => setCustomerInfo((prev) => ({ ...prev, phone: e.target.value }))}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="deliveryAddress">Delivery Address *</Label>
                      <Textarea
                        id="deliveryAddress"
                        required
                        disabled={isSubmitting}
                        value={customerInfo.deliveryAddress}
                        onChange={(e) => setCustomerInfo((prev) => ({ ...prev, deliveryAddress: e.target.value }))}
                        placeholder="Enter your full delivery address"
                      />
                    </div>
                    <Button type="submit" className="w-full bg-ocean-600 hover:bg-ocean-700" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <CreditCard className="mr-2 h-4 w-4" />
                          Pay ${getCartTotal().toFixed(2)} & Place Order
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>

          <div>
            <Card className="border-0 shadow-md sticky top-24">
              <CardHeader className="bg-gradient-to-r from-ocean-800 to-cruise-700 text-white">
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {Object.keys(cart).length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">
                    Your cart is empty. Add some items to get started!
                  </p>
                ) : (
                  <div className="space-y-4">
                    {getCartItems().map((item) => (
                      <div key={item?.id} className="flex justify-between items-center">
                        <div className="flex-1">
                          <p className="font-medium text-sm">{item?.name}</p>
                          <p className="text-xs text-muted-foreground">
                            ${item?.price} × {item?.quantity}
                          </p>
                        </div>
                        <p className="font-medium">${((item?.price || 0) * (item?.quantity || 0)).toFixed(2)}</p>
                      </div>
                    ))}

                    <div className="border-t pt-4 mt-4">
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total:</span>
                        <span className="text-ocean-600">${getCartTotal().toFixed(2)}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">* Secure payment processed by PesaPal</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
