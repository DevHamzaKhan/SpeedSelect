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


const ResumePreview = ({ resume, setActiveResume }) => {
  const [imageURLs, setImageURLs] = useState([]);

  useEffect(() => {
    const getImageURLs = async () => {
      try {
        const imageURLs = await convertPdfToImages(resume);
        setImageURLs(imageURLs);
      } catch (error) {
        console.log(error);
      }
    }

    getImageURLs();
  }, [resume]);

  return (
    <Card className="h-min w-full border-stone-100 cursor-pointer hover:bg-stone-50" onClick={() => setActiveResume(resume)}>
      <CardContent>
      <img src={imageURLs[0]} alt={`Loading...`} />

      </CardContent>
      <CardFooter>
      <div className='w-full flex justify-between'>
          <div className="space-y-1">
            <p className="font-medium leading-none">
              Applicant name
            </p>
            <p className="text-sm text-muted-foreground">
              Description
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