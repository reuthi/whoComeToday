import { Component, OnInit, ViewChildren } from '@angular/core';

import {KidService} from './kid.service';
import {KidModel} from './kid.model';
import {FilterByPipe} from '../shared/pipes/filter-list.pipe';
import {KidFilterComponent} from './kid-filter.component';
import {KidThumbComponent} from './kid-thumb.component';


@Component({
  moduleId: module.id,
  styleUrls: [`kid.css`],
  pipes: [FilterByPipe],
  directives: [KidFilterComponent, KidThumbComponent],
  template: `
    <section class="kidList">

      <kid-filter (filterChange)="filter = $event"></kid-filter>
      <a routerLink="/kid/edit" class="btn btn-primary">+ Add Kid</a>

      <ul>
        <li *ngFor="let kid of kids | filterBy:filter">
            <kid-thumb [kid]="kid"></kid-thumb>
            <div class="text-center">
              <button class="btn btn-danger" (click)="removeKid(kid.id)">Delete</button>
              <a routerLink="/kid/edit/{{kid.id}}" class="btn btn-success">Edit</a>
            </div>
        </li>
      </ul>
    </section>


  `
})
export class KidListComponent implements OnInit {
  // TODO: let the pipe setup the initial filter
  private filter;
  private kids : KidModel[] = [];

  constructor(private kidService : KidService) { }

  ngOnInit() {
    const prmKids = this.kidService.query();

    prmKids.then((kids : KidModel[]) => {
      this.kids = kids;
      console.log('kids', this.kids);
    });
    
    prmKids.catch(err => {
      alert('Sorry,cannot load the kids, try again later');
      console.log('Cought an error in kidList', err);
    });
  }

  removeKid(kidId : string) {
    this.kidService.remove(kidId)
      .then((kids : KidModel[])=>{
        this.kids = kids;
      });
  }
}
