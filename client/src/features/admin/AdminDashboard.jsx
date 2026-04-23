import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectToken, selectUser } from "../auth/authSlice";
import { useNavigate, Navigate } from "react-router-dom";
import { Loader2, PlusCircle, Package } from "lucide-react";
import AdminOrders from "./AdminOrders";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("plants"); // "plants" | "orders"
  const token = useSelector(selectToken);
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const [form, setForm] = useState({
    name: "",
    scientificName: "",
    price: "",
    isFree: false,
    description: "",
    image: "",
    category: "indoor",
    stock: "100",
    careLevel: "easy",
  });

  if (!user || user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);
    setIsUploading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        setForm((prev) => ({ ...prev, image: data.image }));
      } else {
        setErrorMsg(data.message || "Failed to upload image");
      }
    } catch (error) {
      setErrorMsg("Failed to upload image. Make sure server is running.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const res = await fetch("/api/plants", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...form,
          price: Number(form.price) || 0,
          stock: Number(form.stock) || 0,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccessMsg("Plant added successfully!");
        setForm({
          name: "",
          scientificName: "",
          price: "",
          isFree: false,
          description: "",
          image: "",
          category: "indoor",
          stock: "100",
          careLevel: "easy",
        });
      } else {
        setErrorMsg(data.message || "Failed to add plant");
      }
    } catch (err) {
      setErrorMsg("Error connecting to server.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAF9] pt-32 pb-24 px-4 font-sans text-[#1a3c28]">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-serif mb-8 text-[#1a3c28]">Admin Dashboard</h1>
        
        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-[#1a3c28]/10 pb-4">
          <button
            onClick={() => setActiveTab("plants")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
              activeTab === "plants"
                ? "bg-[#1a3c28] text-white"
                : "bg-transparent text-[#1a3c28]/60 hover:bg-[#eef2ef]"
            }`}
          >
            <PlusCircle size={18} /> Add Plant
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
              activeTab === "orders"
                ? "bg-[#1a3c28] text-white"
                : "bg-transparent text-[#1a3c28]/60 hover:bg-[#eef2ef]"
            }`}
          >
            <Package size={18} /> View Orders
          </button>
        </div>

        {activeTab === "plants" && (
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 max-w-2xl">
            <h2 className="text-xl font-serif mb-2 text-[#1a3c28]">New Collection Specimen</h2>
            <p className="text-sm text-[#4a6053] mb-8">Add a new plant to the collection.</p>

        {successMsg && (
          <div className="bg-green-50 text-green-700 p-4 rounded-xl mb-6 text-sm font-medium">
            {successMsg}
          </div>
        )}
        {errorMsg && (
          <div className="bg-red-50 text-red-700 p-4 rounded-xl mb-6 text-sm font-medium">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest mb-2">Plant Name</label>
              <input required type="text" name="name" value={form.name} onChange={handleChange} className="w-full bg-[#f4f7f5] p-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#1a3c28]/20" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest mb-2">Scientific Name</label>
              <input type="text" name="scientificName" value={form.scientificName} onChange={handleChange} className="w-full bg-[#f4f7f5] p-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#1a3c28]/20" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest mb-2">Price (৳)</label>
              <input type="number" name="price" disabled={form.isFree} value={form.price} onChange={handleChange} className="w-full bg-[#f4f7f5] p-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#1a3c28]/20 disabled:opacity-50" />
            </div>
            <div className="flex items-center mt-6">
              <label className="flex items-center cursor-pointer gap-2">
                <input type="checkbox" name="isFree" checked={form.isFree} onChange={handleChange} className="w-5 h-5 rounded text-[#1a3c28] focus:ring-[#1a3c28]" />
                <span className="text-sm font-bold uppercase tracking-widest">Mark as Free</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest mb-2">Image</label>
            <div className="flex flex-col gap-3">
              <input 
                type="text" 
                name="image" 
                value={form.image} 
                onChange={handleChange} 
                placeholder="Enter image URL or upload a file below" 
                className="w-full bg-[#f4f7f5] p-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#1a3c28]/20" 
                required 
              />
              <div className="relative">
                <input 
                  type="file" 
                  onChange={uploadFileHandler} 
                  accept="image/*"
                  className="block w-full text-sm text-[#4a6053] file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-[#d4ebd9] file:text-[#1a3c28] hover:file:bg-[#c2ebd3] transition-colors cursor-pointer" 
                />
                {isUploading && (
                  <div className="absolute right-3 top-2.5">
                    <Loader2 className="animate-spin text-[#1a3c28]" size={18} />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest mb-2">Description</label>
            <textarea required name="description" value={form.description} onChange={handleChange} rows="3" className="w-full bg-[#f4f7f5] p-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#1a3c28]/20" />
          </div>

          <button type="submit" disabled={isLoading} className="w-full bg-[#1a3c28] text-white py-4 rounded-xl font-medium hover:bg-[#112d20] transition flex items-center justify-center gap-2">
            {isLoading ? <Loader2 className="animate-spin" size={18} /> : "Add Plant to Collection"}
          </button>
        </form>
          </div>
        )}

        {activeTab === "orders" && <AdminOrders />}
      </div>
    </div>
  );
}
