import { SimpleChanges } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';

/* Imports */
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-line-graph',
  templateUrl: './line-graph.component.html',
  styleUrls: ['./line-graph.component.css']
})
export class LineGraphComponent implements OnInit {

  @Input() comments: any;

  constructor() { }

  private lineChart: am4charts.XYChart;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['comments'] && this.comments) {
      /* Add data */
      this.comments.forEach(x => {
        if (x.emotion == 'anger') {
          x.emotion = 0;
        }
        if (x.emotion == 'sadness') {
          x.emotion = 1;
        }
        if (x.emotion == 'fear') {
          x.emotion = 2;
        }
        if (x.emotion == 'neutral') {
          x.emotion = 3;
        }
        if (x.emotion == 'surprise') {
          x.emotion = 4;
        }
        if (x.emotion == 'joy') {
          x.emotion = 5;
        }
      });

      this.lineChart.data = this.comments;
    }
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    let chart = am4core.create("line", am4charts.XYChart);
    chart.padding(40, 40, 40, 40);

    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.dataFields.category = "timestamp";
    categoryAxis.renderer.grid.template.disabled = true;
    categoryAxis.renderer.labels.template.disabled = true;
    categoryAxis.cursorTooltipEnabled = false;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.grid.template.disabled = true;
    valueAxis.renderer.labels.template.disabled = true;
    valueAxis.cursorTooltipEnabled = false;

    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.categoryX = "timestamp";
    series.dataFields.valueY = "emotion";
    series.tooltipText = "Subreddit: {subReddit} \n Comment: {comment}";
    series.tooltip.label.wrap = true;
    series.tooltip.label.width = 500;
    series.strokeWidth = 2

    var bullet = series.bullets.push(new am4charts.Bullet());
    var circle = bullet.createChild(am4core.Circle);
    circle.radius = 1;
    circle.strokeWidth = 4;

    chart.cursor = new am4charts.XYCursor();
    createGrid(0, "Anger");
    createGrid(1, "Sadness");
    createGrid(2, "Fear");
    createGrid(3, "Neutral");
    createGrid(4, "Surprise");
    createGrid(5, "Joy");

    chart.padding(0, 30, 30, 30);

    this.lineChart = chart;

    function createGrid(value, emotion) {
      var range = valueAxis.axisRanges.create();
      range.value = value;
      range.label.text = emotion;
    }
  }

}
