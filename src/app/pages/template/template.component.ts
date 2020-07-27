import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {
  
  usuario = {
    nombre: '',
    apellido: '',
    email: ''
  };

  constructor( private paisService: PaisService  ) { }

  ngOnInit(): void {
    this.paisService.getPaises().subscribe( piases => {
      console.log();
      
    } );
  }

  guardar( forma: NgForm ){
    console.log('disparado');
    if ( forma.invalid ){
      Object.values ( forma.controls ).forEach( control => {
        control.markAsTouched();
      });
    }
    
  }

}
