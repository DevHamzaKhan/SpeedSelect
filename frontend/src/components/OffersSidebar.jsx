import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Home, ShoppingCart, Package, Users, LineChart } from "lucide-react";
import { Badge } from "./ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "./ui/button";

const OffersSidebar = ({ offers, activeJob, setActiveJob }) => {

  const navigate = useNavigate();

  if (!offers) return (
    <div className="hidden border-r bg-muted/40 md:block">
    <div className="flex h-calc-4 flex-col gap-2">
      <div className="flex-1 mt-4">
        <nav className="grid items-start px-2 lg:px-4">
           <Card>
              <CardHeader className="p-2 pt-0 md:p-4">
                <CardTitle>You have no offers</CardTitle>
                <CardDescription>
                  Set up a profile to start receiving offers from hiring managers
                </CardDescription>
              </CardHeader>
              <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                <Button size="sm" className="w-full" onClick={() => navigate('/findjob')}>
                  User form
                </Button>
              </CardContent>
            </Card>
        </nav>
      </div>
    </div>
  </div>
  )

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
                {job.roles[0]}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default OffersSidebar;
