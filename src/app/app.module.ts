import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule} from '@angular/router';

import { AppComponent } from './app.component';

import { FacebookModule } from 'ngx-facebook';
import { GroupsComponent } from './groups/groups.component';
import { AlbumsComponent } from './albums/albums.component';
import { PhotosComponent } from './photos/photos.component';
import { ProfileComponent } from './profile/profile.component';
import { NotFoundComponent } from './not-found/not-found.component';
import {AlbumManagerService} from './album-manager.service';

@NgModule({
  declarations: [
    AppComponent,
    GroupsComponent,
    AlbumsComponent,
    PhotosComponent,
    ProfileComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    FacebookModule.forRoot(),
    RouterModule.forRoot([
      {path:'', component: ProfileComponent},
      {path:'groups/:userId', component: GroupsComponent},
      {path:'albums/:groupId/:groupName', component: AlbumsComponent},
      {path:'photos/:albumId/:albumName', component: PhotosComponent},
      {path:'**', component: NotFoundComponent},
    ])
  ],
  providers: [AlbumManagerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
