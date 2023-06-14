import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToastService } from 'src/app/services/toast/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  currentYear: number = new Date().getFullYear();

  signupForm: UntypedFormGroup;
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
    this.signupForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.email, Validators.required])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
      passwordRepeat: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });
  }

  // Sign up
  async signUp() {

    this.submitAttempt = true;

    // If email or password empty
    if (this.signupForm.value.email === '' || this.signupForm.value.password === '' || this.signupForm.value.password_repeat === '') {
      this.toastService.presentToast('Error', 'Please fill in all fields', 'top', 'danger', 4000);

      // If passwords do not match
    } else if (this.signupForm.value.password !== this.signupForm.value.password_repeat) {
      this.toastService.presentToast('Error', 'Passwords must match', 'top', 'danger', 4000);

    } else {

      // Proceed with loading overlay
      const loading = await this.loadingController.create({
        cssClass: 'default-loading',
        message: '<p>Signing up...</p><span>Please be patient.</span>',
        spinner: 'crescent'
      });
      await loading.present();

      // TODO: Add your sign up logic
      // ...

      // Success messages + routing
      this.toastService.presentToast('Welcome!', 'Lorem ipsum', 'top', 'success', 2000);
      await this.router.navigate(['/home']);
      loading.dismiss();
    }

  }

}
