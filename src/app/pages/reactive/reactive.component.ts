import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ValidadoresService } from '../../services/validadores.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  forma: FormGroup;

  constructor( private fb: FormBuilder, private validadores: ValidadoresService) { 
    this.crearFormulario();
    // this.cargarDataAlFormulario();
   }

  ngOnInit(): void {
  }

  //Forma de obtener una propiedad
  get nombreNovalido(){
    return this.forma.get('nombre').invalid && this.forma.get('nombre').touched;
  }

  get apellidoNovalido(){
    return this.forma.get('apellido').invalid && this.forma.get('apellido').touched;
  }

  get emailNovalido(){
    return this.forma.get('email').invalid && this.forma.get('email').touched;
  }

  get distritoNovalido(){
    return this.forma.get('direccion.distrito').invalid && this.forma.get('direccion.distrito').touched;
  }
  
  get ciudadNovalido(){
    return this.forma.get('direccion.ciudad').invalid && this.forma.get('direccion.ciudad').touched;
  }

  get pasatiempos(){
    return this.forma.get('pasatiempos') as FormArray;
  }

  agregarPasatiempo() {
    this.pasatiempos.push(  this.fb.control('')  );
  }

  borrarPasatiempo(i: number){
    this.pasatiempos.removeAt(i);
  }

  get pass1NoValido() {
    return this.forma.get('pass1').invalid && this.forma.get('pass1').touched;
  }

  get pass2NoValido() {
    const pass1 = this.forma.get('pass1').value;
    const pass2 = this.forma.get('pass2').value;

    return ( pass1 === pass2 ) ? false : true;
  }

  get usuarioNoValido(){
    return this.forma.get('usuario').invalid && this.forma.get('usuario').touched;
  }


  crearFormulario() {

    this.forma = this.fb.group({
      nombre  : ['', [ Validators.required, Validators.minLength(5) ]  ],
      apellido: ['', [Validators.required, this.validadores.noHerrera ] ],
      correo  : ['', [ Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')] ],
      usuario : ['', , this.validadores.existeUsuario ],
      pass1   : ['', Validators.required ],
      pass2   : ['', Validators.required ],
      direccion: this.fb.group({
        distrito: ['', Validators.required ],
        ciudad  : ['', Validators.required ],
      }),
      pasatiempos: this.fb.array([])
    },{
      validators: this.validadores.passwordsIguales('pass1','pass2')
    });

  }

  guardar(){
    console.log(this.forma);
    if ( this.forma.invalid ){
     return Object.values ( this.forma.controls ).forEach( control => {
      if ( control instanceof FormGroup ){
        Object.values ( control.controls ).forEach( control => control.markAllAsTouched() );
      }
      else {
        control.markAsTouched();
      }
      });
    
  }
  }

  cargarDataAlFormulario(){
    this.forma.reset( {
      nombre: "Antonio",
      apellido: "Juarez",
      email: "antony@gmail.com",
      direccion: {
        distrito: "Ontario",
        ciudad: "Ottawa"
      }
    });
  }
