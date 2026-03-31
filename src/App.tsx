import React, { useState, useEffect } from 'react';
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
  MessageSquare,
  Search
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
  { name: "Head Shave", price: "₹500", duration: "30 min", description: "Smooth straight razor head shave with moisturizing finish." },
  { name: "Hair Coloring", price: "₹1200", duration: "60 min", description: "Professional color application for a fresh new look." },
  { name: "Scalp Treatment", price: "₹700", duration: "45 min", description: "Deep cleansing and moisturizing treatment for a healthy scalp." },
  { name: "Charcoal Facial", price: "₹600", duration: "30 min", description: "Deep pore cleansing and skin rejuvenation." },
  { name: "Nose & Ear Waxing", price: "₹300", duration: "15 min", description: "Quick and effective removal of unwanted hair." },
  { name: "Eyebrow Threading", price: "₹200", duration: "15 min", description: "Precise eyebrow shaping and clean-up." },
  { name: "Skin Fade (Zero)", price: "₹900", duration: "50 min", description: "Ultra-close skin fade using foil shaver for maximum sharpness." },
  { name: "Buzz Cut", price: "₹400", duration: "20 min", description: "One length all over with clean edges and tapered neck." },
  { name: "Grey Blending", price: "₹1000", duration: "45 min", description: "Subtle color treatment to naturally blend away grey hair." },
  { name: "Beard Wash & Steam", price: "₹500", duration: "25 min", description: "Deep conditioning wash with steam treatment for ultimate beard health." },
  { name: "Hot Oil Massage", price: "₹600", duration: "30 min", description: "Relaxing scalp massage with premium hot oils to stimulate growth." },
  { name: "Blackhead Removal", price: "₹400", duration: "20 min", description: "Professional extraction and nose strip treatment for clear skin." },
  { name: "Hair Tattoo / Design", price: "₹500+", duration: "30+ min", description: "Custom artistic designs or lines carved into your fade." },
  { name: "The Ultimate Grooming", price: "₹2500", duration: "120 min", description: "The full VIP experience: Haircut, Beard, Facial, Mani-Pedi, and Scalp Massage." },
  { name: "Hair Spa & Steam", price: "₹1500", duration: "60 min", description: "Deep conditioning treatment with steam for hair health and shine." },
  { name: "Face Massage", price: "₹500", duration: "20 min", description: "Relaxing facial massage with premium creams to relieve stress." },
  { name: "Hair Straightening", price: "₹2000+", duration: "90+ min", description: "Professional permanent or temporary hair straightening." },
  { name: "Keratin Treatment", price: "₹3000+", duration: "120+ min", description: "Smoothing treatment that eliminates frizz and adds shine." },
  { name: "Detan Treatment", price: "₹800", duration: "30 min", description: "Effective removal of sun tan and skin brightening." },
  { name: "Premium Hair Wash", price: "₹300", duration: "15 min", description: "Refreshing wash with high-quality shampoo and conditioner." },
];

const GALLERY = [
  "https://picsum.photos/seed/fade-cut/600/600",
  "https://picsum.photos/seed/blackhead-removal/600/600",
  "https://picsum.photos/seed/skincare-facial/600/600",
  "https://picsum.photos/seed/hair-color/600/600",
  "https://picsum.photos/seed/grooming-barber/600/600",
  "https://picsum.photos/seed/beard-trim/600/600",
  "https://picsum.photos/seed/hot-towel/600/600",
  "https://picsum.photos/seed/hair-style/600/600",
  "https://picsum.photos/seed/barber-shop/600/600",
];

const TESTIMONIALS = [
  {
    name: "Zaid Ahmad",
    role: "Regular Client",
    quote: "The best fade I've ever had. The attention to detail is unmatched. Kashur Barber is truly the gold standard in Srinagar.",
    rating: 5
  },
  {
    name: "Umar Farooq",
    role: "Business Professional",
    quote: "Professional service and a great atmosphere. They really understand what style suits you best. Highly recommended!",
    rating: 5
  },
  {
    name: "Sami Ullah",
    role: "Student",
    quote: "Great experience every time. The staff is friendly and the results are consistently amazing. Best barber shop in town.",
    rating: 5
  }
];

