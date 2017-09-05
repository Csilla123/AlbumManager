import { Component, OnInit } from '@angular/core';
import { AlbumManagerService } from '../album-manager.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  constructor(private service: AlbumManagerService,private route: ActivatedRoute, private router: Router) { }
  
    pages = [];
    profileId :string;
  
    ngOnInit() {
     this.profileId =  this.route.snapshot.paramMap.get('userId');
     this.service.getLoginStatus().then((res) => {
      if (res.status === "connected") {
        this.init();
      } else {
        this.router.navigate(['/']);
      }
    });
    }
  
    init() {
      this.service.getPages(this.profileId).then(
        (res: any) => {
          this.pages = res;
        });
     
    } 
}