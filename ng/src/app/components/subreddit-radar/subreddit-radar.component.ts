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
  selector: 'app-subreddit-radar',
  templateUrl: './subreddit-radar.component.html',
  styleUrls: ['./subreddit-radar.component.css']
})
export class SubredditRadarComponent implements OnInit {

  @Input() data: any;
  scatterData: any = [];

  constructor() { }

  private topicsScatter: am4charts.RadarChart;


  cosinesim(A, B) {
    var dotproduct = 0;
    var mA = 0;
    var mB = 0;
    for (let i = 0; i < A.length; i++) { // here you missed the i++
      dotproduct += (A[i] * B[i]);
      mA += (A[i] * A[i]);
      mB += (B[i] * B[i]);
    }
    mA = Math.sqrt(mA);
    mB = Math.sqrt(mB);
    var similarity = (dotproduct) / ((mA) * (mB)) // here you needed extra brackets
    return similarity;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data'] && this.data) {
      let subreddit = this.data.filter(x => x.subReddit == 'teenagers')
      let subRedditVector = [
        subreddit.filter(x => x.emotion == 'joy').length / subreddit.length,
        subreddit.filter(x => x.emotion == 'surprise').length / subreddit.length,
        subreddit.filter(x => x.emotion == 'neutral').length / subreddit.length,
        subreddit.filter(x => x.emotion == 'fear').length / subreddit.length,
        subreddit.filter(x => x.emotion == 'sadness').length / subreddit.length,
        subreddit.filter(x => x.emotion == 'anger').length / subreddit.length,
      ];

      [...new Set(subreddit.map(x => x.userId))].forEach(user => {
        let userVector = [
          subreddit.filter(x => x.emotion == 'joy' && x.userId == user).length / subreddit.filter(x => x.userId == user).length,
          subreddit.filter(x => x.emotion == 'surprise' && x.userId == user).length / subreddit.filter(x => x.userId == user).length,
          subreddit.filter(x => x.emotion == 'neutral' && x.userId == user).length / subreddit.filter(x => x.userId == user).length,
          subreddit.filter(x => x.emotion == 'fear' && x.userId == user).length / subreddit.filter(x => x.userId == user).length,
          subreddit.filter(x => x.emotion == 'sadness' && x.userId == user).length / subreddit.filter(x => x.userId == user).length,
          subreddit.filter(x => x.emotion == 'anger' && x.userId == user).length / subreddit.filter(x => x.userId == user).length,
        ];

        this.scatterData.push({
          cosim: this.cosinesim(subRedditVector, userVector),
          user: user,
          random: Math.floor(Math.random() * 100 + 1)
        });
      });

      console.log(this.scatterData);
      /* Create and configure series */
      function createSeries(user, chart, data) {
        let series1 = chart.series.push(new am4charts.RadarSeries());
        // series1.bullets.push(new am4charts.CircleBullet());
        series1.strokeOpacity = 0;
        series1.dataFields.valueX = "random";
        series1.dataFields.valueY = "cosim";
        series1.name = user;
        series1.sequencedInterpolation = true;
        series1.sequencedInterpolationDelay = 10;
        series1.data = data.filter(x => x.user == user);
        let bullet1 = series1.bullets.push(new am4charts.CircleBullet());
        bullet1.tooltipText = user + "\n Cosine Similarity: {cosim}";

        return series1;
      }


      [...new Set(this.scatterData.map(x => x.user))].forEach(u => {
        createSeries(u, this.topicsScatter, this.scatterData);
      });

    }
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    let chart = am4core.create("subreddit-topics", am4charts.RadarChart);

    /* Create axes */
    let xAxis = chart.xAxes.push(new am4charts.ValueAxis<am4charts.AxisRendererCircular>());
    //xAxis.renderer.maxLabelPosition = 0.99;
    xAxis.renderer.grid.template.disabled = true;
    xAxis.renderer.labels.template.disabled = true;

    let yAxis = chart.yAxes.push(new am4charts.ValueAxis<am4charts.AxisRendererRadial>());
    yAxis.renderer.labels.template.verticalCenter = "bottom";
    yAxis.renderer.labels.template.horizontalCenter = "right";
    yAxis.renderer.maxLabelPosition = 0.99;
    yAxis.renderer.labels.template.paddingBottom = 1;
    yAxis.renderer.labels.template.paddingRight = 3;
    yAxis.renderer.inversed = true;
    // yAxis.renderer.grid.template.disabled = true;
    // yAxis.renderer.labels.template.disabled = true;
    //yAxis.min = -2;
    // yAxis.max = 3;
    // yAxis.strictMinMax = true;

    /* Add legend */
    chart.legend = new am4charts.Legend();

    /* Add cursor */
    //chart.cursor = new am4charts.RadarCursor();

    this.topicsScatter = chart;
  }

}
