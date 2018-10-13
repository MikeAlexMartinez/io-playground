import { NgModule } from '@angular/core';
import { ErrorMessagesComponent } from './error-messages/error-messages';
import { SkeletonCardComponent } from './skeleton-card/skeleton-card';
@NgModule({
	declarations: [ErrorMessagesComponent,
    SkeletonCardComponent],
	imports: [],
	exports: [ErrorMessagesComponent,
    SkeletonCardComponent]
})
export class ComponentsModule {}
