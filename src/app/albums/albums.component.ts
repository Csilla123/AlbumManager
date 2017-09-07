import { Component, OnInit } from '@angular/core';
import { AlbumManagerService } from '../album-manager.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit {

  constructor(private service: AlbumManagerService, private route: ActivatedRoute,private router: Router) { }

  albums:any[];
  groupId: string;
  groupName: string;

  ngOnInit() {
    this.groupId = this.route.snapshot.paramMap.get('groupId');
    this.groupName = this.route.snapshot.paramMap.get('groupName');
    this.service.getLoginStatus().then((res) => {
      if (res.status === "connected") {
        this.init();
      } else {
        this.router.navigate(['/']);
      }
    });
  }

  init() {
    this.service.getAllAlbumsSortedByCreationDateDesc(this.groupId).then(
      (res: any) => {
        this.albums = res;
      }
    );
  }
}
