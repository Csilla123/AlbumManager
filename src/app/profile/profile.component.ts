import { Component, OnInit } from '@angular/core';
import { AlbumManagerService } from '../album-manager.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private service: AlbumManagerService, private router: Router) { }

  profile = {
    id: '',
    name: ''
  };

  ngOnInit() {
    this.init();
  }

  getGroups() {
    this.router.navigate(['/groups', this.profile.id]);
  }

  init() {
    this.service.getLoginStatus().then((res) => {
      if (res.status === "connected") {
        this.service.getProfile().then(
          (res: any) => {
            this.profile = res;
          });
      } else {
        this.service.loginWithOptions().then(() => this.service.getProfile()).then(
          (res: any) => {
            this.profile = res;
          }
        );
      }
    })

  }

}
