import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, REACTIVE_FORM_DIRECTIVES, FormControl} from '@angular/forms';
import { LoginService } from './login.service'


@Component({
    moduleId: module.id,
    directives: [REACTIVE_FORM_DIRECTIVES],
    // selector: 'login-component',
    template: `
    <section class="loginCopmonent">
        <h3>Login</h3>
        <form [formGroup]="loginForm" (submit)="save()" >
            <div class="form-group">
            <label>Name:</label>
            <input type="text" class="form-control" formControlName="username" autofocus>
          </div>  
          <div class="form-group">
            <label>Password:</label>
            <input type="password" class="form-control" formControlName="pass">
          </div> 
          <div class="form-group">   
            <button type="submit" [disabled]="!loginForm.valid" class="btn btn-default">Log in</button>         
          </div>
        </form> 
    </section>
    
    `
})
export class LoginComponent implements OnInit {
    private loginForm: FormGroup;

    constructor(private formBuilder: FormBuilder,
                private loginService: LoginService) { }

    ngOnInit() { 
        this.prapereForm();
    }

    prapereForm() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            pass: ['', Validators.required]
        })
    }

    save(){
        console.log('this.loginForm.value: ', this.loginForm.value) 
        this.loginService.save(this.loginForm.value)
    //    console.log(classFromUser)
    }
}