import type { JSX } from "react"; // Importa JSX para definir tipos de elementos React
import Dashboard from "../modules/dashboard/Dashboard";
import OrderData from "../modules/order/OrderData";
import ProductData from "../modules/products/ProductData";
import ReportData from "../modules/reports/ReportData";
import UserForm from "../modules/user/UserForm";

//Este archivo define las rutas de la aplicación y los componentes que se renderizan en cada ruta

export interface AppRoute { //definición de la interfaz AppRoute
    path: string;
    element: JSX.Element;
    label: string;
    icon?: string;
    roleId?: string; // Si quieres filtrar por rol
    hidden?: boolean; 
    roles?: string[];
}

//Enlace de rutas con componentes
const routes: AppRoute[] = [ 
    {
        path: "/dashboard",  // path es la ruta de la URL
        element: <Dashboard />, // element es el componente que se renderiza
        label: "Inicio", // label es el texto que se muestra en el menú
        icon: "HomeOutlined", // icon es el icono que se muestra en el menú
        roles: ["admin", "user"],
    },
    {
        path: "/users",
        element: <UserForm />,
        label: "Usuarios",
        icon: "UserOutlined",
        roles: ["admin"],
    },
    {
        path: "/products",
        element: <ProductData />,
        label: "Productos",
        icon: "UserOutlined",
        roles: ["admin", "user"],
    },
    { 
        path: "/orders",  
        element: <OrderData />,
        label: "Ordenes",
        icon: "UserOutlined",
        roles: ["admin", "user"],
    },
    {
        path: "/reports",
        element: <ReportData />,
        label: "Reportes",
        icon: "UserOutlined",
        roles: ["admin"],
    },
]

export default routes; // Exporta las rutas para que puedan ser utilizadas en otros archivos
