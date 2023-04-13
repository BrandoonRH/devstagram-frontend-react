import { createBrowserRouter } from "react-router-dom";
import Layout from "./layouts/Layout";
import AuthLayout from "./layouts/AuthLayout";
import Home from "./views/Home"; 
import Login from "./views/Login"; 
import Register from "./views/Register";
import Dashboard from "./views/Dashboard";
import CreatePost from "./views/posts/Create";
import Show from "./views/posts/Show";
import NotFound from "./views/NotFound";
import EditProfile from "./views/admin/EditProfile";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout/>,
        children: [
            {
                index: true, //Cargar Componente Home, si es false caraga Layout
                element: <Home title={'Publicaciones'}/>
            }
        ]
    },
    {
        path: '/:username',
        element: <Layout/>,
        children: [
            {
                index: true, 
                element: <Dashboard title="Perfil: "/>
            },  
            {
                path: '/:username/posts/:post',
                element: <Show/>
            },  
            {
                path: '/:username/edit-profile',
                element: <EditProfile title="Edita tu Perfil de Devstagram"/>
            }
        ]
    },
    {
        path: '/auth',
        element: <Layout/>,
        children: [
            {
                path: '/auth/login',
                element: <Login title="Inicia Sesión en Devstagram"/>
            },
            {
                path: '/auth/register',
                element: <Register title="Registrate en Devstagram"/>
            },  

        ]
    }, 
    {
        path: '/posts',
        element: <Layout/>,
        children: [
            {
                path: '/posts/create',
                element: <CreatePost title="Crea una Nueva Publicación"/>
            },
        ]
    }, 
    {
        path: '/404',
        element: <Layout/>,
        children: [
            {
                index: true,
                element: <NotFound/>
            }
        ]
    },
]);

export default router; 