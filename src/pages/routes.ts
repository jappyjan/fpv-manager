import BatteryDetailPage from "./battery-manufacturers/product-lines/batteries/battery-detail.page.tsx";

const routes = [
    {
        path: '/battery_manufacturers/:manufacturerId/product_lines/:productLineId/batteries/:batteryId/edit',
        asyncComponent: () => import('./battery-manufacturers/product-lines/batteries/battery-edit.page.tsx'),
    },
    {
        path: '/battery_manufacturers/:manufacturerId/product_lines/:productLineId/batteries/:batteryId',
        // asyncComponent: () => import('./battery-manufacturers/product-lines/batteries/battery-detail.page.tsx'),
        component: BatteryDetailPage,
    },
    {
        path: '/battery_manufacturers/:manufacturerId/product_lines/:productLineId/edit',
        asyncComponent: () => import('./battery-manufacturers/product-lines/product-line-edit.page.tsx'),
    },
    {
        path: '/battery_manufacturers/:manufacturerId/product_lines/:productLineId',
        asyncComponent: () => import('./battery-manufacturers/product-lines/batteries-list.page.tsx'),
    },
    {
        path: '/battery_manufacturers/:manufacturerId/edit',
        asyncComponent: () => import('./battery-manufacturers/manufacturer-edit.page.tsx'),
    },
    {
        path: '/battery_manufacturers/:manufacturerId',
        asyncComponent: () => import('./battery-manufacturers/battery-product-lines-list.page.tsx'),
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
                path: '/battery_manufacturers',
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
