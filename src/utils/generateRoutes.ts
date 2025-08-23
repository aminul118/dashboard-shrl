import type { INavMenu } from '@/types';

const generateRoutes = (sideBarItems: INavMenu[]) => {
  return sideBarItems.flatMap((item) =>
    item.items.map((menu) => ({
      // Ensure absolute path (leading "/")
      path: menu.url.startsWith('/') ? menu.url : `/${menu.url}`,
      Component: menu.Component,
    })),
  );
};

export default generateRoutes;
