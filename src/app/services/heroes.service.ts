import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Heroe } from '../interfaces/heroe.interface';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  heroesURL: string = "https://heroesapp-f1b19.firebaseio.com/heroes.json";
  heroeURL: string = "https://heroesapp-f1b19.firebaseio.com/heroes/";

  constructor(private http: HttpClient) {
   }

   nuevoHeroe(heroe: Heroe){
    //para entrar en la pagina de firebase
    //https://console.firebase.google.com/project/heroesapp-f1b19/database/heroesapp-f1b19/data/heroes

    let body = JSON.stringify(heroe);
    let headers = new HttpHeaders({
      'Content-type':'application/json'
    });
    return this.http.post( this.heroesURL, body, { headers })
    .pipe(map( res=>{
                  console.log(res);
                  return res;
                }))
   }

   actualizarHeroe(heroe: Heroe, key$: string){

    let body = JSON.stringify(heroe);
    let headers = new HttpHeaders({
      'Content-type':'application/json'
    });

    let url = `${this.heroeURL}/${ key$ }.json`;
    return this.http.put( url , body, { headers })
    .pipe(map( res=>{
                  console.log(res);
                  return res;
                }));
   }

   getHeroe(key$:string){
   
    let url = `${this.heroeURL}/${ key$ }.json`;
    return this.http.get( url )
                  .pipe(map(res=>{
                    console.log(res);
                    return res;
                  }));
   }

   getHeroes(){
    return this.http.get( this.heroesURL )
                  .pipe(map(res=>{
                    console.log(res);
                    return res;
                  }));
   }

   borrarHeroe( key$: string){

    //let body = JSON.stringify(heroe);
    let headers = new HttpHeaders({
      'Content-type':'application/json'
    });

    let url = `${this.heroeURL}/${ key$ }.json`;
    return this.http.delete( url )
    .pipe(map( res=>{
                  console.log(res);
                  return res;
                }));
   }
}
