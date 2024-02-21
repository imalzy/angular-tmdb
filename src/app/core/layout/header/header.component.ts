import { Component } from '@angular/core';

@Component({
  selector: 'imalzy-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  showMenu = false;
  showLang = false;

  onShowLang():void{
    this.showLang = !this.showLang;
  }
  onClick(): void {
    this.showMenu = !this.showMenu;
  }
}
