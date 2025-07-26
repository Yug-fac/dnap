"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Heart, ShoppingCart, Eye } from "lucide-react"
import anime from "animejs"

export function FeaturedBooks() {
  const sectionRef = useRef<HTMLElement>(null)
  const [hoveredBook, setHoveredBook] = useState<number | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: ".book-card",
              opacity: [0, 1],
              translateY: [60, 0],
              rotateY: [15, 0],
              delay: anime.stagger(100),
              duration: 800,
              easing: "easeOutQuart",
            })
          }
        })
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Mock data - in real app, this would come from Firebase
  const featuredBooks = [
    {
      id: 1,
      title: "Whispers of Dawn",
      author: "Sarah Johnson",
      genre: "Poetry",
      price: "₹299",
      rating: 4.8,
      reviews: 124,
      cover: "/placeholder.svg?height=300&width=200",
      description: "A beautiful collection of poems about hope, love, and new beginnings.",
      badge: "New Release",
    },
    {
      id: 2,
      title: "Digital Dreams",
      author: "Alex Chen",
      genre: "Sci-Fi",
      price: "₹399",
      rating: 4.9,
      reviews: 89,
      cover: "/placeholder.svg?height=300&width=200",
      description: "A thrilling journey through virtual worlds and artificial consciousness.",
      badge: "Bestseller",
    },
    {
      id: 3,
      title: "The Last Garden",
      author: "Maria Rodriguez",
      genre: "Fiction",
      price: "₹349",
      rating: 4.7,
      reviews: 156,
      cover: "/placeholder.svg?height=300&width=200",
      description: "A heartwarming tale of family, nature, and the power of growth.",
      badge: "Award Winner",
    },
    {
      id: 4,
      title: "Midnight Chronicles",
      author: "David Thompson",
      genre: "Mystery",
      price: "₹329",
      rating: 4.6,
      reviews: 203,
      cover: "/placeholder.svg?height=300&width=200",
      description: "A gripping mystery that will keep you guessing until the very end.",
      badge: "Popular",
    },
    {
      id: 5,
      title: "Ocean's Embrace",
      author: "Lisa Park",
      genre: "Romance",
      price: "₹279",
      rating: 4.8,
      reviews: 178,
      cover: "/placeholder.svg?height=300&width=200",
      description: "A passionate love story set against the backdrop of coastal beauty.",
      badge: "Trending",
    },
    {
      id: 6,
      title: "Quantum Leap",
      author: "Dr. Robert Kim",
      genre: "Science",
      price: "₹449",
      rating: 4.9,
      reviews: 67,
      cover: "/placeholder.svg?height=300&width=200",
      description: "Exploring the fascinating world of quantum physics made accessible.",
      badge: "Educational",
    },
  ]

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case "New Release":
        return "bg-green-500"
      case "Bestseller":
        return "bg-yellow-500"
      case "Award Winner":
        return "bg-purple-500"
      case "Popular":
        return "bg-blue-500"
      case "Trending":
        return "bg-red-500"
      case "Educational":
        return "bg-indigo-500"
      default:
        return "bg-primary"
    }
  }

  return (
    <section id="books" ref={sectionRef} className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Featured Books
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our handpicked selection of exceptional books across various genres
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredBooks.map((book, index) => (
            <Card
              key={book.id}
              className="book-card group hover:shadow-2xl transition-all duration-500 overflow-hidden border-0 bg-background/80 backdrop-blur-sm"
              onMouseEnter={() => setHoveredBook(book.id)}
              onMouseLeave={() => setHoveredBook(null)}
            >
              <div className="relative overflow-hidden">
                <img
                  src={book.cover || "/placeholder.svg"}
                  alt={book.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <Badge className={`absolute top-3 left-3 ${getBadgeColor(book.badge)} text-white`}>{book.badge}</Badge>
                <div className="absolute top-3 right-3">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>

                {/* Hover overlay */}
                <div
                  className={`absolute inset-0 bg-black/60 flex items-center justify-center transition-opacity duration-300 ${
                    hoveredBook === book.id ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <div className="flex space-x-2">
                    <Button size="sm" variant="secondary">
                      <Eye className="h-4 w-4 mr-1" />
                      Preview
                    </Button>
                    <Button size="sm">
                      <ShoppingCart className="h-4 w-4 mr-1" />
                      Buy
                    </Button>
                  </div>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="mb-2">
                  <Badge variant="outline" className="text-xs">
                    {book.genre}
                  </Badge>
                </div>

                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{book.title}</h3>

                <p className="text-muted-foreground mb-2">by {book.author}</p>

                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{book.description}</p>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{book.rating}</span>
                    <span className="text-xs text-muted-foreground">({book.reviews})</span>
                  </div>
                  <span className="text-lg font-bold text-primary">{book.price}</span>
                </div>

                <div className="flex space-x-2">
                  <Button className="flex-1 group">
                    <ShoppingCart className="h-4 w-4 mr-2 group-hover:animate-bounce" />
                    Add to Cart
                  </Button>
                  <Button variant="outline" size="icon">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" variant="outline" className="group bg-transparent">
            View All Books
            <Eye className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  )
}
export default FeaturedBooks