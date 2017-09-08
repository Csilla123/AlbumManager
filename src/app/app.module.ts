import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

import { FacebookModule } from 'ngx-facebook';
import { GroupsComponent } from './groups/groups.component';
import { AlbumsComponent } from './albums/albums.component';
import { PhotosComponent } from './photos/photos.component';
import { ProfileComponent } from './profile/profile.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AlbumManagerService } from './album-manager.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { PagesComponent } from './pages/pages.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    GroupsComponent,
    AlbumsComponent,
    PhotosComponent,
    ProfileComponent,
    NotFoundComponent,
    AboutComponent,
    ContactComponent,
    PagesComponent
  ],
  imports: [
    BrowserModule,
    InfiniteScrollModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    NgbModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
     
      }
    }),
    FacebookModule.forRoot(),
    RouterModule.forRoot([
      { path: '', component: ProfileComponent },
      { path: 'groups/:userId', component: GroupsComponent },
      { path: 'pages/:userId', component: PagesComponent },
      { path: 'albums/:nodeId/:nodeName', component: AlbumsComponent },
      { path: 'albums/:nodeId', component: AlbumsComponent },
      { path: 'photos/:nodeId/:nodeName/:sort', component: PhotosComponent },
      { path: 'photos/:nodeId/:nodeName', component: PhotosComponent },
      { path: 'photos/:nodeId', component: PhotosComponent },
      { path: 'about', component: AboutComponent },
      { path: 'contact', component: ContactComponent },
      { path: '**', component: NotFoundComponent },
    ])
  ],
  providers: [AlbumManagerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
