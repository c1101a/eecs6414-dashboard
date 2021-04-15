import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { UsersComponent } from './components/users/users.component';
import { EmotionRadarComponent } from './components/emotion-radar/emotion-radar.component';
import { LineGraphComponent } from './components/line-graph/line-graph.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StackedBarComponent } from './components/stacked-bar/stacked-bar.component';
import { LolipopChartComponent } from './components/lolipop-chart/lolipop-chart.component';
import { UserRadarComponent } from './components/user-radar/user-radar.component';
import { StackedGeneralComponent } from './components/stacked-general/stacked-general.component';
import { ChordChartComponent } from './components/chord-chart/chord-chart.component';
import { TopicScatterComponent } from './components/topic-scatter/topic-scatter.component';
import { WordCloudComponent } from './components/word-cloud/word-cloud.component';
import { UsersStackedBarComponent } from './components/users-stacked-bar/users-stacked-bar.component';
import { BarRaceComponent } from './components/bar-race/bar-race.component';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { SubredditRadarComponent } from './components/subreddit-radar/subreddit-radar.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UsersComponent,
    EmotionRadarComponent,
    LineGraphComponent,
    StackedBarComponent,
    LolipopChartComponent,
    UserRadarComponent,
    StackedGeneralComponent,
    ChordChartComponent,
    TopicScatterComponent,
    WordCloudComponent,
    UsersStackedBarComponent,
    BarRaceComponent,
    PieChartComponent,
    SubredditRadarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