const FAQ_DATA = [
  {
    question: "Do I need an appointment?",
    answer: "While we do accept walk-ins, we highly recommend booking an appointment to ensure you get your preferred time slot and avoid waiting. You can book directly through our website or via WhatsApp."
  },
  {
    question: "Where exactly are you located?",
    answer: "We are located in the heart of Srinagar, Kashmir. You can find our exact location on the map in the 'Get In Touch' section at the bottom of this page."
  },
  {
    question: "What are your opening hours?",
    answer: "We are open every day from 10:00 AM to 8:00 PM. Special holiday hours may apply, so feel free to check our Instagram for updates."
  },
  {
    question: "Do you offer services for children?",
    answer: "Yes, we offer a 'Junior Cut' specifically for young gentlemen under the age of 12. Our barbers are great with kids and ensure they have a comfortable experience."
  },
  {
    question: "Can I book for a group or wedding event?",
    answer: "Absolutely! We offer special grooming packages for weddings and group events. Please contact us directly via phone or WhatsApp to discuss your requirements and get a custom quote."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept cash, UPI (Google Pay, PhonePe, Paytm), and all major credit/debit cards."
  }
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
    { id: 'booking', label: 'Booking' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'faq', label: 'FAQ' },
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
              className={`text-base uppercase tracking-widest transition-colors hover:text-gold ${activeSection === link.id ? 'text-gold' : 'text-white/70'}`}
            >
              {link.label}
            </button>
          ))}
          <button 
            onClick={() => setActiveSection('booking')}
            className="bg-gold text-dark px-6 py-2 rounded-full font-bold text-sm uppercase tracking-widest glow-button"
          >
            Book Now
          </button>
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
            <button 
              onClick={() => { setActiveSection('booking'); setIsOpen(false); }}
              className="bg-gold text-dark px-8 py-3 rounded-full font-bold uppercase tracking-widest"
            >
              Book Now
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = ({ onBookClick, onServicesClick }: { onBookClick: () => void, onServicesClick: () => void }) => (
  <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden py-32">
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

    <div className="relative z-10 text-center px-6 max-w-7xl">
      <motion.div
        initial={{ opacity: 0, scale: 1.5, y: 100 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ 
          duration: 1, 
          ease: [0.16, 1, 0.3, 1], // Custom slam-in ease
          delay: 0.2 
        }}
        className="title-wrapper"
      >
        <span className="text-gold uppercase tracking-[0.6em] text-sm md:text-base font-bold mb-6 block opacity-70">The Kashur Barber Experience</span>
        <h1 className="text-[clamp(2.5rem,10vw,4.5rem)] md:text-[clamp(4.5rem,8vw,8rem)] lg:text-[clamp(6rem,10vw,10rem)] font-black leading-[1.2] tracking-[-0.05em] uppercase mb-16 flex flex-col items-center transform -skew-x-6 gap-2 md:gap-6">
          <span className="block">We Don't Just</span>
          <span className="block text-gold">Cut Hair</span>
          <span className="block">We Create Art</span>
        </h1>
        <p className="text-xl md:text-2xl text-white/50 mb-20 max-w-3xl mx-auto font-light leading-relaxed tracking-wide">
          Precision grooming for the modern gentleman. 
          Where every cut is a masterpiece and every client is a canvas.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <button 
            onClick={onBookClick}
            className="bg-gold text-dark px-12 py-5 rounded-none font-black text-sm uppercase tracking-[0.3em] glow-button w-full sm:w-auto transition-transform hover:scale-105 active:scale-95"
          >
            Book Now
          </button>
          <button 
            onClick={onServicesClick}
            className="border-b-2 border-gold/30 hover:border-gold text-white px-4 py-2 font-bold text-sm uppercase tracking-[0.3em] transition-all w-full sm:w-auto"
          >
            Our Portfolio
          </button>
        </div>
      </motion.div>
    </div>

    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-30">
      <div className="w-px h-12 bg-white"></div>
    </div>
  </section>
);

