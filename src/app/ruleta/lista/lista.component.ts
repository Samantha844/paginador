import { Component, OnInit } from '@angular/core';
import { Ruleta } from '../interfaces/ruleta.interfaces';
import { RuletaService } from '../servicios/ruleta.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})

export class ListaComponent implements OnInit {

  public ruleta: Ruleta[] = [];
  public page: number = 0;
  public search: string = '';

  constructor( private ruletaService: RuletaService ) { }

  ngOnInit(): void {

    this.ruletaService.getAllRuleta()
      .subscribe( ruleta => {
        this.ruleta = ruleta;
      });

  }

  nextPage() {
    this.page += 5;
  }

  prevPage() {
    if ( this.page > 0 )
      this.page -= 5;
  }

  onSearchRuleta( search: string ) {
    this.page = 0;
    this.search = search;
  }

}
