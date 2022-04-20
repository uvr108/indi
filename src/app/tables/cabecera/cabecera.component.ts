import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent implements OnInit {

  @Input() titulo!:string;
  @Output() newItemEvent = new EventEmitter<object>(); 
  
  constructor() { }

  profileForm = new FormGroup({
    lat_ini: new FormControl(''),
    lat_fin: new FormControl(''),
    region: new FormControl('0'),
    csn: new FormControl('True'),
    gnss: new FormControl('True'),
    rna: new FormControl('True'),
  });

  ngOnInit(): void {
  }


  onSubmit() {
    this.newItemEvent.emit([this.profileForm.value]);
    console.log(this.profileForm.value);
  }

}
