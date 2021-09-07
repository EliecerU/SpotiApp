import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators'; 

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  accessToken:string = 'BQDsMfCe6pqgnSPUmd-1P-UtDSIKycQTdSoYe9aDAp4yaj35FSSB299wonHW-3mM9Nzg6lDb__n5QjlUjr0';

  constructor(private http: HttpClient) { 
    console.log('Spotify service listo');
  }

  getQuery( query:string ){
    const url = `https://api.spotify.com/v1/${ query }`;

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.accessToken}`
    });

    return this.http.get(url, {headers});
  }

  getNewReleases(){
    return this.getQuery('browse/new-releases?limit=20').
    pipe( map( (data:any) => data.albums.items) );
  }

  getArtistas( termino:string ){
    return this.getQuery(`search?q=${termino}&type=artist&limit=15`).
    pipe( map( (data:any)=>data.artists.items) );
  }

  getArtista( id:string ){
    return this.getQuery(`artists/${ id }`);
  }

  getTopTracks( id:string ){
    return this.getQuery(`artists/${id}/top-tracks?country=us`)
    .pipe( map( (data:any) => data.tracks) );
  }
}
