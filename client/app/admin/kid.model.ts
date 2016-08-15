export class KidModel {
  
  constructor(public name: string, 
              public birthdate, 
              private _id: string, 
              public imgUrl: string,
              public contacts?: Object,
              public isHere?: boolean
              ) 
      {
        this.birthdate = new Date(birthdate);
  }

  get id() {
    return this._id;
  }
  getImgUrl() {
    return `public/img/monster/${this.name}.png`;
  }
}
