import { Component, OnInit, ViewChildren } from '@angular/core';
import {KidService} from '../admin/kid.service';
import {KidDashService} from './kid.dash.service';
import {KidModel} from '../admin/kid.model';
import {KidThumbDashComponent} from './kid-thumb.dash.component';




@Component({
  moduleId: module.id,
  directives: [KidThumbDashComponent],
  template: `

    <section class="dashboard">
      <h1> WHO IS HERE? </h1>
      <ul>
          <li class="scaling" *ngFor="let kid of kids" [class.is-here]="kid.isHere" [class.not-here]="!kid.isHere">
            <div class="isHereMark" *ngIf="kid.isHere && kidClicked">
              <img src="public/img/goodJob.png">
            </div>
            <kid-thumb-dash [kid]="kid" (click)="kidDashService.sendkidReport$.next(kid.id)"></kid-thumb-dash>
          </li>
      </ul>
      <div *ngIf="isAfterDeadLine" class="tblContacts"> 
        <h4> Call the parents: </h4>
        <div class="table-responsive">
          <table class="table table-hover">
            <tr>
              <th>Name</th>
              <th>Contact</th>
              <th>Phone</th>
            </tr>
            <tr *ngFor="let kid of kidsNotHere"> 
              <td>{{kid.name}} </td>
              <td>{{kid.contacts.title}} </td>
              <td>{{kid.contacts.phone}} </td>
            </tr>
          </table>
        </div>
      </div> 
      <footer class="footer navbar">
          <a routerLink="/kid" >
            <h4> admin page </h4>
          </a>
      </footer>
    </section>
  `
})
export class KidListDashComponent implements OnInit {
  
  // TODO: let the pipe setup the initial filter
  private filter;
  private kids : KidModel[] = [];
  private reportedKidIds: KidModel[];
  private isAfterDeadLine: boolean = false;
  private kidClicked = false;
  private kidsNotHere: KidModel[] = [];

  constructor(private kidService : KidService,
              private kidDashService : KidDashService) { }

  ngOnInit() {
    const prmKids = this.kidService.query();

    prmKids.then((kids : KidModel[]) => {
      this.kids = kids;
    });
    
    prmKids.catch(err => {
      alert('Sorry,cannot load the kids, try again later');
      console.log('Cought an error in kidList', err);
    });

    this.kidDashService.reportedKidIds$.subscribe((reportedKidIds) => {
        this.reportedKidIds = reportedKidIds;
        this.kids = this.updateKidReported(reportedKidIds);
    }); 

  }

  ngAfterContentChecked() {
    var d = new Date();
    let theCurrHour = d.getHours();
    let deadLine = 9;
    
    if (theCurrHour > deadLine) {
      this.isAfterDeadLine = true;
      this.kidsNotHere = this.kids.filter(kid => kid.isHere !== true);
      this.kidsNotHere.map(kid => kid.isHere = false);
    }

  }

  updateKidReported(reportedKidIds) {
    
    var audio = new Audio();
    audio.src = "public/sound/right.mp3";
    audio.load();
    audio.play();

    let kidsAfterFilter = [];
    //**TODO: from for loop to map?
    for (var i = 0; i < reportedKidIds.length; i++) {
        kidsAfterFilter = this.kids.filter(kid => kid.id === reportedKidIds[i])               
    }

    //**TODO: from for loop to map / filter?
    for (var i = 0; i < kidsAfterFilter.length; i++) {
      kidsAfterFilter[i].isHere = true;
    }

    this.kidClicked = true;
    setTimeout(function() {
       this.kidClicked = false;
    }.bind(this), 2500);
    
    return this.kids;
  }

}
