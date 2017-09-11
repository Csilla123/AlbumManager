import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AlbumManagerService } from './album-manager.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {
  title = 'app';
  profile: Profile;
  logged: boolean = false;
  constructor(private router: Router, translate: TranslateService, private service: AlbumManagerService) {

    translate.addLangs(['hu']);
    translate.use(translate.getBrowserLang());
  }

  logout() {
    this.service.logout().then(() => {
      this.logged = false;
      this.router.navigate(['/']);
    });
  }

  ngOnInit() {
    this.init();
  }

  getProfile(){
    this.router.navigate(['/profile']);
  }

  init() {
     this.service.getLoginStatus().then((res) => {
        if (res.status === "connected") {
        console.log("Logged in");
        } 
      })
  }

  login() {
    this.service.loginWithOptions().then(() => this.service.getProfile()).then(
      (res: any) => {
        this.logged = true;
        this.profile = res;
        this.router.navigate(['/profile']);
      }
    );
  }

}

interface  Profile{
  id:string,
  name:string
}
