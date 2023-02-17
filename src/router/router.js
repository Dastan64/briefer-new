import { createBrowserRouter, createHashRouter } from 'react-router-dom';

import Root from '../routes/Root/Root';
import App from '../components/App/App';
import Success from '../routes/Success/Success';
import Brief from '../routes/Brief/Brief';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Root/>,
        children: [
            {
                path: '/',
                element: <App/>
            },
            {
                path: 'success',
                element: <Success/>
            },
            {
                path: 'briefs/:id',
                element: <Brief/>
            }
        ],
    },
]);
