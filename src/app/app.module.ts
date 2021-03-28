import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CenterComponent } from './layouts/center.component';
import { CreditsComponent } from './components/credits/credits.component';
import { FormsModule } from '@angular/forms';
import { BinaryPipe } from './pipes/binary.pipe';
import { ResizableInputComponent } from './components/resizable-input/resizable-input.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { DecodingPageComponent } from './pages/decoding-page/decoding-page.component';
import { EncodingPageComponent } from './pages/encoding-page/encoding-page.component';
import { ButtonComponent } from './components/button/button.component';
import { RetroDirective } from './directives/retro.directive';
import { LineInputDirective } from './directives/line-input.directive';
import { SingleCharInputComponent } from './components/single-char-input/single-char-input.component';
import { ColumnComponent } from './layouts/column.component';
import { UnicodePipe } from './pipes/unicode.pipe';
import { FormatUnicodePipe } from './pipes/format-unicode.pipe';
import { UnicodeReferenceButtonComponent } from './components/unicode-reference-button/unincode-reference-button.component';
import { BinaryBlocksComponent } from './components/binary-blocks/binary-blocks.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    CenterComponent,
    CreditsComponent,
    BinaryPipe,
    ResizableInputComponent,
    DecodingPageComponent,
    EncodingPageComponent,
    ButtonComponent,
    RetroDirective,
    LineInputDirective,
    SingleCharInputComponent,
    UnicodeReferenceButtonComponent,
    ColumnComponent,
    UnicodePipe,
    FormatUnicodePipe,
    BinaryBlocksComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
