import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToastService } from 'src/app/services/toast/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {

  currentYear: number = new Date().getFullYear();

  signinForm: UntypedFormGroup;
  submitAttempt: boolean;

  constructor(
    private authService: AuthService,
    private loadingController: LoadingController,
    private formBuilder: UntypedFormBuilder,
    private toastService: ToastService,
    private router: Router
  ) { }

  ngOnInit() {

    // Setup form
    this.signinForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.email, Validators.required])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });

    // DEBUG: Prefill inputs
    this.signinForm.get('email').setValue('john.doe@mail.com');
    this.signinForm.get('password').setValue('123456');
  }

  // Sign in
  async signIn() {

    this.submitAttempt = true;

    // If email or password empty
    if (this.signinForm.value.email === '' || this.signinForm.value.password === '') {
      this.toastService.presentToast('Error', 'Please input email and password', 'top', 'danger', 2000);

    } else {

      // Proceed with loading overlay
      const loading = await this.loadingController.create({
        cssClass: 'default-loading',
        message: '<p>Signing in...</p><span>Please be patient.</span>',
        spinner: 'crescent'
      });
      await loading.present();

      // TODO: Add your sign in logic
      // ...

      // Fake timeout
      setTimeout(async () => {

        // Sign in success
        await this.router.navigate(['/home']);
        loading.dismiss();
      }, 2000);

    }
  }
}
