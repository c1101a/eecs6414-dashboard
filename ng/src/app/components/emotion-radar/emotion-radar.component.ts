import { SimpleChanges } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';

/* Imports */
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
am4core.useTheme(am4themes_animated);


@Component({
  selector: 'app-emotion-radar',
  templateUrl: './emotion-radar.component.html',
  styleUrls: ['./emotion-radar.component.css']
})
export class EmotionRadarComponent implements OnInit {

  @Input() comments: any;

  constructor() { }

  private emotionRadarChart: am4charts.RadarChart;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['comments'] && this.comments) {
      /* Add data */
      this.emotionRadarChart.data = [{
        "emotion": "Anger",
        "value": this.comments.filter(x => x.emotion == 'anger').length
      }, {
        "emotion": "Sadness",
        "value": this.comments.filter(x => x.emotion == 'sadness').length
      }, {
        "emotion": "Fear",
        "value": this.comments.filter(x => x.emotion == 'fear').length
      }, {
        "emotion": "Neutral",
        "value": this.comments.filter(x => x.emotion == 'neutral').length
      }, {
        "emotion": "Surprise",
        "value": this.comments.filter(x => x.emotion == 'surprise').length
      }, {
        "emotion": "Joy",
        "value": this.comments.filter(x => x.emotion == 'joy').length
      }];
    }
  }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    let chart = am4core.create("radar", am4charts.RadarChart);

    /* Create axes */
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis<am4charts.AxisRendererCircular>());
    categoryAxis.dataFields.category = "emotion";

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis<am4charts.AxisRendererRadial>());
    valueAxis.renderer.axisFills.template.fill = chart.colors.getIndex(2);
    valueAxis.renderer.axisFills.template.fillOpacity = 0.05;

    /* Create and configure series */
    let series = chart.series.push(new am4charts.RadarSeries());
    series.dataFields.valueY = "value";
    series.dataFields.categoryX = "emotion";
    series.strokeWidth = 3;

    this.emotionRadarChart = chart;
  }

}
