import { Component, OnInit, EventEmitter } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'kid-filter',
  outputs: ['filterChange'],
  styles: [`section {background-color: trandparent; margin: 2em 0; padding:0.4em 1em 1em; border-radius:0.4em} `],
  template: `
      <section>
        <h3>Filter</h3>
        By Name: <input type="text" [(ngModel)]="filter.byName" (input)="filterChanged()" />
      </section>

  `
})

export class KidFilterComponent implements OnInit {

  private filterChange = new EventEmitter();

  private filter = {byName: '', byPower: ''};
  constructor() { }

  ngOnInit() { }
  filterChanged() {
    this.filterChange.emit(this.filter);
  }

}
