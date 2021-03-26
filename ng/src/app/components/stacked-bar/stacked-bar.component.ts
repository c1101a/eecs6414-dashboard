import { SimpleChanges } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';

/* Imports */
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-stacked-bar',
  templateUrl: './stacked-bar.component.html',
  styleUrls: ['./stacked-bar.component.css']
})
export class StackedBarComponent implements OnInit {

  @Input() comments: any;

  constructor() { }

  private stackedChart: am4charts.XYChart;
  subreddits;
  data = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['comments'] && this.comments) {
      this.data = [];
      this.subreddits = [...new Set(this.comments.map(x => x.subReddit))]
      this.subreddits.forEach(sub => {
        this.data.push({
          subreddit: sub,
          anger: this.comments.filter(x => x.subReddit == sub && x.emotion == 'anger').length,
          sadness: this.comments.filter(x => x.subReddit == sub && x.emotion == 'sadness').length,
          fear: this.comments.filter(x => x.subReddit == sub && x.emotion == 'fear').length,
          neutral: this.comments.filter(x => x.subReddit == sub && x.emotion == 'neutral').length,
          surprise: this.comments.filter(x => x.subReddit == sub && x.emotion == 'surprise').length,
          joy: this.comments.filter(x => x.subReddit == sub && x.emotion == 'joy').length,
        })
      });

      this.stackedChart.data = this.data;
    }
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    // Create chart instance
    let chart = am4core.create("stacked", am4charts.XYChart);

    // Create axes
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "subreddit";
    categoryAxis.renderer.grid.template.location = 0;


    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.inside = true;
    valueAxis.renderer.labels.template.disabled = true;
    valueAxis.min = 0;

    // Create series
    function createSeries(field, name, color) {

      // Set up series
      let series = chart.series.push(new am4charts.ColumnSeries());
      series.name = name;
      series.dataFields.valueY = field;
      series.dataFields.categoryX = "subreddit";
      series.sequencedInterpolation = true;

      // Make it stacked
      series.stacked = true;

      // Configure columns
      series.columns.template.width = am4core.percent(60);
      series.columns.template.tooltipText = "{subreddit} | " + name + ": {valueY}";
      // series.columns.template.fill = am4core.color(color);
      // Add label
      let labelBullet = series.bullets.push(new am4charts.LabelBullet());
      labelBullet.label.text = "{valueY}";
      labelBullet.locationY = 0.5;
      labelBullet.label.hideOversized = true;

      return series;
    }

    createSeries("anger", "Anger", "red");
    createSeries("sadness", "Sadness", "orange");
    createSeries("fear", "Fear", "yellow");
    createSeries("neutral", "Neutral", "green");
    createSeries("surprise", "Surprise", "purple");
    createSeries("joy", "Joy", "blue");

    // Legend
    chart.legend = new am4charts.Legend();

    chart.padding(0, 50, 30, 50);

    this.stackedChart = chart;

  }

}
