import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle, Sparkles, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import whatsappIcon from "@/assets/whatsapp-icon.png";

// Import placeholder images
import livingRoomImage from "@/assets/living-room-ceiling.jpg";
import bedroomImage from "@/assets/bedroom-ceiling.jpg";
import officeImage from "@/assets/office-ceiling.jpg";
import commercialImage from "@/assets/commercial-ceiling.jpg";

const ServiceDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  // Service data mapping
  const servicesData: Record<string, {
    name: string;
    description: string;
    features: string[];
    images: string[];
  }> = {
    "pop-false-ceiling": {
      name: "POP False Ceiling",
      description: "Plaster of Paris (POP) false ceilings offer excellent versatility and durability. Perfect for creating intricate designs and curved shapes, POP ceilings are ideal for both residential and commercial spaces.",
      features: [
        "Highly durable and long-lasting",
        "Excellent fire resistance",
        "Perfect for intricate designs",
        "Sound insulation properties",
        "Easy to repair and maintain",
        "Cost-effective solution"
      ],
      images: [livingRoomImage, bedroomImage]
    },
    "gypsum-false-ceiling": {
      name: "Gypsum False Ceiling",
      description: "Gypsum board ceilings are lightweight, versatile, and perfect for modern interiors. They provide excellent acoustic insulation and are easy to install with a seamless finish.",
      features: [
        "Lightweight and easy to install",
        "Excellent acoustic properties",
        "Fire-resistant material",
        "Smooth seamless finish",
        "Eco-friendly option",
        "Quick installation time"
      ],
      images: [officeImage, commercialImage]
    },
    "simple-ceiling-designs": {
      name: "Simple Ceiling Designs",
      description: "Clean, minimalist ceiling designs that enhance your space without overwhelming it. Perfect for modern homes and offices seeking elegance in simplicity.",
      features: [
        "Clean minimalist aesthetics",
        "Cost-effective solutions",
        "Quick installation",
        "Timeless appeal",
        "Easy maintenance",
        "Versatile for any space"
      ],
      images: [bedroomImage, livingRoomImage]
    },
    "wall-panel-design": {
      name: "Wall Panel & Wall Design Work",
      description: "Transform your walls with stunning panel designs that complement your ceiling work. Create a cohesive look with our expert wall design services.",
      features: [
        "3D textured panels",
        "Custom design options",
        "Premium materials",
        "Expert installation",
        "Acoustic benefits",
        "Easy to clean and maintain"
      ],
      images: [commercialImage, officeImage]
    },
    "ceiling-partitions": {
      name: "Ceiling Partitions & Room Dividers",
      description: "Create functional spaces with elegant ceiling partitions and room dividers. Perfect for open floor plans and modern office layouts.",
      features: [
        "Flexible space division",
        "Sound reduction",
        "Modern aesthetics",
        "Custom configurations",
        "Easy installation",
        "Removable options"
      ],
      images: [officeImage, commercialImage]
    },
    "commercial-ceiling": {
      name: "Commercial False Ceiling Installation",
      description: "Professional false ceiling solutions for commercial spaces. Designed to meet building codes while maintaining aesthetic appeal and functionality.",
      features: [
        "Building code compliant",
        "Large-scale projects",
        "Fire safety certified",
        "Acoustic optimization",
        "Energy efficient",
        "Minimal disruption"
      ],
      images: [commercialImage, officeImage]
    },
    "residential-ceiling": {
      name: "Residential False Ceiling Design",
      description: "Elevate your home with custom ceiling designs tailored to your style and needs. From classic to contemporary, we create ceilings that complement your living spaces.",
      features: [
        "Custom home designs",
        "Style consultation",
        "Quality materials",
        "Expert craftsmanship",
        "Warranty included",
        "After-sales support"
      ],
      images: [livingRoomImage, bedroomImage]
    },
    "ceiling-lighting": {
      name: "Ceiling Lighting & Cove Light Design",
      description: "Illuminate your space with integrated ceiling lighting and elegant cove light designs. Create ambiance and enhance the architectural features of your ceiling.",
      features: [
        "LED integration",
        "Cove lighting design",
        "Ambient lighting",
        "Energy efficient",
        "Customizable colors",
        "Professional wiring"
      ],
      images: [bedroomImage, livingRoomImage]
    },
    "3d-ceiling-designs": {
      name: "3D Ceiling Designs",
      description: "Add depth and dimension to your space with stunning 3D ceiling designs. Create visual interest and modern aesthetics with cutting-edge techniques.",
      features: [
        "Three-dimensional patterns",
        "Modern aesthetics",
        "Unique textures",
        "Architectural appeal",
        "Premium finish",
        "Wow factor guaranteed"
      ],
      images: [commercialImage, officeImage]
    },
    "office-ceiling": {
      name: "Modern Office Ceiling Solutions",
      description: "Professional ceiling solutions designed for modern office environments. Enhance productivity and aesthetics with our corporate ceiling designs.",
      features: [
        "Professional aesthetics",
        "Acoustic optimization",
        "Cable management",
        "Modular systems",
        "Easy maintenance",
        "Corporate standards"
      ],
      images: [officeImage, commercialImage]
    },
    "pvc-ceiling": {
      name: "PVC Ceiling Installation",
      description: "Durable, moisture-resistant PVC ceiling solutions perfect for kitchens, bathrooms, and high-humidity areas. Easy to maintain and long-lasting.",
      features: [
        "Waterproof material",
        "Easy to clean",
        "Termite resistant",
        "Long-lasting",
        "Quick installation",
        "Affordable option"
      ],
      images: [bedroomImage, livingRoomImage]
    },
    "acoustic-ceiling": {
      name: "Acoustic & Soundproof Ceilings",
      description: "Reduce noise and improve sound quality with our acoustic ceiling solutions. Perfect for home theaters, recording studios, and office spaces.",
      features: [
        "Sound absorption",
        "Noise reduction",
        "Studio quality",
        "Multiple densities",
        "Professional installation",
        "Performance tested"
      ],
      images: [officeImage, commercialImage]
    },
    "ceiling-repair": {
      name: "Ceiling Repair & Renovation",
      description: "Expert repair and renovation services for existing ceilings. From minor fixes to complete overhauls, we restore and enhance your ceiling's appearance.",
      features: [
        "Damage assessment",
        "Quick repairs",
        "Seamless matching",
        "Complete renovation",
        "Quality restoration",
        "Warranty on repairs"
      ],
      images: [livingRoomImage, bedroomImage]
    },
    "luxury-ceiling": {
      name: "Luxury Ceiling Design for Homes & Offices",
      description: "Premium luxury ceiling designs that make a statement. Bespoke solutions using the finest materials and expert craftsmanship for discerning clients.",
      features: [
        "Bespoke designs",
        "Premium materials",
        "Master craftsmanship",
        "Designer consultation",
        "Exclusive finishes",
        "White-glove service"
      ],
      images: [commercialImage, bedroomImage]
    }
  };

  const service = slug ? servicesData[slug] : null;

  if (!service) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Service not found</h1>
          <Button onClick={() => navigate("/")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={service.images[0]} 
            alt={service.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/50" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/")}
            className="mb-6 hover:bg-primary/10 transition-all duration-300 text-white"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
          
          <div className="max-w-3xl animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 border border-primary/30 rounded-full mb-6 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-primary text-sm font-medium">Premium Service</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white leading-tight font-playfair">
              {service.name}
            </h1>
            <p className="text-xl text-gray-200 leading-relaxed mb-8">
              {service.description}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="group bg-primary hover:bg-primary/90"
                onClick={() => window.open("https://wa.me/923458783923?text=Hi!%20I'm%20interested%20in%20" + service.name, "_blank")}
              >
                <img src={whatsappIcon} alt="WhatsApp" className="w-5 h-5 mr-2" />
                Get Free Quote
              </Button>
              <Link to="/gallery">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                  View Gallery
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center font-playfair">
              Service <span className="text-primary">Features</span>
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {service.features.map((feature, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-4 p-6 bg-card border border-border rounded-xl hover:border-primary/50 hover:shadow-lg transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-foreground/90">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 animate-fade-in">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 font-playfair">
                Project <span className="text-primary">Gallery</span>
              </h2>
              <p className="text-muted-foreground text-lg">
                See our work in action
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {service.images.map((image, index) => (
                <Card
                  key={index}
                  className="group overflow-hidden border-border hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 animate-scale-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img 
                      src={image} 
                      alt={`${service.name} ${index + 1}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      <p className="text-white font-semibold">View Project Details</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-playfair">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Contact Muhammad Ishaq for a free consultation and quote
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button 
                size="lg" 
                className="group text-lg px-10 py-6"
                onClick={() => window.open("https://wa.me/923458783923?text=Hi!%20I'm%20interested%20in%20" + service.name, "_blank")}
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

export default ServiceDetail;
