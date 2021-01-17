export class SpUserMenus {
  constructor(init?: Partial<SpUserMenus>) {
    Object.assign(this, init);
  }
  id: number;
  name: string;
  url: string;
  homeStatus?: boolean;
  icon: string;
  userMenuID: number;
  isVisible: boolean = false;
  canAdd: boolean = false;
  canUpdate: boolean = false;
  canDelete: boolean = false;
  isUpdate: boolean = false;
  userID: number;
}
