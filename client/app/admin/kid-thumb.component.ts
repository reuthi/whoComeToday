import { Component, OnInit } from '@angular/core';
import {KidModel} from './kid.model';

@Component({
  moduleId: module.id,
  selector: 'kid-thumb',
  inputs: ['kid'],
  template: `
          <section>
            <p>{{kid.name}}</p>
            <a routerLink="/kid/{{kid.id}}/{{kid.name}}">
              <img class="imgKid" [src]="kid.imgUrl" />
            </a>
            <h6> Birthdate: {{kid.birthdate | date}}</h6>
          </section>
          `

})
export class KidThumbComponent implements OnInit {

  private kid : KidModel;

  constructor() { }

  ngOnInit() { 
    
  }

}
