export class SlideProperties {
  showSubmenuModes: string[] = ['slide', 'expand'];
  positionModes: string[] = ['left', 'right'];
  showModes: string[] = ['push', 'shrink', 'overlap'];
  selectedOpenMode: string = 'shrink';
  selectedPosition: string = 'left';
  selectedRevealMode: string = 'slide';
  isDrawerOpen: boolean = false;
  isDefaultDrawerOpen: boolean = false;
  closeOnOutsideClick: boolean = true;
}
