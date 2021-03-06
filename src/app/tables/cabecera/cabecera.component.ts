import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Output, EventEmitter } from '@angular/core';
import { CrudService } from 'src/app/shared/crud.service';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent implements OnInit {

  @Input() titulo!:string;
  @Output() newItemEvent = new EventEmitter<object>(); 
  
  region!:any;

  constructor(private crud: CrudService) { }

  profileForm = new FormGroup({
    lat_ini: new FormControl(),
    lat_fin: new FormControl(),
    region: new FormControl(0),
    csn: new FormControl(true),
    gnss: new FormControl(true),
    rna: new FormControl(true),
    verde: new FormControl(true),
    amarillo: new FormControl(true),
    rojo: new FormControl(true)
  });

  ngOnInit(): void {
    this.crud.getData('Region').subscribe(reg => {
      this.region = reg;
    })
  }


  onSubmit() {
    this.newItemEvent.emit([this.profileForm.value]);
    // console.log(this.profileForm.value);
  }

}
