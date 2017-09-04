import { Injectable } from '@angular/core';
import { FacebookService, LoginResponse, LoginOptions } from 'ngx-facebook';
import { environment } from './../environments/environment';
import * as moment from 'moment';

@Injectable()
export class AlbumManagerService {

  static instance: AlbumManagerService;
  albumCache = [];
  appId = '1652103354863381';

  constructor(private fb: FacebookService) {
    if (!AlbumManagerService.instance) {
      console.log('ENV IS ', environment);

      if (environment.production) {
        this.appId = '540883586242921';
      }

      this.fb.init({
        appId: this.appId,
        version: 'v2.10'
      });


    }
    return AlbumManagerService.instance = AlbumManagerService.instance || this;
  }

  /**
* Login with additional permissions/options
*/
  loginWithOptions() {

    const loginOptions: LoginOptions = {
      enable_profile_selector: true,
      return_scopes: true,
     // scope: 'public_profile,user_friends,email,pages_show_list,user_photos, user_managed_groups'
      scope: 'public_profile,user_friends,email, user_managed_groups'
    };

    return this.fb.login(loginOptions)
      .then((res: LoginResponse) => {
        console.log('Logged in', res);
        res;
      })
      .catch(this.handleError);

  }

  getLoginStatus() {
    return this.fb.getLoginStatus();
  }

  /**
* This is a convenience method for the sake of this example project.
* Do not use this in production, it's better to handle errors separately.
* @param error
*/
  private handleError(error) {
    console.error('Error processing action', error);
  }

  /**
  * Get the user's profile
  */
  getProfile() {
    return this.fb.api('/me')
      .then((res: any) => {
        console.log('Got the users profile', res);
        return res;
      })
      .catch(this.handleError);
  }


  /**
  * Get albums for given profile
  */
  getGroups(userId: string) {
    return this.fb.api('/' + userId + '/groups')
      .then((res: any) => {
        console.log('Got groups', res);
        return res.data;
      })
      .catch(this.handleError);
  }

  getAllAlbumsSortedByCreationDateDesc(groupId: string) {
    let albums: any[];
    let cachedAlbums = this.findInCahce(this.albumCache, groupId);
    if (cachedAlbums) {
      return Promise.resolve(cachedAlbums.data);
    }
    return this.fb.api('/' + groupId + '/albums?limit=100&fields=cover_photo{images},name,description,created_time,link')
      .then((res: any) => {
        albums = res.data;
        if (res.paging.next) {
          return this.getNextAlbums(res.paging.next, albums).then((res: any) => {
            this.albumCache.push({ id: groupId, data: albums });
            return albums.sort(this.sortedByCreationDateDesc);
          });
        } else {
          this.albumCache.push({ id: groupId, data: albums });
          return albums.sort(this.sortedByCreationDateDesc);
        }

      })
      .catch(this.handleError);
  }

  findInCahce(cache: any[], key: string) {
    return cache.find((elem) => { return elem.id === key });
  }

  sortedByCreationDateDesc(a, b) {
    let first = moment(a.created_time);
    let second = moment(b.created_time);
    if (first.isAfter(second)) {
      return -1;
    } else if (first.isSame(second)) {
      return 0;
    } else {
      return 1;
    }
  }

  getNextAlbums(next, albums) {
    return this.fb.api(next).then((res: any) => {
      albums.push.apply(albums, res.data);
      if (res.paging.next) {
        return this.getNextAlbums(res.paging.next, albums);
      } else {
        return;
      }
    });
  }

  /**
* Get albums for given group
*/
  getAlbumPhotos(albumId: string) {
    let photos: any[];
    return this.fb.api('/' + albumId + '/photos?fields=name,images,reactions.limit(100),comments.limit(100)')
      .then((res: any) => {
        photos = this.mapPhotosArray(res.data);
        if (res.paging.next) {
          return this.getNextPhotos(res.paging.next, photos).then((res: any) => {
            return photos.sort(this.sortByLikesDesc);
          });
        } else {
          return photos.sort(this.sortByLikesDesc);
        }
      })
      .catch(this.handleError);
  }

  getNextPhotos(next, photos) {
    return this.fb.api(next).then((res: any) => {
      photos.push.apply(photos, this.mapPhotosArray(res.data));
      if (res.paging.next) {
        return this.getNextPhotos(res.paging.next, photos);
      } else {
        return;
      }
    });
  }
  mapPhotosArray(photos) {
    return photos.map(this.mapPhoto);
  }

  sortByLikesDesc(a, b) {
    return parseInt(b.likes, 10) - parseInt(a.likes, 10);
  }

  mapPhoto(photo) {
    return {
      id: photo.id,
      name: photo.name,
      likes: photo.reactions ? photo.reactions.data.length : 0,
      source: photo.images[0].source,
      comments: photo.comments ? photo.comments.data.map(comment => comment.from.name + ": " + comment.message).join(";") : ""
    }
  }

}
