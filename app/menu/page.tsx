import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const metadata: Metadata = {
  title: "Menu | Caribbean Cruises",
  description: "Explore our delicious menu options available on our cruise ships.",
}

export default function MenuPage() {
  return (
    <div className="container mx-auto px-4 py-24 md:py-32">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-6">
            <span className="bg-gradient-to-r from-ocean-600 to-cruise-600 bg-clip-text text-transparent">
              Our Culinary Experience
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Indulge in exquisite cuisine prepared by our world-class chefs while enjoying breathtaking ocean views.
          </p>
        </div>

        <div className="mb-12">
          <div className="relative h-64 md:h-96 w-full rounded-xl overflow-hidden mb-8">
            <Image
              src="/images/menu/elegant-table.png"
              alt="Elegant dining table setting"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6 text-white">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Fine Dining at Sea</h2>
              <p className="text-white/80 max-w-md">
                Experience culinary excellence with our internationally inspired menus
              </p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="main" className="w-full">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="main">Main Courses</TabsTrigger>
            <TabsTrigger value="appetizers">Appetizers</TabsTrigger>
            <TabsTrigger value="desserts">Desserts</TabsTrigger>
            <TabsTrigger value="drinks">Drinks</TabsTrigger>
          </TabsList>

          <TabsContent value="main" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mainCourses.map((item) => (
                <MenuCard key={item.name} item={item} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="appetizers" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {appetizers.map((item) => (
                <MenuCard key={item.name} item={item} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="desserts" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {desserts.map((item) => (
                <MenuCard key={item.name} item={item} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="drinks" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {drinks.map((item) => (
                <MenuCard key={item.name} item={item} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-16 text-center">
          <p className="text-lg mb-6">
            Our menu changes seasonally to incorporate the freshest ingredients from ports we visit. Special dietary
            requirements can be accommodated with advance notice.
          </p>
          <Link
            href="/cruises"
            className="inline-flex items-center justify-center rounded-md bg-ocean-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-ocean-700 focus:outline-none focus:ring-2 focus:ring-ocean-500 focus:ring-offset-2"
          >
            Book a Cruise
          </Link>
        </div>
      </div>
    </div>
  )
}

function MenuCard({ item }: { item: MenuItem }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between">
          <span>{item.name}</span>
          <span className="text-ocean-600">${item.price.toFixed(2)}</span>
        </CardTitle>
        <CardDescription>{item.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative h-48 w-full overflow-hidden rounded-md">
          <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex items-center text-sm text-muted-foreground">
          {item.tags.map((tag) => (
            <span key={tag} className="mr-2 rounded-full bg-muted px-2 py-1">
              {tag}
            </span>
          ))}
        </div>
      </CardFooter>
    </Card>
  )
}

interface MenuItem {
  name: string
  description: string
  price: number
  image: string
  tags: string[]
}

const mainCourses: MenuItem[] = [
  {
    name: "Caribbean Grilled Lobster",
    description: "Fresh lobster grilled with garlic butter, served with island rice and seasonal vegetables",
    price: 42.99,
    image: "/images/menu/steak-dish.png",
    tags: ["Seafood", "Signature", "Gluten-Free"],
  },
  {
    name: "Filet Mignon",
    description: "8oz premium beef tenderloin, truffle mashed potatoes, asparagus, and red wine reduction",
    price: 38.99,
    image: "/images/menu/steak-dish.png",
    tags: ["Beef", "Gluten-Free"],
  },
  {
    name: "Mediterranean Sea Bass",
    description: "Pan-seared sea bass with olive tapenade, roasted vegetables, and lemon herb sauce",
    price: 34.99,
    image: "/images/menu/steak-dish.png",
    tags: ["Seafood", "Healthy"],
  },
  {
    name: "Vegetable Wellington",
    description: "Roasted vegetables and mushroom duxelles wrapped in puff pastry with tomato coulis",
    price: 28.99,
    image: "/images/menu/steak-dish.png",
    tags: ["Vegetarian"],
  },
]

const appetizers: MenuItem[] = [
  {
    name: "Shrimp Cocktail",
    description: "Chilled jumbo shrimp with classic cocktail sauce and lemon",
    price: 16.99,
    image: "/images/menu/noodle-soup.png",
    tags: ["Seafood", "Gluten-Free"],
  },
  {
    name: "Tuna Tartare",
    description: "Fresh ahi tuna, avocado, mango, and wonton crisps with wasabi aioli",
    price: 18.99,
    image: "/images/menu/noodle-soup.png",
    tags: ["Seafood", "Raw"],
  },
  {
    name: "Bruschetta",
    description: "Grilled sourdough topped with tomatoes, basil, garlic, and aged balsamic",
    price: 12.99,
    image: "/images/menu/gourmet-sandwich.png",
    tags: ["Vegetarian"],
  },
  {
    name: "Crab Cakes",
    description: "Pan-seared lump crab cakes with remoulade sauce and micro greens",
    price: 19.99,
    image: "/images/menu/noodle-soup.png",
    tags: ["Seafood", "Signature"],
  },
]

const desserts: MenuItem[] = [
  {
    name: "Chocolate Lava Cake",
    description: "Warm chocolate cake with a molten center, vanilla ice cream, and raspberry coulis",
    price: 12.99,
    image: "/images/menu/gourmet-sandwich.png",
    tags: ["Chocolate", "Hot"],
  },
  {
    name: "Key Lime Pie",
    description: "Traditional Florida key lime pie with whipped cream and lime zest",
    price: 10.99,
    image: "/images/menu/gourmet-sandwich.png",
    tags: ["Signature", "Citrus"],
  },
  {
    name: "Crème Brûlée",
    description: "Classic vanilla bean custard with caramelized sugar crust",
    price: 11.99,
    image: "/images/menu/gourmet-sandwich.png",
    tags: ["Classic", "Gluten-Free"],
  },
  {
    name: "Tropical Fruit Plate",
    description: "Selection of fresh tropical fruits with honey yogurt dip",
    price: 9.99,
    image: "/images/menu/gourmet-sandwich.png",
    tags: ["Healthy", "Vegan", "Gluten-Free"],
  },
]

const drinks: MenuItem[] = [
  {
    name: "Caribbean Sunset",
    description: "Rum, pineapple juice, orange juice, grenadine, and fresh fruit garnish",
    price: 14.99,
    image: "/images/menu/cocktail-spritz.png",
    tags: ["Signature Cocktail", "Contains Alcohol"],
  },
  {
    name: "Classic Mojito",
    description: "White rum, fresh mint, lime juice, sugar, and soda water",
    price: 12.99,
    image: "/images/menu/cocktail-trio.png",
    tags: ["Classic", "Contains Alcohol"],
  },
  {
    name: "Tropical Smoothie",
    description: "Mango, pineapple, banana, and coconut milk blended with ice",
    price: 8.99,
    image: "/images/menu/citrus-drinks.png",
    tags: ["Non-Alcoholic", "Vegan"],
  },
  {
    name: "Premium Wine Selection",
    description: "Ask your server about our curated wine list featuring selections from around the world",
    price: 12.99,
    image: "/images/menu/elegant-cocktails.png",
    tags: ["Wine", "Contains Alcohol"],
  },
]
