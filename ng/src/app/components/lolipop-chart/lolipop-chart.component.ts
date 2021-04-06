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
    // categoryAxis.renderer.grid.template.disabled = true;
    // categoryAxis.renderer.labels.template.disabled = true;

    categoryAxis.renderer.labels.template.adapter.add("dy", function (dy, target) {
      return -target.maxRight / 2;
    })

    let valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.renderer.ticks.template.disabled = true;
    valueAxis.renderer.axisFills.template.disabled = true;
    valueAxis.min = -2;
    valueAxis.max = 2;
    valueAxis.strictMinMax = true;
    valueAxis.renderer.grid.template.disabled = true;
    valueAxis.renderer.labels.template.disabled = true;

    // let anger = valueAxis.axisRanges.create();
    // anger.value = -2;
    // anger.endValue = -1;
    // anger.axisFill.fill = am4core.color("purple");
    // anger.axisFill.fillOpacity = 0.2;
    // anger.grid.strokeOpacity = 0;

    let gradient = new am4core.LinearGradient();
    gradient.addColor(am4core.color("red"));
    gradient.addColor(am4core.color("purple"));
    gradient.addColor(am4core.color("blue"));
    gradient.addColor(am4core.color("teal"));
    gradient.addColor(am4core.color("yellow"));
    gradient.addColor(am4core.color("green"));

    let range = valueAxis.axisRanges.create();
    range.value = -3;
    range.endValue = 3;
    range.axisFill.fill = gradient;
    range.axisFill.fillOpacity = 0.2;
    range.grid.strokeOpacity = 0;

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

    createGrid(-2, "Anger");
    createGrid(-1, "Sadness");
    createGrid(-0.5, "Fear");
    createGrid(0, "Neutral");
    createGrid(1, "Surprise");
    createGrid(2, "Joy");

    let bullet = series.bullets.create(am4charts.CircleBullet);

    chart.cursor = new am4charts.XYCursor();

    chart.scrollbarX = new am4core.Scrollbar();
    chart.scrollbarY = new am4core.Scrollbar();

    this.lolipopChart = chart;

    function createGrid(value, emotion) {
      var range = valueAxis.axisRanges.create();
      range.value = value;
      range.label.text = emotion;
    }
  }

}
