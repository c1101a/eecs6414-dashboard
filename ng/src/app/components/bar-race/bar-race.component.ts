import { SimpleChanges } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';

/* Imports */
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
//am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-bar-race',
  templateUrl: './bar-race.component.html',
  styleUrls: ['./bar-race.component.css']
})
export class BarRaceComponent implements OnInit {

  @Input() comments: any;
  data = [];
  dataByDay = {};
  constructor() { }

  private raceChart: am4charts.XYChart;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['comments'] && this.comments) {
      this.data = [];
      let filteredComments = this.comments.filter(x => x.emotion != "surprise")
      filteredComments.forEach(comment => {
        this.data.push({
          day: new Date(comment.timestamp * 1000).getDate(),
          emotion: comment.emotion
        });
      });

      //[... new Set(this.data.map(x => x.day))].forEach(day => {
      for (var i = 1; i <= 30; i++) {
        this.dataByDay[i] = [];
        this.dataByDay[i].push({
          emotion: "anger",
          count: this.data.filter(x => x.emotion == "anger" && x.day <= i).length
        });
        this.dataByDay[i].push({
          emotion: "sadness",
          count: this.data.filter(x => x.emotion == "sadness" && x.day <= i).length
        });
        this.dataByDay[i].push({
          emotion: "fear",
          count: this.data.filter(x => x.emotion == "fear" && x.day <= i).length
        });
        this.dataByDay[i].push({
          emotion: "neutral",
          count: this.data.filter(x => x.emotion == "neutral" && x.day <= i).length
        });
        this.dataByDay[i].push({
          emotion: "surprise",
          count: this.data.filter(x => x.emotion == "surprise" && x.day <= i).length
        });
        this.dataByDay[i].push({
          emotion: "joy",
          count: this.data.filter(x => x.emotion == "joy" && x.day <= i).length
        });
      };

      let dayData = this.dataByDay;
      console.log(dayData)
      let chart = am4core.create("race", am4charts.XYChart);
      chart.padding(40, 40, 40, 40);



      let label = chart.plotContainer.createChild(am4core.Label);
      label.x = am4core.percent(97);
      label.y = am4core.percent(95);
      label.horizontalCenter = "right";
      label.verticalCenter = "middle";
      label.dx = -15;
      label.fontSize = 50;

      let playButton = chart.plotContainer.createChild(am4core.PlayButton);
      playButton.x = am4core.percent(97);
      playButton.y = am4core.percent(95);
      playButton.dy = -2;
      playButton.verticalCenter = "middle";
      playButton.events.on("toggled", function (event) {
        if (event.target.isActive) {
          play(dayData);
        }
        else {
          stop();
        }
      })

      let stepDuration = 4000;

      let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.dataFields.category = "emotion";
      categoryAxis.renderer.minGridDistance = 1;
      categoryAxis.renderer.inversed = true;
      categoryAxis.renderer.grid.template.disabled = true;

      let valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
      valueAxis.min = 0;
      valueAxis.rangeChangeEasing = am4core.ease.linear;
      valueAxis.rangeChangeDuration = stepDuration;
      valueAxis.extraMax = 0.1;

      let series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.categoryY = "emotion";
      series.dataFields.valueX = "count";
      series.tooltipText = "{valueX.value}"
      series.columns.template.strokeOpacity = 0;
      series.columns.template.column.cornerRadiusBottomRight = 5;
      series.columns.template.column.cornerRadiusTopRight = 5;
      series.interpolationDuration = stepDuration;
      series.interpolationEasing = am4core.ease.linear;

      let labelBullet = series.bullets.push(new am4charts.LabelBullet())
      labelBullet.label.horizontalCenter = "right";
      // labelBullet.label.text = "{values.valueX.workingValue.formatNumber('#.0as')}";
      labelBullet.label.textAlign = "end";
      labelBullet.label.dx = -10;

      chart.zoomOutButton.disabled = true;

      // as by default columns of the same series are of the same color, we add adapter which takes colors from chart.colors color set
      series.columns.template.adapter.add("fill", function (fill, target) {
        return chart.colors.getIndex(target.dataItem.index);
      });

      let day = 1;
      label.text = day.toString();

      let interval;

      function play(data) {
        interval = setInterval(function () {
          nextDay(data);
        }, stepDuration)
        nextDay(data);
      }

      function stop() {
        if (interval) {
          clearInterval(interval);
        }
      }

      function nextDay(data) {
        day++
        let newData = data[day];
        let itemsWithNonZero = 0;
        for (var i = 0; i < chart.data.length; i++) {
          chart.data[i].count = newData[i].count;
          if (chart.data[i].count > 0) {
            itemsWithNonZero++;
          }
        }

        if (day == 1) {
          series.interpolationDuration = stepDuration / 4;
          valueAxis.rangeChangeDuration = stepDuration / 4;
        }
        else {
          series.interpolationDuration = stepDuration;
          valueAxis.rangeChangeDuration = stepDuration;
        }

        chart.invalidateRawData();
        label.text = day.toString();

        categoryAxis.zoom({ start: 0, end: itemsWithNonZero / categoryAxis.dataItems.length });
      }


      categoryAxis.sortBySeries = series;

      chart.data = JSON.parse(JSON.stringify(this.dataByDay[day]));
      categoryAxis.zoom({ start: 0, end: 1 / chart.data.length });

      series.events.on("inited", function () {
        setTimeout(function () {
          playButton.isActive = true; // this starts interval
        }, 2000)
      })

      this.raceChart = chart;
    }
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
  }

}
