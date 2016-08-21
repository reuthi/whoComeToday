import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';

import {KidModel} from '../admin/kid.model'; 



@Injectable()
export class LoginService {
    
    private baseUrl = 'http://localhost:3003/login/user/';

    constructor(private http: Http,
                private route: ActivatedRoute,
                private router: Router) { }

     public get url() {
      return this.baseUrl;
    }

     save(userData: any) {

         let response: any;
         let prmUser: any; // promise to kidModel?

         const url = this.baseUrl;
         
         response = this.http.post(url, userData);

         prmUser = response.toPromise()
             .then((res: any) => {
                 const resJson = res;
                console.log(resJson)

                // ****TODO: fix the bug of the connection - even if not succesful - navigate to kidsDashboard
                // ****this navigate anyway:
                 this.router.navigate(['/kidsdashboard']);
                
                // const jsonKids = resJson.class; 
                //  return jsonKids.map((jsonKid: any) => {
                //      let jsonKidContacts = JSON.parse(jsonKid.contacts);
                //     console.log('jsonKids', jsonKids)
                //      return new KidModel(jsonKid.name, jsonKid.birthdate,
                //          jsonKid._id, jsonKid.imgUrl,
                //          jsonKidContacts)
                //  })
             });


         prmUser.catch(err => {
             console.log('LoginService::save - Problem talking to server', err);
         });
         return prmUser;
     }
}

