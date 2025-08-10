import type { INavMenu } from "@/types";

const generateRoutes = (sideBarItems: INavMenu[]) => {
  return sideBarItems.flatMap((item) =>
    item.items.map((menu) => ({
      path: menu.url,
      Component: menu.Component,
    }))
  );
};

export default generateRoutes;
