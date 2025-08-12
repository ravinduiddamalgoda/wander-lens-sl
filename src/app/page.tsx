"use client";

import React, { useEffect, useState } from "react";

import { Menu,Calendar, Star, Users, MapPin, X, Mail, Phone, User, ChevronDown, ChevronUp, Twitter, Youtube, Instagram, Facebook, Camera, MessageCircle, Clock, Send, ChevronLeft, ChevronRight } from 'lucide-react';

interface TourPackage {
  title: string;
  location: string;
  price: string;
  originalPrice: string;
  days: number;
  people: string;
  rating: number;
  description: string;
  highlights: string[];
  itinerary: string[];
  image: string;
}


interface FormData {
  name: string;
  email: string;
  phone: string;
  travelers: string;
  message: string;
}

interface ExpandedState {
  [key: number]: boolean;
}

interface Review {
  id: number;
  name: string;
  location: string;
  tourPackage: string;
  text: string;
  rating: number;
  avatar: string;
  tourImage: string;
  date: string;
  verified: boolean;
}

interface Destination {
  name: string;
  location: string;
  image: string;
  size: 'large' | 'medium' | 'small';
}

interface Photo {
  id: number;
  src: string;
  alt: string;
  style: {
    transform: string;
    zIndex: number;
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
  };
}

// Header Component
const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

 const sendWhatsAppMessage = (formData: any) => {
  const phoneNumber = "+94767670980";
  
  const message = `*New Tour Inquiry from Website*

👤 *Name:* ${formData.name}
📧 *Email:* ${formData.email}
📱 *Phone:* ${formData.phone || 'Not provided'}

💬 *Message:*
${formData.message}

_This message was sent from Wander Lens Tours website contact form._`;

  // Create WhatsApp URL
  const whatsappUrl = `https://wa.me/${phoneNumber.replace('+', '')}?text=${encodeURIComponent(message)}`;
  
  // Open WhatsApp in new tab
  window.open(whatsappUrl, '_blank');
};

// ...existing code...

const handleSubmit = () => {
  // Basic validation
  if (!formData.name || !formData.email || !formData.message) {
    alert('Please fill in all required fields.');
    return;
  }
  
  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email)) {
    alert('Please enter a valid email address.');
    return;
  }
  
  // Send to WhatsApp
  sendWhatsAppMessage(formData);
  
  // Show success message
  alert(`Thank you ${formData.name}! Your message will be sent via WhatsApp. We'll get back to you soon.`);
  
  // Reset form and close modal
  setFormData({ name: '', email: '', phone: '', message: '' });
  setIsContactModalOpen(false);
};

  const openContactModal = () => {
    setIsContactModalOpen(true);
    setIsMenuOpen(false); // Close mobile menu if open
  };

  const closeContactModal = () => {
    setIsContactModalOpen(false);
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <>
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-md z-50 shadow-sm border-b border-gray-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo Section */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center">
                <img
                  src="/img/Logo.png"
                  alt="Wander Lens Tours Logo"
                  className="w-full h-auto transform hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div>
                <h1 className="font-bold text-xl text-gray-800">WANDER LENS</h1>
                <p className="text-sm text-orange-500 font-medium">Tours</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <a
                href="#destinations"
                className="text-gray-700 hover:text-orange-500 transition-colors font-medium"
              >
                Explore Destinations
              </a>
              <a
                href="#packages"
                className="text-gray-700 hover:text-orange-500 transition-colors font-medium"
              >
                Tour Packages
              </a>
              <a
                href="#gallery"
                className="text-gray-700 hover:text-orange-500 transition-colors font-medium"
              >
                Gallery
              </a>
              <a
                href="#reviews"
                className="text-gray-700 hover:text-orange-500 transition-colors font-medium"
              >
                Reviews
              </a>
            </nav>

            {/* Desktop Contact Button */}
            <div className="hidden md:flex items-center space-x-4">
              <button 
                onClick={openContactModal}
                className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-300 transform hover:scale-105 font-semibold"
              >
                Contact Us
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} className="text-gray-700" /> : <Menu size={24} className="text-gray-700" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-gray-200 animate-in slide-in-from-top duration-200">
              <nav className="flex flex-col space-y-4 mt-4">
                <a 
                  href="#destinations" 
                  className="text-gray-700 hover:text-orange-500 transition-colors py-2 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Explore Destinations
                </a>
                <a 
                  href="#packages" 
                  className="text-gray-700 hover:text-orange-500 transition-colors py-2 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Tour Packages
                </a>
                <a 
                  href="#gallery" 
                  className="text-gray-700 hover:text-orange-500 transition-colors py-2 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Gallery
                </a>
                <a 
                  href="#reviews" 
                  className="text-gray-700 hover:text-orange-500 transition-colors py-2 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Reviews
                </a>
                <button 
                  onClick={openContactModal}
                  className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-full w-fit font-semibold hover:shadow-lg transition-all"
                >
                  Contact Us
                </button>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Contact Modal */}
      {isContactModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 md:p-8">
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-800">Get In Touch</h3>
                <button
                  onClick={closeContactModal}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Close modal"
                >
                  <X size={24} className="text-gray-600" />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Contact Information */}
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xl font-semibold text-gray-800 mb-4">Contact Information</h4>
                    <p className="text-gray-600 mb-6">
                      Ready to explore Sri Lanka? Get in touch with us for personalized tour packages and travel assistance.
                    </p>
                  </div>

                  {/* Contact Details */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4 p-4 bg-orange-50 rounded-xl">
                      <div className="bg-orange-500 p-3 rounded-full">
                        <Phone size={20} className="text-white" />
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-800">Phone</h5>
                        <p className="text-gray-600">+94 76 767 0980</p>
                        <p className="text-sm text-gray-500">Available 24/7 for emergencies</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-xl">
                      <div className="bg-blue-500 p-3 rounded-full">
                        <Mail size={20} className="text-white" />
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-800">Email</h5>
                        <p className="text-gray-600">jeewakalive@gmail.com</p>
                        <p className="text-sm text-gray-500">We'll respond within 24 hours</p>
                      </div>
                    </div>

                    {/* <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-xl">
                      <div className="bg-green-500 p-3 rounded-full">
                        <MapPin size={20} className="text-white" />
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-800">Office</h5>
                        <p className="text-gray-600">123 Galle Road, Colombo 03</p>
                        <p className="text-sm text-gray-500">Sri Lanka</p>
                      </div>
                    </div> */}

                    <div className="flex items-center space-x-4 p-4 bg-purple-50 rounded-xl">
                      <div className="bg-purple-500 p-3 rounded-full">
                        <Clock size={20} className="text-white" />
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-800">Business Hours</h5>
                        <p className="text-gray-600">Mon - Sat: 8:00 AM - 8:00 PM</p>
                        <p className="text-sm text-gray-500">Sunday: 10:00 AM - 6:00 PM</p>
                      </div>
                    </div>
                  </div>

                  {/* Social Media */}
                  <div>
                    <h5 className="font-semibold text-gray-800 mb-3">Follow Us</h5>
                    <div className="flex space-x-3">
                      <a href="#" className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-colors">
                        <MessageCircle size={18} />
                      </a>
                      <a href="#" className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-full hover:from-purple-600 hover:to-pink-600 transition-all">
                        <Phone size={18} />
                      </a>
                      <a href="#" className="bg-red-600 text-white p-3 rounded-full hover:bg-red-700 transition-colors">
                        <Mail size={18} />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Contact Form */}
                <div className="bg-gray-50 rounded-2xl p-6">
                  <h4 className="text-xl font-semibold text-gray-800 mb-4">Send us a Message</h4>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                          placeholder="your@email.com"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                          placeholder="+94 76 433 3576"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Message *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all resize-none"
                        placeholder="Tell us about your travel plans, preferred dates, group size, or any special requirements..."
                      />
                    </div>

                    <div className="flex space-x-4 pt-4">
                      <button
                        type="button"
                        onClick={closeContactModal}
                        className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all font-semibold"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={handleSubmit}
                        className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl hover:shadow-lg transition-all font-semibold flex items-center justify-center"
                      >
                        <Send size={18} className="mr-2" />
                        Send Message
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// Hero Section Component
const HeroSection = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/img/background-main.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="relative z-0 w-full h-full grid lg:grid-cols-2 md:grid-cols-1 items-center justify-center">
        <div className="relative z-10 text-center text-white max-w-4xl px-4 mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            Discover Your Dream
            <br />
            <span className="bg-clip-text bg-gradient-to-r text-white">
              Destinations
            </span>{" "}
            with Our Travel
            Packages
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-200 max-w-2xl mx-auto">
            “Focus Your Wanderlust.” <br/>
