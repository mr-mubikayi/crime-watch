/* eslint-disable max-len */
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
    private router: Router) { }

  ngOnInit() {

    this.signupForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.email, Validators.required])],
      userName: ['', Validators.required],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
      passwordRepeat: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });
  }

  async signUp() {

    this.submitAttempt = true;

    // If email or password empty
    if(this.signupForm.value.email === '' ||
       this.signupForm.value.password === '' ||
       this.signupForm.value.passwordRepeat === '') {

        this.toastService.presentToast('Error', 'Please fill in all fields', 'top', 'danger', 4000);

      // If passwords do not match
    } else if(this.signupForm.value.password !== this.signupForm.value.passwordRepeat) {
      this.toastService.presentToast('Error', 'Passwords entered do not match', 'top', 'danger', 4000);

    } else{
      const loading = await this.loadingController.create({
        cssClass: 'default-loading',
        message: 'Signing up...',
        spinner: 'crescent'
      });

      await loading.present();

      //Register user
      this.authService
        .registerUser(this.signupForm.value.email, this.signupForm.value.password)
        .then((userCredential) => {
          const user = userCredential.user;
          const userName = this.signupForm.value.userName;

          //Set user name
          user.updateProfile({
            displayName: userName
          }).then(() => {

            //Send verification email
            this.authService.sendVerificationMail()
            .then(() => {
              this.toastService.presentToast('Success', 'Verification email sent successfully, please check your email', 'top', 'success', 4000);
              this.router.navigate(['/verify-email']);
              loading.dismiss();
            })
            .catch(async (error) => {
              switch(error.code){
                case 'auth/too-many-requests':
                  this.toastService.presentToast('Error', 'Error sending verification email, please try again in few minutes', 'top', 'danger', 4000);
                  loading.dismiss();
                break;
                default:
                  this.toastService.presentToast('Error', `${error.code} ${error.message}`, 'top', 'danger', 4000);
                  loading.dismiss();
                break;
              }
            });
          })
          .catch(async (error) => {
            this.toastService.presentToast('Error', `${error.code} ${error.message}`, 'top', 'danger', 4000);
            loading.dismiss();
          });
        })
        .catch(async (error) => {
          switch(error.code){
            case 'auth/email-already-in-use':
              this.toastService.presentToast('Error', 'User already exist, please proceed to sign in.', 'top', 'medium', 4000);
              this.router.navigate(['/signin']);
              loading.dismiss();
            break;
            case 'auth/invalid-email':
              this.toastService.presentToast('Error', 'Email format is incorect, please change.', 'top', 'danger', 4000);
              loading.dismiss();
            break;
            case 'auth/weak-password':
              this.toastService.presentToast('Error', 'Password should be at least 6 characters.', 'top', 'danger', 4000);
              loading.dismiss();
            break;
            case 'auth/too-many-requests':
                this.toastService.presentToast('Error', 'Error signing up, please try again in few minutes', 'top', 'danger', 4000);
                loading.dismiss();
              break;
            default:
              this.toastService.presentToast('Error', `${error.message}`, 'top', 'danger', 4000);
              loading.dismiss();
            break;
          }
        }
      );
    }
  }
}
