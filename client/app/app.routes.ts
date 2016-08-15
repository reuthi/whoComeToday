// export const ROUTER_PROVIDERS = [
// ];

import { PLATFORM_DIRECTIVES } from '@angular/core';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {KidListComponent} from './admin/kid-list.component';
import {KidListDashComponent} from './dashboard/kid-list.dash.component';
import {KidComponent} from './admin/kid.component';
import {KidEditComponent } from './admin/kid-edit.component';
import {ChatRoomComponent} from './chat/chat-room.component';
import { RouterConfig, ROUTER_DIRECTIVES, provideRouter } from '@angular/router';


const routes: RouterConfig = [
  { path: '', component: LoginComponent },
  { path: 'kidsdashboard', component: KidListDashComponent },
  { path: 'login', component: LoginComponent },      
  { path: 'kid', component: KidListComponent },
  { path: 'kid/edit', component: KidEditComponent },
  { path: 'kid/edit/:id', component: KidEditComponent },
  { path: 'kid/:id/:name', component: KidComponent },
  { path: 'chat', component: ChatRoomComponent }

];

export const ROUTER_PROVIDERS = [
  provideRouter(routes),
  {provide: PLATFORM_DIRECTIVES, useValue: ROUTER_DIRECTIVES, multi: true}
];
