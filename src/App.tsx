import './App.css'
import {Route, Routes} from "react-router";
import GuestLayout from "@/layouts/GuestLayout.tsx";
import MainLayout from "@/layouts/MainLayout.tsx";
import LoginPage from "@/pages/login-page/LoginPage.tsx";
import MainPage from "@/pages/main-page/MainPage.tsx";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout/>}>
        <Route path="/" element={<MainPage/>}/>
      </Route>
      <Route element={<GuestLayout/>}>
        <Route path={'/login'} element={<LoginPage/>}/>
      </Route>
    </Routes>
  )
}

export default App
