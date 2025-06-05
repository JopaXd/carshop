import React from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { Home, PlusCircle } from "lucide-react";

const Navbar: React.FC = () => {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Link
          to="/"
          className={cn(
            "flex items-center gap-2 text-lg font-semibold text-gray-700 hover:text-primary transition-colors",
            pathname === "/" && "text-primary",
          )}
        >
          <Home className="w-5 h-5" />
          Home
        </Link>
        <Link
          to="/create"
          className={cn(
            "flex items-center gap-2 text-lg font-semibold text-gray-700 hover:text-primary transition-colors",
            pathname === "/create" && "text-primary",
          )}
        >
          <PlusCircle className="w-5 h-5" />
          Create
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
