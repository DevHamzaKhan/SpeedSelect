// React and firebase imports
import React, {useState} from "react";
import {auth, app} from "../firebase"
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
    //Variables for login
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate('');

    //Simple user auth
    const signIn = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            navigate("/")
            //console.log(userCredential)
        })
        .catch((error) => {
            //console.log(error)
        });
    }

    const googleSignin = async () => {
        const result = await signInWithPopup(auth, new GoogleAuthProvider());
        // Rest of logic here
        auth.signOut(); // Temporary until rest of the logic is completed.
      }

    return (
        <>
            {/* Login form */}
            <div className="container-signin flex-1 flex min-h-screen justify-center items-center bg-[#DAD9D9]">
                <section className="wrapper bg-white w-2/6 px-7 py-6 rounded-3xl shadow-xl">
                    <h1 className="text-4xl font-bold mb-4 px-1 py-1">Welcome Back!</h1>
                    <form onSubmit={signIn} className="px-1 py-1 mb-6">
                        <div className="input-control mb-5">
                            <p className="text-lg mb-1 text-[#3d3d3d] font-semibold" htmlFor="email">Email Address</p>
                            <input type="email" id="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} className="input-field rounded-3xl py-2 px-3 w-full text-lg border border-black" />
                        </div>
                        <div className="input-control mb-6">
                            <p className="text-lg mb-1 text-[#3d3d3d] font-semibold" htmlFor="password">Password</p>
                            <input type="password" id="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} className="input-field rounded-3xl py-2 px-3 w-full text-lg border border-black" />
                        </div>
                        <button type="submit" name = "submit" class = "input-submit bg-[#1c2e4e] text-white py-2 px-3 text-lg rounded-3xl w-full hover:bg-opacity-85 hover:shadow-lg transition-all duration-300 ease-in-out" value = "Sign in">Sign In</button>
                    </form>
                    <hr className="border-[#8f8e8e] border-t-[3px] w-[96%] mx-auto rounded-full mb-6"/>
                    <div className="px-1 py-1 mb-6">
                        <button onClick={googleSignin} className="input-submit py-2 px-3 text-lg rounded-full w-full hover:bg-slate-100 hover:bg-opacity-80 hover:shadow-lg transition-all duration-200 ease-in-out border border-black text-left flex items-center"><FcGoogle size={30} className="mr-auto"/><span className="mr-auto">Sign in With Google</span></button>
                    </div>
                    <p className="px-1 py-1 text-lg text-center font-semibold">Don't have an account? <span className="text-blue-600 cursor-pointer hover:text-opacity-80 transition-all duration-200 ease-in-out" onClick={() => navigate('/signup')}>Sign Up Now</span></p>
                </section>
            </div>
        </>
    );
};

export default Login;
