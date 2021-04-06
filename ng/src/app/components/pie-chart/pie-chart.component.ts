import { SimpleChanges } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';

/* Imports */
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {

  @Input() comments: any;

  constructor() { }

  private pieChart: am4charts.PieChart;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['comments'] && this.comments) {
      this.pieChart.data = [
        {
          emotion: "Anger",
          count: this.comments.filter(x => x.emotion == "anger").length,
          color: "#f54242"
        },
        {
          emotion: "Sadness",
          count: this.comments.filter(x => x.emotion == "sadness").length,
          color: "#f542ec"
        },
        {
          emotion: "Fear",
          count: this.comments.filter(x => x.emotion == "fear").length,
          color: "#425af5"
        },
        {
          emotion: "Neutral",
          count: this.comments.filter(x => x.emotion == "neutral").length,
          color: "#42bff5"
        },
        {
          emotion: "Surprise",
          count: this.comments.filter(x => x.emotion == "surprise").length,
          color: "#f5ec42"
        },
        {
          emotion: "Joy",
          count: this.comments.filter(x => x.emotion == "joy").length,
          color: "#42f548"
        },
      ];
      console.log(this.pieChart.data)
    }
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {

    let chart = am4core.create("pie", am4charts.PieChart);

    // Add and configure Series
    let pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "count";
    pieSeries.dataFields.category = "emotion";
    pieSeries.slices.template.stroke = am4core.color("#fff");
    pieSeries.slices.template.strokeOpacity = 1;
    pieSeries.slices.template.propertyFields.fill = "color";

    // This creates initial animation
    pieSeries.hiddenState.properties.opacity = 1;
    pieSeries.hiddenState.properties.endAngle = -90;
    pieSeries.hiddenState.properties.startAngle = -90;

    chart.hiddenState.properties.radius = am4core.percent(0);

    // Disable ticks and labels
    pieSeries.labels.template.disabled = true;
    pieSeries.ticks.template.disabled = true;

    chart.legend = new am4charts.Legend();

    this.pieChart = chart;
  }

}
