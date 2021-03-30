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
  selector: 'app-chord-chart',
  templateUrl: './chord-chart.component.html',
  styleUrls: ['./chord-chart.component.css']
})
export class ChordChartComponent implements OnInit {

  @Input() connections: any;

  constructor() { }

  private chordChart: am4charts.ChordDiagram;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['connections'] && this.connections) {
      /* Add data */
      this.chordChart.data = this.connections;
    }
  }
  ngOnInit(): void {
  }

  ngAfterViewInit() {
    let chart = am4core.create("chord", am4charts.ChordDiagram);

    chart.dataFields.fromName = "fromAuthor";
    chart.dataFields.toName = "toAuthor";
    chart.dataFields.value = "comments";

    // make nodes draggable
    let nodeTemplate = chart.nodes.template;
    nodeTemplate.readerTitle = "Click to show/hide or drag to rearrange";
    nodeTemplate.showSystemTooltip = true;

    let nodeLink = chart.links.template;
    let bullet = nodeLink.bullets.push(new am4charts.CircleBullet());
    bullet.fillOpacity = 1;
    bullet.circle.radius = 2;
    bullet.locationX = 0.5;

    // create animations
    chart.events.on("datavalidated", function () {
      for (var i = 0; i < chart.links.length; i++) {
        let link = chart.links.getIndex(i);
        let bullet = link.bullets.getIndex(0);

        animateBullet(bullet);
      }
    })

    function animateBullet(bullet) {
      let duration = 3000 * Math.random() + 2000;
      let animation = bullet.animate([{ property: "locationX", from: 0, to: 1 }], duration)
      animation.events.on("animationended", function (event) {
        animateBullet(event.target.object);
      })
    }

    this.chordChart = chart;
  }

}
