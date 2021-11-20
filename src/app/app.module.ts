import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaggerComponent } from './tagger/tagger.component';
import { FormsModule } from '@angular/forms';
import { PdfTaggerComponent } from './pdf-tagger/pdf-tagger.component';

@NgModule({
  declarations: [
    AppComponent,
    TaggerComponent,
    PdfTaggerComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
