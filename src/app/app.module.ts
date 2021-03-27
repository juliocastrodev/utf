import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CenterComponent } from './layout/center.component';
import { HomeComponent } from './page/home/home.component';
import { CreditsComponent } from './components/credits/credits.component';
import { CodingComponent } from './components/coding/coding.component';
import { FormsModule } from '@angular/forms';
import { BlockComponent } from './components/coding/block/block.component';
import { BinaryPipe } from './pipe/binary.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CenterComponent,
    CreditsComponent,
    CodingComponent,
    BlockComponent,
    BinaryPipe,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
