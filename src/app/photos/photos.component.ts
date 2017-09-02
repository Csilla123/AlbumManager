import { Component, OnInit } from '@angular/core';
import { AlbumManagerService } from '../album-manager.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {

  constructor(private service: AlbumManagerService, private route: ActivatedRoute) { }
  
    photos = [];
    albumId :string;
    albumName :string;
  
    ngOnInit() {
     this.albumId =  this.route.snapshot.paramMap.get('albumId');
     this.albumName =  this.route.snapshot.paramMap.get('albumName');
     this.init();
    }
  
    init() {
      this.service.getAlbumPhotos(this.albumId).then(
        (res: any) => {
          this.photos = res;
        }
      );
    } 
}
