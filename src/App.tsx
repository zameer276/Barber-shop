import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Scissors, 
  Clock, 
  MapPin, 
  Phone, 
  Instagram, 
  Facebook, 
  Menu, 
  X, 
  ChevronRight,
  Star,
  User,
  Camera,
  MessageSquare
} from 'lucide-react';

// --- Types ---
interface Service {
  name: string;
  price: string;
  duration: string;
  description: string;
}

// --- Data ---
const SERVICES: Service[] = [
  { name: "The Signature Fade", price: "₹800", duration: "45 min", description: "Precision fade with hot towel finish and styling." },
  { name: "Classic Scissor Cut", price: "₹600", duration: "40 min", description: "Traditional hand-cut style tailored to your face shape." },
  { name: "Beard Sculpture", price: "₹400", duration: "30 min", description: "Detailed shaping, line-up, and beard oil treatment." },
  { name: "Luxury Shave", price: "₹1000", duration: "60 min", description: "Straight razor shave with multi-step hot towel and massage." },
  { name: "The Works", price: "₹1800", duration: "90 min", description: "Haircut, beard trim, facial, and scalp massage." },
  { name: "Junior Cut", price: "₹400", duration: "30 min", description: "Sharp styles for the younger gentlemen (under 12)." },
];

const GALLERY = [
  "https://picsum.photos/seed/fade1/600/600",
  "https://picsum.photos/seed/fade2/600/600",
  "https://picsum.photos/seed/fade3/600/600",
  "https://picsum.photos/seed/fade4/600/600",
  "https://picsum.photos/seed/fade5/600/600",
  "https://picsum.photos/seed/fade6/600/600",
];

// --- Components ---

const Navbar = ({ activeSection, setActiveSection }: { activeSection: string, setActiveSection: (s: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-dark/95 backdrop-blur-md py-4 border-b border-gold/10' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveSection('home')}>
          <Scissors className="text-gold w-8 h-8" />
          <span className="text-2xl font-display font-bold tracking-tighter">KASHUR BARBER</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <button
              key={link.id}
              onClick={() => setActiveSection(link.id)}
              className={`text-sm uppercase tracking-widest transition-colors hover:text-gold ${activeSection === link.id ? 'text-gold' : 'text-white/70'}`}
            >
              {link.label}
            </button>
          ))}
          <a 
            href="https://wa.me/917006345743" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-gold text-dark px-6 py-2 rounded-full font-bold text-xs uppercase tracking-widest glow-button"
          >
            Book Now
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-dark border-b border-gold/20 flex flex-col items-center py-8 gap-6 md:hidden"
          >
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => { setActiveSection(link.id); setIsOpen(false); }}
                className="text-lg uppercase tracking-widest text-white/70 hover:text-gold"
              >
                {link.label}
              </button>
            ))}
            <a 
              href="https://wa.me/917006345743" 
              className="bg-gold text-dark px-8 py-3 rounded-full font-bold uppercase tracking-widest"
            >
              Book Now
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => (
  <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
    <div className="absolute inset-0 z-0">
      <img 
        src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=2070" 
        alt="Barbershop Atmosphere" 
        className="w-full h-full object-cover opacity-40 motion-blur-in"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-dark/80 via-dark/40 to-dark"></div>
      <div className="absolute inset-0 spotlight opacity-50"></div>
    </div>

    <div className="relative z-10 text-center px-6 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <span className="text-gold uppercase tracking-[0.4em] text-sm font-semibold mb-4 block">Kashur Barber Presents</span>
        <h1 className="text-6xl md:text-8xl font-extrabold mb-6 tracking-tighter leading-none uppercase">
          Where Style<br />
          <span className="text-gold">Meets Confidence</span>
        </h1>
        <p className="text-lg md:text-xl text-white/60 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
          Experience the art of grooming in a space designed for the modern gentleman. 
          Precision cuts, premium products, and a vibe that's unmatched.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a 
            href="https://wa.me/917006345743" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-gold text-dark px-10 py-4 rounded-full font-bold text-sm uppercase tracking-widest glow-button w-full sm:w-auto"
          >
            Book Appointment
          </a>
          <button className="border border-white/20 hover:border-gold/50 px-10 py-4 rounded-full font-bold text-sm uppercase tracking-widest transition-all w-full sm:w-auto">
            View Services
          </button>
        </div>
      </motion.div>
    </div>

    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-30">
      <div className="w-px h-12 bg-white"></div>
    </div>
  </section>
);

