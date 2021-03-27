import { SimpleChanges } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';

/* Imports */
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-lolipop-chart',
  templateUrl: './lolipop-chart.component.html',
  styleUrls: ['./lolipop-chart.component.css']
})
export class LolipopChartComponent implements OnInit {

  @Input() comments: any;

  constructor() { }

  private lolipopChart: am4charts.XYChart;
  data = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['comments'] && this.comments) {
      /* Add data */
      //this.lolipopChart.data = this.comments;
      [...new Set(this.comments.map(x => x.userId))].forEach(user => {
        this.data.push({
          userId: user,
          score: this.comments.find(x => x.userId == user).scorePerUser
        })
      });
      // this.data.sort(function (a, b) {
      //   if (a.score < b.score) { return -1; }
      //   if (a.score > b.score) { return 1; }
      //   return 0;
      // })
      this.lolipopChart.data = this.data;
    }
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    let chart = am4core.create("lolipop", am4charts.XYChart);

    let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.dataFields.category = "userId";
    categoryAxis.renderer.minGridDistance = 15;
    categoryAxis.renderer.grid.template.location = 0.5;
    categoryAxis.renderer.grid.template.strokeDasharray = "1,3";
    //categoryAxis.renderer.labels.template.rotation = -90;
    categoryAxis.renderer.labels.template.horizontalCenter = "left";
    categoryAxis.renderer.labels.template.location = 0.5;

    categoryAxis.renderer.labels.template.adapter.add("dy", function (dy, target) {
      return -target.maxRight / 2;
    })

    let valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.renderer.ticks.template.disabled = true;
    valueAxis.renderer.axisFills.template.disabled = true;

    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.categoryY = "userId";
    series.dataFields.valueX = "score";
    series.tooltipText = "{valueX.value}";
    series.sequencedInterpolation = true;
    series.fillOpacity = 0;
    series.strokeOpacity = 0;
    //series.strokeDasharray = "1,3";
    //series.columns.template.width = 0.01;
    //series.tooltip.pointerOrientation = "horizontal";

    let bullet = series.bullets.create(am4charts.CircleBullet);

    chart.cursor = new am4charts.XYCursor();

    chart.scrollbarX = new am4core.Scrollbar();
    chart.scrollbarY = new am4core.Scrollbar();

    this.lolipopChart = chart;
  }

}
