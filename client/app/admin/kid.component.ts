import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {KidService} from './kid.service';
import {KidModel} from './kid.model';


@Component({
  moduleId: module.id,
  styleUrls: [`kid.css`],
  template: `
    <section *ngIf="kid">
      <h2>Kid {{kid.name}}</h2>
      <img [src]="kid.imgUrl" >
    </section>
  `
})
export class KidComponent implements OnInit {

  private kid : KidModel;

  constructor(
                private route: ActivatedRoute,
                private kidService : KidService
  ) { }

  ngOnInit() {
   this.route.params.subscribe(params => {
    //  console.log('Params are: ', params);
     const id = params['id'];
     const prmKid = this.kidService.get(id);
     prmKid.then((kid: KidModel) => {
       this.kid = kid;
     });
   });
  }



}
