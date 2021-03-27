import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CenterComponent } from './layouts/center.component';
import { CreditsComponent } from './components/credits/credits.component';
import { CodingComponent } from './components/coding/coding.component';
import { FormsModule } from '@angular/forms';
import { BlockComponent } from './components/coding/block/block.component';
import { BinaryPipe } from './pipes/binary.pipe';
import { ResizableInputComponent } from './components/resizable-input/resizable-input.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { DecodingPageComponent } from './pages/decoding-page/decoding-page.component';
import { EncodingPageComponent } from './pages/encoding-page/encoding-page.component';
import { ButtonComponent } from './components/button/button.component';
import { RetroDirective } from './directives/retro.directive';
import { LineInputDirective } from './directives/line-input.directive';

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
    ButtonComponent,
    RetroDirective,
    LineInputDirective,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
