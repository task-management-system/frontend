interface IMenuEntry {
  id: string;
  text: string;
  icon: React.ComponentType<any> | null;
}

export type TMenu = IMenuEntry & {
  children: (TMenu | TMenuItem)[];
};

export type TMenuItem = IMenuEntry & {
  to: string;
};
