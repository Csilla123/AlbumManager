import { Component, OnInit } from '@angular/core';
import { AlbumManagerService } from '../album-manager.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  constructor(private service: AlbumManagerService,private route: ActivatedRoute, private router: Router) { }
  
    groups:any[];
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
      this.service.getGroups(this.profileId).then(
        (res: any) => {
          this.groups = res;
        });
     
    } 
}
