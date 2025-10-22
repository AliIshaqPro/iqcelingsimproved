import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowLeft, CheckCircle, Star, Sparkles, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ImageLightbox } from "@/components/ImageLightbox";
import whatsappIcon from "@/assets/whatsapp-icon.png";
import { wordpressAPI } from "@/lib/wordpress-api";

interface GalleryImage {
  id: string;
  image_url: string;
  title: string | null;
}

const PricingDetail = () => {
  const { tier } = useParams<{ tier: string }>();
  const navigate = useNavigate();
  const [dynamicImages, setDynamicImages] = useState<Record<string, GalleryImage[]>>({});
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    fetchPricingGalleries();
  }, []);

  const fetchPricingGalleries = async () => {
    try {
      const response = await wordpressAPI.getPricingGalleries();
      const galleries = response.data;
      
      const imagesByTier: Record<string, GalleryImage[]> = {};
      
      galleries.forEach((gallery) => {
        const title = gallery.title.toLowerCase();
        let tierKey = '';
        
        if (title.includes('essential')) tierKey = 'basic';
        else if (title.includes('premium')) tierKey = 'medium';
        else if (title.includes('luxury')) tierKey = 'high';
        
        if (tierKey && gallery.gallery) {
          imagesByTier[tierKey] = gallery.gallery.map((item, index) => ({
            id: String(index),
            image_url: item.url,
            title: item.name || null,
          }));
        }
      });
      
      setDynamicImages(imagesByTier);
    } catch (error) {
      console.error("Error fetching pricing galleries:", error);
    }
  };

  const tiers = {
    basic: {
      name: "Essential Package",
      price: "80",
      description: "Perfect for modern homes seeking clean, timeless design with quality materials and professional installation.",
      badge: "Essential",
      popular: false,
      features: [
        "Quality materials sourced from trusted suppliers",
        "Clean and professional finish",
        "Standard design options to choose from",
        "Professional installation by certified team",
        "Basic warranty coverage",
        "Post-installation support"
      ],
      images: dynamicImages['basic'] || []
    },
    medium: {
      name: "Premium Package",
      price: "90",
      description: "Sophisticated designs with enhanced detailing, premium materials, and expert craftsmanship for discerning homeowners.",
      badge: "Premium",
      popular: true,
      features: [
        "Premium quality materials and finishes",
        "Custom pattern designs tailored to your space",
        "Advanced LED and cove lighting integration",
        "Expert craftsmanship with attention to detail",
        "Extended warranty coverage",
        "Priority customer support"
      ],
      images: dynamicImages['medium'] || []
    },
    high: {
      name: "Luxury Package",
      price: "110",
      description: "Ultimate luxury with bespoke architectural elements, designer finishes, and white-glove service throughout.",
      badge: "Luxury",
      popular: false,
      features: [
        "Bespoke architectural design elements",
        "Designer-grade premium materials",
        "3D visualization and detailed planning",
        "Master craftsmen installation",
        "Comprehensive lifetime warranty",
        "Dedicated project manager and 24/7 support"
      ],
      images: dynamicImages['high'] || []
    }
  };

  const selectedTier = tier && tier in tiers ? tiers[tier as keyof typeof tiers] : null;

  if (!selectedTier) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Package not found</h1>
          <Button onClick={() => navigate("/")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  const tierImages = selectedTier.images.length > 0 ? selectedTier.images : [];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/30 to-background" />
        
        <div className="container mx-auto px-6 relative z-10">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/")}
            className="mb-6 hover:bg-primary/10 transition-all duration-300"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
          
          <div className="max-w-4xl animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6">
              {selectedTier.popular ? (
                <Star className="w-4 h-4 text-primary fill-primary" />
              ) : (
                <Sparkles className="w-4 h-4 text-primary" />
              )}
              <span className="text-primary text-sm font-medium">{selectedTier.badge}</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-foreground leading-tight font-playfair">
              {selectedTier.name}
            </h1>
            
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-6xl font-bold text-primary">{selectedTier.price}</span>
              <span className="text-2xl text-muted-foreground">PKR/sq.ft</span>
            </div>
            
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              {selectedTier.description}
            </p>
            
            <Button 
              size="lg" 
              className="group text-lg px-10 py-6 bg-primary hover:bg-primary/90"
              onClick={() => window.open("https://wa.me/923458783923?text=Hi!%20I'm%20interested%20in%20the%20" + selectedTier.name, "_blank")}
            >
              <img src={whatsappIcon} alt="WhatsApp" className="w-5 h-5 mr-2" />
              Get Free Quote
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center font-playfair">
              What's <span className="text-primary">Included</span>
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {selectedTier.features.map((feature, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-4 p-6 bg-card border border-border rounded-xl hover:border-primary/50 hover:shadow-lg transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-foreground text-lg">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      {tierImages.length > 0 && (
        <section className="py-20 bg-background">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12 animate-fade-in">
                <h2 className="text-4xl md:text-5xl font-bold mb-4 font-playfair">
                  Project <span className="text-primary">Gallery</span>
                </h2>
                <p className="text-muted-foreground text-lg">
                  See examples of our {selectedTier.badge.toLowerCase()} work
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tierImages.map((image, index) => (
                  <Card
                    key={index}
                    className="group overflow-hidden border-border hover:shadow-xl hover:shadow-primary/10 transition-all duration-500 cursor-pointer animate-scale-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                    onClick={() => {
                      setLightboxIndex(index);
                      setLightboxOpen(true);
                    }}
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img 
                        src={image.image_url} 
                        alt={image.title || `${selectedTier.name} ${index + 1}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center">
                        <p className="text-white font-semibold text-lg mb-2">Click to view</p>
                        <Sparkles className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Image Lightbox */}
      {lightboxOpen && tierImages.length > 0 && (
        <ImageLightbox
          images={tierImages}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
          onNavigate={setLightboxIndex}
        />
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-playfair">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Contact us for a free consultation and detailed quote
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button 
                size="lg" 
                className="group text-lg px-10 py-6"
                onClick={() => window.open("https://wa.me/923458783923?text=Hi!%20I'm%20interested%20in%20the%20" + selectedTier.name, "_blank")}
              >
                <img src={whatsappIcon} alt="WhatsApp" className="w-5 h-5 mr-2" />
                Chat on WhatsApp
              </Button>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="text-lg px-10 py-6">
                  <Phone className="mr-2 h-5 w-5" />
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PricingDetail;
