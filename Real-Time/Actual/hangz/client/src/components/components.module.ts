import { NgModule } from '@angular/core';
import { ErrorMessagesComponent } from './error-messages/error-messages';
import { CommonModule } from '@angular/common';
import { SkeletonCardComponent } from './skeleton-card/skeleton-card';

@NgModule({
	declarations: [ ErrorMessagesComponent,
    SkeletonCardComponent ],
	imports: [ CommonModule ],
	exports: [ ErrorMessagesComponent,
    SkeletonCardComponent ]
})
export class ComponentsModule {}
