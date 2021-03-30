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
import { UnicodePipe } from './pipes/unicode.pipe';
import { FormatUnicodePipe } from './pipes/format-unicode.pipe';
import { UnicodeReferenceButtonComponent } from './components/unicode-reference-button/unincode-reference-button.component';
import { FlexComponent } from './layouts/flex.component';
import { EncodingWizardComponent } from './components/encoding-wizard/encoding-wizard.component';
import { ByteSequenceComponent } from './components/byte-sequence/byte-sequence.component';
import { ByteComponent } from './components/byte-sequence/byte/byte.component';
import { BitComponent } from './components/byte-sequence/byte/bit/bit.component';
import { BytesPipe } from './pipes/bytes.pipe';
import { SubstringFromOccurrencePipe } from './pipes/substring-from-occurrence.pipe';
import { BinaryInputComponent } from './components/binary-input/binary-input.component';
import { DecodingErrorComponent } from './components/decoding-error/decoding-error.component';
import { CharComponent } from './components/char/char.component';
import { DecodingWizardComponent } from './components/decoding-wizard/decoding-wizard.component';
import { NotByteSequenceComponent } from './components/decoding-error/not-byte-sequence/not-byte-sequence.component';
import { IncorrectAsciiComponent } from './components/decoding-error/incorrect-ascii/incorrect-ascii.component';
import { IncorrectFirstByteComponent } from './components/decoding-error/incorrect-first-byte/incorrect-first-byte.component';
import { IncorrectMiddleBytesComponent } from './components/decoding-error/incorrect-middle-bytes/incorrect-middle-bytes.component';
import { NotExistingUnicodeComponent } from './components/decoding-error/not-existing-unicode/not-existing-unicode.component';

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
    FlexComponent,
    UnicodePipe,
    FormatUnicodePipe,
    EncodingWizardComponent,
    ByteSequenceComponent,
    ByteComponent,
    BitComponent,
    BytesPipe,
    SubstringFromOccurrencePipe,
    BinaryInputComponent,
    DecodingErrorComponent,
    CharComponent,
    DecodingWizardComponent,
    NotByteSequenceComponent,
    IncorrectAsciiComponent,
    IncorrectFirstByteComponent,
    IncorrectMiddleBytesComponent,
    NotExistingUnicodeComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [BytesPipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
