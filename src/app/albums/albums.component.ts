import { Component, OnInit } from '@angular/core';
import { AlbumManagerService } from '../album-manager.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit {

  constructor(private service: AlbumManagerService,private route: ActivatedRoute) { }
  
    albums = [];
    groupId :string;
    groupName:string;
  
    ngOnInit() {
     this.groupId =  this.route.snapshot.paramMap.get('groupId');
     this.groupName =  this.route.snapshot.paramMap.get('groupName');
     this.init();
    }
  
    init() {
     this.service.getAllAlbumsSortedByCreationDateDesc(this.groupId).then(
        (res: any) => {
          this.albums = res;
        }
      );
    } 
}
