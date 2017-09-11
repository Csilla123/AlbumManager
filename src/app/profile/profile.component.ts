import { Component, OnInit } from '@angular/core';
import { AlbumManagerService } from '../album-manager.service';
import { Router} from '@angular/router';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private service: AlbumManagerService, private router: Router) { }
  profile = {
    id: '',
    name: ''
  };
  logged = false;

  ngOnInit() {
    this.init();
  }

  getGroups() {
    this.router.navigate(['/groups', this.profile.id]);
  }

  getPages() {
    this.router.navigate(['/pages', this.profile.id]);
  }

  getPhotos() {
    this.router.navigate(['/photos', this.profile.id, "", "DATE"]);
  }

  getAlbums() {
    this.router.navigate(['/albums', this.profile.id]);
  }

  init() {
      this.service.getLoginStatus().then((res) => {
        if (res.status === "connected") {
          this.logged = true;
          this.service.getProfile().then(
            (res: any) => {
              this.profile = res;
            });
        }
      })
  }
}
