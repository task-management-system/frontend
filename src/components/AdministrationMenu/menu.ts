import { salt } from 'utils';
import { TMenu, TMenuItem } from 'types/components/menu';
import { People, Apartment, AccountBox } from '@material-ui/icons';

class Menu implements TMenu {
  public id: string = salt();
  public icon: React.ComponentType<any> | null = null;

  constructor(public text: string, public children: (Menu | MenuItem)[] = []) {}

  addIcon(icon: React.ComponentType<any>) {
    this.icon = icon;

    return this;
  }
}

class MenuItem implements TMenuItem {
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
  ]).addIcon(People),
  new MenuItem('Структура', '/administration/structure').addIcon(Apartment),
  new MenuItem('Роли', '/administration/roles').addIcon(AccountBox),
];

export default menu;
