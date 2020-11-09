import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, AuthenticationService } from '../_services';

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService
    ) {
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {

        console.log("submitted");

        this.submitted = true;
        console.log("submitted1");
        // reset alerts on submit
        this.alertService.clear();
        console.log("submitted2");
        // stop here if form is invalid
        if (this.loginForm.invalid) {
            console.log("submitted3");
            return;
        }
        console.log("submitted4");
        this.loading = true;
        console.log("submitted5");
        /*
        this.authenticationService.login(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                    console.log("submitted6");
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                    console.log("submitted7");
                });
        */
        this.router.navigate(["/home"]);
        console.log("submitted6");
    }
}
