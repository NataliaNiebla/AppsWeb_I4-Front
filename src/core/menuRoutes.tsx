import type { JSX } from "react";
import Dashboard from "../modules/dashboard/Dashboard";
import OrderData from "../modules/orderData/OrderData";
import ProductData from "../modules/productData/ProductData";
import UserForm from "../modules/user/UserForm";

export interface AppRoute { //definición de la interfaz AppRoute
    path: string;
    element: JSX.Element;
    label: string;
    icon?: string;
    //roleId?: string; // Si quieres filtrar por rol
    //hidden?: boolean; // Si quieres ocultar la ruta
}

//Enlace de rutas con componentes
const routes: AppRoute[] = [ // Aquí defines las rutas de tu aplicación
    {
        path: "/dashboard",  // path es la ruta de la URL 
        element: <UserForm />, // element es el componente que se renderiza
        label: "Inicio", // label es el texto que se muestra en el menú
        icon: "HomeOutlined", // icon es el icono que se muestra en el menú
    },
    {
        path: "/users",
        element: <UserForm />,
        label: "Usuarios",
        icon: "UserOutlined",
    },
    {
        path: "/products",
        element: <ProductData />,
        label: "Usuarios",
        icon: "UserOutlined",
    },
    { 
        path: "/orders",
        element: <OrderData />,
        label: "Usuarios",
        icon: "UserOutlined",
    },
    {
         path: "/report",
        element: <UserForm />,
        label: "Reportes",
        icon: "UserOutlined",
    },
]

export default routes; // Exporta las rutas para que puedan ser utilizadas en otros archivos
