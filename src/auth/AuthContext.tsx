//Creas un contexto que va a validar si el usuario está autenticado o no, y va a manejar el token de autenticación.
// Este contexto se utiliza en toda la aplicación para verificar si el usuario está autenticado y para manejar el inicio y cierre de sesión.
import { createContext, useContext, useEffect, useState } from 'react';

interface Role {
    _id: string;
    name: string;
    description?: string;
}

interface User {
    id: string;
    name: string;
    email: string;
    roles: Role[];
}

interface AuthContextType {
    token: string | null;
    user: User | null;
    isLoading: boolean;
    login: (token: string, user: User, remember: boolean) => void;
    logout: () => void;
}
//Creación del contexto de autenticación e inicialización con null
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({children}: {children: React.ReactNode}) { // children es un prop que contiene los componentes hijos que se renderizarán dentro del proveedor de contexto
    const [token, setToken] = useState<string | null>(null); // Estado para manejar el token de autenticación
    const [user, setUser] = useState<User | null>(null); // para guardar el usuario autenticado
    const [isLoading, setIsLoading] = useState<boolean>(true); // Estado para manejar el estado de carga

    useEffect(() => {
        const stored = 
            localStorage.getItem('token') || sessionStorage.getItem('authToken');; // Recupera el token del almacenamiento local
        const storedUser = 
            localStorage.getItem('user')  || sessionStorage.getItem('authUser'); // Recupera el usuario del almacenamiento local

        if (stored) {
            setToken(stored); // Si hay un token almacenado, lo establece en el estado
        }

        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser)); // Si hay un usuario almacenado, lo establece en el estado
            } catch (error) {
                console.warn('Error al parsear el usuario almacenado:', error);
            }         
        }

        setIsLoading(false); // Cambia el estado de carga a false una vez que se ha recuperado el token y el usuario
}, []);

    const login = (tokenLogin: string, userLogin: User, remember:boolean) => {
        if (remember) {
            localStorage.setItem('authToken', tokenLogin); // Guarda el token en el almacenamiento local si se selecciona "Recordar"
            localStorage.setItem('authUser', JSON.stringify(userLogin)); // Guarda el usuario en el almacenamiento local si se selecciona "Recordar"
        }
        else {
            sessionStorage.setItem('authToken', tokenLogin); // Guarda el token en el almacenamiento de sesión si no se selecciona "Recordar"
            sessionStorage.setItem('authUser', JSON.stringify(userLogin)); // Guarda el usuario en el almacenamiento de sesión si no se selecciona "Recordar"
        }

        setToken(tokenLogin); // Establece el token en el estado
        setUser(userLogin); // Establece el usuario autenticado
    }

    const logout = () => {
        localStorage.removeItem('token'); // Elimina el token del almacenamiento local
        localStorage.removeItem('user'); // Elimina el usuario del almacenamiento local
        sessionStorage.removeItem('authToken'); // Elimina el token del almacenamiento de sesión
        sessionStorage.removeItem('authUser'); // Elimina el usuario del almacenamiento de sesión
        setToken(null); // Establece el token en null
        setUser(null); // Establece el usuario en null
    };

    return (
        <AuthContext.Provider value={{ token, user, login, logout, isLoading}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext); // Utiliza el hook useContext para acceder al contexto de autenticación
    if (context == undefined) {
        throw new Error('useAuth debe ser usado dentro de un AuthProvider'); // Lanza un error si el contexto no está disponible
    }
    return context; // Hook personalizado para acceder al contexto de autenticación
}