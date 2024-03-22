import { createBrowserRouter, Navigate } from "react-router-dom";
import { Documents, Landing, Preview } from "./modules";
import { documentIdUrl, documentsUrl, landingUrl, previewUrl } from "./urls";
import { Layout } from "./components";
import { useAuth } from "./context/authContext";


interface RouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<RouteProps> = ({
    children
}) => {
    const user = useAuth();
    return user ? <>{children}</> : <Navigate to={landingUrl} replace />
}




export const routerConfig = createBrowserRouter([
    {
        path: landingUrl,
        element: <Landing />
    },
    {
        path: documentsUrl,
        element: (
            <ProtectedRoute>
                <Layout />
            </ProtectedRoute>
        ),
        children: [
            {
                path: previewUrl,
                element: <Preview />,
            },
            {
                path: documentIdUrl,
                element: <Documents />
            }
        ]
    }
])