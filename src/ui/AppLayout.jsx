import { Outlet, useNavigation } from "react-router-dom";
import Navbar from "./Navbar";

export default function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <div className="relative min-h-screen flex flex-col">
      <Navbar />

      {isLoading && (
        <div className="fixed top-0 left-0 w-full h-1 z-[100] bg-accent-tan animate-pulse" />
      )}

      <main className="flex-grow pt-20">
        <Outlet />
      </main>
    </div>
  );
}
