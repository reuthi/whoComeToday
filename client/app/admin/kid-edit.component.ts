import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, REACTIVE_FORM_DIRECTIVES, FormControl} from '@angular/forms';
import {KidService} from './kid.service';
import {KidModel} from './kid.model';
import {UploadDemoComponent} from '../shared/upload-demo/upload-demo.component'
import {FILE_UPLOAD_DIRECTIVES, FileUploader} from 'ng2-file-upload';

@Component({
  moduleId: module.id,
  templateUrl: 'kid-edit.component.html',
  directives: [FILE_UPLOAD_DIRECTIVES,REACTIVE_FORM_DIRECTIVES, UploadDemoComponent]
})
export class KidEditComponent implements OnInit {

  private frmKid: FormGroup;
  private kidToEdit: KidModel;
  public uploader:FileUploader;

  constructor(  private formBuilder: FormBuilder,
                private route: ActivatedRoute,
                private router: Router,
                private kidService: KidService) {
        this.uploader = new FileUploader({url: kidService.url});
        
    }

  ngOnInit() {
    this.prepareForm();
    this.route.params.subscribe(params => {
        const id = params['id'];
        // This means EDIT mode
        if (id) {
          this.kidService.get(id)
            .then((kid) =>{

                this.kidToEdit = kid;
                console.log('in edit, ajax returned : ',  this.kidToEdit);
                console.log('this.frmKid.controls ', this.frmKid.controls);
                (<FormControl>this.frmKid.controls['name']).updateValue(kid.name);
                // (<FormControl>this.frmKid.controls['power']).updateValue(kid.power);
                (<FormControl>this.frmKid.controls['birthdate']).updateValue(kid.birthdate);
                // (<FormControl>this.frmKid.controls['title']).updateValue(kid.contacts);
                // (<FormControl>this.frmKid.controls['phone']).updateValue(kid.contacts);
                
                // (<FormControl>this.frmKid.controls['title']).updateValue(kid.contacts);
                
                
            });
        }
      });
  }
  save() {
      // if there is a file to upload, use the uploader to update both file and form data
      if (this.uploader.getNotUploadedItems().length) {
          this.uploader.onBuildItemForm = (fileItem: any, form: any) => {

            let contacts = JSON.stringify(this.frmKid.value.contacts);
              form.append('name', this.frmKid.value.name);
              form.append('birthdate', this.frmKid.value.birthdate);
              form.append('contacts', contacts);
          };
            console.log('Uploading Both Data and Files...');
            
          this.uploader.uploadAll();
           
      } else {
          // if file upload support is not needed, go regular:
          const kidId = (this.kidToEdit) ? this.kidToEdit.id : undefined;
          this.kidService.save(this.frmKid.value, kidId)
              .then(() => {
                  this.router.navigate(['/kid']);
              });
      }
  }

  prepareForm() {
     this.frmKid = this.formBuilder.group({
      name: ['',
              Validators.compose([Validators.required,
                                  Validators.minLength(3),
                                  Validators.maxLength(100)])],
      birthdate: ['', Validators.required],
      contacts: this.formBuilder.group({
            title: ['', Validators.required],
            phone: ['', Validators.required]
      })
      
    });
  }
}
