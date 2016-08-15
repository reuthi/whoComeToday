import { Component, OnInit } from '@angular/core';
import {KidModel} from '../admin/kid.model';
import {KidDashService} from './kid.dash.service';


@Component({
  moduleId: module.id,
  selector: 'kid-thumb-dash',
  inputs: ['kid'],
  template: `
          <section>
            <p class="kidName">{{kid.name}}</p>
              <img class="imgKid" [src]="kid.imgUrl"/>
          </section>
          `
})
export class KidThumbDashComponent implements OnInit {

  private kid : KidModel;

  constructor(private kidDashService : KidDashService) { }

  ngOnInit() { 
      
    
  }
}
