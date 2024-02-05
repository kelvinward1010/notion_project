import { createBrowserRouter } from "react-router-dom";
import { Documents, Landing, Preview } from "./modules";
import { documentIdUrl, documentsUrl, landingUrl, previewUrl } from "./urls";
import { Layout } from "./components";







export const routerConfig = createBrowserRouter([
    {
        path: landingUrl,
        element: <Landing />
    },
    {
        path: documentsUrl,
        element: <Layout />,
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