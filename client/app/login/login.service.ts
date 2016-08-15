import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class LoginService {
    
    private baseUrl = 'http://localhost:3003/login';

    constructor(private http: Http) { }

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
                 const jsonUser = res.json();
                 console.log('jsonUser', jsonUser)
                 //   return new KidModel(jsonKid.name, jsonKid.birthdate, 
                 //                       jsonKid.id, jsonKid.imgUrl,
                 //                       jsonKid.contacts);
             });

         prmUser.catch(err => {
             console.log('LoginService::save - Problem talking to server', err);
         });
         return prmUser;
     }
}

