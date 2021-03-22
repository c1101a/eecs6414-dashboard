import { Component, OnInit } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {


    let chart = am4core.create("chartdiv", am4charts.ChordDiagram);

    chart.dataSource.url = "assets/c1.csv";
    chart.dataSource.parser = new am4core.CSVParser();
    // @ts-ignore
    chart.dataSource.parser.options.useColumnNames = true;


    chart.hiddenState.properties.opacity = 0;

    chart.dataFields.fromName = "from";
    chart.dataFields.toName = "to";
    chart.dataFields.value = "value";

    // make nodes draggable
    let nodeTemplate = chart.nodes.template;
    nodeTemplate.readerTitle = "Click to show/hide or drag to rearrange";
    nodeTemplate.showSystemTooltip = true;
    nodeTemplate.cursorOverStyle = am4core.MouseCursorStyle.pointer

    var label = nodeTemplate.label;
    label.relativeRotation = 90;

    let nodeLink = chart.links.template;
    let bullet = nodeLink.bullets.push(new am4charts.CircleBullet());
    bullet.fillOpacity = 1;
    bullet.circle.radius = 5;
    bullet.locationX = 0.5;

    // create animations
    chart.events.on("ready", function () {
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
  }

}
