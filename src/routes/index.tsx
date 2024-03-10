import Divide from '@/pages/Divide';
import Preview from '@/pages/Preview';
import { RouteObject } from 'react-router-dom';

const routes:RouteObject[] = [
    {
        path: '/',
        element: <Preview />
    },
    {
        path: '/preview',
        element: <Preview />
    },
    {
        path: '/divide',
        element: <Divide />
    },
]

export default routes;