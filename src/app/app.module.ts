import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CenterComponent } from './layout/center.component';
import { HomeComponent } from './page/home/home.component';
import { CreditsComponent } from './components/credits/credits.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, CenterComponent, CreditsComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
