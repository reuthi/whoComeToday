import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import {KidModel} from './kid.model'; 

@Injectable()
export class KidService {


  private baseUrl = 'http://localhost:3003/data/kid/';
  constructor(private http: Http) {}


  public get url() {
      return this.baseUrl;
  }

  // query (GETs a list)
  query(): Promise<KidModel[]> {

    let prmKids = this.http.get(this.baseUrl)
      .toPromise()
      .then(res => {
        const jsonKids = res.json();
        console.log('jsonKids', jsonKids)
        return jsonKids.map((jsonKid : any) => {
          let jsonKidContacts = JSON.parse(jsonKid.contacts);
          return new KidModel(jsonKid.name, jsonKid.birthdate ,
                        jsonKid._id, jsonKid.imgUrl,
                        jsonKidContacts) 
          })
      });

    prmKids.catch(err => {
      console.log('KidService::query - Problem talking to server');
    });

    return prmKids;
  }

  // get (GETs a single)
  get(id: string) : Promise<KidModel> {
    let prmKid = this.http.get(this.baseUrl + id)
      .toPromise()
      .then(res => {
        const jsonKid = res.json();
        let jsonKidContacts = JSON.parse(jsonKid.contacts);
        return new KidModel(jsonKid.name, jsonKid.birthdate, 
                            jsonKid._id, jsonKid.imgUrl,
                            jsonKidContacts);
      });

    prmKid.catch(err => {
      console.log('KidService::get - Problem talking to server');
    });
    return prmKid;

  }

  // DELETE 
  remove(id: string) : Promise<KidModel[]> {
    let prmKid = this.http.delete(this.baseUrl + id)
      .toPromise()
      .then(res => {
        return this.query();
      });

    prmKid.catch(err => {
      console.log('KidService::remove - Problem talking to server', err);
    });
    return prmKid;
  }

  // save - Adds (POST) or update (PUT)  
  save(kidData: any, id?: string) : Promise<KidModel>{

    let response : any;
    let prmKid : Promise<KidModel>;

    if (id) {
      const url = this.baseUrl + id;
      response = this.http.put(url, kidData)
    } else {
	    const url = this.baseUrl;
       response = this.http.post(url, kidData)
    }


    prmKid = response.toPromise()
      .then((res : any) => {
          const jsonKid = res.json();
          console.log('jsonKid', jsonKid)
          return new KidModel(jsonKid.name, jsonKid.birthdate, 
                              jsonKid.id, jsonKid.imgUrl,
                              jsonKid.contacts);
      });

    prmKid.catch(err => {
      console.log('KidService::save - Problem talking to server', err);
    });
    return prmKid;
  }
}
