import { Component, OnInit } from '@angular/core';
import { AlbumManagerService } from '../album-manager.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit {

  constructor(private service: AlbumManagerService, private route: ActivatedRoute, private router: Router) { }

  albums: any[];
  nextToken: string;
  nodeId: string;
  nodeName: string;
  searchValue: string;
  searchMode = false;

  ngOnInit() {
    this.nodeId = this.route.snapshot.paramMap.get('nodeId');
    this.nodeName = this.route.snapshot.paramMap.get('nodeName');
    this.service.getLoginStatus().then((res) => {
      if (res.status === "connected") {
        this.init();
      } else {
        this.router.navigate(['/']);
      }
    });
  }

  init() {
    this.service.getAlbumsSortedByUpdateTimeDesc(this.nodeId).then(
      (res: any) => this.setAlbums(res)
    );
  }

  onScroll() {
    console.log('scrolled!!')
    if (!this.searchMode && this.nextToken) {
      this.service.getNextAlbumsSortedByUpdateTimeDesc(this.nextToken).then(
        (res: any) => this.setAlbums(res)
      );
    }
  }

  setAlbums(res) {
    {
      if (!this.albums) {
        this.albums = [];
      }
      this.albums.push.apply(this.albums, res.data);
      if (res.paging && res.paging.next) {
        this.nextToken = res.paging.next;
      } else {
        this.nextToken = null;
      }
    }
  }

  searchAlbums(searchValue) {
    this.searchValue = searchValue;
    this.searchMode = true;
    this.albums = null;
    this.service.getAllAlbumsSortedByCreationDateDesc(this.nodeId).then(
      (res: any) => this.albums = res.filter(this.filterBySearchValue.bind(null, searchValue))
    );
  }

  filterBySearchValue(searchValue, album) {
    return album.name && album.name.search(searchValue) > -1;
  }

  showAll() {
    this.searchMode = false;
    this.albums = null;
    this.init();
  }
}
