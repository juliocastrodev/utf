import { Routes } from '@angular/router'
import { HomePageComponent } from './pages/home/home-page.component'
import { EncodingPageComponent } from './pages/enconding/encoding-page.component'
import { DecodingPageComponent } from './pages/decoding/decoding-page.component'
import { NotFound404PageComponent } from './pages/not-found-404/not-found-404-page.component'

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'encoding', component: EncodingPageComponent },
  { path: 'decoding', component: DecodingPageComponent },
  { path: '**', pathMatch: 'full', component: NotFound404PageComponent },
]
