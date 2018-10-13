import { Component } from '@angular/core';

/**
 * Generated class for the SkeletonCardComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'skeleton-card',
  templateUrl: 'skeleton-card.html'
})
export class SkeletonCardComponent {

  text: string;

  constructor() {
    console.log('Hello SkeletonCardComponent Component');
    this.text = 'Hello World';
  }

}
