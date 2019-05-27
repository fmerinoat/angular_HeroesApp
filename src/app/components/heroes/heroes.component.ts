import { Component, OnInit } from '@angular/core';
import { HeroesService } from 'src/app/services/heroes.service';
import { Heroe } from 'src/app/interfaces/heroe.interface';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styles: []
})
export class HeroesComponent implements OnInit {
  
  heroes: any;
  loading: boolean = true;

  constructor(private _heroesService: HeroesService) { 
    this._heroesService.getHeroes().subscribe( data => {
      console.log(data);
      this.heroes = data;
      this.loading = false;
    })
  }

  ngOnInit() {
  }

  borraHeroe(key$: string){
    this._heroesService.borrarHeroe(key$)
            .subscribe(respuesta=> {
              if(respuesta){
                console.log('no entra a eliminar de la lista');
                console.error(respuesta);
              }else{
                console.log('entra a eliminar de la lista');
                //Eliminacion correcta
                //eliminamos el objeto de los objetos
                delete this.heroes[key$];
              }
    });
  }
}
