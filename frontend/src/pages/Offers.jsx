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

const Offers = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadJobs = async () => {
    try {
        const userRef = doc(db, "data", auth.currentUser.uid);
        const snapshot = await getDoc(userRef);
        const offers = snapshot.data()?.offers;
        
        const offerData = [];

        for (let offer of offers) {
          const jobRef = doc(db, "jobs", offer.user, "jobs", offer.jobId);
          const snapshot = await getDoc(jobRef);
          
          offerData.push({ ...snapshot.data(), ...offer });
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
        <main className="flex flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10 text-left">
              <div className="mx-auto grid w-full max-w-6xl">
                <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  Your offers
                </h1>
                <p className="mt-6 text-xl leading-8 text-gray-700">
                  Based on your profile, offers you receive from hiring managers will show up here.
                </p>
              </div>

              <Separator />

              <div className="mx-auto grid w-full max-w-6xl items-start">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employer</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {offers && offers.map((offer, index) => (
                      <TableRow key={index}>
                        <TableCell>{offer.user}</TableCell>
                        <TableCell>{offer.role}</TableCell>
                        <TableCell>{offer.jobType}</TableCell>
                        <TableCell>{offer.remoteStatus}</TableCell>
                        <TableCell>{`${offer.city.name}, ${offer.state.name}, ${offer.country.name}`}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
        </main>
    </>
  )
}

export default Offers