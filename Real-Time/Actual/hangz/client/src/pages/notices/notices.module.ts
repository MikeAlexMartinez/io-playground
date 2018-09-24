import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NoticesPage } from './notices';
import { SkeletonCardComponent } from '../../components/skeleton-card/skeleton-card';

@NgModule({
  declarations: [
    NoticesPage,
    SkeletonCardComponent
  ],
  imports: [
    IonicPageModule.forChild(NoticesPage)
  ],
  exports: [
    NoticesPage
  ]
})
export class NoticesPageModule {}