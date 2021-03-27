import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CenterComponent } from './layout/center.component';
import { CreditsComponent } from './components/credits/credits.component';
import { CodingComponent } from './components/coding/coding.component';
import { FormsModule } from '@angular/forms';
import { BlockComponent } from './components/coding/block/block.component';
import { BinaryPipe } from './pipe/binary.pipe';
import { ResizableInputComponent } from './components/resizable-input/resizable-input.component';
import { HomePageComponent } from './page/home-page/home-page.component';
import { DecodingPageComponent } from './page/decoding-page/decoding-page.component';
import { EncodingPageComponent } from './page/encoding-page/encoding-page.component';
import { RetroTitleComponent } from './components/retro-title/retro-title.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    CenterComponent,
    CreditsComponent,
    CodingComponent,
    BlockComponent,
    BinaryPipe,
    ResizableInputComponent,
    DecodingPageComponent,
    EncodingPageComponent,
    RetroTitleComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
