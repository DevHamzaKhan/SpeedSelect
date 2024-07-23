import { useState } from "react";
import Navbar from "@/components/Navbar"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/firebase";
import { doc, setDoc } from "firebase/firestore";
import { BriefcaseBusiness, Building2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [userType, setUserType] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    
    createUserWithEmailAndPassword(auth, formData.email, formData.password)
      .then((userCredential) => {
        // Signed up
        const signUp = async () => {
          const user = userCredential.user;
          
          const userDocRef = doc(db, "users", user.uid);

          const userData = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            userType
          };
          
          await setDoc(userDocRef, userData);
        }

        signUp();

        navigate(userType === 'hiringManager' ? '/postjob' : '/findjob');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (!showForm) {
    return (
      <>
        <Navbar />
        <div className="flex h-[80vh] w-full flex-col justify-center items-center">
          <h1 className="text-3xl font-semibold mb-8">
            What's your goal?
          </h1>

          <div className="flex gap-2">
            <Button 
              variant="outline" 
              className={`flex items-center space-x-4 rounded-md border p-4 text-left h-20 w-80
              ${userType === 'hiringManager' ? 'border-2 border-b-4 border-primary text-primary' : ''}`}
              onClick={() => setUserType('hiringManager')}
            >
              <Building2 />
              <div className="flex-1 space-y-1">
                <p className="text-lg font-medium leading-none">
                  I'm a hiring manager
                </p>
              </div>
            </Button>
            <Button 
              variant="outline" 
              className={`flex items-center space-x-4 rounded-md border p-4 text-left h-20 w-80
              ${userType === 'jobSeeker' ? 'border-2 border-b-4 border-primary text-primary' : ''}`}
              onClick={() => setUserType('jobSeeker')}
            >
                <BriefcaseBusiness />
                <div className="flex-1 space-y-1">
                  <p className="text-lg font-medium leading-none">
                    I'm looking for a job
                  </p>
                </div>
            </Button>
          </div>
          <Button
            className='mt-8'
            onClick={() => { if (userType) setShowForm(true); }}
          >
            Next
          </Button>
        </div>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <div className="flex h-[80vh] w-full flex-col justify-center">
        <form onSubmit={handleSubmit}>
          <Card className="mx-auto max-w-sm text-left">
            <CardHeader>
              <CardTitle className="text-xl">Sign up as a {userType === 'hiringManager' ? 'hiring manager' : 'job seeker'}</CardTitle>
              <CardDescription>
                Enter your information to create an account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="firstName">First name</Label>
                    <Input id="firstName" placeholder="Max" required onChange={handleChange} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="lastName">Last name</Label>
                    <Input id="lastName" placeholder="Robinson" required onChange={handleChange} />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    onChange={handleChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" onChange={handleChange} />
                </div>
                <Button type="submit" className="w-full">
                  Create an account
                </Button>
                <Button variant="outline" className="w-full">
                  Sign up with GitHub
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <a href="#" className="underline">
                  Sign in
                </a>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </>
  )
}

export default SignUp
