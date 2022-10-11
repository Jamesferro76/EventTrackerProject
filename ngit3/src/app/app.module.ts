import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { InUsePipe } from './pipes/in-use.pipe';
import { PostedPipe } from './pipes/posted.pipe';
import { PersonalSiteComponent } from './components/personal-site/personal-site.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavigationComponent,
    InUsePipe,
    PostedPipe,
    PersonalSiteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [InUsePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
