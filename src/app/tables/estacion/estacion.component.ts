import { AfterViewInit, Component, OnInit } from '@angular/core';

import { CrudService } from 'src/app/shared/crud.service';
import { RethinkService } from 'src/app/shared/rethink.service';
import { Observable } from 'rxjs';
import { from, of } from 'rxjs';
import { delay, repeat } from 'rxjs/operators';
import { concatMap } from 'rxjs/operators';
import { isNull } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'app-estacion',
  templateUrl: './estacion.component.html',
  styleUrls: ['./estacion.component.css']
})
export class EstacionComponent implements OnInit, AfterViewInit {

  imagen!:string;
  net!:string;
  codigo!:string;
  now = 0;

  constructor(private crud: CrudService, private re: RethinkService) { }

  ngAfterViewInit(): void {

    this.espera();
  }
  
  p=0;
  data!:any;
  titulo="Estaciones";
  stations:any={};
  endtime:any = {}
  latency:any = {}

  select(newItem: any) { 

     //console.log('newItem->', newItem);

     var lat_ini = newItem[0].lat_ini;
     var lat_fin = newItem[0].lat_fin;
     if (lat_ini == null) { lat_ini = -20; }
     if (lat_fin == null) { lat_fin = -60; }
    
    this.crud.getLatitude(lat_ini, lat_fin, newItem[0].region, newItem[0].csn, newItem[0].gnss, newItem[0].rna).subscribe(data => { 
      this.data=data; 
    });
       
  }

  getstations() {
    this.re.getData().subscribe(stations => { 
      // console.log(stations);

      

      this.stations = stations;

      /* Estaciones */
      this.data.forEach((dat:any) => {
        var cod = this.stations[dat.codigo];
        if (cod) {
          var time = new Date().valueOf();
          var endtime = time/1000 - cod.endtime;
          this.endtime[dat.codigo] = parseFloat(endtime.toFixed(1));
          this.latency[dat.codigo] = cod.latency; 
        }
        
      });

    });
  }

espera() {
  const delayedThing = of(1).pipe(delay(3000));
  delayedThing
  .pipe(repeat())
  .subscribe(() => this.getstations());
}


mostra_sismo(net:string, code:string): void {
    // alert([net, code]); 
    
    if (net == 'GPS') { 
     
    this.re.getPlot(code).subscribe((dat:any) => {
       this.imagen = "assets/gps/" + code + "/" + dat.jl  + "/" + dat.image;
       this.net = net;
       this.codigo = code;
     }
   );
   } else {
   

    this.re.getGraph(net,code).subscribe((dat:any) => {
       this.imagen = "assets/img/sismo/" + net + "/" + code + "/" + dat.jl  + "/" + dat.image;
       this.net = net;
       this.codigo = code;
     }
   );
  }
   
}

  ngOnInit(): void {
    
    this.crud.getLatitude(-20,-60,0,true,false,false).subscribe(data => { 
      this.data=data;            
    });    

  }

}
