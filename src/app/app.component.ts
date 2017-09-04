import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor(private router: Router, translate: TranslateService) {

    translate.addLangs(['hu']);
    translate.use(translate.getBrowserLang());

  }
  getProfile() {
    this.router.navigate(['']);
  }
}
