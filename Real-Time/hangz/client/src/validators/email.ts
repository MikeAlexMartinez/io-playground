import { Injectable } from '@angular/core';
import { AuthProvider } from '../providers/auth/auth';
import { FormControl } from '@angular/forms';

@Injectable()
export class EmailValidator {
  debouncer: any;

  constructor (
    public authProvider: AuthProvider,
  ) { }

  checkEmail(control: FormControl): Promise<any> {
    clearTimeout(this.debouncer);

    return new Promise(resolve => {
      this.debouncer = setTimeout(() => {
        this.authProvider.validateEmail(control.value).subscribe((res) => {
          if(res.ok) {
            resolve(null);
          }
        }, (err) => {
          resolve({'emailInUse': true});
        });
      }, 1000);
    });
  }
}
