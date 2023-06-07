import { Component, OnInit } from '@angular/core';
import { ConnexionService } from '../connexion.service';
import { NgForm } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  registerForm!: FormGroup;
  loginForm!: FormGroup;

  constructor(private conService: ConnexionService,
              private http: HttpClient,
              private formBuilder: FormBuilder) {
                this.registerForm = this.formBuilder.group({
                  username: ['', Validators.required],
                  password: ['', Validators.required],
                  Confirmpassword: ['', Validators.required]
                });
                this.loginForm = this.formBuilder.group({
                  username: ['', Validators.required],
                  password: ['', Validators.required],
                });
               }

  ngOnInit(): void {
    this.conService.userTest()
  }

  submitRegister(){
    const usernameForm = this.registerForm.value.username;
    const passwordForm = this.registerForm.value.password;
    const confirmForm = this.registerForm.value.Confirmpassword;

    const formData = {
      username: usernameForm,
      password: passwordForm
    };

    if(passwordForm === confirmForm){
      console.log(formData)
      this.http.post("http://localhost:3000/api/user", formData,{responseType: "text"}).subscribe((resultData: any) => {
        console.log("YEEEES" + resultData)
        this.registerForm.reset();
      })
    } else {
      console.log("C PAS LES MÊMES OH");
    }
  }

  submitLogin() {
    const usernameForm = this.loginForm.value.username;
    const passwordForm = this.loginForm.value.password;

    const loginData = {
      username: usernameForm,
      password: passwordForm
    };

    this.http.post<any>('http://localhost:3000/api/login', loginData)
      .subscribe(
        response => {
          const userId = response.userId;
          const token = response.token;

          localStorage.setItem('userId', userId);
          localStorage.setItem('token', token);

          console.log('LOGIN MARCHE')
        },
        error => {
          console.error(error);
        }
      );
  }
}