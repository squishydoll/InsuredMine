import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'InsuredMine';
  ngOnInit() {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
  }

  @HostListener('window:scroll')
  onScroll() {
    if (document.body.scrollTop > 210 || document.documentElement.scrollTop > 210) {
      console.log(document.querySelector('app-header').childNodes);
      document
        .querySelector('app-header>nav')
        .setAttribute('style', 'background:rgba(18, 25, 46)');
      document
        .querySelector('.overlay')
        .setAttribute('style', 'background:rgba(18, 25, 46)');
    } else if (
      document.body.scrollTop < 210 ||
      document.documentElement.scrollTop < 210
    ) {
      document
        .querySelector('app-header>nav')
        .setAttribute('style', 'background:transparent');
      document
        .querySelector('.overlay')
        .setAttribute('style', 'background: rgba(18, 25, 46, 0.8)');
    }
  }
}
