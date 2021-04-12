import { salt } from 'utils';
import { People, AccountBox } from '@material-ui/icons';
import { MenuBase, MenuItemBase } from 'types/components/menu';

class Menu implements MenuBase {
  public id: string = salt();
  public expanded: boolean = false;
  public icon: React.ComponentType<any> | null = null;

  constructor(public text: string, public children: (Menu | MenuItem)[] = []) {}

  setExpanded(expanded: boolean) {
    this.expanded = expanded;

    return this;
  }

  addIcon(icon: React.ComponentType<any>) {
    this.icon = icon;

    return this;
  }
}

class MenuItem implements MenuItemBase {
  public id: string = salt();
  public icon: React.ComponentType<any> | null = null;

  constructor(public text: string, public to: string) {}

  addIcon(icon: React.ComponentType<any>) {
    this.icon = icon;

    return this;
  }
}

const menu = [
  new Menu('Пользователи', [
    new MenuItem('Список пользователей', '/administration/users'),
    new MenuItem('Добавить пользователей', '/administration/add-user'),
  ])
    .setExpanded(true)
    .addIcon(People),
  // new MenuItem('Структура', '/administration/structure').addIcon(Apartment),
  new Menu('Роли', [
    new MenuItem('Список ролей', '/administration/roles'),
    new MenuItem('Добавить роли', '/administration/roles'),
  ])
    .setExpanded(true)
    .addIcon(AccountBox),
];

export default menu;
