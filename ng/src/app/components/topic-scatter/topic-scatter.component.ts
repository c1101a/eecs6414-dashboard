import { SimpleChanges } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';

/* Imports */
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

/* Chart code */
// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end

@Component({
  selector: 'app-topic-scatter',
  templateUrl: './topic-scatter.component.html',
  styleUrls: ['./topic-scatter.component.css']
})
export class TopicScatterComponent implements OnInit {

  @Input() topics: any;
  topicData: any = [];

  constructor() { }

  private topicsScatter: am4charts.RadarChart;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['topics'] && this.topics) {
      [...new Set(this.topics.map(x => x.topic))].forEach(topic => {
        [...new Set(this.topics.filter(x => x.topic == topic).map(x => x.total))].forEach(score => {
          this.topicData.push({
            topic: topic,
            emotion: score,
            count: this.topics.filter(x => x.topic == topic && x.total == score).length
          });
        });
      });

      /* Create and configure series */
      function createSeries(topic, chart, data) {
        let series1 = chart.series.push(new am4charts.RadarSeries());
        // series1.bullets.push(new am4charts.CircleBullet());
        series1.strokeOpacity = 0;
        series1.dataFields.valueX = "count";
        series1.dataFields.valueY = "emotion";
        series1.name = topic;
        series1.sequencedInterpolation = true;
        series1.sequencedInterpolationDelay = 10;
        series1.data = data.filter(x => x.topic == topic);
        let bullet1 = series1.bullets.push(new am4charts.CircleBullet());
        bullet1.tooltipText = topic;

        return series1;
      }

      [...new Set(this.topicData.map(x => x.topic))].forEach(t => {
        createSeries(t, this.topicsScatter, this.topicData);
      });
    }
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    let chart = am4core.create("topics", am4charts.RadarChart);

    /* Create axes */
    let xAxis = chart.xAxes.push(new am4charts.ValueAxis<am4charts.AxisRendererCircular>());
    xAxis.renderer.maxLabelPosition = 0.99;

    let yAxis = chart.yAxes.push(new am4charts.ValueAxis<am4charts.AxisRendererRadial>());
    yAxis.renderer.labels.template.verticalCenter = "bottom";
    yAxis.renderer.labels.template.horizontalCenter = "right";
    yAxis.renderer.maxLabelPosition = 0.99;
    yAxis.renderer.labels.template.paddingBottom = 1;
    yAxis.renderer.labels.template.paddingRight = 3;
    yAxis.renderer.grid.template.disabled = true;
    yAxis.renderer.labels.template.disabled = true;
    //yAxis.min = -2;
    // yAxis.max = 3;
    // yAxis.strictMinMax = true;

    let gradient = new am4core.RadialGradient();
    gradient.addColor(am4core.color("blue"));
    gradient.addColor(am4core.color("green"));
    gradient.addColor(am4core.color("yellow"));
    gradient.addColor(am4core.color("orange"));
    gradient.addColor(am4core.color("red"));

    let range = yAxis.axisRanges.create();
    range.value = -3;
    range.endValue = 3;
    range.axisFill.fill = gradient;
    range.axisFill.fillOpacity = 0.2;
    range.grid.strokeOpacity = 0;

    function createGrid(value, emotion) {
      var range = yAxis.axisRanges.create();
      range.value = value;
      range.label.text = emotion;
    }

    createGrid(-2, "Anger");
    createGrid(-1, "Sadness");
    createGrid(-0.5, "Fear");
    createGrid(0, "Neutral");
    createGrid(1, "Surprise");
    createGrid(2, "Joy");

    /* Add legend */
    chart.legend = new am4charts.Legend();

    /* Add cursor */
    chart.cursor = new am4charts.RadarCursor();

    this.topicsScatter = chart;
  }

}
