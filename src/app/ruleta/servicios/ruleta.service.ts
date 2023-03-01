import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { FetchAllRuletaResponse, Ruleta } from '../interfaces/ruleta.interfaces';

@Injectable({
  providedIn: 'root'
})
export class RuletaService {

  private url: string = 'https://pokeapi.co/api/v2';

  constructor( private http: HttpClient ) { }


  getAllRuleta(): Observable<Ruleta[]> {
    return this.http.get<FetchAllRuletaResponse>(`${ this.url }/ruleta?limit=1500`)
              .pipe( 
                map( this.transformSmallRuletaIntoRuleta )
              )
  }

  private transformSmallRuletaIntoRuleta( resp: FetchAllRuletaResponse ): Ruleta[] {

    const ruletaList: Ruleta[] = resp.results.map( rule => {

      const urlArr = rule.url.split('/');
      const id  = urlArr[6];
      const pic = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${ id }.png`;

      return {
        id,
        pic,
        name: rule.name,
      }
    })

    return ruletaList;
  }
  

}