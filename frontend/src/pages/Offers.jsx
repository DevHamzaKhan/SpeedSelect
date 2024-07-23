import Navbar from '@/components/Navbar'
import OfferPreview from '@/components/OfferPreview'
import OffersSidebar from '@/components/OffersSidebar'
import { Separator } from '@/components/ui/separator'
import { auth, db } from '@/firebase'
import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from '@/components/ui/label'
import { Calendar, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import OfferDetails from '@/components/OfferDetails'

const Offers = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeOffer, setActiveOffer] = useState(null);

  const loadJobs = async () => {
    try {
        const userRef = doc(db, "data", auth.currentUser.uid);
        const snapshot = await getDoc(userRef);
        const offers = snapshot.data()?.offers;

        if (!offers) return;
        
        const offerData = [];

        for (let offer of offers) {
          const jobRef = doc(db, "jobs", offer.user, "jobs", offer.jobId);
          const snapshot = await getDoc(jobRef);

          const userDocRef = doc(db, "users", offer.user);  
          const userSnap = await getDoc(userDocRef);
          
          offerData.push({ ...snapshot.data(), ...userSnap.data(), ...offer });
        }
        
        console.log(offerData);
        setOffers(offerData);
    } catch (err) {
        setError(err.message);
        console.log(err);
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        loadJobs();
      } else {
        setError("User must be authenticated to view jobs.");
      }
    });
  
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div className={`flex-1 p-5`}>Loading...</div>;
  }

  if (error) {
    return <div className={`flex-1 p-5`}>{error}</div>;
  }

  if (offers.length === 0) {
      return (
        <>
          <Navbar />
          <div className={`flex-1 p-5`}>No offers found.</div>
        </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="grid h-calc-4 w-full md:grid-cols-[1fr_320px] lg:grid-cols-[1fr_380px]">
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10 text-left">
              <div className="mx-auto grid w-full max-w-6xl">
                <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  Your offers
                </h1>
                <p className="mt-6 text-xl leading-8 text-gray-700">
                  Based on your profile, offers you receive from hiring managers will show up here.
                </p>
              </div>

              <Separator />

              <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-4 items-start md:grid-cols-[280px_1fr] lg:grid-cols-[350px_1fr]">
                {offers && offers.map((offer, index) => (
                  <Card key={index} className="w-[350px] cursor-pointer" onClick={() => setActiveOffer(offer)}>
                    <CardHeader>
                      <CardTitle>{`${offer.firstName} ${offer.lastName}`}</CardTitle>
                      <CardDescription>{`${offer.remoteStatus} | ${offer.city.name}, ${offer.state.name}, ${offer.country.name}`}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div
                        className="mb-4 items-start pb-4 last:mb-0 last:pb-0"
                      >
                        <div className="space-y-1">
                          <p className="text-sm font-medium leading-none">
                            Role
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {`${offer.role} - ${offer.jobType}`}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
        </main>

        { activeOffer && (
          <OfferDetails activeOffer={activeOffer} setActiveOffer={setActiveOffer} />
        )}
      </div>
    </>
  )
}

export default Offers