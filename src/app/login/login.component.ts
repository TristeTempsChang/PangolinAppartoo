import { Component, OnInit } from '@angular/core';
import { ConnexionService } from '../connexion.service';
import { NgForm } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {

  registerForm!: FormGroup;
  loginForm!: FormGroup;

  constructor(private http: HttpClient,
              private router: Router,
              private messageService: MessageService,
              private formBuilder: FormBuilder) {
                this.registerForm = this.formBuilder.group({
                  username: ['', Validators.required],
                  password: ['', Validators.required],
                  Confirmpassword: ['', Validators.required],
                  email: ['', Validators.required]
                });
                this.loginForm = this.formBuilder.group({
                  username: ['', Validators.required],
                  password: ['', Validators.required],
                });
               }

  ngOnInit(): void {
    
  }

  submitRegister(){
      const usernameForm = this.registerForm.value.username;
      const passwordForm = this.registerForm.value.password;
      const confirmForm = this.registerForm.value.Confirmpassword;
      const emailForm = this.registerForm.value.email;
      var validRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
      console.log(usernameForm)

      const formData = {
        username: usernameForm,
        password: passwordForm,
        status: "Nouveau",
        email: emailForm,
        prenom: "Non défini",
        nom: "Non défini",
        adresse: "Non définie",
        ville: "Non définie",
        pays: "Non défini",
        codePostal: "Non défini",
        bio: "Non définie",
      };

      if(formData.username === "" || formData.email === "" || formData.password === "" || confirmForm === ""){
        this.messageService.add({ severity: 'error', summary: 'Error', detail: "Un ou des champs du formulaire sont vide !" });
      } else if(!validRegex.test(emailForm)) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: "Adresse mail non valide !" });
      } else if(formData.password != confirmForm) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: "Le mot de passe et sa confirmation ne correspondent pas..." });
      } else {
        this.http.post("http://localhost:3000/api/user", formData,{responseType: "text"}).subscribe((resultData: any) => {
          this.messageService.add({ severity: 'success', summary: 'Ajouté !', detail: 'Utilisateur inscrit avec succès' });
          this.registerForm.reset();
      })
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
          const token = response.token;
          const userId = response.userId;
  
          localStorage.setItem('token', token);
          localStorage.setItem('userId', userId);
          console.log(token);
          console.log(userId);
  
          this.router.navigateByUrl('user');
        },
        error => {
          this.loginForm.reset();
          this.messageService.add({ severity: 'error', summary: 'Error', detail: "L'identifiant ou le mot de passe ne sont pas corrects..." });
          console.error(error);
        }
      );
  }
}