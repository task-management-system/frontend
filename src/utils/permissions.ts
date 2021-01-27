import { IPermission } from 'types';

const cache = new Map<string, number>();

export const haveEveryPermission = (
  power: number = 0,
  required: string[],
  permissions: IPermission[] = []
) => {
  const requiredPower = required.reduce((accumulator, name) => {
    if (!cache.has(name)) {
      const permission = permissions.find(permission => permission.name === name);
      if (permission !== undefined) {
        cache.set(permission.name, permission.power);
      }
    }
    accumulator |= cache.get(name) || 0;

    return accumulator;
  }, 0);

  return (power & requiredPower) > 0;
};

export const haveAnyPermission = (
  power: number = 0,
  required: string[],
  permissions: IPermission[] = []
) => {
  const permissionsPower = required.reduce<number[]>((accumulator, name) => {
    if (!cache.has(name)) {
      const permission = permissions.find(permission => permission.name === name);
      if (permission !== undefined) {
        cache.set(permission.name, permission.power);
      }
    }
    accumulator.push(cache.get(name) || 0);

    return accumulator;
  }, []);

  return permissionsPower.some(requiredPower => (power & requiredPower) > 0);
};
