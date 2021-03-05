interface MenuEntry {
  id: string;
  text: string;
  icon: React.ComponentType<any> | null;
}

export type MenuBase = MenuEntry & {
  children: (MenuBase | MenuItemBase)[];
};

export type MenuItemBase = MenuEntry & {
  to: string;
};
