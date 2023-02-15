import { createBrowserRouter } from 'react-router-dom';
import Root from '../routes/Root/Root';
import Success from '../routes/Success/Success';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Root/>,
    },
    {
        path: '/success',
        element: <Success/>
    }
]);
