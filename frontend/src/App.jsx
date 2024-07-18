import './App.css'
import { Route, Routes } from 'react-router-dom'
import Landing from './pages/Landing'
import SignUp from './pages/SignUp'
import LogIn from './pages/LogIn'
import PostJob from './pages/PostJob'
import FindJob from './pages/FindJob'
import HiringDashboard from './pages/HiringDashboard'
import Profile from './pages/Profile'
import Offers from './pages/Offers'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/postjob" element={<PostJob />} />
        <Route path="/findjob" element={<FindJob />} />
        <Route path="/hiring" element={<HiringDashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/offers" element={<Offers />} />
      </Routes>
    </>
  )
}

export default App
