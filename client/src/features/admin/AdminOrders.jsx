import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectToken } from "../auth/authSlice";
import { Loader2, Package, Check, X } from "lucide-react";

export default function AdminOrders() {
  const token = useSelector(selectToken);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    fetchOrders();
  }, [token]);

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setOrders(data.orders);
      } else {
        setErrorMsg(data.message || "Failed to fetch orders");
      }
    } catch (err) {
      setErrorMsg("Error connecting to server");
    } finally {
      setIsLoading(false);
    }
  };

  const updateOrderStatus = async (id, status) => {
    try {
      const res = await fetch(`/api/orders/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        setOrders((prev) =>
          prev.map((o) => (o._id === id ? { ...o, status } : o))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="animate-spin text-[#1a3c28]" size={32} />
      </div>
    );
  }

  if (errorMsg) {
    return (
      <div className="bg-red-50 text-red-700 p-4 rounded-xl text-sm font-medium text-center">
        {errorMsg}
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-12 text-[#4a6053]">
        <Package size={48} className="mx-auto mb-4 opacity-50" />
        <p>No orders placed yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {orders.map((order) => (
        <div
          key={order._id}
          className="bg-white border border-[#1a3c28]/10 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row gap-6"
        >
          <div className="flex-1 space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs text-[#4a6053] font-mono mb-1">
                  Order #{order._id}
                </p>
                <h3 className="font-bold text-[#1a3c28]">
                  {order.shippingAddress.fullName}
                </h3>
              </div>
              <span
                className={`text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full ${
                  order.status === "pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : order.status === "shipped"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-green-100 text-green-800"
                }`}
              >
                {order.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs text-[#4a6053]">
              <div>
                <p className="font-bold uppercase tracking-widest mb-1 text-[#1a3c28]/60 text-[9px]">
                  Shipping To
                </p>
                <p>{order.shippingAddress.address}</p>
                <p>
                  {order.shippingAddress.city}, {order.shippingAddress.zip}
                </p>
                <p>{order.shippingAddress.country}</p>
                {order.shippingAddress.gps && (
                  <div className="mt-2 pt-2 border-t border-[#1a3c28]/5">
                    <p className="font-bold text-[8px] uppercase tracking-widest text-[#1a3c28]/40 mb-1">GPS Location</p>
                    <p className="font-mono text-[10px] mb-1">{order.shippingAddress.gps}</p>
                    <a 
                      href={`https://www.google.com/maps/search/?api=1&query=${order.shippingAddress.gps.replace(/\s/g, '')}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[#1a3c28] hover:underline flex items-center gap-1 font-bold"
                    >
                      <MapPin size={10} /> View on Map
                    </a>
                  </div>
                )}
              </div>
              <div>
                <p className="font-bold uppercase tracking-widest mb-1 text-[#1a3c28]/60 text-[9px]">
                  Payment
                </p>
                <p className="capitalize">{order.paymentMethod}</p>
                <p className="font-bold text-[#1a3c28] mt-1">
                  ৳{order.totalAmount.toFixed(2)}
                </p>
              </div>
            </div>

            <div>
              <p className="font-bold uppercase tracking-widest mb-2 text-[#1a3c28]/60 text-[9px]">
                Items
              </p>
              <ul className="text-xs space-y-1">
                {order.items.map((item, idx) => (
                  <li key={idx} className="flex justify-between">
                    <span>
                      {item.quantity}x {item.name}
                    </span>
                    <span className="font-medium">
                      ৳{(item.price * item.quantity).toFixed(2)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="md:w-48 shrink-0 flex flex-col justify-center gap-2 border-t md:border-t-0 md:border-l border-[#1a3c28]/10 pt-4 md:pt-0 md:pl-6">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#1a3c28]/60 mb-2 text-center">
              Actions
            </p>
            {order.status === "pending" && (
              <button
                onClick={() => updateOrderStatus(order._id, "shipped")}
                className="w-full py-2 bg-blue-50 text-blue-700 rounded-lg text-xs font-bold hover:bg-blue-100 transition flex items-center justify-center gap-2"
              >
                <Package size={14} /> Mark Shipped
              </button>
            )}
            {order.status === "shipped" && (
              <button
                onClick={() => updateOrderStatus(order._id, "delivered")}
                className="w-full py-2 bg-green-50 text-green-700 rounded-lg text-xs font-bold hover:bg-green-100 transition flex items-center justify-center gap-2"
              >
                <Check size={14} /> Mark Delivered
              </button>
            )}
            {order.status === "pending" && (
              <button
                onClick={() => updateOrderStatus(order._id, "cancelled")}
                className="w-full py-2 bg-red-50 text-red-700 rounded-lg text-xs font-bold hover:bg-red-100 transition flex items-center justify-center gap-2"
              >
                <X size={14} /> Cancel Order
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
