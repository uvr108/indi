import { AfterViewInit, Component, OnInit } from '@angular/core';

import { CrudService } from 'src/app/shared/crud.service';
import { RethinkService } from 'src/app/shared/rethink.service';
import {Observable} from 'rxjs';
import { from, of } from 'rxjs';
import { delay, repeat } from 'rxjs/operators';
import { concatMap } from 'rxjs/operators';


@Component({
  selector: 'app-estacion',
  templateUrl: './estacion.component.html',
  styleUrls: ['./estacion.component.css']
})
export class EstacionComponent implements OnInit, AfterViewInit {

  imagen!:string;
  net!:string;
  code!:string;

  constructor(private crud: CrudService, private re: RethinkService) { }

  ngAfterViewInit(): void {

    this.espera();
  }
  
  p=0;
  data!:any;
  titulo="Estaciones";
  stations:any={};

  select(newItem: any) { 

     console.log('newItem->', newItem);
    
    this.crud.getLatitude(newItem[0].lat_ini, newItem[0].lat_fin, newItem[0].region, newItem[0].csn, newItem[0].gnss, newItem[0].rna).subscribe(data => { 
      this.data=data; 
    });
       
  }

  getstations() {
    this.re.getData().subscribe(stations => { 
      // console.log(stations);
      this.stations = stations; 
    });
  }

espera() {
  const delayedThing = of(1).pipe(delay(3000));
  delayedThing
  .pipe(repeat())
  .subscribe(() => this.getstations());
}


mostra_sismo(net:string, code:string): void {
    // alert(net); 
    if (net == 'GPS') { 
     
    this.re.getPlot(code).subscribe((dat:any) => {
       this.imagen = "assets/gps/" + code + "/" + dat.jl  + "/" + dat.image;
       this.net = net;
       this.code = code;
     }
   );
   } else {
   

    this.re.getGraph(net,code).subscribe((dat:any) => {
       this.imagen = "assets/img/sismo/" + net + "/" + code + "/" + dat.jl  + "/" + dat.image;
       this.net = net;
       this.code = code;
     }
   );
  }
     
}

  ngOnInit(): void {
  
    
    this.crud.getLatitude(-20,-60,0,true,true,true).subscribe(data => { 
      this.data=data;
      /*
      this.data.forEach((dat:any) => {
        console.log(dat.code);
        this.stations[dat.code] = '';
      });
      */
    });    

  }

}
