import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateBoardPage } from './create-board';

@NgModule({
  declarations: [
    CreateBoardPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateBoardPage),
  ],
})
export class CreateBoardPageModule {}
