import { convertPdfToImages } from '@/lib/utils';
import React, { useEffect, useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { EllipsisVertical } from 'lucide-react';
import { Button } from './ui/button';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase';


const ResumePreview = ({ candidate, setActiveCandidate }) => {
  const [imageURLs, setImageURLs] = useState([]);
  const [candidateData, setCandidateData] = useState(null);

  useEffect(() => {
    const getImageURLs = async () => {
      try {
        const imageURLs = await convertPdfToImages(candidate.resumeUrl);
        setImageURLs(imageURLs);

        const userDocRef = doc(db, "users", candidate.id);  
        const snapshot = await getDoc(userDocRef);
        setCandidateData(snapshot.data());
      } catch (error) {
        console.log(error);
      }
    }

    getImageURLs();
  }, [candidate]);

  return (
    <Card className="h-min w-full border-stone-100 cursor-pointer hover:bg-stone-50" onClick={() => setActiveCandidate(candidate)}>
      <CardContent>
      <img src={imageURLs[0]} alt={`Loading...`} />

      </CardContent>
      <CardFooter>
      <div className='w-full flex justify-between'>
          <div className="space-y-1">
            <p className="font-medium leading-none">
              {candidateData && `${candidateData.firstName} ${candidateData.lastName}`}
            </p>
            <p className="text-sm text-muted-foreground">
              {candidate?.roles.join(' | ')}
            </p>
          </div>
          <Button variant='ghost' size='icon'>
            <EllipsisVertical size={18} color='gray'/>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

export default ResumePreview