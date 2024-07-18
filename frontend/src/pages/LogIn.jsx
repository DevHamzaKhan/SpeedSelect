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
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/firebase";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";

const LogIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    
    signInWithEmailAndPassword(auth, formData.email, formData.password)
      .then((userCredential) => {
        const fetchUserType = async () => {
          const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
          if (userDoc.exists()) {
            return userDoc.data().userType
          }
        };

        // Use an IIFE (Immediately Invoked Function Expression) to handle the async function
        (async () => {
          const userType = await fetchUserType();
          console.log('userType', userType);
          navigate(userType === 'hiringManager' ? '/hiring' : '/findjob');
        })();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Navbar />
      <div className="flex h-[80vh] w-full flex-col justify-center">
        <form onSubmit={handleSubmit}>
          <Card className="mx-auto max-w-sm text-left">
            <CardHeader>
              <CardTitle className="text-2xl">Login</CardTitle>
              <CardDescription>
                Enter your email below to login to your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
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
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <a href="#" className="ml-auto inline-block text-sm underline">
                      Forgot your password?
                    </a>
                  </div>
                  <Input id="password" type="password" required onChange={handleChange} />
                </div>
                <Button type="submit" className="w-full">
                  Login
                </Button>
                <Button variant="outline" className="w-full">
                  Login with Google
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{" "}
                <a href="#" className="underline">
                  Sign up
                </a>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </>
  )
}

export default LogIn
