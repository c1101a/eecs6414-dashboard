import { SimpleChanges } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';

/* Imports */
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import * as am4plugins_wordCloud from "@amcharts/amcharts4/plugins/wordCloud"
//am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-word-cloud',
  templateUrl: './word-cloud.component.html',
  styleUrls: ['./word-cloud.component.css']
})
export class WordCloudComponent implements OnInit {

  @Input() comments: any;

  constructor() { }
  private wordCloud: am4plugins_wordCloud.WordCloud;
  words;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['comments'] && this.comments) {
      this.words = '';
      this.comments.forEach(comment => {
        this.words += " " + comment.comment;
      });
      let chart = am4core.create("cloud", am4plugins_wordCloud.WordCloud);
      let series = chart.series.push(new am4plugins_wordCloud.WordCloudSeries());
      series.accuracy = 4;
      series.step = 15;
      series.rotationThreshold = 0.7;
      series.minValue = 2;
      series.maxCount = 200;
      series.minWordLength = 2;
      series.labels.template.tooltipText = "{word}: {value}";
      series.fontFamily = "Courier New";
      series.maxFontSize = am4core.percent(30);
      series.excludeWords = ["i", "me", "my", "myself", "we", "our", "ours", "ourselves", "you", "your", "yours", "yourself", "yourselves", "he", "him", "his", "himself", "she", "her", "hers", "herself", "it", "its", "itself", "they", "them", "their", "theirs", "themselves", "what", "which", "who", "whom", "this", "that", "these", "those", "am", "is", "are", "was", "were", "be", "been", "being", "have", "has", "had", "having", "do", "does", "did", "doing", "a", "an", "the", "and", "but", "if", "or", "because", "as", "until", "while", "of", "at", "by", "for", "with", "about", "against", "between", "into", "through", "during", "before", "after", "above", "below", "to", "from", "up", "down", "in", "out", "on", "off", "over", "under", "again", "further", "then", "once", "here", "there", "when", "where", "why", "how", "all", "any", "both", "each", "few", "more", "most", "other", "some", "such", "no", "nor", "not", "only", "own", "same", "so", "than", "too", "very", "s", "t", "can", "will", "just", "don", "should", "now"];
      series.text = this.words;
      this.wordCloud = chart;
    }
  }
  ngOnInit(): void {
  }

  ngAfterViewInit() {

  }
}
