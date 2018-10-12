import { Injectable } from '@angular/core';
import { AuthProvider } from '../providers/auth/auth';
import { FormControl } from '@angular/forms';

@Injectable()
export class UsernameValidator {

  debouncer: any;

  constructor (
    public authProvider: AuthProvider
  ) { }

  checkUsername(control: FormControl): Promise<any> {

    clearTimeout(this.debouncer);

    return new Promise(resolve => {
      
      this.debouncer = setTimeout(() => {

        this.authProvider.validateUsername(control.value).subscribe((res) => {
          if (res.ok) {
            resolve(null)
          }
        }, (err) => {
          resolve({'usernameInUse': true});
        });

      }, 1000);
    });
  }
}
