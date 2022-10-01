import {Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import {MainService} from "./main.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@UntilDestroy()
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit{
  form: FormGroup;
  currentUser = null as any;
  users = [] as any;
  error = null;

  constructor(
    private mainService: MainService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.form = this.formBuilder.group(
      {
        name: ['', [Validators.required]],
        role: ['user', [Validators.required]],
      },
    );
  }

  ngOnInit(): void {
    this.getCurrentUser()
    }

    getCurrentUser(){
      this.mainService.getCurrentProfile().pipe(untilDestroyed(this))
        .subscribe({
          next: (result) => {
            this.currentUser = result;
          },
          error: () => {
            this.currentUser = null;
            console.log('user login error')
          },
        });
    }

  login(){
    let formData = { ...this.form.value }; // get form data
     console.log(formData)
    this.mainService.login(formData)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: () => {
          console.log('user login success')
          this.getCurrentUser()
        },
        error: () => {
          console.log('user login error')
        },
      });
  }

  logout(){
    this.mainService.logout()
      .subscribe({
      next: () => {
        console.log('user log out success')
        this.getCurrentUser()
      },
    });
  }

  getUsers(){
    this.mainService.getUsers()
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (result) => {
          this.users  =result.users
        },
        error: (error) => {
          this.error= error.message
        },
      });
  }
}
