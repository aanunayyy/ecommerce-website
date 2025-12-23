'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { 
  ShoppingBag, 
  Search, 
  Menu, 
  X, 
  ChevronRight, 
  Star, 
  ArrowRight, 
  Trash2, 
  Plus, 
  Minus,
  CheckCircle,
  Truck,
  ShieldCheck,
  Zap,
  Sun,
  Moon,
  Globe,
  ChevronDown
} from 'lucide-react';

// --- Multi-language Translations ---
const TRANSLATIONS = {
  en: {
    nav: { home: "Home", shop: "Shop", journal: "Journal", support: "Support" },
    hero: {
      badge: "Summer Essentials 2024",
      title: "Elevate your Everyday Gear",
      subtitle: "Curated premium essentials designed for modern lifestyles. Quality materials meets timeless functionality.",
      cta: "Shop Collection",
      learn: "Learn More",
      sold: "Sold",
      reviews: "Reviews",
      delivery: "Delivery"
    },
    shop: { title: "All Products", categories: ["All", "Electronics", "Accessories", "Home", "Furniture"] },
    cart: { title: "Shopping Bag", empty: "Your bag is empty", continue: "Continue Shopping", subtotal: "Subtotal", shipping: "Shipping", total: "Total", checkout: "Checkout Now", free: "Free" },
    checkout: {
      step1: "Shipping Information",
      step2: "Payment Method",
      summary: "Summary",
      complete: "Complete Purchase",
      secure: "Secure encrypted checkout",
      success: "Order Confirmed!",
      successMsg: "Thank you for your purchase. We've sent a confirmation email with details."
    }
  },
  es: {
    nav: { home: "Inicio", shop: "Tienda", journal: "Diario", support: "Soporte" },
    hero: {
      badge: "Esenciales de Verano 2024",
      title: "Eleva tu Equipo Diario",
      subtitle: "Esenciales premium seleccionados para estilos de vida modernos. La calidad se une a la funcionalidad.",
      cta: "Comprar Colección",
      learn: "Saber Más",
      sold: "Vendido",
      reviews: "Reseñas",
      delivery: "Entrega"
    },
    shop: { title: "Todos los Productos", categories: ["Todos", "Electrónica", "Accesorios", "Hogar", "Muebles"] },
    cart: { title: "Bolsa de Compras", empty: "Tu bolsa está vacía", continue: "Seguir Comprando", subtotal: "Subtotal", shipping: "Envío", total: "Total", checkout: "Pagar Ahora", free: "Gratis" },
    checkout: {
      step1: "Información de Envío",
      step2: "Método de Pago",
      summary: "Resumen",
      complete: "Completar Compra",
      secure: "Pago seguro encriptado",
      success: "¡Pedido Confirmado!",
      successMsg: "Gracias por tu compra. Hemos enviado un correo de confirmación con los detalles."
    }
  },
  fr: {
    nav: { home: "Accueil", shop: "Boutique", journal: "Journal", support: "Support" },
    hero: {
      badge: "Essentiels d'Été 2024",
      title: "Améliorez votre Équipement",
      subtitle: "Des essentiels premium sélectionnés pour un style de vie moderne. La qualité rencontre la fonctionnalité.",
      cta: "Acheter la Collection",
      learn: "En savoir plus",
      sold: "Vendu",
      reviews: "Avis",
      delivery: "Livraison"
    },
    shop: { title: "Tous les Produits", categories: ["Tout", "Électronique", "Accessoires", "Maison", "Meubles"] },
    cart: { title: "Panier", empty: "Votre panier est vide", continue: "Continuer vos achats", subtotal: "Sous-total", shipping: "Livraison", total: "Total", checkout: "Commander", free: "Gratuit" },
    checkout: {
      step1: "Informations de Livraison",
      step2: "Mode de Paiement",
      summary: "Résumé",
      complete: "Finaliser l'Achat",
      secure: "Paiement sécurisé crypté",
      success: "Commande Confirmée !",
      successMsg: "Merci pour votre achat. Nous avons envoyé un e-mail de confirmation."
    }
  }
};