const Services = () => (
  <section id="services" className="py-24 bg-dark-lighter relative">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h2>
        <div className="w-20 h-1 bg-gold mx-auto mb-6"></div>
        <p className="text-white/50 max-w-xl mx-auto">From classic cuts to modern fades, we offer a range of premium services tailored to your style.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {SERVICES.map((service, idx) => (
          <motion.div 
            key={idx}
            whileHover={{ y: -10 }}
            className="p-8 border border-white/5 bg-dark hover:border-gold/30 transition-all group"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold group-hover:text-gold transition-colors">{service.name}</h3>
              <span className="text-gold font-bold">{service.price}</span>
            </div>
            <div className="flex items-center gap-2 text-white/40 text-xs mb-4 uppercase tracking-wider">
              <Clock size={14} />
              <span>{service.duration}</span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-6">{service.description}</p>
            <a href="https://wa.me/917006345743" className="text-xs uppercase tracking-widest font-bold text-gold flex items-center gap-2 group-hover:gap-4 transition-all">
              Book Now <ChevronRight size={14} />
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const Gallery = () => (
  <section id="gallery" className="py-24 bg-dark">
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
        <div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 uppercase">The Gallery</h2>
          <div className="w-20 h-1 bg-gold mb-6"></div>
          <p className="text-white/50 max-w-md">A showcase of our latest work and the sharpest fades in the district.</p>
        </div>
        <button className="text-sm uppercase tracking-widest font-bold text-gold border-b border-gold/30 pb-1 hover:border-gold transition-all">
          Follow on Instagram
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {GALLERY.map((img, idx) => (
          <motion.div 
            key={idx}
            whileHover={{ scale: 1.02 }}
            className="aspect-square overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 cursor-pointer"
          >
            <img src={img} alt={`Fade ${idx}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const Contact = () => (
  <section id="contact" className="py-24 bg-dark border-t border-white/5">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid lg:grid-cols-2 gap-16">
        <div>
          <h2 className="text-4xl md:text-5xl font-bold mb-8">Get In Touch</h2>
          <p className="text-white/60 mb-12 leading-relaxed">
            Ready for a transformation? Visit us or reach out to book your next session. 
            Walk-ins are welcome, but appointments are recommended.
          </p>

          <div className="space-y-8">
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold shrink-0">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1">Location</h4>
                <p className="text-white/50">Fade District, Main Market, Srinagar, J&K</p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold shrink-0">
                <Phone size={24} />
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1">Phone / WhatsApp</h4>
                <p className="text-white/50">+91 70063 45743</p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold shrink-0">
                <Clock size={24} />
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1">Hours</h4>
                <p className="text-white/50">Mon - Sat: 10:00 AM - 8:00 PM</p>
                <p className="text-white/50">Sunday: 11:00 AM - 5:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-dark-lighter p-8 md:p-12 border border-white/5">
          <h3 className="text-2xl font-bold mb-8">Send a Message</h3>
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-white/40">Name</label>
                <input type="text" className="w-full bg-dark border border-white/10 p-4 focus:border-gold outline-none transition-all" placeholder="Your Name" />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-white/40">Email</label>
                <input type="email" className="w-full bg-dark border border-white/10 p-4 focus:border-gold outline-none transition-all" placeholder="Your Email" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-white/40">Message</label>
              <textarea rows={4} className="w-full bg-dark border border-white/10 p-4 focus:border-gold outline-none transition-all" placeholder="How can we help?"></textarea>
            </div>
            <button className="w-full bg-gold text-dark py-4 font-bold uppercase tracking-widest glow-button">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="py-12 bg-dark border-t border-white/5">
    <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
      <div className="flex items-center gap-2">
        <Scissors className="text-gold w-6 h-6" />
        <span className="text-xl font-display font-bold tracking-tighter">KASHUR BARBER</span>
      </div>
      
      <div className="flex gap-6">
        <a href="#" className="text-white/40 hover:text-gold transition-colors"><Instagram size={20} /></a>
        <a href="#" className="text-white/40 hover:text-gold transition-colors"><Facebook size={20} /></a>
        <a href="#" className="text-white/40 hover:text-gold transition-colors"><MessageSquare size={20} /></a>
      </div>

      <p className="text-white/30 text-xs uppercase tracking-widest">
        &copy; 2026 Kashur Barber. All Rights Reserved.
      </p>
    </div>
  </footer>
);

export default function App() {
  const [activeSection, setActiveSection] = useState('home');

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar activeSection={activeSection} setActiveSection={scrollToSection} />
      <Hero />
      <Services />
      <Gallery />
      <Contact />
      <Footer />

      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/917006345743" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform"
      >
        <MessageSquare size={24} />
      </a>
    </div>
  );
}
