import { Component } from '@angular/core';

@Component({
  selector: 'imalzy-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  socialData = [
    {
      url: 'https://instagram.com/imalzy',
      name: 'Twitter',
      img: 'fa fa-instagram',
    },
    { url: 'https://github.com/imalzy', name: 'Github', img: 'fa fa-github' },
  ];
}
