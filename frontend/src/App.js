import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import PrivateRoute from './components/PrivateRoute'
import Welcome from './pages/Welcome'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import NewCardList from './pages/NewCardList'
import CardLists from './pages/CardLists'
import Study from './pages/Study'
import CardList from './pages/CardList'
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
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/dashboard' element={<PrivateRoute />}> 
                <Route path='/dashboard' element={<Dashboard />} />
              </Route>
              <Route path='/new-cardlist' element={<PrivateRoute />} >
                <Route path='/new-cardlist' element={<NewCardList />} />
              </Route>
              <Route path='/cardlists' element={<PrivateRoute />} >
                <Route path='/cardlists' element={<CardLists />} />
              </Route>
              <Route path='/cardlist/:cardListId' element={<PrivateRoute />} >
                <Route path='/cardlist/:cardListId' element={<CardList />} />
              </Route>
              <Route path='/cardlist/:cardListId/study' element={<PrivateRoute />} >
                <Route path='/cardlist/:cardListId/study' element={<Study />} />
              </Route>
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