A clever blend of photography and travel, this tagline positions your brand as the perfect focal point for adventure.
          </p>
          <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transition-all transform hover:scale-105">
            Start Your Journey
          </button>
        </div>
        <div>
          <div className="relative z-10 flex items-center justify-center">
            <img
            src="/img/Logo.png"
            alt="Logo Image"
            className="lg:w-3/4 lg:h-max transform hover:scale-105 transition-transform duration-500 "
           />
          </div>
        </div>
      </div>
    </section>
  );
};

// Top Destinations Component
// Top Destinations Component
const TopDestinations = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const destinations = [
    {
      name: "Sigiriya",
      location: "DAMBULLA",
      image: "/img/topDestication/sigiriya.png",
    },
    {
      name: "Nine Arch",
      location: "ELLA",
      image: "/img/topDestication/nine-arch.jpg",
    },
    {
      name: "Yala National Park",
      location: "KATHARAGAMA",
      image: "/img/topDestication/yala.jpg",
    },
    {
      name: "Hikkaduwa Beach",
      location: "GALLE",
      image: "/img/topDestication/Hikkaduwa.jpg",
    },
    {
      name: "Adam's Peak",
      location: "RATNAPURA",
      image: "/img/moreDestinations/adams_peak.jpg",
    },
    {
      name: "Pasikuda Beach",
      location: "PASIKUDA",
      image: "/img/topDestication/pasikuda.png",
    },
    {
      name: "Jungle Beach",
      location: "GALLE",
      image: "/img/topDestication/jungle_beach.png",
    },
    {
      name: "Mirissa Beach",
      location: "MATARA",
      image: "/img/topDestication/mirissa.jpg",
    },
    {
      name: "Horton Plains",
      location: "NUWARA ELIYA",
      image: "/img/topDestication/horton_plains.jpg",
    },
    {
      name: "Polonnaruwa",
      location: "POLONNARUWA",
      image: "/img/topDestication/polonnaruwa.jpg",
    },
  ];

  // Auto-slide functionality
  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex >= destinations.length - 4 ? 0 : prevIndex + 1
        );
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [isHovered, destinations.length]);

  // Get visible destinations (4 at a time)
  const getVisibleDestinations = () => {
    const visible = [];
    for (let i = 0; i < 4; i++) {
      const index = (currentIndex + i) % destinations.length;
      visible.push(destinations[index]);
    }
    return visible;
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex >= destinations.length - 4 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex <= 0 ? destinations.length - 4 : prevIndex - 1
    );
  };

  return (
    <>
      <style>{`
        .destinations-container::-webkit-scrollbar {
          height: 8px;
        }
        .destinations-container::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 10px;
        }
        .destinations-container::-webkit-scrollbar-thumb {
          background: linear-gradient(to right, #fbbf24, #f59e0b);
          border-radius: 10px;
        }
      `}</style>
      
      <section 
        className="relative py-32 min-h-screen bg-center bg-cover bg-no-repeat mt-20" 
        id="destinations"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/img/top-destination-background.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-black/1"></div>
        </div>
        <div className="absolute inset-0 pointer-events-none">
      <div className="w-full h-full bg-gradient-to-b from-transparent via-transparent to-white" 
          style={{ 
            background: 'linear-gradient(to bottom, transparent 0%, transparent 75%, white 100%)' 
          }} />
    </div>

        <div className="container mx-auto px-4">
          <div className="text-center mb-20 relative">
          <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6">
            <span className="text-orange-500 font-bold text-xxl drop-shadow-lg tracking-wide bg-gradient-to-r from-black/10 via-transparent to-black/10 px-10 rounded">
              Top
            </span>
            <br />
            <span className="text-white font-bold text-xxl drop-shadow-lg tracking-wide bg-gradient-to-r from-black/10 via-transparent to-black/10 px-2 rounded">
            destinations
            </span>
          </h2>
          {/* <p className="text-gray-200 drop-shadow-lg max-w-3xl mx-auto text-xxl md:text-2xl leading-relaxed font-medium  tracking-wide bg-gradient-to-b from-black/10 via-transparent to-black/10 px-30 rounded">
            It's hard enough deciding to move, you don't have to worry about
            where to move to. These are some of the most popular and best
            locations to move to based on a number of factors.
          </p> */}
        </div>

          {/* Desktop View - Auto Sliding Cards */}
          <div className="hidden lg:block relative">
            <div className="grid grid-cols-4 gap-8 transition-all duration-700 ease-in-out">
              {getVisibleDestinations().map((dest, index) => (
                <div key={`${dest.name}-${currentIndex}-${index}`} className="group cursor-pointer">
                  <div className="relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                    <img
                      src={dest.image}
                      alt={dest.name}
                      className="w-full h-96 md:h-[28rem] object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                    <div className="absolute top-1/2 left-6 text-white">
                      <h3 className="text-3xl md:text-4xl font-bold mb-2 text-white drop-shadow-lg">
                        {dest.name}
                      </h3>
                      <p className="text-lg md:text-xl text-gray-100 font-semibold tracking-wide drop-shadow">
                        {dest.location}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-10"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-10"
            >
              <ChevronRight size={24} />
            </button>

            {/* Slide Indicators */}
            <div className="flex justify-center mt-8 space-x-2">
              {Array.from({ length: destinations.length - 3 }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentIndex === index
                      ? 'bg-yellow-300 scale-125'
                      : 'bg-white/50 hover:bg-white/75'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Mobile/Tablet View - Horizontal Scroll */}
          <div className="block lg:hidden">
            <div className="overflow-x-auto pb-6 destinations-container">
              <div className="flex gap-6 px-4 min-w-max">
                {destinations.map((dest, index) => (
                  <div key={index} className="group cursor-pointer flex-shrink-0 w-80">
                    <div className="relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                      <img
                        src={dest.image}
                        alt={dest.name}
                        className="w-full h-96 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                      <div className="absolute bottom-6 left-6 text-white">
                        <h3 className="text-2xl md:text-3xl font-bold mb-2 text-white drop-shadow-lg">
                          {dest.name}
                        </h3>
                        <p className="text-lg text-gray-100 font-semibold tracking-wide drop-shadow">
                          {dest.location}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile scroll indicator */}
            <div className="flex justify-center mt-6">
              <div className="bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
                <p className="text-sm text-gray-600 flex items-center font-medium">
                  <span className="mr-2 text-yellow-500">←</span>
                  Scroll to explore more destinations
                  <span className="ml-2 text-yellow-500">→</span>
                </p>
              </div>
            </div>
          </div>

          {/* Auto-slide info */}
          {/* <div className="hidden lg:flex justify-center mt-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 text-white">
              <p className="text-sm flex items-center">
                <div className="w-2 h-2 bg-yellow-300 rounded-full mr-2 animate-pulse"></div>
                Auto-sliding every 3 seconds • Hover to pause
              </p>
            </div>
          </div> */}
        </div>
      </section>
    </>
  );
};

// Tour Packages Component
const TourPackages: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedPackage, setSelectedPackage] = useState<TourPackage | null>(null);
  const [expandedItinerary, setExpandedItinerary] = useState<ExpandedState>({});
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    travelers: '',
    message: ''
  });

  const packages: TourPackage[] = [
    {
      title: "12 Days Nature & Wildlife Tour",
      location: "SRI LANKA",
      price: "1,100",
      originalPrice: "1,450",
      days: 12,
      people: "Per Two People",
      rating: 5,
      description: "Experience the ultimate Sri Lankan adventure with our comprehensive 12-day nature and wildlife tour. Journey through pristine national parks, ancient mountain ranges, and stunning landscapes while encountering diverse wildlife including elephants, leopards, and exotic birds.",
      highlights: [
        "Knuckles Mountain Range Trekking", 
        "Kandy Temple of the Tooth", 
        "Nuwara Eliya Tea Plantations", 
        "Horton Plains National Park", 
        "Adam's Peak Pilgrimage", 
        "Ella Nine Arch Bridge", 
        "Udawalawe Elephant Safari", 
        "Mirissa Whale Watching"
      ],
      itinerary: [
        "Day 1: Arrival Transfer to Colombo",
        "Day 2: Colombo - Knuckles Range", 
        "Day 3: Knuckles Range Exploration",
        "Day 4: Knuckles Range - Kandy",
        "Day 5: Kandy - Nuwara Eliya",
        "Day 6: Horton Plains Expedition",
        "Day 7: Nuwara Eliya - Adam's Peak",
        "Day 8: Adam's Peak - Ella",
        "Day 9: Ella - Udawalawe Safari",
        "Day 10: Udawalawe - Mirissa",
        "Day 11: Mirissa Whale Watching",
        "Day 12: Departure from Airport"
      ],
      image: "/img/packages/mountain.png",
    },
    {
      title: "10 Days Cultural Heritage Tour", 
      location: "SRI LANKA",
      price: "0",
      originalPrice: "1,250",
      days: 10,
      people: "Per Two People",
      rating: 5,
      description: "Immerse yourself in Sri Lanka's rich cultural heritage with this comprehensive journey through ancient kingdoms, sacred temples, and historical sites. Perfect for history enthusiasts and culture lovers seeking authentic experiences.",
      highlights: [
        "Anuradhapura Ancient City",
        "Polonnaruwa Historical Ruins", 
        "Sigiriya Rock Fortress",
        "Dambulla Cave Temple",
        "Kandy Cultural Capital",
        "Pinnawela Elephant Orphanage",
        "Traditional Village Experience"
      ],
      itinerary: [
        "Day 1: Arrival Transfer to Negombo",
        "Day 2: Negombo - Anuradhapura", 
        "Day 3: Anuradhapura - Polonnaruwa",
        "Day 4: Polonnaruwa - Trincomalee",
        "Day 5: Trincomalee Exploration",
        "Day 6: Trincomalee - Sigiriya",
        "Day 7: Sigiriya Rock & Dambulla",
        "Day 8: Sigiriya - Kandy",
        "Day 9: Kandy - Negombo",
        "Day 10: Departure from Airport"
      ],
      image: "img/packages/perahara.png",
    },
      {
    "title": "Beach Relaxation Tour",
    "location": "SRI LANKA",
    "price": "1,340",
    "originalPrice": "1,780",
    "days": 15,
    "people": "Per Two People",
    "rating": 5,
    "description": "Unwind and rejuvenate on the stunning beaches of Sri Lanka with our Beach Relaxation Tour. Enjoy sun-soaked days, luxurious resorts, and the soothing sounds of the ocean as you escape the hustle and bustle of everyday life.",
    "highlights": [
      "Nilaveli Beach",
      "Uppuveli Beach",
      "Arugambay Beach",
      "Hiriketiya Beach",
      "Hikkaduwa Beach"
    ],
    "itinerary": [
      "Day 1: Arrival transfer to Negombo",
      "Day 2: Negombo to Trincomalee",
      "Day 3: Trincomalee Exploration",
      "Day 4: Trincomalee - Sigiriya",
      "Day 5: Sigiriya - Kandy",
      "Day 6: Kandy - Nuwara Eliya",
      "Day 7: Nuwara Eliya - Ella",
      "Day 8: Ella",
      "Day 9: Ella - Arugambay",
      "Day 10: Arugambay",
      "Day 11: Arugambay - Tangalle",
      "Day 12: Tangalle - Mirissa",
      "Day 13: Mirissa - Hikkaduwa",
      "Day 14: Hikkaduwa - Bentota",
      "Day 15: Departure from Airport"
    ],
    "image": "img/topDestication/Hikkaduwa.jpg"
  },
   {
  "title": "14 Days Complete Sri Lanka Experience",
  "location": "SRI LANKA",
  "price": "1390",
  "originalPrice": "1850",
  "days": 14,
  "people": "Per Two People",
  "rating": 5,
  "description": "The ultimate Sri Lankan experience combining culture, nature, wildlife, and beaches. This comprehensive tour covers all major attractions from ancient cities to tropical beaches, wildlife safaris to mountain landscapes.",
  "highlights": [
    "Wilpattu National Park Safari (Leopard)",
    "Habarana Eco Park Safari (Elephant)",
    "Sigiriya Rock Fortress",
    "Ceylon Spices Garden Experience",
    "Kandy Temple of the Tooth",
    "Nuwara Eliya Tea Plantation",
    "Horton Plains",
    "Ella Scenic Exploration",
    "Hiriketiya Beach",
    "Galle Fort",
    "Bentota River Safari"
  ],
  "itinerary": [
    "Day 1: Arrival transfer to Negombo",
    "Day 2: Negombo - Wilpattu",
    "Day 3: Wilpattu - Habarana",
    "Day 4: Habarana - Sigiriya",
    "Day 5: Sigiriya - Kandy",
    "Day 6: Kandy - Nuwara Eliya",
    "Day 7: Horton Plains",
    "Day 8: Nuwara Eliya - Ella",
    "Day 9: Ella - Tangalle",
    "Day 10: Tangalle",
    "Day 11: Tangalle - Galle",
    "Day 12: Galle - Bentota",
    "Day 13: Bentota - Colombo",
    "Day 14: Departure from Airport"
  ],
  "image": "img/packages/beach.jpg"
},

    {
      "title": "Premium Safari Experience",
      "location": "SRI LANKA",
      "price": "980",
      "originalPrice": "1,350",
      "days": 8,
      "people": "Per Two People",
      "rating": 5,
      "description": "Experience Sri Lanka's incredible wildlife with our premium safari package. From elephants to leopards and exotic birds, witness amazing biodiversity across the island’s top national parks with guided safaris and unique encounters.",
      "highlights": [
        "Wilpattu National Park Leopard Safari",
        "Habarana Eco Park Elephant Safari",
        "Minneriya National Park Bears, Leopard and Birds Safari",
        "Pinnawala Elephant Orphanage"
      ],
      "itinerary": [
        "Day 1: Arrival transfer to Negombo",
        "Day 2: Negombo - Wilpattu",
        "Day 3: Wilpattu - Habarana",
        "Day 4: Habarana - Sigiriya",
        "Day 5: Sigiriya - Minneriya",
        "Day 6: Sigiriya - Dambulla - Kandy",
        "Day 7: Kandy - Pinnawala - Negombo",
        "Day 8: Departure from Airport"
      ],
      "image": "/img/packages/yala.png"
    },  

    {
    "title": "Southern Delights Tour",
    "location": "SRI LANKA",
    "price": "450",
    "originalPrice": "700",
    "days": 5,
    "people": "Per Two People",
    "rating": 5,
    "description": "Discover the serene beauty of southern Sri Lanka with our Southern Delights Tour. Explore tranquil beaches, colonial history, and coastal charm across Tangalle, Mirissa, Unawatuna, and the iconic Galle Fort.",
    "highlights": [
      "Hiriketiya Beach",
      "Mirissa Beach",
      "Unawatuna Beach",
      "Galle Fort"
    ],
    "itinerary": [
      "Day 1: Arrival transfer to Colombo",
      "Day 2: Colombo - Tangalle",
      "Day 3: Tangalle - Mirissa",
      "Day 4: Mirissa - Galle",
      "Day 5: Departure from Airport"
    ],
    "image": "img/moreDestinations/galle-fort.jpg"
  }
];

  const toggleItinerary = (index: number): void => {
    setExpandedItinerary(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const handleBookNow = (pkg: TourPackage): void => {
    setSelectedPackage(pkg);
    setIsModalOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (): void => {
    // Basic validation
    if (!formData.name || !formData.email || !formData.phone || !formData.travelers) {
      alert('Please fill in all required fields.');
      return;
    }
    
    // Email validation
    const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email address.');
      return;
    }
    
    // Simulate sending email
    console.log('Booking Details:', {
      package: selectedPackage,
      customerDetails: formData
    });
    
    // Show success message
    alert(`Thank you ${formData.name}! Your booking request for "${selectedPackage?.title}" has been submitted. We'll contact you shortly at ${formData.email}.`);
    
    // Reset form and close modal
    setFormData({ name: '', email: '', phone: '', travelers: '', message: '' });
    setIsModalOpen(false);
    setSelectedPackage(null);
  };

  const closeModal = (): void => {
    setIsModalOpen(false);
    setSelectedPackage(null);
    setFormData({ name: '', email: '', phone: '', travelers: '', message: '' });
  };

  return (
    <>
      <style>{`
        .horizontal-scroll::-webkit-scrollbar {
          height: 8px;
        }
        .horizontal-scroll::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 10px;
        }
        .horizontal-scroll::-webkit-scrollbar-thumb {
          background: linear-gradient(to right, #f97316, #dc2626);
          border-radius: 10px;
        }
        .horizontal-scroll::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to right, #ea580c, #b91c1c);
        }
      `}</style>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      <section className="py-16 min-h-screen" id="packages">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-gray-400">
              Our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">
                Trending
              </span>{" "}
              Tour Packages
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the magic of Sri Lanka with our authentic tour packages featuring cultural heritage sites, 
              wildlife safaris, and breathtaking natural landscapes. Each journey is crafted with detailed itineraries 
              for unforgettable experiences.
            </p>
            
          </div>

          {/* Horizontal scrolling layout */}
          <div className="overflow-x-auto pb-6 scroll-smooth horizontal-scroll">
            <div className="flex gap-4 sm:gap-6 md:gap-8 px-4 sm:px-6 md:px-8 min-w-max snap-x snap-mandatory">
              {packages.map((pkg: TourPackage, index: number) => (
                <div
                  key={index}
                  className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden group transform hover:-translate-y-2 flex-shrink-0 w-80 sm:w-96 md:w-[420px] lg:w-[450px] snap-start"
                >
                <div className="relative overflow-hidden h-72">
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm rounded-full px-4 py-2 flex items-center space-x-2 shadow-lg">
                    <Calendar size={18} className="text-orange-500" />
                    <span className="text-sm font-bold text-gray-800">{pkg.days} Days</span>
                  </div>
                  <div className="absolute top-6 right-6 flex items-center bg-white/95 backdrop-blur-sm rounded-full px-3 py-2 shadow-lg">
                    {[...Array(pkg.rating)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className="text-yellow-500 fill-current"
                      />
                    ))}
                  </div>
                </div>

                <div className="p-8">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-2xl font-bold text-gray-800">
                      {pkg.title}
                    </h3>
                  </div>

                  <div className="flex items-center mb-4">
                    <MapPin size={18} className="text-orange-500 mr-2" />
                    <p className="text-lg font-semibold text-gray-700">{pkg.location}</p>
                  </div>

                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {pkg.description}
                  </p>

                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-800 mb-3">Tour Highlights:</h4>
                    <ul className="space-y-2">
                      {pkg.highlights.slice(0, 3).map((highlight: string, i: number) => (
                        <li key={i} className="flex items-center text-sm text-gray-600">
                          <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-gray-800">Day-by-Day Itinerary:</h4>
                      <button
                        onClick={() => toggleItinerary(index)}
                        className="flex items-center text-orange-500 hover:text-orange-600 text-sm font-medium"
                      >
                        {expandedItinerary[index] ? 'Show Less' : 'View Details'}
                        {expandedItinerary[index] ? 
                          <ChevronUp size={16} className="ml-1" /> : 
                          <ChevronDown size={16} className="ml-1" />
                        }
                      </button>
                    </div>
                    {expandedItinerary[index] && (
                      <div className="bg-gray-50 rounded-lg p-4 max-h-64 overflow-y-auto">
                        <ul className="space-y-2">
                          {pkg.itinerary.map((day: string, i: number) => (
                            <li key={i} className="text-sm text-gray-600 flex">
                              <span className="font-medium text-orange-500 mr-2 min-w-[60px]">
                                {day.split(':')[0]}:
                              </span>
                              <span>{day.split(':').slice(1).join(':').trim()}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center space-x-2 mb-6">
                    <Users size={18} className="text-gray-500" />
                    <span className="text-gray-600 font-medium">{pkg.people}</span>
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                    <div className="flex items-center space-x-3">
                      <span className="text-3xl font-bold text-orange-500">
                        ${pkg.price}
                      </span>
                      <span className="text-gray-400 line-through text-lg">
                        ${pkg.originalPrice}
                      </span>
                    </div>
                    <button 
                      onClick={() => handleBookNow(pkg)}
                      className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-3 rounded-full hover:shadow-xl transition-all duration-300 transform hover:scale-105 font-semibold"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
            </div>
          </div>
          <div>

          </div>
        </div>
      </section>

      {/* Booking Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-3xl font-bold text-gray-800">Book Your Tour</h3>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={24} className="text-gray-600" />
                </button>
              </div>

              {selectedPackage && (
                <div className="mb-8">
                  <div className="p-6 bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl mb-6">
                    <h4 className="text-xl font-bold text-gray-800 mb-2">
                      {selectedPackage.title}
                    </h4>
                    <p className="text-gray-600 mb-3">{selectedPackage.location} • {selectedPackage.days} Days</p>
                    <div className="flex items-center">
                      <span className="text-2xl font-bold text-orange-500">
                        ${selectedPackage.price}
                      </span>
                      <span className="text-gray-400 line-through ml-3">
                        ${selectedPackage.originalPrice}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-semibold text-gray-800 mb-3">Tour Highlights</h5>
                      <ul className="space-y-2">
                        {selectedPackage.highlights.map((highlight: string, i: number) => (
                          <li key={i} className="flex items-start text-sm text-gray-600">
                            <div className="w-2 h-2 bg-orange-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h5 className="font-semibold text-gray-800 mb-3">Complete Itinerary</h5>
                      <div className="max-h-48 overflow-y-auto bg-gray-50 rounded-lg p-3">
                        <ul className="space-y-2">
                          {selectedPackage.itinerary.map((day: string, i: number) => (
                            <li key={i} className="text-sm text-gray-600 flex">
                              <span className="font-medium text-orange-500 mr-2 min-w-[60px] flex-shrink-0">
                                {day.split(':')[0]}:
                              </span>
                              <span>{day.split(':').slice(1).join(':').trim()}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <User size={16} className="inline mr-2" />
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <Mail size={16} className="inline mr-2" />
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                      placeholder="Enter your email"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <Phone size={16} className="inline mr-2" />
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <Users size={16} className="inline mr-2" />
                      Number of Travelers *
                    </label>
                    <select
                      name="travelers"
                      value={formData.travelers}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    >
                      <option value="">Select travelers</option>
                      <option value="1">1 Person</option>
                      <option value="2">2 People</option>
                      <option value="3">3 People</option>
                      <option value="4">4 People</option>
                      <option value="5+">5+ People</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Additional Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    placeholder="Any special requests or questions?"
                  />
                </div>

                <div className="flex space-x-4 pt-6">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl hover:shadow-lg transition-all font-semibold"
                  >
                    Submit Booking Request
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
}

const PackagesServices : React.FC = () => {
  const includes = [
    {
      icon: "✈️",
      title: "Airport Meet & Assistance",
      description: "Personalized welcome at Colombo International Airport with dedicated assistance"
    },
    {
      icon: "🚗",
      title: "Air-Conditioned Transportation",
      description: "Comfortable vehicle with professional driver throughout your journey"
    },
    {
      icon: "⛽",
      title: "All Fuel Expenses",
      description: "Complete fuel costs covered for your entire tour duration"
    },
    {
      icon: "🎫",
      title: "Entrance Fees & Tickets",
      description: "All attraction tickets and entrance fees as per itinerary included"
    }
  ];

  const excludes = [
    {
      icon: "✈️",
      title: "International Flights",
      description: "Air ticket expenses from your country to Sri Lanka and return journey"
    },
    {
      icon: "🏨",
      title: "Accommodation & Meals",
      description: "Hotel reservations and meal expenses during the tour"
    },
    {
      icon: "💰",
      title: "Tips & Gratuities",
      description: "Tips for service staff, guides, and drivers"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-orange-50">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6">
            What's{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">
              Included
            </span>{" "}
            & Excluded
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Transparent pricing with clear breakdown of what's covered in your tour package 
            and what additional expenses you should plan for.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* What's Included */}
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-green-100">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mr-4">
                <span className="text-white text-2xl">✓</span>
              </div>
              <h3 className="text-3xl font-bold text-gray-800">Tour Price Includes</h3>
            </div>
            
            <div className="space-y-6">
              {includes.map((item, index) => (
                <div key={index} className="flex items-start group hover:bg-green-50 p-4 rounded-2xl transition-all duration-300">
                  <div className="text-3xl mr-4 group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h4>
                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200">
              <p className="text-green-700 font-semibold text-center">
                💡 All essential tour services are covered for a hassle-free experience!
              </p>
            </div>
          </div>

          {/* What's Excluded */}
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-orange-100">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center mr-4">
                <span className="text-white text-2xl">!</span>
              </div>
              <h3 className="text-3xl font-bold text-gray-800">Tour Price Excludes</h3>
            </div>
            
            <div className="space-y-6">
              {excludes.map((item, index) => (
                <div key={index} className="flex items-start group hover:bg-orange-50 p-4 rounded-2xl transition-all duration-300">
                  <div className="text-3xl mr-4 group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h4>
                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl border border-orange-200">
              <p className="text-orange-700 font-semibold text-center">
                💡 Plan these additional expenses for your complete Sri Lankan adventure!
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-3xl shadow-xl p-8 max-w-4xl mx-auto border border-gray-100">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              Ready to Start Your Sri Lankan Adventure?
            </h3>
            <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
              Get in touch with us for personalized tour packages and detailed pricing information 
              tailored to your preferences and budget.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-4 rounded-full hover:shadow-xl transition-all duration-300 transform hover:scale-105 font-semibold text-lg">
                Get Custom Quote
              </button>
              {/* <button className="border-2 border-orange-500 text-orange-600 px-8 py-4 rounded-full hover:bg-orange-500 hover:text-white transition-all duration-300 font-semibold text-lg" onClick={openContactModal} >
                Contact Us
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}



// More Destinations Component
const MoreDestinations: React.FC = () => {
  const destinations: Destination[] = [
    {
      name: "Boburu Ella",
      location: "BADULLA",
      image: "/img/moreDestinations/bomuru-ella_2.jpg",
      size: 'large'
    },
    {
      name: "Gregory Lake",
      location: "NUWARA ELIYA",
      image: "/img/moreDestinations/gregoryLake.jpg",
      size: 'medium'
    },
    {
      name: "Ancient City",
      location: "ANURADHAPURA",
      image: "/img/moreDestinations/anuradhapura_n.jpg",
      size: 'medium'
    },
    {
      name: "Temple of the Tooth relic",
      location: "KANDY",
      image: "/img/moreDestinations/dalada_maligawa_n.jpg",
      size: 'large'
    },
    {
      name: "Adam's Peak",
      location: "HATTON",
      image: "/img/moreDestinations/adams_peak.jpg",
      size: 'small'
    },
    {
      name: "Galle Fort",
      location: "GALLE",
      image: "/img/moreDestinations/galle-fort.jpg",
      size: 'small'
    }
  ];

  const getCardClasses = (size: string, index: number): string => {
    const baseClasses = "group cursor-pointer relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1";
    
    switch (size) {
      case 'large':
        return `${baseClasses} col-span-1 row-span-2 h-96 md:h-[500px]`;
      case 'medium':
        return `${baseClasses} col-span-1 row-span-1 h-64 md:h-72`;
      case 'small':
        return `${baseClasses} col-span-1 row-span-1 h-48 md:h-56`;
      default:
        return `${baseClasses} col-span-1 row-span-1 h-64`;
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-500">
              more
            </span>
            <br />
            <span className="text-gray-800">destinations</span>
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
            Your peace of mind doesn't have to be tied to where everyone else is. We have a 
            good number of travel and relaxation destinations. Take your time and find the 
            perfect one for you.
          </p>
        </div>

        {/* Custom Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-min">
          {/* Boburu Ella - Large Left */}
          <div className={`${getCardClasses('large', 0)} md:col-span-1 lg:row-span-3`}>
            <img
              src={destinations[0].image}
              alt={destinations[0].name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <div className="absolute bottom-6 left-6 text-white">
              <h3 className="text-3xl md:text-4xl font-bold mb-2 leading-tight">{destinations[0].name}</h3>
              <p className="text-lg text-gray-200 flex items-center font-medium">
                <MapPin size={18} className="mr-2" />
                {destinations[0].location}
              </p>
            </div>
          </div>

          {/* Gregory Lake - Medium Top Right */}
          <div className={`${getCardClasses('medium', 1)} lg:col-span-2`}>
            <img
              src={destinations[1].image}
              alt={destinations[1].name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="text-2xl md:text-3xl font-bold mb-1">{destinations[1].name}</h3>
              <p className="text-sm md:text-base text-gray-200 flex items-center">
                <MapPin size={16} className="mr-1" />
                {destinations[1].location}
              </p>
            </div>
          </div>

          {/* Ancient City - Medium Right */}
          <div className={`${getCardClasses('medium', 2)} lg:col-span-1`}>
            <img
              src={destinations[2].image}
              alt={destinations[2].name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="text-xl md:text-2xl font-bold mb-1">{destinations[2].name}</h3>
              <p className="text-sm text-gray-200 flex items-center">
                <MapPin size={14} className="mr-1" />
                {destinations[2].location}
              </p>
            </div>
          </div>

          {/* Temple of Tooth - Large Bottom */}
          <div className={`${getCardClasses('large', 3)} lg:col-span-2 lg:row-span-2`}>
            <img
              src={destinations[3].image}
              alt={destinations[3].name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <div className="absolute bottom-6 left-6 text-white">
              <h3 className="text-2xl md:text-3xl font-bold mb-2 leading-tight">{destinations[3].name}</h3>
              <p className="text-base md:text-lg text-gray-200 flex items-center font-medium">
                <MapPin size={18} className="mr-2" />
                {destinations[3].location}
              </p>
            </div>
          </div>

          {/* Sigiriya Rock - Small */}
          <div className={`${getCardClasses('small', 4)} lg:col-span-1`}>
            <img
              src={destinations[4].image}
              alt={destinations[4].name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="text-lg md:text-xl font-bold mb-1">{destinations[4].name}</h3>
              <p className="text-xs md:text-sm text-gray-200 flex items-center">
                <MapPin size={12} className="mr-1" />
                {destinations[4].location}
              </p>
            </div>
          </div>

          {/* Galle Fort - Small */}
          <div className={`${getCardClasses('small', 5)} lg:col-span-1`}>
            <img
              src={destinations[5].image}
              alt={destinations[5].name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="text-lg md:text-xl font-bold mb-1">{destinations[5].name}</h3>
              <p className="text-xs md:text-sm text-gray-200 flex items-center">
                <MapPin size={12} className="mr-1" />
                {destinations[5].location}
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <button className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white px-8 py-4 rounded-full hover:shadow-xl transition-all duration-300 transform hover:scale-105 font-semibold text-lg">
            Explore All Destinations
          </button>
        </div>
      </div>
    </section>
  );
};

// Gallery Component
const Gallery: React.FC = () => {
  const [hoveredPhoto, setHoveredPhoto] = useState<number | null>(null);

  const photos: Photo[] = [
    {
      id: 1,
      src: "/img/gallery/1.jpg",
      alt: "Group photo at scenic waterfall location",
      style: {
        transform: "rotate(-8deg) translate(-20px, 10px)",
        zIndex: 1,
        top: "3%",
        left: "5%",
      },
    },
    {
      id: 2,
      src: "/img/gallery/2.jpg",
      alt: "Friends exploring historical temple site",
      style: {
        transform: "rotate(12deg) translate(15px, -5px)",
        zIndex: 3,
        top: "1%",
        left: "28%",
      },
    },
    {
      id: 3,
      src: "/img/gallery/3.jpg",
      alt: "Tea plantation adventure in hill country",
      style: {
        transform: "rotate(-5deg) translate(10px, 20px)",
        zIndex: 2,
        top: "5%",
        right: "8%",
      },
    },
    {
      id: 4,
      src: "/img/gallery/4.jpg",
      alt: "Wildlife safari tour group experience",
      style: {
        transform: "rotate(15deg) translate(-25px, 15px)",
        zIndex: 1,
        top: "32%",
        left: "2%",
      },
    },
    {
      id: 5,
      src: "/img/gallery/5.jpg",
      alt: "Beach adventure and water activities",
      style: {
        transform: "rotate(-12deg) translate(20px, -10px)",
        zIndex: 4,
        top: "28%",
        left: "22%",
      },
    },
    {
      id: 6,
      src: "/img/gallery/6.jpg",
      alt: "Sigiriya rock fortress climbing experience",
      style: {
        transform: "rotate(8deg) translate(-15px, 25px)",
        zIndex: 2,
        top: "25%",
        right: "5%",
      },
    },
    {
      id: 7,
      src: "/img/gallery/7.jpg",
      alt: "Cultural exploration and local traditions",
      style: {
        transform: "rotate(-18deg) translate(30px, 5px)",
        zIndex: 3,
        bottom: "12%",
        left: "12%",
      },
    },
    {
      id: 8,
      src: "/img/gallery/8.jpg",
      alt: "Elephant safari in Udawalawe park",
      style: {
        transform: "rotate(10deg) translate(-10px, -20px)",
        zIndex: 1,
        bottom: "15%",
        right: "15%",
      },
    },
    {
      id: 9,
      src: "/img/gallery/9.jpg",
      alt: "Mountain trekking in Knuckles range",
      style: {
        transform: "rotate(-6deg) translate(5px, 15px)",
        zIndex: 2,
        bottom: "5%",
        left: "35%",
      },
    },
    {
      id: 10,
      src: "/img/gallery/10.jpg",
      alt: "Kandy lake and temple views",
      style: {
        transform: "rotate(14deg) translate(-20px, 10px)",
        zIndex: 2,
        top: "58%",
        left: "48%",
      },
    },
    {
      id: 11,
      src: "/img/gallery/11.jpg",
      alt: "Ella Nine Arch Bridge visit",
      style: {
        transform: "rotate(-10deg) translate(25px, -15px)",
        zIndex: 1,
        bottom: "35%",
        right: "38%",
      },
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden" id="gallery">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 mb-8"
            style={{ fontFamily: "cursive" }}
          >
            Gallery
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A collection of unforgettable moments captured during our Sri Lankan adventures
          </p>
        </div>

        {/* Scattered Photo Collage - Larger and More Responsive */}
        <div className="relative h-[70vh] md:h-[80vh] lg:h-[90vh] mx-auto max-w-7xl">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="absolute cursor-pointer group transition-all duration-500 ease-out
                         w-40 h-32 
                         sm:w-48 sm:h-36 
                         md:w-56 md:h-40 
                         lg:w-64 lg:h-48 
                         xl:w-72 xl:h-52"
              style={photo.style}
              onMouseEnter={() => setHoveredPhoto(photo.id)}
              onMouseLeave={() => setHoveredPhoto(null)}
            >
              <div 
                className={`relative w-full h-full bg-white shadow-xl transition-all duration-500 transform
                           ${hoveredPhoto === photo.id 
                             ? 'scale-110 shadow-2xl rotate-0 z-50' 
                             : 'hover:scale-105 hover:shadow-2xl'
                           }
                           ${hoveredPhoto && hoveredPhoto !== photo.id ? 'opacity-75' : 'opacity-100'}`}
                style={{
                  padding: "8px 8px 24px 8px", // Polaroid-style padding with extra bottom space
                  zIndex: hoveredPhoto === photo.id ? 50 : photo.style.zIndex
                }}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-full object-cover rounded-sm"
                  loading="lazy"
                />
                
                {/* Polaroid-style bottom label area */}
                <div className="absolute bottom-2 left-2 right-2 h-4 flex items-center justify-center">
                  <div className="w-full h-0.5 bg-gray-200"></div>
                </div>
                
                {/* Hover overlay with description */}
                <div className={`absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 transition-opacity duration-300 rounded-sm
                               ${hoveredPhoto === photo.id ? 'opacity-100' : 'opacity-0'}`}>
                  <p className="text-white text-sm md:text-base font-medium text-center leading-tight">
                    {photo.alt}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Call to Action */}
        <div className="text-center mt-16">
          <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto mb-8 leading-relaxed">
            Capture memories that last a lifetime. Join our tours and create your own amazing stories to share with the world.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              className="bg-gradient-to-r from-teal-500 to-blue-600 text-white px-8 py-4 rounded-full hover:shadow-xl transition-all duration-300 transform hover:scale-105 font-semibold text-lg"
              onClick={() => {
                window.location.hash = "destinations";
              }}
            >
              Book Your Adventure
            </button>
            <button className="border-2 border-teal-500 text-teal-600 px-8 py-4 rounded-full hover:bg-teal-500 hover:text-white transition-all duration-300 font-semibold text-lg">
              View More Photos
            </button>
          </div>
        </div>

        {/* Statistics */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-3xl font-bold text-teal-600 mb-2">1000+</h3>
            <p className="text-gray-600">Photos Captured</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-3xl font-bold text-teal-600 mb-2">1000+</h3>
            <p className="text-gray-600">Happy Memories</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-3xl font-bold text-teal-600 mb-2">30+</h3>
            <p className="text-gray-600">Locations Visited</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-3xl font-bold text-teal-600 mb-2">50+</h3>
            <p className="text-gray-600">Tour Groups</p>
          </div>
        </div>
      </div>
    </section>
  );
};


// const Gallery = () => {
//   const photos = [
//     {
//       id: 1,
//       src: "/img/gallery/1.jpg",
//       alt: "Group photo at scenic location",
//       style: {
//         transform: "rotate(-8deg) translate(-20px, 10px)",
//         zIndex: 1,
//         top: "5%",
//         left: "8%",
//       },
//     },
//     {
//       id: 2,
//       src: "/img/gallery/2.jpg",
//       alt: "Friends at historical site",
//       style: {
//         transform: "rotate(12deg) translate(15px, -5px)",
//         zIndex: 3,
//         top: "2%",
//         left: "32%",
//       },
//     },
//     {
//       id: 3,
//       src: "/img/gallery/3.jpg",
//       alt: "Tea plantation adventure",
//       style: {
//         transform: "rotate(-5deg) translate(10px, 20px)",
//         zIndex: 2,
//         top: "8%",
//         right: "12%",
//       },
//     },
//     {
//       id: 4,
//       src: "/img/gallery/4.jpg",
//       alt: "Sightseeing tour group",
//       style: {
//         transform: "rotate(15deg) translate(-25px, 15px)",
//         zIndex: 1,
//         top: "35%",
//         left: "5%",
//       },
//     },
//     {
//       id: 5,
//       src: "/img/gallery/5.jpg",
//       alt: "Adventure activities",
//       style: {
//         transform: "rotate(-12deg) translate(20px, -10px)",
//         zIndex: 4,
//         top: "32%",
//         left: "28%",
//       },
//     },
//     {
//       id: 6,
//       src: "/img/gallery/6.jpg",
//       alt: "Beach activities and water sports",
//       style: {
//         transform: "rotate(8deg) translate(-15px, 25px)",
//         zIndex: 2,
//         top: "28%",
//         right: "8%",
//       },
//     },
//     {
//       id: 7,
//       src: "/img/gallery/7.jpg",
//       alt: "Cultural exploration",
//       style: {
//         transform: "rotate(-18deg) translate(30px, 5px)",
//         zIndex: 3,
//         bottom: "15%",
//         left: "15%",
//       },
//     },
//     {
//       id: 8,
//       src: "/img/gallery/8.jpg",
//       alt: "Wildlife safari experience",
//       style: {
//         transform: "rotate(10deg) translate(-10px, -20px)",
//         zIndex: 1,
//         bottom: "18%",
//         right: "20%",
//       },
//     },
//     {
//       id: 9,
//       src: "/img/gallery/9.jpg",
//       alt: "Mountain trekking group",
//       style: {
//         transform: "rotate(-6deg) translate(5px, 15px)",
//         zIndex: 2,
//         bottom: "8%",
//         left: "38%",
//       },
//     },
//   ];

//   return (
//     <section className="py-20 bg-white overflow-hidden">
//       <div className="container mx-auto px-4">
//         <div className="text-center mb-16">
//           <h2
//             className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 mb-8"
//             style={{ fontFamily: "cursive" }}
//           >
//             Gallery
//           </h2>
//         </div>

//         {/* Scattered Photo Collage */}
//         <div className="relative h-96 md:h-[500px] lg:h-[600px] mx-auto max-w-4xl">
//           {photos.map((photo) => (
//             <div
//               key={photo.id}
//               className="absolute w-32 h-24 md:w-40 md:h-32 lg:w-48 lg:h-36 cursor-pointer group"
//               style={photo.style}
//             >
//               <div className="relative w-full h-full bg-white p-2 shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:scale-110">
//                 <img
//                   src={photo.src}
//                   alt={photo.alt}
//                   className="w-full h-full object-cover"
//                 />
//                 {/* Polaroid-style bottom space */}
//                 <div className="absolute bottom-0 left-0 right-0 h-3 bg-white"></div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Optional: Add some decorative elements */}
//         <div className="text-center mt-12">
//           <p className="text-gray-600 text-lg max-w-2xl mx-auto">
//             Capture memories that last a lifetime. Join our tours and create
//             your own amazing stories to share.
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// };

// Reviews Component
const Reviews: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const reviews: Review[] = [
    {
      id: 1,
      name: "Emily Johnson",
      location: "New York, USA",
      tourPackage: "12 Days Nature & Wildlife Tour",
      text: "Absolutely breathtaking experience! The Knuckles Mountain Range was incredible, and seeing elephants at Udawalawe was magical. Our guide was knowledgeable and the accommodations were perfect. Sri Lanka exceeded all expectations!",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1501594907352-0f8b1c3d4c5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      tourImage: "/img/gallery/6.jpg",
      date: "March 2025",
      verified: true
    },
    {
      id: 2,
      name: "James Wilson",
      location: "London, UK",
      tourPackage: "10 Days Cultural Heritage Tour",
      text: "The cultural tour was phenomenal! Sigiriya Rock Fortress at sunrise was unforgettable. The ancient cities of Anuradhapura and Polonnaruwa were fascinating. Great value for money and excellent organization throughout.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      tourImage: "/img/gallery/10.jpg",
      date: "February 2025",
      verified: true
    },
    {
      id: 3,
      name: "Sarah Martinez",
      location: "Toronto, Canada",
      tourPackage: "14 Days Complete Experience",
      text: "This comprehensive tour covered everything! From wildlife safaris to beach relaxation in Bentota. The tea plantations in Nuwara Eliya were stunning. Professional team and seamless planning made this trip memorable.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      tourImage: "/img/gallery/12.jpg",
      date: "January 2025",
      verified: true
    },
    {
      id: 4,
      name: "Michael Chen",
      location: "Sydney, Australia",
      tourPackage: "Premium Safari Experience",
      text: "Incredible safari experience! We spotted leopards at Yala National Park and the elephant gathering at Minneriya was spectacular. The river safari at Bentota was a perfect end to our adventure. Highly recommended!",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      tourImage: "/img/gallery/13.jpg",
      date: "March 2025",
      verified: true
    },
    // {
    //   id: 5,
    //   name: "Lisa Thompson",
    //   location: "Vancouver, Canada",
    //   tourPackage: "12 Days Nature & Wildlife Tour",
    //   text: "Amazing honeymoon trip! Adam's Peak hike was challenging but rewarding. The Nine Arch Bridge in Ella was picture-perfect. Whale watching in Mirissa was the highlight. Thank you for making our special trip unforgettable!",
    //   rating: 5,
    //   avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    //   tourImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    //   date: "February 2025",
    //   verified: true
    // },
    // {
    //   id: 6,
    //   name: "David Brown",
    //   location: "Manchester, UK",
    //   tourPackage: "10 Days Cultural Heritage Tour",
    //   text: "Excellent cultural immersion! The Temple of the Tooth in Kandy was deeply spiritual. Dambulla Cave Temple's ancient paintings were mesmerizing. Our guide's knowledge of Sri Lankan history enriched every visit.",
    //   rating: 5,
    //   avatar: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    //   tourImage: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    //   date: "January 2025",
    //   verified: true
    // },
    // {
    //   id: 7,
    //   name: "Anna Schmidt",
    //   location: "Berlin, Germany",
    //   tourPackage: "14 Days Complete Experience",
    //   text: "Perfectly planned adventure! Every destination was unique - from the wild beauty of Wilpattu to the golden beaches of Tangalle. The local cuisine experiences were delightful. Will definitely return to Sri Lanka!",
    //   rating: 5,
    //   avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    //   tourImage: "https://images.unsplash.com/photo-1566552881560-0be862a7c445?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    //   date: "March 2025",
    //   verified: true
    // }
  ];

  // Auto-scroll functionality
  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex >= reviews.length - 3 ? 0 : prevIndex + 1
        );
      }, 4000);

      return () => clearInterval(interval);
    }
  }, [isHovered, reviews.length]);

  const visibleReviews = reviews.slice(currentIndex, currentIndex + 3);
  if (visibleReviews.length < 3) {
    visibleReviews.push(...reviews.slice(0, 3 - visibleReviews.length));
  }

  return (
    <section className="py-20 bg-gradient-to-b from-blue-50 to-white overflow-hidden" id="reviews">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-400">
            What Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">
              Travelers
            </span>{" "}
            Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real experiences from real travelers who have discovered the magic of Sri Lanka with us
          </p>
        </div>

        <div 
          className="transition-transform duration-1000 ease-in-out"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {visibleReviews.map((review, index) => (
              <div
                key={`${review.id}-${index}`}
                className="bg-white p-6 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100"
              >
                {/* Review Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    {/* <img
                      src={review.avatar}
                      alt={review.name}
                      className="w-14 h-14 rounded-full object-cover mr-4 border-2 border-orange-200"
                    /> */}
                    <div>
                      <h4 className="font-bold text-gray-800 text-lg">{review.name}</h4>
                      <p className="text-sm text-gray-500 flex items-center">
                        <MapPin size={12} className="mr-1" />
                        {review.location}
                      </p>
                    </div>
                  </div>
                  {review.verified && (
                    <div className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs font-medium">
                      ✓ Verified
                    </div>
                  )}
                </div>

                {/* Tour Package */}
                <div className="mb-4">
                  <div className="bg-orange-50 rounded-lg p-3 mb-3">
                    <p className="text-sm font-semibold text-orange-600 flex items-center">
                      <Calendar size={14} className="mr-2" />
                      {review.tourPackage}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{review.date}</p>
                  </div>
                  <img
                    src={review.tourImage}
                    alt={review.tourPackage}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                </div>

                {/* Review Text */}
                <p className="text-gray-600 mb-4 leading-relaxed text-sm">
                  "{review.text}"
                </p>

                {/* Rating */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className="text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    <Users size={12} className="mr-1" />
                    Traveled with family
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Review Indicators */}
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: Math.ceil(reviews.length / 3) }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index * 3)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                Math.floor(currentIndex / 3) === index
                  ? 'bg-orange-500'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

        {/* Statistics */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-3xl font-bold text-orange-500 mb-2">400+</h3>
            <p className="text-gray-600">Happy Travelers</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-3xl font-bold text-orange-500 mb-2">4.9★</h3>
            <p className="text-gray-600">Average Rating</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-3xl font-bold text-orange-500 mb-2">30+</h3>
            <p className="text-gray-600">Destinations</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-3xl font-bold text-orange-500 mb-2">5</h3>
            <p className="text-gray-600">Years Experience</p>
          </div>
        </div>
      </div>
    </section>
  );
};

// Footer Component
const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Destinations */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-orange-400 flex items-center">
              <MapPin size={20} className="mr-2" />
              DESTINATIONS
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="hover:text-orange-400 transition-colors text-gray-300">
                  Sigiriya Rock Fortress
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-400 transition-colors text-gray-300">
                  Kandy & Temple of Tooth
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-400 transition-colors text-gray-300">
                  Yala National Park
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-400 transition-colors text-gray-300">
                  Nuwara Eliya Hill Country
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-400 transition-colors text-gray-300">
                  Galle Dutch Fort
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-400 transition-colors text-gray-300">
                  Ella & Nine Arch Bridge
                </a>
              </li>
            </ul>
          </div>

          {/* Travel Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-orange-400 flex items-center">
              <Camera size={20} className="mr-2" />
              TRAVEL SERVICES
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="hover:text-orange-400 transition-colors text-gray-300">
                  Cultural Heritage Tours
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-400 transition-colors text-gray-300">
                  Wildlife Safari Packages
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-400 transition-colors text-gray-300">
                  Adventure & Trekking
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-400 transition-colors text-gray-300">
                  Beach & Relaxation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-400 transition-colors text-gray-300">
                  Honeymoon Packages
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-400 transition-colors text-gray-300">
                  Group Tours
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-orange-400 flex items-center">
              <Users size={20} className="mr-2" />
              SUPPORT
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="hover:text-orange-400 transition-colors text-gray-300">
                  About Wander Lens
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-400 transition-colors text-gray-300">
                  Travel Guidelines
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-400 transition-colors text-gray-300">
                  Booking Terms
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-400 transition-colors text-gray-300">
                  Cancellation Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-400 transition-colors text-gray-300">
                  Travel Insurance
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-400 transition-colors text-gray-300">
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-orange-400">
              CONNECT WITH US
            </h3>
            
            {/* Contact Info */}
            <div className="space-y-4 mb-6">
              <p className="flex items-center text-gray-300">
                <Phone size={16} className="mr-3 text-orange-400" />
                +94 76 767 0980
              </p>
              <p className="flex items-center text-gray-300">
                <Mail size={16} className="mr-3 text-orange-400" />
                  wanderlenstours@gmail.com
              </p>
              <p className="flex items-start text-gray-300">
                <MapPin size={16} className="mr-3 text-orange-400 mt-1" />
                No 35/1, Galle Road, unawatuna<br />Sri Lanka
              </p>
            </div>

            {/* Social Media */}
            <div className="space-y-4">
              <h4 className="font-medium text-white">Follow Our Adventures</h4>
              <div className="flex space-x-3">
                <a
                  href="#"
                  className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors group"
                >
                  <Facebook size={18} className="group-hover:scale-110 transition-transform" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center hover:from-purple-600 hover:to-pink-600 transition-all group"
                >
                  <Instagram size={18} className="group-hover:scale-110 transition-transform" />
                </a>
                
                <a
                  href="#"
                  className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors group"
                >
                  <Youtube size={18} className="group-hover:scale-110 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h2 className="text-2xl font-bold text-orange-400 mb-2">Wander Lens Tours</h2>
              <p className="text-gray-400 text-sm">
                Your trusted partner for authentic Sri Lankan adventures since 2017
              </p>
            </div>
            <div className="text-center md:text-right">
              <p className="text-gray-400 text-sm">
                © 2025 Wander Lens Tours. All rights reserved.
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Licensed Tour Operator | SLTDA Registered
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

const FloatingWhatsAppButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // WhatsApp number - replace with your actual number
  const whatsappNumber = "+94767670980";
  const defaultMessage = `*New Tour Inquiry from Website*`;

  // Show button after scrolling down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(defaultMessage);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <>
      {/* WhatsApp Floating Button */}
      <div
        className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
        }`}
      >
        <button
          onClick={handleWhatsAppClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative group"
          aria-label="Contact us on WhatsApp"
        >
          {/* Pulse Animation Ring */}
          <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-25"></div>
          
          {/* Main Button */}
          <div className="relative bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-110">
            {/* WhatsApp Icon SVG */}
            <svg
              className="w-7 h-7"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.123-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
          </div>

          {/* Tooltip */}
          {isHovered && (
            <div className="absolute bottom-full right-0 mb-3 whitespace-nowrap bg-gray-800 text-white text-sm px-3 py-2 rounded-lg shadow-lg transform transition-all duration-300">
              <span>Chat with us on WhatsApp!</span>
              <div className="absolute top-full right-6 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-gray-800"></div>
            </div>
          )}
        </button>

        {/* Optional: Text label that appears on hover */}
        <div
          className={`absolute bottom-0 right-full mr-3 bg-white text-gray-800 px-3 py-2 rounded-lg shadow-lg whitespace-nowrap transition-all duration-300 ${
            isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2"
          }`}
        >
          <span className="text-sm font-medium">Need help? Chat with us!</span>
        </div>
      </div>

      {/* Mobile-specific adjustments */}
      <style jsx>{`
        @media (max-width: 640px) {
          .fixed.bottom-6.right-6 {
            bottom: 20px;
            right: 20px;
          }
        }
      `}</style>
    </>
  );
};

// Main App Component
const App = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <TopDestinations />
      <TourPackages />
      <PackagesServices />
      <MoreDestinations />
      <Gallery />
      <Reviews />
      <FloatingWhatsAppButton />
      <Footer />
    </div>
  );
};

export default App;
