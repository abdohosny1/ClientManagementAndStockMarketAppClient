import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListClientComponent } from './components/list-client/list-client.component';
import { AddandUpadateClientComponent } from './components/addand-upadate-client/addand-upadate-client.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { NavComponent } from './components/nav/nav.component';
import { SharedModule } from './shared/shared.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoadingInterceptorInterceptor } from './Interceptor/loading-interceptor.interceptor';
import { ServerErrorComponent } from './components/server-error/server-error.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TextInputComponent } from './form/text-input/text-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetailsClientComponent } from './components/details-client/details-client.component';


@NgModule({
  declarations: [
    AppComponent,
    ListClientComponent,
    AddandUpadateClientComponent,
    NotFoundComponent,
    NavComponent,
    ServerErrorComponent,
    TextInputComponent,
    DetailsClientComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [
    // {provide:HTTP_INTERCEPTORS,useClass:ErrorInterceptor,multi:true},
    {provide:HTTP_INTERCEPTORS,useClass:LoadingInterceptorInterceptor,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
