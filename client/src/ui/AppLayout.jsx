import { Outlet, useNavigation } from "react-router-dom";
import Navbar from "./Navbar";

export default function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <div className="relative min-h-screen flex flex-col bg-[#eef2ef]">
      {/* Global Navbar */}
      <Navbar />

      {/* Loading Indicator */}
      {isLoading && (
        <div className="fixed top-0 left-0 w-full h-1 z-[100] bg-[#1a3c28] animate-pulse" />
      )}

      {/* Main Content Area */}
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  );
}
