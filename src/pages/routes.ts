const routes = [
    {
        path: '/battery-manufacturers/:manufacturerId/edit',
        asyncComponent: () => import('./battery-manufacturers/manufacturer-edit.page.tsx'),
    },
    {
        path: '/battery-manufacturers/:manufacturerId',
        asyncComponent: () => import('./battery-manufacturers/batteries-list.page.tsx'),
    },
    {
        path: '/battery-manufacturers/__new__/edit',
        asyncComponent: () => import('./battery-manufacturers/batteries-list.page.tsx'),
    },
    {
        path: '/',
        asyncComponent: () => import('../components/app-tabs-layout.tsx'),
        tabs: [
            {
                path: '/',
                id: 'home',
                asyncComponent: () => import('./home.page.tsx'),
            },
            {
                path: '/battery-manufacturers',
                id: 'batteries',
                asyncComponent: () => import('./battery-manufacturers-list.page.tsx'),
            },
            {
                path: '/drones',
                id: 'drones',
                asyncComponent: () => import('./drones.page.tsx'),
            },
        ]
    },

    {
        path: '(.*)',
        asyncComponent: () => import('./404.page.tsx'),
    },
];

export default routes;
