import { Button } from "@/components/ui/button";
import { ShoppingCart, Star, Truck, Shield, Heart } from "lucide-react";
import { toast } from "sonner";

const Merch = () => {
  const products = [
    {
      id: 1,
      name: "Amit Bharti Logo T-Shirt",
      price: "₹799",
      originalPrice: "₹999",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
      rating: 4.8,
      reviews: 124,
      colors: ["Black", "White", "Navy"],
      sizes: ["S", "M", "L", "XL", "XXL"],
      featured: true
    },
    {
      id: 2,
      name: "Educational Vibes Hoodie",
      price: "₹1,299",
      originalPrice: "₹1,599",
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop",
      rating: 4.9,
      reviews: 89,
      colors: ["Grey", "Black", "Maroon"],
      sizes: ["S", "M", "L", "XL"]
    },
    {
      id: 3,
      name: "Knowledge Seeker Mug",
      price: "₹399",
      originalPrice: "₹499",
      image: "https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=400&h=400&fit=crop",
      rating: 4.7,
      reviews: 156,
      colors: ["White", "Black"],
      sizes: ["Standard"],
      popular: true
    },
    {
      id: 4,
      name: "YouTube Creator Cap",
      price: "₹599",
      originalPrice: "₹799",
      image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&h=400&fit=crop",
      rating: 4.6,
      reviews: 78,
      colors: ["Black", "White", "Red"],
      sizes: ["One Size"]
    },
    {
      id: 5,
      name: "Motivational Poster Set",
      price: "₹899",
      originalPrice: "₹1,199",
      image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=400&fit=crop",
      rating: 4.8,
      reviews: 45,
      colors: ["Multi"],
      sizes: ["A3"]
    },
    {
      id: 6,
      name: "Learning Never Stops Tote Bag",
      price: "₹449",
      originalPrice: "₹599",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
      rating: 4.5,
      reviews: 92,
      colors: ["Beige", "Black"],
      sizes: ["Standard"]
    }
  ];

  const addToCart = (product: any) => {
    toast.success(`${product.name} added to cart!`);
  };

  const features = [
    {
      icon: Truck,
      title: "Free Shipping",
      description: "On orders above ₹999"
    },
    {
      icon: Shield,
      title: "Quality Guaranteed",
      description: "Premium materials only"
    },
    {
      icon: Heart,
      title: "Support Creator",
      description: "Help grow the channel"
    }
  ];

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Header */}
        <div className="text-center mb-16 fade-in-up">
          <h1 className="text-4xl md:text-6xl font-poppins font-bold gradient-text mb-6">
            Official Merchandise
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Show your support and spread the learning vibes with our exclusive collection of 
            high-quality merchandise designed for knowledge seekers.
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="card-3d p-6 rounded-xl text-center group hover:scale-105 transition-transform duration-300">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                <feature.icon size={24} />
              </div>
              <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="card-3d rounded-xl overflow-hidden group">
              
              {/* Product Image */}
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {product.featured && (
                    <span className="bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-medium">
                      Featured
                    </span>
                  )}
                  {product.popular && (
                    <span className="bg-accent text-accent-foreground px-2 py-1 rounded-full text-xs font-medium">
                      Popular
                    </span>
                  )}
                </div>
                
                {/* Quick Actions */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="p-2 bg-white/90 rounded-full shadow-lg hover:bg-white transition-colors">
                    <Heart size={16} className="text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>

                <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                  {product.name}
                </h3>

                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl font-bold text-primary">{product.price}</span>
                  <span className="text-sm text-muted-foreground line-through">{product.originalPrice}</span>
                  <span className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded-full">
                    {Math.round((1 - parseInt(product.price.replace('₹', '').replace(',', '')) / parseInt(product.originalPrice.replace('₹', '').replace(',', ''))) * 100)}% OFF
                  </span>
                </div>

                {/* Colors */}
                <div className="mb-4">
                  <p className="text-sm text-muted-foreground mb-2">Colors:</p>
                  <div className="flex gap-1">
                    {product.colors.map((color, index) => (
                      <span key={index} className="text-xs bg-muted px-2 py-1 rounded-full">
                        {color}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Sizes */}
                <div className="mb-6">
                  <p className="text-sm text-muted-foreground mb-2">Sizes:</p>
                  <div className="flex gap-1">
                    {product.sizes.map((size, index) => (
                      <span key={index} className="text-xs bg-muted px-2 py-1 rounded-full">
                        {size}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Add to Cart Button */}
                <Button 
                  className="w-full btn-glow"
                  onClick={() => addToCart(product)}
                >
                  <ShoppingCart className="mr-2" size={16} />
                  Add to Cart
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Coming Soon Section */}
        <div className="mt-20 card-3d p-12 rounded-3xl text-center">
          <h2 className="text-3xl font-poppins font-bold mb-4">More Products Coming Soon!</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            We're constantly working on new designs and products. Subscribe to our newsletter 
            to be the first to know about new releases and exclusive offers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-xl border border-border/50 bg-card/50 focus:border-primary focus:outline-none"
            />
            <Button className="btn-glow px-8">
              Notify Me
            </Button>
          </div>
        </div>

        {/* Support Message */}
        <div className="mt-12 text-center">
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Every purchase helps support the channel and enables me to create more quality educational content. 
            Thank you for being part of this amazing learning community! 🙏
          </p>
        </div>
      </div>
    </div>
  );
};

export default Merch;