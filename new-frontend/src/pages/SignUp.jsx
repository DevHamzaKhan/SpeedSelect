//React and Firebase Imports
import React, { useState } from "react";
import { auth, db } from "../firebase";
import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { setDoc, doc } from "firebase/firestore";
import { FcGoogle } from "react-icons/fc";
import { ImSpinner8 } from "react-icons/im";

const SignUp = () => {
    // All on register variables
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [passStrength, setPassStrength] = useState("weak");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
  
  // Signing up function
  const signUp = async (e) => {
    e.preventDefault();

    // Adding to user authentication
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("User UID:", user.uid);

      // Set user information with auth id
      const userDocRef = doc(db, "Users", user.uid);
      //const hiringsDocRef = doc(db, "Hirings", user.uid);

      await setDoc(userDocRef, {
        firstName: firstName,
        lastName: lastName,
        email: email
      }); 
      //await setDoc(hiringsDocRef, { data: [] });
      console.log("User information added to Firestore successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  const googleSignin = async () => {
    const result = await signInWithPopup(auth, new GoogleAuthProvider());
    // Rest of logic here
    auth.signOut(); // Temporary until rest of the logic is completed.
  }

  const checkPasswordStrength = (password) => {
    // Regular expressions to check for different types of characters
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasNonAlphas = /\W/.test(password); // non-alphanumeric characters

    // Check for length
    const isLengthValid = password.length >= 8;

    if (isLengthValid && hasUpperCase && hasLowerCase && hasNumbers && hasNonAlphas) {
    // Determine strength based on conditions
        return "strong";
    } else if ((isLengthValid && hasUpperCase && hasLowerCase) || (isLengthValid && hasNumbers && hasNonAlphas)) {
        return "medium";
    } else {
        return "weak";
    }
  };


  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    const strength = checkPasswordStrength(newPassword);
    setPassStrength(strength);
  };

  return (
        <div className={`flex-1`}>
            <div className="container-signin flex min-h-screen justify-center items-center bg-[#DAD9D9]">
                <section class = "wrapper bg-white w-2/6 px-7 py-6 rounded-3xl shadow-xl">
                    <h1 class="text-4xl font-bold mb-4 px-1 py-1">Start a New Journey!</h1>
                    <form onSubmit={signUp} className="mb-6 px-1 py-1">
                        <div className="flex justify-between mb-5">
                            <div class="input-control w-[49%]">
                                <p className="text-lg mb-1 text-[#3d3d3d] font-semibold" htmlFor="fName">First Name</p>
                                <input type="text" id="fName" placeholder="Enter your first name" value={firstName} onChange={(e) => setFirstName(e.target.value)} class="input-field rounded-3xl py-2 px-3 w-full text-lg border border-black" />
                            </div>
                            <div class="input-control w-[49%]">
                                <p className="text-lg mb-1 text-[#3d3d3d] font-semibold" htmlFor="lName">Last Name</p>
                                <input type="text" id="lName" placeholder="Enter your last name" value={lastName} onChange={(e) => setLastName(e.target.value)} class="input-field rounded-3xl py-2 px-3 w-full text-lg border border-black" />
                            </div>
                        </div>
                        <div class="input-control mb-5">
                            <p className="text-lg mb-1 text-[#3d3d3d] font-semibold" htmlFor="password">Email</p>
                            <input type="email" id="email" placeholder="Enter your email address" value={email} onChange={(e) => setEmail(e.target.value)} class="input-field rounded-3xl py-2 px-3 w-full text-lg border border-black" />
                        </div>
                        <div class="input-control mb-7">
                            <p className="text-lg mb-1 text-[#3d3d3d] font-semibold" htmlFor="password">Password</p>
                            <input type="password" id="password" placeholder="Enter your password" value={password} onChange={handlePasswordChange} class="input-field rounded-3xl py-2 px-3 w-full text-lg border border-black mb-3" />
                            <div id="password-strength-bars" className="flex justify-between items-center px-4 mb-1">
                                <div className={`w-[32%] border-t-4 rounded-full ${passStrength === 'weak' ? 'border-red-400' : passStrength === 'medium' ? 'border-amber-400' : 'border-green-400'}`}></div>
                                <div className={`w-[32%] border-t-4 rounded-full ${passStrength === 'medium' ? 'border-amber-400' : passStrength === 'strong' && 'border-green-400'}`}></div>
                                <div className={`w-[32%] border-t-4 rounded-full ${passStrength === 'strong' && 'border-green-400'}`}></div>
                            </div>
                            <p className={`text-md px-4 font-semibold ${passStrength === 'weak' ? 'text-red-400' : passStrength === 'medium' ? 'text-amber-400' : 'text-green-400'}`}>{!passStrength || passStrength === 'weak' ? 'Weak' : passStrength === 'medium' ? 'Medium' : 'Strong'}</p>
                        </div>
                        <button type="submit" name = "submit" class = {`input-submit justify-center bg-[#1c2e4e] flex items-center text-white py-2 px-3 text-lg rounded-3xl w-full hover:bg-opacity-85 hover:shadow-lg transition-all duration-300 ease-in-out ${loading && 'bg-opacity-50'}`} value = "Sign in">Sign Up{loading && <ImSpinner8 size={30} className="animate-spin ml-5"/>}</button>
                    </form>
                    <hr className="border-[#c4c3c3] border-t-[3px] w-3/6 mx-auto rounded-full mb-6"/>
                    <div className="px-1 py-1 mb-6">
                        <button onClick={googleSignin} className="input-submit py-2 px-3 text-lg rounded-full w-full hover:bg-slate-100 hover:bg-opacity-80 hover:shadow-lg transition-all duration-200 ease-in-out border border-black text-left flex items-center"><FcGoogle size={30} className="mr-auto"/><span className="mr-auto">Sign Up With Google</span></button>
                    </div>
                    <p className="px-1 py-1 text-lg text-center font-semibold">Already have an account? <span className="text-blue-600 cursor-pointer hover:text-opacity-80 transition-all duration-200 ease-in-out" onClick={() => navigate("/login")}>Sign In Now!</span></p>
                </section>
            </div>
        </div>
    );
};

export default SignUp;