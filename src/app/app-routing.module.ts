import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DecodingPageComponent } from './page/decoding-page/decoding-page.component';
import { EncodingPageComponent } from './page/encoding-page/encoding-page.component';
import { HomePageComponent } from './page/home-page/home-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'encode', component: EncodingPageComponent },
  { path: 'decode', component: DecodingPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
