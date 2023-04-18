import { createBrowserRouter, createHashRouter } from 'react-router-dom';

import App from '../components/App/App';
import Root from '../routes/Root/Root';
import Success from '../routes/Success/Success';
import Brief from '../routes/Brief/Brief';
import Archive from '../routes/Archive/Archive';

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
            }, {
                path: 'briefs',
                element: <Archive/>,
            },
            {
                path: 'briefs/:id',
                element: <Brief/>
            }
        ],
    },
]);
