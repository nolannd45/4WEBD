
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import MainHome from './components/MainHome'
import MyBook from './components/MyBook'
import HotelPage from './components/HotelPage'
import UseScrollToTop from './components/useScrollToTop'

import Login from './components/Login/Login'
import { ToastContainer } from 'react-toastify'
import SignUp from './components/SignUp/SignUp'

const App = () => {
  return (
    <>
      <Header />

      <main className='w-full md:max-w-[90vw] sm:w-[98vw] sm:text-center mx-auto'>
        <ToastContainer />
        <Routes>
          <Route path='/' element={<MainHome />} />
          <Route path='/mybook' element={<MyBook />} />
          <Route path='/login' element={<Login />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/hotels/:hotel' element={<HotelPage />} />

        </Routes>
        <div className='flex justify-end sticky bottom-10 right-5'>
          <UseScrollToTop />
        </div>
      </main>

    </>
  )
}
export default App;
