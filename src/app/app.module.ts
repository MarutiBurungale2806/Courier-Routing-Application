import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { RouteFormComponent } from './components/route-form/route-form.component';
import { RouteDisplayComponent } from './components/route-display/route-display.component';
import { GeoencodingService } from './services/geoencoding.service';
import { RoutingService } from './services/routing.service';
import { RoutePlannerComponent } from './components/route-planner/route-planner.component';

@NgModule({
  declarations: [
    AppComponent,
    RouteFormComponent,
    RouteDisplayComponent,
    RoutePlannerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [GeoencodingService, RoutingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
