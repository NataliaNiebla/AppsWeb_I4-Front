//Creas un contexto que va a validar si el usuario está autenticado o no, y va a manejar el token de autenticación.
// Este contexto se utiliza en toda la aplicación para verificar si el usuario está autenticado y para manejar el inicio y cierre de sesión.
import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext<any>(null); 

export function AuthProvider({children}: {children: React.ReactNode}) {
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<any | null>(null);

    useEffect(() => {
        const stored = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        if (stored) {
            setToken(stored);
            setUser(storedUser)
        }
    }, []);

    const login = (tokenLogin: string, userLogin: any) => {
        localStorage.setItem('token', tokenLogin); // Guarda el token en el almacenamiento local
        localStorage.setItem('user', userLogin); // Guarda el usuario en el almacenamiento local

        setToken(tokenLogin); // Establece el token en el estado
        setUser(userLogin); // Establece el usuario autenticado
    }

    const logout = () => {
        localStorage.removeItem('token'); // Elimina el token del almacenamiento local
        localStorage.removeItem('user'); // Elimina el usuario del almacenamiento local

        setToken(null); // Establece el token en null
        setUser(null); // Establece el usuario en null
    }

    return (
        <AuthContext.Provider value={{ token, user, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
   return useContext(AuthContext);
}