import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SnsComponent } from './sns.component';

const routes: Routes = [
  { path: '', component: SnsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SnsRoutingModule { }
