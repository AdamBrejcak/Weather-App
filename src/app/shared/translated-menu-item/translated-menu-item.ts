import { MenuItem } from 'primeng/api';

export class TranslatedMenuItem implements MenuItem {
  label: string;
  icon: string;
  routerLink: string;
  translationLabel: string;

  constructor(data: any) {
    this.label = data.label;
    this.icon = data.icon;
    this.routerLink = data.routerLink;
    this.translationLabel = data.translationLabel;
  }
}
