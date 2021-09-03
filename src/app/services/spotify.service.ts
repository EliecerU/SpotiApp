import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators'; 

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  accessToken:string = 'BQD2uMoq7LY9QFkqM4eq8oDIr2ZGzb6lNCo9khpUgzIhFjwpr0B18uUjsoyiMisbp2DrYtfz7gw8k9d67YXT3Hzdv7iOo0G42B2vuSFmy7K8lUyu8422Z__m08UExe7UrVivvjwv';

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
    
    // this.http.get('https://api.spotify.com/v1/browse/new-releases?limit=20', { headers }).
    // pipe( map( (data:any) => data.albums.items) ); 
  }

  getArtista( termino:string ){
    return this.getQuery(`search?q=${termino}&type=artist&limit=15`).
    pipe( map( (data:any)=>data.artists.items) );
    
    //   this.http.get(`https://api.spotify.com/v1/search?q=${termino}&type=artist&limit=15`, { headers }).
    //   pipe( map( (data:any)=>data.artists.items) );
  }
}
