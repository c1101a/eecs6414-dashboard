import { Component, OnInit } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { ApiService } from 'src/app/services/api.service';

am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private api: ApiService) { }
  comments: any;
  topics: any;

  ngOnInit(): void {
    this.api.getComments().subscribe((data: any) => {
      this.comments = data;
      this.comments.sort(function (a, b) {
        if (a.userId < b.userId) { return 11; }
        if (a.userId > b.userId) { return -1; }
        return 0;
      })
    })
    this.api.getTopics().subscribe((data: any) => {
      this.topics = data;
    })
  }
}
