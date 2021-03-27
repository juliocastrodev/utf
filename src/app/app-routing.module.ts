import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DecodingPageComponent } from './pages/decoding-page/decoding-page.component';
import { EncodingPageComponent } from './pages/encoding-page/encoding-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';

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
