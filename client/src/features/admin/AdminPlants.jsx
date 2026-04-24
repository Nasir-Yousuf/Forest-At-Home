import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectToken } from "../auth/authSlice";
import { Loader2, Trash2, Edit2, Search, Filter } from "lucide-react";

export default function AdminPlants({ onEdit }) {
  const [plants, setPlants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const token = useSelector(selectToken);

  const fetchPlants = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/plants");
      const data = await res.json();
      if (res.ok) {
        setPlants(data.plants);
      } else {
        setErrorMsg(data.message || "Failed to load plants");
      }
    } catch (err) {
      setErrorMsg("Error connecting to server.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPlants();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this plant specimen from the collection?")) return;

    try {
      const res = await fetch(`/api/plants/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setSuccessMsg("Plant removed from collection.");
        setPlants(plants.filter((p) => p._id !== id));
        setTimeout(() => setSuccessMsg(""), 3000);
      } else {
        const data = await res.json();
        setErrorMsg(data.message || "Failed to delete plant");
        setTimeout(() => setErrorMsg(""), 3000);
      }
    } catch (err) {
      setErrorMsg("Error connecting to server.");
      setTimeout(() => setErrorMsg(""), 3000);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="animate-spin text-[#1a3c28]" size={32} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-serif text-[#1a3c28]">Collection Inventory</h2>
        <div className="flex gap-2 text-xs font-bold text-[#1a3c28]/60 uppercase tracking-widest">
           Total Specimens: <span className="text-[#1a3c28]">{plants.length}</span>
        </div>
      </div>

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

      {plants.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl border border-dashed border-[#1a3c28]/20 text-center">
          <p className="text-[#4a6053]">The collection is currently empty.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f4f7f5] border-b border-gray-100">
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[#1a3c28]/60">Specimen</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[#1a3c28]/60">Scientific Name</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[#1a3c28]/60">Category</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[#1a3c28]/60">Price</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[#1a3c28]/60">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {plants.map((plant) => (
                <tr key={plant._id} className="hover:bg-[#f9faf9] transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img 
                        src={plant.image} 
                        alt={plant.name} 
                        className="w-10 h-10 rounded-lg object-cover bg-[#f4f7f5]" 
                      />
                      <span className="font-bold text-sm text-[#1a3c28]">{plant.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs font-medium italic text-[#4a6053]">{plant.scientificName || "N/A"}</td>
                  <td className="px-6 py-4 text-xs font-medium text-[#4a6053] uppercase tracking-wider">{plant.category}</td>
                  <td className="px-6 py-4 text-sm font-bold text-[#1a3c28]">
                    {plant.isFree ? "FREE" : `৳${plant.price}`}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => onEdit(plant)}
                        className="p-2 text-[#1a3c28]/60 hover:text-[#1a3c28] hover:bg-[#eef2ef] rounded-lg transition-all"
                        title="Edit Specimen"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(plant._id)}
                        className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                        title="Delete Specimen"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
