import { Component, OnInit } from '@angular/core';
import { AlbumManagerService } from '../album-manager.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {

  constructor(private service: AlbumManagerService, private route: ActivatedRoute, private router: Router) { }

  photos: any[];
  albumId: string;
  albumName: string;
  sort:string;
  nextToken: string;

  ngOnInit() {
    this.albumId = this.route.snapshot.paramMap.get('nodeId');
    this.albumName = this.route.snapshot.paramMap.get('nodeName');
    this.sort = this.route.snapshot.paramMap.get('sort');
    if(!this.sort){
      this.sort = "LIKE";
    }
    this.service.getLoginStatus().then((res) => {
      if (res.status === "connected") {
        this.init();
      } else {
        this.router.navigate(['/']);
      }
    });
  }

  init() {
    if (this.sort === "LIKE") {
      this.service.getAllPhotos(this.albumId).then(
        (res: any) => {
          this.photos = res;
        }
      );
    } else if (this.sort === "DATE") {
      this.service.getPhotosSortedByUpdateTimeDesc(this.albumId).then(
        (res: any) => this.setPhotos(res)
      );
    }
  }

  onScroll() {
    console.log('scrolled!!');
    if (this.sort === "DATE") {
      if (this.nextToken) {
        this.service.getNextPhotosSortedByUpdateTimeDesc(this.nextToken).then(
          (res: any) => this.setPhotos(res)
        );
      }
    }
  }

  setPhotos(res) {
    {
      if (!this.photos) {
        this.photos = [];
      }
      this.photos.push.apply(this.photos, res.data);
      if (res.paging && res.paging.next) {
        this.nextToken = res.paging.next;
      } else {
        this.nextToken = null;
      }
    }
  }
}
