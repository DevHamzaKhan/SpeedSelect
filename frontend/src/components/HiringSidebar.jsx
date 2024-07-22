import { useState } from "react";
import { Link } from "react-router-dom";
import { Home, ShoppingCart, Package, Users, LineChart } from "lucide-react";
import { Badge } from "./ui/badge";

const HiringSidebar = ({ jobs, activeJob, setActiveJob }) => {
  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-calc-4 flex-col gap-2">
        <div className="flex-1 mt-4">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {jobs.map((job, index) => (
              <Link
                key={index}
                onClick={() => setActiveJob(job)}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                  activeJob === job ? "bg-muted text-primary" : "text-muted-foreground"
                }`}
              >
                <Package className="h-4 w-4" />
                {job.role}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default HiringSidebar;
