import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Welcome from './pages/Welcome'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import NotFound from './pages/NotFound'

function App() {
  return (
    <>
      <Router>
        <div className='flex flex-col justify-between h-screen'>
          <Navbar />

          <main className='w-full px-3'>
            <Routes>
              <Route path='/' element={<Welcome />} />
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/*' element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
