import './App.css'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Dashboard from './modules/dashboard/Dashboard'
import routes from './core/menuRoutes'
import AuthRoutes from './auth/AuthRoutes'
import LoginForm from './modules/user/Login'

// Este archivo de app.tsx es el punto de entrada de la aplicación React.
//se creo una ruta publica, para despues generar una para englobar todas las rutas privadas, y que verifque si existe un token de autenticación.
function App() {

  return (
    <BrowserRouter> 
      <Routes>
        <Route path = '/login' element={<LoginForm/>} />
        <Route path = '/' 
        element ={
          <AuthRoutes>
            <Dashboard />
          </AuthRoutes>
          }
        >

          {routes.map (route =>
            <Route key ={route.path} path={route.path} element={route.element} />
          )}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App