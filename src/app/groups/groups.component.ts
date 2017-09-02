import { Component, OnInit } from '@angular/core';
import { AlbumManagerService } from '../album-manager.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  constructor(private service: AlbumManagerService,private route: ActivatedRoute) { }
  
    groups = [];
    profileId :string;
  
    ngOnInit() {
     this.profileId =  this.route.snapshot.paramMap.get('userId');
     this.init();
    }
  
    init() {
      this.service.getGroups(this.profileId).then(
        (res: any) => {
          this.groups = res;
        });
     
    } 
}