const Services = ({ onBookClick }: { onBookClick: (serviceName?: string) => void }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredServices = SERVICES.filter(service => 
    service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="services" className="py-24 bg-dark-lighter relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-bold mb-4 uppercase">Our Services</h2>
          <div className="w-20 h-1 bg-gold mx-auto mb-6"></div>
          <p className="text-white/50 max-w-xl mx-auto mb-10">From classic cuts to modern fades, we offer a range of premium services tailored to your style.</p>
          
          <div className="max-w-md mx-auto relative group focus-within:scale-[1.02] transition-transform duration-300">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-white/30 group-focus-within:text-gold transition-colors">
              <Search size={18} />
            </div>
            <input 
              type="text" 
              placeholder="Search services..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-dark border border-white/10 py-4 pl-12 pr-12 text-white placeholder:text-white/20 focus:outline-none focus:border-gold/50 transition-all rounded-none"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-4 flex items-center text-white/30 hover:text-gold transition-colors"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.length > 0 ? (
            filteredServices.map((service, idx) => (
              <motion.div 
                key={idx}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
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
                <button 
                  onClick={() => onBookClick(service.name)}
                  className="text-xs uppercase tracking-widest font-bold text-gold flex items-center gap-2 group-hover:gap-4 transition-all"
                >
                  Book Now <ChevronRight size={14} />
                </button>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-20">
              <p className="text-white/30 text-lg italic">No services found matching "{searchQuery}"</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

const Booking = ({ selectedService }: { selectedService?: string }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: SERVICES[0].name,
    date: '',
    time: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (selectedService) {
      setFormData(prev => ({ ...prev, service: selectedService }));
    }
  }, [selectedService]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Hello Kashur Barber, I'd like to book an appointment.%0A%0A*Name:* ${formData.name}%0A*Phone:* ${formData.phone}%0A*Service:* ${formData.service}%0A*Date:* ${formData.date}%0A*Time:* ${formData.time}`;
    window.open(`https://wa.me/917006345743?text=${message}`, '_blank');
    setIsSubmitted(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      phone: '',
      service: SERVICES[0].name,
      date: '',
      time: ''
    });
    setIsSubmitted(false);
  };

  const whatsappUrl = `https://wa.me/917006345743?text=${encodeURIComponent(`Hello Kashur Barber, I'd like to book an appointment.\n\n*Name:* ${formData.name}\n*Phone:* ${formData.phone}\n*Service:* ${formData.service}\n*Date:* ${formData.date}\n*Time:* ${formData.time}`)}`;

  return (
    <section id="booking" className="py-24 bg-dark relative overflow-hidden">
      <div className="absolute inset-0 spotlight opacity-30"></div>
      <div className="max-w-3xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-bold mb-4 uppercase">
            {isSubmitted ? "Booking Initiated" : "Book Appointment"}
          </h2>
          <div className="w-20 h-1 bg-gold mx-auto mb-6"></div>
          <p className="text-white/50">
            {isSubmitted 
              ? "We've redirected you to WhatsApp to confirm your details." 
              : "Fill in the details below to book your session via WhatsApp."}
          </p>
        </div>

        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.form 
              key="booking-form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              onSubmit={handleSubmit} 
              className="bg-dark-lighter p-8 md:p-12 border border-gold/20 shadow-2xl"
            >
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-white/40">Full Name</label>
                  <input 
                    required
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-dark border border-white/10 p-4 focus:border-gold outline-none transition-all text-white" 
                    placeholder="Enter your name" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-white/40">Phone Number</label>
                  <input 
                    required
                    type="tel" 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full bg-dark border border-white/10 p-4 focus:border-gold outline-none transition-all text-white" 
                    placeholder="Enter phone number" 
                  />
                </div>
              </div>

              <div className="space-y-2 mb-6">
                <label className="text-xs uppercase tracking-widest text-white/40">Select Service</label>
                <select 
                  value={formData.service}
                  onChange={(e) => setFormData({...formData, service: e.target.value})}
                  className="w-full bg-dark border border-white/10 p-4 focus:border-gold outline-none transition-all text-white appearance-none"
                >
                  {SERVICES.map((s, i) => (
                    <option key={i} value={s.name} className="bg-dark">{s.name} ({s.price})</option>
                  ))}
                </select>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-white/40">Preferred Date</label>
                  <input 
                    required
                    type="date" 
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    className="w-full bg-dark border border-white/10 p-4 focus:border-gold outline-none transition-all text-white" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-white/40">Preferred Time</label>
                  <input 
                    required
                    type="time" 
                    value={formData.time}
                    onChange={(e) => setFormData({...formData, time: e.target.value})}
                    className="w-full bg-dark border border-white/10 p-4 focus:border-gold outline-none transition-all text-white" 
                  />
                </div>
              </div>

              <button type="submit" className="w-full bg-gold text-dark py-4 font-bold uppercase tracking-widest glow-button flex items-center justify-center gap-3">
                <MessageSquare size={20} />
                Confirm on WhatsApp
              </button>
            </motion.form>
          ) : (
            <motion.div 
              key="confirmation"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-dark-lighter p-8 md:p-12 border border-gold/40 shadow-2xl text-center"
            >
              <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center text-gold mx-auto mb-8">
                <Scissors size={40} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Thank you, {formData.name}!</h3>
              <p className="text-white/60 mb-8 leading-relaxed">
                Your booking request for a <strong>{formData.service}</strong> on <strong>{formData.date}</strong> at <strong>{formData.time}</strong> has been prepared. 
                If the WhatsApp window didn't open automatically, please use the button below to send your request.
              </p>
              
              <div className="flex flex-col gap-4">
                <a 
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-gold text-dark py-4 font-bold uppercase tracking-widest glow-button flex items-center justify-center gap-3"
                >
                  <MessageSquare size={20} />
                  Open WhatsApp Chat
                </a>
                <button 
                  onClick={resetForm}
                  className="text-white/40 hover:text-white text-sm uppercase tracking-widest transition-colors"
                >
                  Edit Details / Book Another
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

const Gallery = () => (
  <section id="gallery" className="py-24 bg-dark">
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
        <div>
          <h2 className="text-5xl md:text-7xl font-bold mb-4 uppercase">The Gallery</h2>
          <div className="w-20 h-1 bg-gold mb-6"></div>
          <p className="text-white/50 max-w-md">A showcase of our latest work and the sharpest fades in the district.</p>
        </div>
        <a 
          href="https://www.instagram.com/kashur_barber?igsh=MjZzczhpbXhtNnpx" 
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm uppercase tracking-widest font-bold text-gold border-b border-gold/30 pb-1 hover:border-gold transition-all"
        >
          Follow on Instagram
        </a>
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

const Testimonials = () => (
  <section id="testimonials" className="py-24 bg-dark-lighter relative overflow-hidden">
    <div className="absolute inset-0 spotlight opacity-20"></div>
    <div className="max-w-7xl mx-auto px-6 relative z-10">
      <div className="text-center mb-16">
        <h2 className="text-5xl md:text-7xl font-bold mb-4 uppercase">Client Stories</h2>
        <div className="w-20 h-1 bg-gold mx-auto mb-6"></div>
        <p className="text-white/50 max-w-xl mx-auto">Don't just take our word for it. Here's what our regular clients have to say about their experience at Kashur Barber.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {TESTIMONIALS.map((t, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            viewport={{ once: true }}
            className="bg-dark p-8 border border-gold/10 hover:border-gold/30 transition-all group"
          >
            <div className="flex gap-1 mb-6">
              {[...Array(t.rating)].map((_, i) => (
                <Star key={i} size={16} className="fill-gold text-gold" />
              ))}
            </div>
            <p className="text-white/70 italic mb-8 leading-relaxed">"{t.quote}"</p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                <User size={24} />
              </div>
              <div>
                <h4 className="font-bold text-white uppercase tracking-wider">{t.name}</h4>
                <p className="text-white/40 text-xs uppercase tracking-widest">{t.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 bg-dark">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-bold mb-4 uppercase">FAQ</h2>
          <div className="w-20 h-1 bg-gold mx-auto mb-6"></div>
          <p className="text-white/50">Everything you need to know about your next visit to Kashur Barber.</p>
        </div>

        <div className="space-y-4">
          {FAQ_DATA.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="border border-gold/10 bg-dark-lighter overflow-hidden"
            >
              <button 
                onClick={() => setActiveIndex(activeIndex === idx ? null : idx)}
                className="w-full p-6 text-left flex justify-between items-center group"
              >
                <span className={`text-lg font-bold transition-colors ${activeIndex === idx ? 'text-gold' : 'text-white/80 group-hover:text-white'}`}>
                  {item.question}
                </span>
                <motion.div
                  animate={{ rotate: activeIndex === idx ? 90 : 0 }}
                  className="text-gold"
                >
                  <ChevronRight size={20} />
                </motion.div>
              </button>
              <AnimatePresence>
                {activeIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-6 text-white/50 leading-relaxed border-t border-gold/5 pt-4">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => (
  <section id="contact" className="py-24 bg-dark border-t border-white/5">
    <div className="max-w-7xl mx-auto px-6">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-5xl md:text-7xl font-bold mb-8 uppercase">Get In Touch</h2>
        <p className="text-white/60 mb-16 leading-relaxed max-w-xl mx-auto">
          Ready for a transformation? Visit us or reach out to book your next session. 
          Walk-ins are welcome, but appointments are recommended.
        </p>

        <div className="grid md:grid-cols-3 gap-12">
          <div className="flex flex-col items-center text-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center text-gold shrink-0 mb-2">
              <MapPin size={28} />
            </div>
            <div>
              <h4 className="font-bold text-lg mb-2 uppercase tracking-wider">Location</h4>
              <p className="text-white/50 text-sm leading-relaxed">khanda, B.K.pora near J&K Bank, Nowgam to Pulwama Road, Srinagar, J&K, 192121</p>
            </div>
          </div>

          <div className="flex flex-col items-center text-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center text-gold shrink-0 mb-2">
              <Phone size={28} />
            </div>
            <div>
              <h4 className="font-bold text-lg mb-2 uppercase tracking-wider">Contact</h4>
              <p className="text-white/50 text-sm">+91 70063 45743</p>
              <p className="text-white/50 text-sm">WhatsApp Available</p>
            </div>
          </div>

          <div className="flex flex-col items-center text-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center text-gold shrink-0 mb-2">
              <Clock size={28} />
            </div>
            <div>
              <h4 className="font-bold text-lg mb-2 uppercase tracking-wider">Hours</h4>
              <p className="text-white/50 text-sm">Mon - Sat: 10:00 AM - 8:00 PM</p>
              <p className="text-white/50 text-sm">Sunday: 11:00 AM - 5:00 PM</p>
            </div>
          </div>
        </div>

        {/* Google Maps Integration */}
        <div className="mt-20 w-full h-[400px] grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-700 border border-white/10">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3308.217342464147!2d74.8341667!3d33.9875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38e18f87f9f9f9f9%3A0x0!2sKhanda%2C%20B.K.pora%20near%20J%26K%20Bank%2C%20Nowgam%20to%20Pulwama%20Road%2C%20Srinagar%2C%20J%26K%2C%20192121!5e0!3m2!1sen!2sin!4v1711850000000!5m2!1sen!2sin" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Kashur Barber Location"
          ></iframe>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="py-12 bg-dark border-t border-white/5">
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
        <div className="flex items-center gap-2">
          <Scissors className="text-gold w-6 h-6" />
          <span className="text-xl font-display font-bold tracking-tighter">KASHUR BARBER</span>
        </div>
        
        <div className="flex gap-6">
          <a 
            href="https://www.instagram.com/kashur_barber?igsh=MjZzczhpbXhtNnpx" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/40 hover:text-gold transition-colors"
          >
            <Instagram size={20} />
          </a>
          <a 
            href="https://www.facebook.com/share/1BDWmT8AJg/" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/40 hover:text-gold transition-colors"
          >
            <Facebook size={20} />
          </a>
          <a href="#" className="text-white/40 hover:text-gold transition-colors"><MessageSquare size={20} /></a>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-t border-white/5 pt-8">
        <p className="text-white/30 text-xs uppercase tracking-widest text-center md:text-left">
          khanda, B.K.pora near J&K Bank, Nowgam to Pulwama Road, Srinagar, J&K, 192121
        </p>
        <p className="text-white/30 text-xs uppercase tracking-widest">
          &copy; 2026 Kashur Barber. All Rights Reserved.
        </p>
      </div>
    </div>
  </footer>
);

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedService, setSelectedService] = useState<string | undefined>(undefined);

  const scrollToSection = (id: string, serviceName?: string) => {
    if (serviceName) {
      setSelectedService(serviceName);
    }
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar activeSection={activeSection} setActiveSection={scrollToSection} />
      <Hero onBookClick={() => scrollToSection('booking')} onServicesClick={() => scrollToSection('services')} />
      <Services onBookClick={(name) => scrollToSection('booking', name)} />
      <Booking selectedService={selectedService} />
      <Gallery />
      <Testimonials />
      <FAQ />
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
