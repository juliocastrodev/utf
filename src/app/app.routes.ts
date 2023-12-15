import { Routes } from '@angular/router'
import { HomePageComponent } from './pages/home/home-page.component'
import { EncodePageComponent } from './pages/encode/encode-page.component'
import { DecodePageComponent } from './pages/decode/decode-page.component'
import { NotFound404PageComponent } from './pages/not-found-404/not-found-404-page.component'

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'encode', component: EncodePageComponent },
  { path: 'decode', component: DecodePageComponent },
  { path: '**', pathMatch: 'full', component: NotFound404PageComponent },
]