// --- Mock Data ---
const PRODUCTS = [
  { id: 1, name: "Aether Headphones", price: 299.00, category: "Electronics", rating: 4.8, reviews: 124, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=600" },
  { id: 2, name: "Minimalist Watch", price: 150.00, category: "Accessories", rating: 4.6, reviews: 89, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=600" },
  { id: 3, name: "Ceramic Coffee Set", price: 45.00, category: "Home", rating: 4.9, reviews: 210, image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=600" },
  { id: 4, name: "Ergonomic Desk Chair", price: 499.00, category: "Furniture", rating: 4.7, reviews: 56, image: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?auto=format&fit=crop&q=80&w=600" },
  { id: 5, name: "Eco-Friendly Backpack", price: 85.00, category: "Accessories", rating: 4.5, reviews: 112, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=600" },
  { id: 6, name: "Smart Desk Lamp", price: 120.00, category: "Electronics", rating: 4.4, reviews: 78, image: "https://images.unsplash.com/photo-1534073828943-f801091bb18c?auto=format&fit=crop&q=80&w=600" }
];

// --- Components ---

const Navbar = ({ cartCount, onOpenCart, onNavigate, theme, toggleTheme, lang, setLang, t }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm py-3' 
        : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div 
          className="text-2xl font-bold tracking-tight cursor-pointer flex items-center gap-2 dark:text-white"
          onClick={() => onNavigate('home')}
        >
          <div className="w-8 h-8 bg-black dark:bg-blue-600 rounded-lg flex items-center justify-center">
            <Zap className="text-white w-5 h-5" fill="currentColor" />
          </div>
          <span className="hidden sm:block">APNIDUKAAN</span>
        </div>

        <div className="hidden md:flex items-center gap-8 font-medium text-sm dark:text-slate-300">
          <button onClick={() => onNavigate('home')} className="hover:text-blue-600 transition-colors">{t.nav.home}</button>
          <button onClick={() => onNavigate('shop')} className="hover:text-blue-600 transition-colors">{t.nav.shop}</button>
          <button className="hover:text-blue-600 transition-colors">{t.nav.journal}</button>
          <button className="hover:text-blue-600 transition-colors">{t.nav.support}</button>
        </div>

        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors dark:text-slate-300"
          >
            {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>

          {/* Language Toggle */}
          <div className="relative">
            <button 
              onClick={() => setShowLangMenu(!showLangMenu)}
              className="flex items-center gap-1 p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors dark:text-slate-300 uppercase text-xs font-bold"
            >
              <Globe className="w-4 h-4" />
              {lang}
              <ChevronDown className={`w-3 h-3 transition-transform ${showLangMenu ? 'rotate-180' : ''}`} />
            </button>
            {showLangMenu && (
              <div className="absolute right-0 mt-2 w-24 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl shadow-xl overflow-hidden py-1">
                {['en', 'es', 'fr'].map(l => (
                  <button
                    key={l}
                    onClick={() => { setLang(l); setShowLangMenu(false); }}
                    className={`w-full text-left px-4 py-2 text-xs font-bold uppercase hover:bg-slate-50 dark:hover:bg-slate-700 ${lang === l ? 'text-blue-600' : 'text-slate-600 dark:text-slate-300'}`}
                  >
                    {l === 'en' ? 'English' : l === 'es' ? 'Español' : 'Français'}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button 
            onClick={onOpenCart}
            className="relative p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors dark:text-white"
          >
            <ShoppingBag className="w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white dark:border-slate-900">
                {cartCount}
              </span>
            )}
          </button>
          <button 
            className="md:hidden p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full dark:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 p-6 flex flex-col gap-4 shadow-xl dark:text-white">
          <button onClick={() => { onNavigate('home'); setMobileMenuOpen(false); }} className="text-left py-2 font-medium">{t.nav.home}</button>
          <button onClick={() => { onNavigate('shop'); setMobileMenuOpen(false); }} className="text-left py-2 font-medium">{t.nav.shop}</button>
          <button className="text-left py-2 font-medium">{t.nav.journal}</button>
          <button className="text-left py-2 font-medium">{t.nav.support}</button>
        </div>
      )}
    </nav>
  );
};

const ProductCard = ({ product, onAddToCart, t }) => {
  return (
    <div className="group bg-white dark:bg-slate-800 rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 border border-slate-100 dark:border-slate-700">
      <div className="relative aspect-square overflow-hidden bg-slate-50 dark:bg-slate-900">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold shadow-sm dark:text-white">
          {product.category}
        </div>
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg text-slate-800 dark:text-slate-100 leading-tight">{product.name}</h3>
          <span className="font-bold text-slate-900 dark:text-blue-400">${product.price.toFixed(2)}</span>
        </div>
        <div className="flex items-center gap-1 mb-4 text-amber-400">
          <Star className="w-4 h-4 fill-current" />
          <span className="text-slate-500 dark:text-slate-400 text-xs font-medium ml-1">{product.rating} ({product.reviews})</span>
        </div>
        <button 
          onClick={() => onAddToCart(product)}
          className="w-full bg-slate-900 dark:bg-blue-600 text-white py-3 rounded-2xl font-semibold flex items-center justify-center gap-2 transition-all active:scale-95 hover:bg-blue-600 dark:hover:bg-blue-500"
        >
          {t.cart.checkout.split(' ')[0]} {/* Simple dynamic text extraction */}
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

const CartDrawer = ({ isOpen, onClose, cart, updateQuantity, removeFromCart, onCheckout, t }) => {
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        <div className="p-6 border-b dark:border-slate-800 flex justify-between items-center dark:text-white">
          <h2 className="text-xl font-bold">{t.cart.title} ({cart.length})</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full"><X /></button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-400">
              <ShoppingBag className="w-16 h-16 mb-4 stroke-1" />
              <p className="text-lg">{t.cart.empty}</p>
              <button onClick={onClose} className="mt-4 text-blue-600 font-semibold">{t.cart.continue}</button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex gap-4">
                <div className="w-24 h-24 bg-slate-50 dark:bg-slate-800 rounded-2xl overflow-hidden shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-slate-800 dark:text-slate-100">{item.name}</h4>
                      <p className="text-sm text-slate-500">${item.price.toFixed(2)}</p>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="text-slate-400 hover:text-red-500 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
                      <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:bg-white dark:hover:bg-slate-700 rounded shadow-sm dark:text-white"><Minus className="w-3 h-3" /></button>
                      <span className="w-8 text-center text-sm font-bold dark:text-white">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:bg-white dark:hover:bg-slate-700 rounded shadow-sm dark:text-white"><Plus className="w-3 h-3" /></button>
                    </div>
                    <span className="ml-auto font-bold text-slate-900 dark:text-blue-400">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-6 border-t dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
            <div className="flex justify-between mb-2 text-slate-500 dark:text-slate-400">
              <span>{t.cart.subtotal}</span>
              <span className="font-semibold dark:text-slate-200">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-6 text-slate-500 dark:text-slate-400">
              <span>{t.cart.shipping}</span>
              <span className="text-green-600 font-medium">{t.cart.free}</span>
            </div>
            <div className="flex justify-between items-end mb-6 dark:text-white">
              <span className="text-lg font-bold">{t.cart.total}</span>
              <span className="text-2xl font-black text-blue-600">${subtotal.toFixed(2)}</span>
            </div>
            <button 
              onClick={onCheckout}
              className="w-full bg-black dark:bg-blue-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-600 transition-all active:scale-95"
            >
              {t.cart.checkout}
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default function App() {
  const [theme, setTheme] = useState('light');
  const [lang, setLang] = useState('en');
  const [view, setView] = useState('home');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [filter, setFilter] = useState('All');
  const [orderStatus, setOrderStatus] = useState(null);

  const t = TRANSLATIONS[lang];

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  // Handlers
  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(p => p.id === product.id);
      if (existing) {
        return prev.map(p => p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id) => setCart(prev => prev.filter(p => p.id !== id));
  const updateQuantity = (id, delta) => setCart(prev => prev.map(p => p.id === id ? { ...p, quantity: Math.max(1, p.quantity + delta) } : p));
  const handleCheckout = () => { setIsCartOpen(false); setView('checkout'); };

  const filteredProducts = useMemo(() => {
    if (filter === 'All' || filter === 'Todos' || filter === 'Tout') return PRODUCTS;
    // Map translated category back to English key for filtering
    const originalFilter = filter === 'Electronics' || filter === 'Electrónica' || filter === 'Électronique' ? 'Electronics' :
                          filter === 'Accessories' || filter === 'Accesorios' ? 'Accessories' :
                          filter === 'Home' || filter === 'Hogar' || filter === 'Maison' ? 'Home' : 'Furniture';
    return PRODUCTS.filter(p => p.category === originalFilter);
  }, [filter, lang]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // --- Views ---

  const HomeView = () => (
    <div className="pt-20 dark:bg-slate-900 transition-colors">
      <section className="relative px-6 pt-20 pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-8 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider">
              <Zap className="w-4 h-4" />
              {t.hero.badge}
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white leading-[1.1]">
              {t.hero.title.split('Gear')[0]}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                {t.hero.title.split(' ').slice(-1)}
              </span>
            </h1>
            <p className="text-xl text-slate-500 dark:text-slate-400 max-w-lg mx-auto md:mx-0">
              {t.hero.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
              <button onClick={() => setView('shop')} className="bg-slate-900 dark:bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-blue-600 transition-all flex items-center gap-2 group">
                {t.hero.cta} <ChevronRight className="w-5 h-5 group-hover:translate-x-1" />
              </button>
              <button className="px-8 py-4 rounded-2xl font-bold text-lg border border-slate-200 dark:border-slate-700 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                {t.hero.learn}
              </button>
            </div>
            <div className="flex items-center gap-8 pt-8 justify-center md:justify-start dark:text-white">
              <div><p className="text-2xl font-bold">12k+</p><p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-widest font-bold">{t.hero.sold}</p></div>
              <div className="w-px h-8 bg-slate-200 dark:bg-slate-700"></div>
              <div><p className="text-2xl font-bold">4.9/5</p><p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-widest font-bold">{t.hero.reviews}</p></div>
              <div className="w-px h-8 bg-slate-200 dark:bg-slate-700"></div>
              <div><p className="text-2xl font-bold">24h</p><p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-widest font-bold">{t.hero.delivery}</p></div>
            </div>
          </div>
          <div className="flex-1 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-blue-100 dark:bg-blue-900/20 rounded-full blur-[120px] opacity-40 -z-10"></div>
            <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=1000" className="w-full drop-shadow-2xl hover:rotate-3 transition-transform" />
          </div>
        </div>
      </section>
    </div>
  );

  const ShopView = () => (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto dark:text-white">
      <div className="mb-12">
        <h1 className="text-5xl font-black mb-8">{t.shop.title}</h1>
        <div className="flex flex-wrap gap-3">
          {t.shop.categories.map(cat => (
            <button key={cat} onClick={() => setFilter(cat)} className={`px-6 py-3 rounded-full font-bold transition-all ${filter === cat ? 'bg-black dark:bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'}`}>
              {cat}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredProducts.map(product => <ProductCard key={product.id} product={product} onAddToCart={addToCart} t={t} />)}
      </div>
    </div>
  );

  const CheckoutView = () => {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    if (orderStatus === 'success') return (
      <div className="pt-40 pb-24 px-6 flex flex-col items-center text-center max-w-xl mx-auto dark:text-white">
        <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full flex items-center justify-center mb-8"><CheckCircle className="w-12 h-12" /></div>
        <h1 className="text-4xl font-black mb-4">{t.checkout.success}</h1>
        <p className="text-slate-500 dark:text-slate-400 text-lg mb-10">{t.checkout.successMsg}</p>
        <button onClick={() => { setView('home'); setCart([]); setOrderStatus(null); }} className="bg-black dark:bg-blue-600 text-white px-10 py-4 rounded-2xl font-bold">{t.cart.continue}</button>
      </div>
    );
    return (
      <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto dark:text-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-12">
            <div>
              <h2 className="text-3xl font-black mb-8 flex items-center gap-3"><span className="w-10 h-10 bg-slate-900 dark:bg-blue-600 text-white rounded-xl flex items-center justify-center text-lg">1</span>{t.checkout.step1}</h2>
              <div className="grid grid-cols-2 gap-4">
                {['First Name', 'Last Name', 'Email Address', 'Street Address', 'City', 'Zip Code'].map(f => (
                  <input key={f} placeholder={f} className={`p-4 bg-slate-100 dark:bg-slate-800 rounded-2xl border-none focus:ring-2 focus:ring-blue-500 ${f.includes('Address') ? 'col-span-2' : ''}`} />
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-black mb-8 flex items-center gap-3"><span className="w-10 h-10 bg-slate-900 dark:bg-blue-600 text-white rounded-xl flex items-center justify-center text-lg">2</span>{t.checkout.step2}</h2>
              <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-3xl space-y-4">
                <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl flex items-center gap-4 border-2 border-blue-500"><div className="w-12 h-8 bg-slate-900 rounded-lg"></div><span className="font-bold">Card</span><CheckCircle className="ml-auto text-blue-600" /></div>
                <input placeholder="Card Number" className="w-full p-4 bg-white dark:bg-slate-800 rounded-2xl border-none" />
              </div>
            </div>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800/50 p-8 rounded-[40px] h-fit sticky top-32">
            <h3 className="text-2xl font-black mb-8">{t.checkout.summary}</h3>
            {cart.map(item => <div key={item.id} className="flex justify-between items-center mb-4"><span className="font-medium">{item.name} x{item.quantity}</span><span className="font-bold">${(item.price * item.quantity).toFixed(2)}</span></div>)}
            <div className="border-t dark:border-slate-700 pt-6 space-y-4">
              <div className="flex justify-between items-end pt-4"><span className="text-xl font-bold">{t.cart.total}</span><span className="text-3xl font-black text-blue-600">${subtotal.toFixed(2)}</span></div>
            </div>
            <button onClick={() => setOrderStatus('success')} className="w-full bg-black dark:bg-blue-600 text-white py-5 rounded-2xl font-black text-xl mt-10 hover:bg-blue-500 transition-all">{t.checkout.complete}</button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}`}>
      <Navbar 
        cartCount={cartCount} 
        onOpenCart={() => setIsCartOpen(true)} 
        onNavigate={setView}
        theme={theme}
        toggleTheme={toggleTheme}
        lang={lang}
        setLang={setLang}
        t={t}
      />
      <main>
        {view === 'home' && <HomeView />}
        {view === 'shop' && <ShopView />}
        {view === 'checkout' && <CheckoutView />}
      </main>
      <footer className="bg-slate-900 dark:bg-black text-white py-20 px-6 mt-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="text-2xl font-black tracking-tight flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center"><Zap className="text-white w-5 h-5" fill="currentColor" /></div>
            <span>APNIDUKAAN</span>
          </div>
          <p className="text-slate-500">© 2024 ApniDukaan Inc.</p>
          <div className="flex gap-8 text-sm font-bold uppercase tracking-widest text-slate-500">
            <span className="hover:text-white cursor-pointer transition-colors">Instagram</span>
            <span className="hover:text-white cursor-pointer transition-colors">Twitter</span>
          </div>
        </div>
      </footer>
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} cart={cart} updateQuantity={updateQuantity} removeFromCart={removeFromCart} onCheckout={handleCheckout} t={t} />
    </div>
  );
}
