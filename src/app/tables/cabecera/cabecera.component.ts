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
    lat_ini: new FormControl(-20.00),
    lat_fin: new FormControl(-60.00),
    region: new FormControl(0),
    csn: new FormControl(true),
    gnss: new FormControl(false),
    rna: new FormControl(true),
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
