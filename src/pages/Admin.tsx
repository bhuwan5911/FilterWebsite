import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { 
  LayoutDashboard, 
  Plus, 
  Trash2, 
  Edit, 
  Camera, 
  Upload, 
  X, 
  Lock, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Sparkles, 
  Check, 
  LogOut, 
  Eye, 
  ArrowLeft,
  Loader2,
  Package,
  Inbox,
  AlertTriangle
} from "lucide-react";
import { API_URL } from "@/lib/api";

interface Product {
  _id: string;
  name: string;
  slug: string;
  category: string;
  categorySlug: string;
  shortDescription: string;
  description: string;
  image: string;
  features: string[];
  specifications: { label: string; value: string }[];
  idealFor: string[];
  technology: string[];
  benefits: string[];
}

interface Enquiry {
  _id: string;
  name: string;
  phone: string;
  city: string;
  email?: string;
  message?: string;
  productSlug?: string;
  createdAt: string;
}

export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [activeTab, setActiveTab] = useState<"overview" | "products" | "enquiries">("overview");
  
  // Data States
  const [products, setProducts] = useState<Product[]>([]);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);

  // Product Form State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  
  const [prodName, setProdName] = useState("");
  const [prodCategory, setProdCategory] = useState("RO Water Purifiers");
  const [prodShortDesc, setProdShortDesc] = useState("");
  const [prodDesc, setProdDesc] = useState("");
  const [prodImage, setProdImage] = useState("");
  
  // Dynamic Lists for Form
  const [prodFeatures, setProdFeatures] = useState<string[]>([]);
  const [newFeature, setNewFeature] = useState("");
  
  const [prodSpecs, setProdSpecs] = useState<{ label: string; value: string }[]>([]);
  const [newSpecLabel, setNewSpecLabel] = useState("");
  const [newSpecValue, setNewSpecValue] = useState("");

  const [prodIdealFor, setProdIdealFor] = useState<string[]>([]);
  const [newIdeal, setNewIdeal] = useState("");

  const [prodTech, setProdTech] = useState<string[]>([]);
  const [newTech, setNewTech] = useState("");

  const [prodBenefits, setProdBenefits] = useState<string[]>([]);
  const [newBenefit, setNewBenefit] = useState("");

  // Upload States
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imageError, setImageError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  // Enquiry Details Modal
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);

  // Check login state on mount
  useEffect(() => {
    const token = sessionStorage.getItem("adminToken");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const [dbError, setDbError] = useState<string | null>(null);

  // Fetch dashboard data
  const fetchData = async () => {
    try {
      setLoading(true);
      setDbError(null);

      const token = sessionStorage.getItem("adminToken");
      const authHeaders = token ? { "Authorization": `Bearer ${token}` } : {};

      const resProds = await fetch(`${API_URL}/api/products`);
      if (!resProds.ok) {
        const errData = await resProds.json().catch(() => ({}));
        throw new Error(errData.message || `HTTP ${resProds.status}`);
      }
      const dataProds = await resProds.json();
      if (Array.isArray(dataProds)) {
        setProducts(dataProds);
      } else {
        throw new Error("Invalid products response format");
      }

      const resEnqs = await fetch(`${API_URL}/api/enquiries`, {
        headers: authHeaders
      });
      if (!resEnqs.ok) {
        if (resEnqs.status === 401 || resEnqs.status === 403) {
          sessionStorage.removeItem("adminToken");
          setIsLoggedIn(false);
          return;
        }
        const errData = await resEnqs.json().catch(() => ({}));
        throw new Error(errData.message || `HTTP ${resEnqs.status}`);
      }
      const dataEnqs = await resEnqs.json();
      if (Array.isArray(dataEnqs)) {
        setEnquiries(dataEnqs);
      } else {
        throw new Error("Invalid enquiries response format");
      }
    } catch (error: any) {
      console.error("Error fetching admin data:", error);
      setDbError(error.message || "Failed to connect to server");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchData();
    }
  }, [isLoggedIn]);

  // Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || "Invalid username or password");
      }

      const data = await res.json();
      sessionStorage.setItem("adminToken", data.token);
      setIsLoggedIn(true);
      setLoginError("");
    } catch (err: any) {
      setLoginError(err.message || "Invalid username or password");
    }
  };

  // Handle Logout
  const handleLogout = () => {
    sessionStorage.removeItem("adminToken");
    setIsLoggedIn(false);
  };

  // Open Form for Adding
  const openAddForm = () => {
    setEditingProduct(null);
    setProdName("");
    setProdCategory("RO Water Purifiers");
    setProdShortDesc("");
    setProdDesc("");
    setProdImage("");
    setProdFeatures([]);
    setProdSpecs([]);
    setProdIdealFor([]);
    setProdTech([]);
    setProdBenefits([]);
    setImageError("");
    setIsFormOpen(true);
  };

  // Open Form for Editing
  const openEditForm = (prod: Product) => {
    setEditingProduct(prod);
    setProdName(prod.name);
    setProdCategory(prod.category);
    setProdShortDesc(prod.shortDescription);
    setProdDesc(prod.description);
    setProdImage(prod.image);
    setProdFeatures(prod.features || []);
    setProdSpecs(prod.specifications || []);
    setProdIdealFor(prod.idealFor || []);
    setProdTech(prod.technology || []);
    setProdBenefits(prod.benefits || []);
    setImageError("");
    setIsFormOpen(true);
  };

  // Handle Image Selection and Upload
  const handleImageFile = async (file: File) => {
    setImageError("");
    
    // Size check: 10MB limit
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      const sizeInMB = (file.size / (1024 * 1024)).toFixed(2);
      setImageError(`Image size is too large (${sizeInMB}MB). Maximum allowed is 10MB.`);
      return;
    }

    try {
      setUploadingImage(true);
      const formData = new FormData();
      formData.append("image", file);

      const token = sessionStorage.getItem("adminToken");

      const res = await fetch(`${API_URL}/api/upload`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`
        },
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Failed to upload image");
      }

      const data = await res.json();
      // Prepend API_URL only if it's a local relative path, otherwise use absolute Cloudinary URL directly
      const url = data.imageUrl.startsWith("http") ? data.imageUrl : `${API_URL}${data.imageUrl}`;
      setProdImage(url);
    } catch (err: any) {
      setImageError(err.message || "Error uploading image");
    } finally {
      setUploadingImage(false);
    }
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleImageFile(files[0]);
    }
  };

  // Dynamic Lists Handlers
  const addFeature = () => {
    if (newFeature.trim()) {
      setProdFeatures([...prodFeatures, newFeature.trim()]);
      setNewFeature("");
    }
  };

  const removeFeature = (idx: number) => {
    setProdFeatures(prodFeatures.filter((_, i) => i !== idx));
  };

  const addSpec = () => {
    if (newSpecLabel.trim() && newSpecValue.trim()) {
      setProdSpecs([...prodSpecs, { label: newSpecLabel.trim(), value: newSpecValue.trim() }]);
      setNewSpecLabel("");
      setNewSpecValue("");
    }
  };

  const removeSpec = (idx: number) => {
    setProdSpecs(prodSpecs.filter((_, i) => i !== idx));
  };

  const addIdeal = () => {
    if (newIdeal.trim()) {
      setProdIdealFor([...prodIdealFor, newIdeal.trim()]);
      setNewIdeal("");
    }
  };

  const removeIdeal = (idx: number) => {
    setProdIdealFor(prodIdealFor.filter((_, i) => i !== idx));
  };

  const addTech = () => {
    if (newTech.trim()) {
      setProdTech([...prodTech, newTech.trim()]);
      setNewTech("");
    }
  };

  const removeTech = (idx: number) => {
    setProdTech(prodTech.filter((_, i) => i !== idx));
  };

  const addBenefit = () => {
    if (newBenefit.trim()) {
      setProdBenefits([...prodBenefits, newBenefit.trim()]);
      setNewBenefit("");
    }
  };

  const removeBenefit = (idx: number) => {
    setProdBenefits(prodBenefits.filter((_, i) => i !== idx));
  };

  // Submit Product Form (Create / Edit)
  const handleSubmitProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodName.trim()) return;

    const payload = {
      name: prodName,
      category: prodCategory,
      shortDescription: prodShortDesc,
      description: prodDesc,
      image: prodImage || "/placeholder.svg",
      features: prodFeatures,
      specifications: prodSpecs,
      idealFor: prodIdealFor,
      technology: prodTech,
      benefits: prodBenefits,
    };

    try {
      const url = editingProduct 
        ? `${API_URL}/api/products/${editingProduct._id}`
        : `${API_URL}/api/products`;
      
      const method = editingProduct ? "PUT" : "POST";
      const token = sessionStorage.getItem("adminToken");

      const res = await fetch(url, {
        method,
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Error saving product");

      setIsFormOpen(false);
      fetchData();
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  // Delete Product
  const handleDeleteProduct = async (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        const token = sessionStorage.getItem("adminToken");
        const res = await fetch(`${API_URL}/api/products/${id}`, {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        if (!res.ok) throw new Error("Failed to delete");
        fetchData();
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-muted flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-card rounded-3xl p-8 shadow-elevated border border-border">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl water-gradient mx-auto flex items-center justify-center mb-4">
              <Lock className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="font-display text-2xl font-bold text-foreground">Admin Portal</h1>
            <p className="text-muted-foreground text-sm mt-1">Please sign in to manage PureDrop</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Username</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-muted-foreground">
                  <User className="h-5 w-5" />
                </span>
                <input 
                  type="text" 
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" 
                  placeholder="admin" 
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Password</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-muted-foreground">
                  <Lock className="h-5 w-5" />
                </span>
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" 
                  placeholder="••••••••" 
                />
              </div>
            </div>

            {loginError && (
              <p className="text-destructive text-sm font-medium text-center">{loginError}</p>
            )}

            <button 
              type="submit" 
              className="w-full py-3 rounded-xl water-gradient text-primary-foreground font-semibold shadow-water hover:shadow-water-lg transition-all"
            >
              Sign In
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <Link to="/" className="text-sm text-primary hover:underline inline-flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" /> Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30 flex flex-col">
      {/* Top Header */}
      <header className="bg-card border-b border-border sticky top-0 z-40 px-6 py-4 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/" className="font-display font-bold text-xl text-primary flex items-center gap-2">
            <Sparkles className="h-6 w-6" /> PureDrop Admin
          </Link>
        </div>
        
        <div className="flex items-center gap-4">
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" /> View Site
          </Link>
          <button 
            onClick={handleLogout}
            className="p-2 rounded-xl bg-muted hover:bg-destructive/10 hover:text-destructive text-muted-foreground transition-all duration-200"
            title="Log Out"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </header>

      {/* Main Admin Panel Container */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Navigation Sidebar */}
        <aside className="w-full lg:w-64 bg-card border-r border-border p-4 flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible">
          <button 
            onClick={() => setActiveTab("overview")}
            className={`flex-1 lg:flex-none flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
              activeTab === "overview" 
                ? "bg-primary/10 text-primary" 
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <LayoutDashboard className="h-5 w-5" /> Overview
          </button>
          
          <button 
            onClick={() => setActiveTab("products")}
            className={`flex-1 lg:flex-none flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
              activeTab === "products" 
                ? "bg-primary/10 text-primary" 
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <Package className="h-5 w-5" /> Products ({products.length})
          </button>
          
          <button 
            onClick={() => setActiveTab("enquiries")}
            className={`flex-1 lg:flex-none flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
              activeTab === "enquiries" 
                ? "bg-primary/10 text-primary" 
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <Inbox className="h-5 w-5" /> Enquiries ({enquiries.length})
          </button>
        </aside>

        {/* Dynamic Content Panel */}
        <main className="flex-1 p-6">
          {loading ? (
            <div className="h-64 flex items-center justify-center">
              <Loader2 className="h-10 w-10 animate-spin text-primary" />
            </div>
          ) : (
            <>
              {dbError && (
                <div className="bg-destructive/10 border border-destructive/20 text-destructive p-4 rounded-2xl mb-6 flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground">Database Connection Error</p>
                    <p className="text-sm opacity-90">{dbError}</p>
                    <p className="text-xs mt-2 opacity-75">
                      To fix this, go to your MongoDB Atlas dashboard and add your current IP address to the Network Access whitelist.
                    </p>
                  </div>
                </div>
              )}
              {/* Overview Panel */}
              {activeTab === "overview" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-foreground font-display">Dashboard Overview</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-card p-6 rounded-3xl border border-border shadow-card flex items-center gap-5">
                      <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                        <Package className="h-7 w-7" />
                      </div>
                      <div>
                        <p className="text-muted-foreground text-sm">Total Products</p>
                        <h3 className="text-3xl font-bold text-foreground">{products.length}</h3>
                      </div>
                    </div>
                    
                    <div className="bg-card p-6 rounded-3xl border border-border shadow-card flex items-center gap-5">
                      <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center text-accent">
                        <Inbox className="h-7 w-7" />
                      </div>
                      <div>
                        <p className="text-muted-foreground text-sm">Recent Enquiries</p>
                        <h3 className="text-3xl font-bold text-foreground">{enquiries.length}</h3>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card rounded-3xl border border-border p-6 shadow-card">
                    <h3 className="text-lg font-bold text-foreground mb-4">Recent Client Enquiries</h3>
                    {enquiries.length === 0 ? (
                      <p className="text-muted-foreground text-sm">No enquiries submitted yet.</p>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm border-collapse">
                          <thead>
                            <tr className="border-b border-border text-muted-foreground">
                              <th className="py-3 px-4">Name</th>
                              <th className="py-3 px-4">Phone</th>
                              <th className="py-3 px-4">City</th>
                              <th className="py-3 px-4">Date</th>
                              <th className="py-3 px-4 text-right">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {enquiries.slice(0, 5).map((enq) => (
                              <tr key={enq._id} className="border-b border-border/50 hover:bg-muted/30">
                                <td className="py-3 px-4 font-semibold text-foreground">{enq.name}</td>
                                <td className="py-3 px-4 text-muted-foreground">{enq.phone}</td>
                                <td className="py-3 px-4 text-muted-foreground">{enq.city}</td>
                                <td className="py-3 px-4 text-muted-foreground">
                                  {new Date(enq.createdAt).toLocaleDateString()}
                                </td>
                                <td className="py-3 px-4 text-right">
                                  <button 
                                    onClick={() => setSelectedEnquiry(enq)}
                                    className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-all"
                                  >
                                    <Eye className="h-4 w-4" />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Products Panel */}
              {activeTab === "products" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-foreground font-display">Manage Products</h2>
                    <button 
                      onClick={openAddForm}
                      className="px-4 py-2.5 rounded-xl water-gradient text-primary-foreground font-semibold shadow-water inline-flex items-center gap-2"
                    >
                      <Plus className="h-4 w-4" /> Add Product
                    </button>
                  </div>

                  <div className="bg-card rounded-3xl border border-border overflow-hidden shadow-card">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-sm border-collapse">
                        <thead>
                          <tr className="border-b border-border bg-muted/30 text-muted-foreground font-medium">
                            <th className="py-4 px-6">Image</th>
                            <th className="py-4 px-6">Name</th>
                            <th className="py-4 px-6">Category</th>
                            <th className="py-4 px-6">Short Description</th>
                            <th className="py-4 px-6 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {products.map((prod) => (
                            <tr key={prod._id} className="border-b border-border/50 hover:bg-muted/10">
                              <td className="py-4 px-6">
                                <img 
                                  src={prod.image.startsWith("/") ? `${API_URL}${prod.image}` : prod.image} 
                                  alt={prod.name} 
                                  className="w-12 h-12 rounded-xl object-cover border border-border"
                                  onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.svg"; }}
                                />
                              </td>
                              <td className="py-4 px-6 font-semibold text-foreground">{prod.name}</td>
                              <td className="py-4 px-6">
                                <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                                  {prod.category}
                                </span>
                              </td>
                              <td className="py-4 px-6 text-muted-foreground max-w-xs truncate">{prod.shortDescription}</td>
                              <td className="py-4 px-6 text-right flex items-center justify-end gap-2 h-20">
                                <button 
                                  onClick={() => openEditForm(prod)}
                                  className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-all"
                                  title="Edit"
                                >
                                  <Edit className="h-4 w-4" />
                                </button>
                                <button 
                                  onClick={() => handleDeleteProduct(prod._id)}
                                  className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-all"
                                  title="Delete"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* Enquiries Panel */}
              {activeTab === "enquiries" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-foreground font-display">Client Enquiries</h2>
                  
                  <div className="bg-card rounded-3xl border border-border overflow-hidden shadow-card">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-sm border-collapse">
                        <thead>
                          <tr className="border-b border-border bg-muted/30 text-muted-foreground font-medium">
                            <th className="py-4 px-6">Name</th>
                            <th className="py-4 px-6">Phone</th>
                            <th className="py-4 px-6">City</th>
                            <th className="py-4 px-6">Email</th>
                            <th className="py-4 px-6">Date</th>
                            <th className="py-4 px-6 text-right">Details</th>
                          </tr>
                        </thead>
                        <tbody>
                          {enquiries.map((enq) => (
                            <tr key={enq._id} className="border-b border-border/50 hover:bg-muted/10">
                              <td className="py-4 px-6 font-semibold text-foreground">{enq.name}</td>
                              <td className="py-4 px-6 text-muted-foreground">{enq.phone}</td>
                              <td className="py-4 px-6 text-muted-foreground">{enq.city}</td>
                              <td className="py-4 px-6 text-muted-foreground">{enq.email || "N/A"}</td>
                              <td className="py-4 px-6 text-muted-foreground">
                                {new Date(enq.createdAt).toLocaleString()}
                              </td>
                              <td className="py-4 px-6 text-right">
                                <button 
                                  onClick={() => setSelectedEnquiry(enq)}
                                  className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 text-xs font-semibold transition-all"
                                >
                                  View
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </main>
      </div>

      {/* Product Add/Edit Modal Form */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-card rounded-3xl border border-border w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-elevated flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border sticky top-0 bg-card z-10">
              <h3 className="font-display text-xl font-bold text-foreground">
                {editingProduct ? "Edit Product" : "Add New Product"}
              </h3>
              <button onClick={() => setIsFormOpen(false)} className="p-2 hover:bg-muted rounded-full text-muted-foreground hover:text-foreground">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitProduct} className="p-6 space-y-6 flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Fields */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Product Name *</label>
                    <input 
                      type="text" 
                      required
                      value={prodName}
                      onChange={(e) => setProdName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-sm"
                      placeholder="e.g. PureDrop Pro Water"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Category *</label>
                    <select
                      value={prodCategory}
                      onChange={(e) => setProdCategory(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-sm"
                    >
                      <option value="RO Water Purifiers">RO Water Purifiers</option>
                      <option value="UV Water Purifiers">UV Water Purifiers</option>
                      <option value="Gravity Filters">Gravity Filters</option>
                      <option value="Whole House Filters">Whole House Filters</option>
                      <option value="Commercial Systems">Commercial Systems</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Short Description *</label>
                    <input 
                      type="text" 
                      required
                      value={prodShortDesc}
                      onChange={(e) => setProdShortDesc(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-sm"
                      placeholder="Short catchphrase or summary..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Full Description *</label>
                    <textarea 
                      required
                      rows={5}
                      value={prodDesc}
                      onChange={(e) => setProdDesc(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none text-sm"
                      placeholder="Detailed features, design, purification explanation..."
                    />
                  </div>
                </div>

                {/* Right Fields / Media Capture */}
                <div className="space-y-4">
                  {/* Image Picker with Phone Camera support */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Product Image (Max 10MB)</label>
                    
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      {/* Mobile phone camera upload option */}
                      <button
                        type="button"
                        onClick={() => cameraInputRef.current?.click()}
                        className="py-3 px-4 rounded-xl bg-primary/10 text-primary hover:bg-primary/20 text-xs font-semibold transition-all flex items-center justify-center gap-2 border border-primary/20"
                      >
                        <Camera className="h-4 w-4" /> Click Picture (Phone)
                      </button>
                      
                      {/* Regular file upload option */}
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="py-3 px-4 rounded-xl bg-accent/10 text-accent hover:bg-accent/20 text-xs font-semibold transition-all flex items-center justify-center gap-2 border border-accent/20"
                      >
                        <Upload className="h-4 w-4" /> Choose File
                      </button>
                    </div>

                    {/* Hidden inputs */}
                    <input 
                      type="file" 
                      accept="image/*" 
                      capture="environment" 
                      ref={cameraInputRef} 
                      className="hidden" 
                      onChange={onFileChange}
                    />
                    <input 
                      type="file" 
                      accept="image/*" 
                      ref={fileInputRef} 
                      className="hidden" 
                      onChange={onFileChange}
                    />

                    {imageError && (
                      <p className="text-destructive text-xs font-semibold mt-1 mb-2">{imageError}</p>
                    )}

                    {uploadingImage ? (
                      <div className="h-40 bg-muted rounded-2xl flex flex-col items-center justify-center text-muted-foreground border border-dashed border-border">
                        <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
                        <span className="text-xs">Uploading Image...</span>
                      </div>
                    ) : (
                      <div className="relative h-40 bg-muted rounded-2xl border border-dashed border-border overflow-hidden flex items-center justify-center">
                        {prodImage ? (
                          <>
                            <img src={prodImage} alt="Preview" className="w-full h-full object-cover" />
                            <button 
                              type="button" 
                              onClick={() => setProdImage("")}
                              className="absolute top-2 right-2 p-1.5 bg-black/70 hover:bg-black text-white rounded-full transition-all"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </>
                        ) : (
                          <span className="text-muted-foreground text-xs">No image uploaded</span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Specifications (Key-Value) */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Specifications</label>
                    <div className="flex gap-2 mb-2">
                      <input 
                        type="text" 
                        value={newSpecLabel} 
                        onChange={(e) => setNewSpecLabel(e.target.value)}
                        placeholder="Label (e.g. Capacity)"
                        className="flex-1 px-3 py-1.5 rounded-lg border border-border bg-background text-sm text-foreground outline-none"
                      />
                      <input 
                        type="text" 
                        value={newSpecValue} 
                        onChange={(e) => setNewSpecValue(e.target.value)}
                        placeholder="Value (e.g. 12L)"
                        className="flex-1 px-3 py-1.5 rounded-lg border border-border bg-background text-sm text-foreground outline-none"
                      />
                      <button 
                        type="button" 
                        onClick={addSpec}
                        className="p-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2 max-h-24 overflow-y-auto p-1 bg-muted/30 rounded-lg border border-border">
                      {prodSpecs.map((spec, i) => (
                        <span key={i} className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-card rounded-md border border-border text-xs font-medium">
                          {spec.label}: {spec.value}
                          <button type="button" onClick={() => removeSpec(i)} className="text-muted-foreground hover:text-destructive">
                            <X className="h-3 w-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Dynamic Tag Lists */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-4 border-t border-border">
                {/* Features */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Key Features</label>
                  <div className="flex gap-2 mb-2">
                    <input 
                      type="text" 
                      value={newFeature} 
                      onChange={(e) => setNewFeature(e.target.value)}
                      placeholder="Add key feature..."
                      className="flex-1 px-3 py-1.5 rounded-lg border border-border bg-background text-sm text-foreground outline-none"
                    />
                    <button type="button" onClick={addFeature} className="p-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90">
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5 max-h-28 overflow-y-auto p-2 bg-muted/30 rounded-xl border border-border">
                    {prodFeatures.map((item, i) => (
                      <span key={i} className="inline-flex items-center gap-1 px-2 py-0.5 bg-card rounded-md border border-border text-xs">
                        {item}
                        <button type="button" onClick={() => removeFeature(i)} className="text-muted-foreground hover:text-destructive">
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Technology */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Technology</label>
                  <div className="flex gap-2 mb-2">
                    <input 
                      type="text" 
                      value={newTech} 
                      onChange={(e) => setNewTech(e.target.value)}
                      placeholder="e.g. RO, UV-C..."
                      className="flex-1 px-3 py-1.5 rounded-lg border border-border bg-background text-sm text-foreground outline-none"
                    />
                    <button type="button" onClick={addTech} className="p-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90">
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5 max-h-28 overflow-y-auto p-2 bg-muted/30 rounded-xl border border-border">
                    {prodTech.map((item, i) => (
                      <span key={i} className="inline-flex items-center gap-1 px-2 py-0.5 bg-card rounded-md border border-border text-xs">
                        {item}
                        <button type="button" onClick={() => removeTech(i)} className="text-muted-foreground hover:text-destructive">
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Ideal For */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Ideal For</label>
                  <div className="flex gap-2 mb-2">
                    <input 
                      type="text" 
                      value={newIdeal} 
                      onChange={(e) => setNewIdeal(e.target.value)}
                      placeholder="e.g. Home, Office..."
                      className="flex-1 px-3 py-1.5 rounded-lg border border-border bg-background text-sm text-foreground outline-none"
                    />
                    <button type="button" onClick={addIdeal} className="p-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90">
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5 max-h-28 overflow-y-auto p-2 bg-muted/30 rounded-xl border border-border">
                    {prodIdealFor.map((item, i) => (
                      <span key={i} className="inline-flex items-center gap-1 px-2 py-0.5 bg-card rounded-md border border-border text-xs">
                        {item}
                        <button type="button" onClick={() => removeIdeal(i)} className="text-muted-foreground hover:text-destructive">
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Benefits */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Benefits</label>
                  <div className="flex gap-2 mb-2">
                    <input 
                      type="text" 
                      value={newBenefit} 
                      onChange={(e) => setNewBenefit(e.target.value)}
                      placeholder="Add benefit..."
                      className="flex-1 px-3 py-1.5 rounded-lg border border-border bg-background text-sm text-foreground outline-none"
                    />
                    <button type="button" onClick={addBenefit} className="p-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90">
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5 max-h-28 overflow-y-auto p-2 bg-muted/30 rounded-xl border border-border">
                    {prodBenefits.map((item, i) => (
                      <span key={i} className="inline-flex items-center gap-1 px-2 py-0.5 bg-card rounded-md border border-border text-xs">
                        {item}
                        <button type="button" onClick={() => removeBenefit(i)} className="text-muted-foreground hover:text-destructive">
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex justify-end gap-3 pt-6 border-t border-border">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-muted hover:bg-muted/80 text-foreground font-semibold text-sm transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl water-gradient text-primary-foreground font-semibold text-sm shadow-water hover:shadow-water-lg transition-all"
                >
                  {editingProduct ? "Save Changes" : "Create Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Enquiry detail modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-3xl border border-border w-full max-w-lg shadow-elevated p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h3 className="font-display text-lg font-bold text-foreground">Enquiry Details</h3>
              <button 
                onClick={() => setSelectedEnquiry(null)}
                className="p-1.5 hover:bg-muted rounded-full text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <User className="h-4 w-4 text-primary" />
                <span className="font-semibold text-foreground">{selectedEnquiry.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-primary" />
                <a href={`tel:${selectedEnquiry.phone}`} className="text-primary hover:underline">{selectedEnquiry.phone}</a>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">{selectedEnquiry.city}</span>
              </div>
              {selectedEnquiry.email && (
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-primary" />
                  <a href={`mailto:${selectedEnquiry.email}`} className="text-primary hover:underline">{selectedEnquiry.email}</a>
                </div>
              )}
              {selectedEnquiry.productSlug && (
                <div className="bg-muted px-3 py-1.5 rounded-lg inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Package className="h-3.5 w-3.5" />
                  Product: <span className="font-bold text-foreground">{selectedEnquiry.productSlug}</span>
                </div>
              )}
              <div className="pt-2">
                <p className="font-semibold text-foreground mb-1">Message:</p>
                <div className="p-3 bg-muted rounded-xl text-muted-foreground whitespace-pre-wrap leading-relaxed max-h-40 overflow-y-auto">
                  {selectedEnquiry.message || "No message provided."}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
