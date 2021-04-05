import { EventEmitter, Output, SimpleChanges } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';

/* Imports */
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
//am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-users-stacked-bar',
  templateUrl: './users-stacked-bar.component.html',
  styleUrls: ['./users-stacked-bar.component.css']
})
export class UsersStackedBarComponent implements OnInit {

  @Input() comments: any;
  @Output() filterUser = new EventEmitter<string>();
  constructor() { }

  private stackedUserChart: am4charts.XYChart;
  users;
  data = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['comments'] && this.comments) {
      this.data = [];
      this.users = [...new Set(this.comments.map(x => x.userId))]
      this.users.forEach(user => {
        this.data.push({
          user: user,
          anger: this.comments.filter(x => x.userId == user && x.emotion == 'anger').length,
          sadness: this.comments.filter(x => x.userId == user && x.emotion == 'sadness').length,
          fear: this.comments.filter(x => x.userId == user && x.emotion == 'fear').length,
          neutral: this.comments.filter(x => x.userId == user && x.emotion == 'neutral').length,
          surprise: this.comments.filter(x => x.userId == user && x.emotion == 'surprise').length,
          joy: this.comments.filter(x => x.userId == user && x.emotion == 'joy').length,
        })
      });
      this.stackedUserChart.data = this.data;
    }
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    // Create chart instance
    let chart = am4core.create("user-stacked", am4charts.XYChart);

    // Create axes
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "user";
    categoryAxis.renderer.grid.template.location = 0;


    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.inside = true;
    valueAxis.renderer.labels.template.disabled = true;
    valueAxis.min = 0;

    // Create series
    function createSeries(field, name, color, emitter) {

      // Set up series
      let series = chart.series.push(new am4charts.ColumnSeries());
      series.name = name;
      series.dataFields.valueY = field;
      series.dataFields.categoryX = "user";
      // series.sequencedInterpolation = true;

      // Make it stacked
      series.stacked = true;

      // Configure columns
      series.columns.template.width = am4core.percent(60);
      series.columns.template.tooltipText = "{user} | " + name + ": {valueY}";
      series.columns.template.fill = am4core.color(color);

      series.columns.template.events.on("hit", function (ev: any) {
        emitter.emit(ev.target.dataItem.dataContext.user);
      }, this);

      // Add label
      let labelBullet = series.bullets.push(new am4charts.LabelBullet());
      labelBullet.label.text = "{valueY}";
      labelBullet.locationY = 0.5;
      labelBullet.label.hideOversized = true;

      return series;
    }

    createSeries("anger", "Anger", "#cc00cc", this.filterUser);
    createSeries("sadness", "Sadness", "#3333ff", this.filterUser);
    createSeries("fear", "Fear", "#009933", this.filterUser);
    createSeries("neutral", "Neutral", "#ffff00", this.filterUser);
    createSeries("surprise", "Surprise", "#ff9900", this.filterUser);
    createSeries("joy", "Joy", "#ff0000", this.filterUser);

    // Legend
    chart.legend = new am4charts.Legend();

    chart.padding(0, 50, 30, 50);

    chart.scrollbarX = new am4core.Scrollbar();
    //chart.scrollbarY = new am4core.Scrollbar();

    this.stackedUserChart = chart;

  }

}
