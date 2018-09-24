import { Component } from '@angular/core';

/**
 * Generated class for the SkeletonCardComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
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
