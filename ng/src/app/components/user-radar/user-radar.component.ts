import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

/* Imports */
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-user-radar',
  templateUrl: './user-radar.component.html',
  styleUrls: ['./user-radar.component.css']
})
export class UserRadarComponent implements OnInit {

  constructor(private api: ApiService) { }
  private emotionRadarChart: am4charts.RadarChart;

  commentsInput: any;
  comments: any;
  users: any[];
  user;
  graphData;
  localData = [
    {
      "userId": "11th_Plague",
      "emotion": "Anger",
      "value": 31
    },
    {
      "userId": "11th_Plague",
      "emotion": "Sadness",
      "value": 1
    },
    {
      "userId": "11th_Plague",
      "emotion": "Fear",
      "value": 17
    },
    {
      "userId": "11th_Plague",
      "emotion": "Neutral",
      "value": 21
    },
    {
      "userId": "11th_Plague",
      "emotion": "Surprise",
      "value": 28
    },
    {
      "userId": "11th_Plague",
      "emotion": "Joy",
      "value": 5
    },
    {
      "userId": "1i1Bunny",
      "emotion": "Anger",
      "value": 5
    },
    {
      "userId": "1i1Bunny",
      "emotion": "Sadness",
      "value": 7
    },
    {
      "userId": "1i1Bunny",
      "emotion": "Fear",
      "value": 2
    },
    {
      "userId": "1i1Bunny",
      "emotion": "Neutral",
      "value": 7
    },
    {
      "userId": "1i1Bunny",
      "emotion": "Surprise",
      "value": 25
    },
    {
      "userId": "1i1Bunny",
      "emotion": "Joy",
      "value": 58
    },
    {
      "userId": "Aidangamer28",
      "emotion": "Anger",
      "value": 10
    },
    {
      "userId": "Aidangamer28",
      "emotion": "Sadness",
      "value": 7
    },
    {
      "userId": "Aidangamer28",
      "emotion": "Fear",
      "value": 11
    },
    {
      "userId": "Aidangamer28",
      "emotion": "Neutral",
      "value": 12
    },
    {
      "userId": "Aidangamer28",
      "emotion": "Surprise",
      "value": 22
    },
    {
      "userId": "Aidangamer28",
      "emotion": "Joy",
      "value": 64
    },
    {
      "userId": "Alieste",
      "emotion": "Anger",
      "value": 42
    },
    {
      "userId": "Alieste",
      "emotion": "Sadness",
      "value": 9
    },
    {
      "userId": "Alieste",
      "emotion": "Fear",
      "value": 10
    },
    {
      "userId": "Alieste",
      "emotion": "Neutral",
      "value": 10
    },
    {
      "userId": "Alieste",
      "emotion": "Surprise",
      "value": 31
    },
    {
      "userId": "Alieste",
      "emotion": "Joy",
      "value": 14
    },
    {
      "userId": "AmeteurElitist",
      "emotion": "Anger",
      "value": 14
    },
    {
      "userId": "AmeteurElitist",
      "emotion": "Sadness",
      "value": 8
    },
    {
      "userId": "AmeteurElitist",
      "emotion": "Fear",
      "value": 9
    },
    {
      "userId": "AmeteurElitist",
      "emotion": "Neutral",
      "value": 22
    },
    {
      "userId": "AmeteurElitist",
      "emotion": "Surprise",
      "value": 66
    },
    {
      "userId": "AmeteurElitist",
      "emotion": "Joy",
      "value": 8
    },
    {
      "userId": "Annabeth666",
      "emotion": "Anger",
      "value": 32
    },
    {
      "userId": "Annabeth666",
      "emotion": "Sadness",
      "value": 8
    },
    {
      "userId": "Annabeth666",
      "emotion": "Fear",
      "value": 40
    },
    {
      "userId": "Annabeth666",
      "emotion": "Neutral",
      "value": 21
    },
    {
      "userId": "Annabeth666",
      "emotion": "Surprise",
      "value": 52
    },
    {
      "userId": "Annabeth666",
      "emotion": "Joy",
      "value": 31
    },
    {
      "userId": "AphrodisiacA",
      "emotion": "Anger",
      "value": 8
    },
    {
      "userId": "AphrodisiacA",
      "emotion": "Sadness",
      "value": 7
    },
    {
      "userId": "AphrodisiacA",
      "emotion": "Fear",
      "value": 10
    },
    {
      "userId": "AphrodisiacA",
      "emotion": "Neutral",
      "value": 8
    },
    {
      "userId": "AphrodisiacA",
      "emotion": "Surprise",
      "value": 33
    },
    {
      "userId": "AphrodisiacA",
      "emotion": "Joy",
      "value": 59
    },
    {
      "userId": "Apollo_Screed",
      "emotion": "Anger",
      "value": 15
    },
    {
      "userId": "Apollo_Screed",
      "emotion": "Sadness",
      "value": 1
    },
    {
      "userId": "Apollo_Screed",
      "emotion": "Fear",
      "value": 15
    },
    {
      "userId": "Apollo_Screed",
      "emotion": "Neutral",
      "value": 2
    },
    {
      "userId": "Apollo_Screed",
      "emotion": "Surprise",
      "value": 33
    },
    {
      "userId": "Apollo_Screed",
      "emotion": "Joy",
      "value": 46
    },
    {
      "userId": "Bloodsucker5310",
      "emotion": "Anger",
      "value": 4
    },
    {
      "userId": "Bloodsucker5310",
      "emotion": "Sadness",
      "value": 1
    },
    {
      "userId": "Bloodsucker5310",
      "emotion": "Fear",
      "value": 16
    },
    {
      "userId": "Bloodsucker5310",
      "emotion": "Neutral",
      "value": 4
    },
    {
      "userId": "Bloodsucker5310",
      "emotion": "Surprise",
      "value": 51
    },
    {
      "userId": "Bloodsucker5310",
      "emotion": "Joy",
      "value": 38
    },
    {
      "userId": "Call_me_Spud",
      "emotion": "Anger",
      "value": 15
    },
    {
      "userId": "Call_me_Spud",
      "emotion": "Sadness",
      "value": 7
    },
    {
      "userId": "Call_me_Spud",
      "emotion": "Fear",
      "value": 17
    },
    {
      "userId": "Call_me_Spud",
      "emotion": "Neutral",
      "value": 4
    },
    {
      "userId": "Call_me_Spud",
      "emotion": "Surprise",
      "value": 43
    },
    {
      "userId": "Call_me_Spud",
      "emotion": "Joy",
      "value": 61
    },
    {
      "userId": "CiFBaLSA",
      "emotion": "Anger",
      "value": 3
    },
    {
      "userId": "CiFBaLSA",
      "emotion": "Sadness",
      "value": 4
    },
    {
      "userId": "CiFBaLSA",
      "emotion": "Fear",
      "value": 19
    },
    {
      "userId": "CiFBaLSA",
      "emotion": "Neutral",
      "value": 1
    },
    {
      "userId": "CiFBaLSA",
      "emotion": "Surprise",
      "value": 30
    },
    {
      "userId": "CiFBaLSA",
      "emotion": "Joy",
      "value": 44
    },
    {
      "userId": "Cornelius-Matthews",
      "emotion": "Anger",
      "value": 16
    },
    {
      "userId": "Cornelius-Matthews",
      "emotion": "Sadness",
      "value": 31
    },
    {
      "userId": "Cornelius-Matthews",
      "emotion": "Fear",
      "value": 81
    },
    {
      "userId": "Cornelius-Matthews",
      "emotion": "Neutral",
      "value": 41
    },
    {
      "userId": "Cornelius-Matthews",
      "emotion": "Surprise",
      "value": 41
    },
    {
      "userId": "Cornelius-Matthews",
      "emotion": "Joy",
      "value": 34
    },
    {
      "userId": "CozyThurifer",
      "emotion": "Anger",
      "value": 14
    },
    {
      "userId": "CozyThurifer",
      "emotion": "Sadness",
      "value": 5
    },
    {
      "userId": "CozyThurifer",
      "emotion": "Fear",
      "value": 3
    },
    {
      "userId": "CozyThurifer",
      "emotion": "Neutral",
      "value": 10
    },
    {
      "userId": "CozyThurifer",
      "emotion": "Surprise",
      "value": 79
    },
    {
      "userId": "CozyThurifer",
      "emotion": "Joy",
      "value": 17
    },
    {
      "userId": "Crimson_Viper_N",
      "emotion": "Anger",
      "value": 10
    },
    {
      "userId": "Crimson_Viper_N",
      "emotion": "Sadness",
      "value": 2
    },
    {
      "userId": "Crimson_Viper_N",
      "emotion": "Fear",
      "value": 39
    },
    {
      "userId": "Crimson_Viper_N",
      "emotion": "Neutral",
      "value": 7
    },
    {
      "userId": "Crimson_Viper_N",
      "emotion": "Surprise",
      "value": 45
    },
    {
      "userId": "Crimson_Viper_N",
      "emotion": "Joy",
      "value": 43
    },
    {
      "userId": "Dannyngn",
      "emotion": "Anger",
      "value": 3
    },
    {
      "userId": "Dannyngn",
      "emotion": "Sadness",
      "value": 2
    },
    {
      "userId": "Dannyngn",
      "emotion": "Fear",
      "value": 6
    },
    {
      "userId": "Dannyngn",
      "emotion": "Neutral",
      "value": 26
    },
    {
      "userId": "Dannyngn",
      "emotion": "Surprise",
      "value": 58
    },
    {
      "userId": "Dannyngn",
      "emotion": "Joy",
      "value": 21
    },
    {
      "userId": "DeanBlandino",
      "emotion": "Anger",
      "value": 11
    },
    {
      "userId": "DeanBlandino",
      "emotion": "Sadness",
      "value": 2
    },
    {
      "userId": "DeanBlandino",
      "emotion": "Fear",
      "value": 7
    },
    {
      "userId": "DeanBlandino",
      "emotion": "Neutral",
      "value": 2
    },
    {
      "userId": "DeanBlandino",
      "emotion": "Surprise",
      "value": 17
    },
    {
      "userId": "DeanBlandino",
      "emotion": "Joy",
      "value": 65
    },
    {
      "userId": "Diamondees",
      "emotion": "Anger",
      "value": 15
    },
    {
      "userId": "Diamondees",
      "emotion": "Sadness",
      "value": 10
    },
    {
      "userId": "Diamondees",
      "emotion": "Fear",
      "value": 1
    },
    {
      "userId": "Diamondees",
      "emotion": "Neutral",
      "value": 7
    },
    {
      "userId": "Diamondees",
      "emotion": "Surprise",
      "value": 58
    },
    {
      "userId": "Diamondees",
      "emotion": "Joy",
      "value": 15
    },
    {
      "userId": "Diapenn",
      "emotion": "Anger",
      "value": 13
    },
    {
      "userId": "Diapenn",
      "emotion": "Sadness",
      "value": 16
    },
    {
      "userId": "Diapenn",
      "emotion": "Fear",
      "value": 5
    },
    {
      "userId": "Diapenn",
      "emotion": "Neutral",
      "value": 19
    },
    {
      "userId": "Diapenn",
      "emotion": "Surprise",
      "value": 43
    },
    {
      "userId": "Diapenn",
      "emotion": "Joy",
      "value": 31
    },
    {
      "userId": "Diaper_Dave",
      "emotion": "Anger",
      "value": 19
    },
    {
      "userId": "Diaper_Dave",
      "emotion": "Sadness",
      "value": 3
    },
    {
      "userId": "Diaper_Dave",
      "emotion": "Fear",
      "value": 21
    },
    {
      "userId": "Diaper_Dave",
      "emotion": "Neutral",
      "value": 0
    },
    {
      "userId": "Diaper_Dave",
      "emotion": "Surprise",
      "value": 14
    },
    {
      "userId": "Diaper_Dave",
      "emotion": "Joy",
      "value": 72
    },
    {
      "userId": "Dr_Zorand",
      "emotion": "Anger",
      "value": 9
    },
    {
      "userId": "Dr_Zorand",
      "emotion": "Sadness",
      "value": 4
    },
    {
      "userId": "Dr_Zorand",
      "emotion": "Fear",
      "value": 4
    },
    {
      "userId": "Dr_Zorand",
      "emotion": "Neutral",
      "value": 0
    },
    {
      "userId": "Dr_Zorand",
      "emotion": "Surprise",
      "value": 83
    },
    {
      "userId": "Dr_Zorand",
      "emotion": "Joy",
      "value": 8
    },
    {
      "userId": "DrunkenJagFan",
      "emotion": "Anger",
      "value": 20
    },
    {
      "userId": "DrunkenJagFan",
      "emotion": "Sadness",
      "value": 10
    },
    {
      "userId": "DrunkenJagFan",
      "emotion": "Fear",
      "value": 4
    },
    {
      "userId": "DrunkenJagFan",
      "emotion": "Neutral",
      "value": 6
    },
    {
      "userId": "DrunkenJagFan",
      "emotion": "Surprise",
      "value": 54
    },
    {
      "userId": "DrunkenJagFan",
      "emotion": "Joy",
      "value": 13
    },
    {
      "userId": "Duke_Swillbottom",
      "emotion": "Anger",
      "value": 14
    },
    {
      "userId": "Duke_Swillbottom",
      "emotion": "Sadness",
      "value": 8
    },
    {
      "userId": "Duke_Swillbottom",
      "emotion": "Fear",
      "value": 4
    },
    {
      "userId": "Duke_Swillbottom",
      "emotion": "Neutral",
      "value": 4
    },
    {
      "userId": "Duke_Swillbottom",
      "emotion": "Surprise",
      "value": 54
    },
    {
      "userId": "Duke_Swillbottom",
      "emotion": "Joy",
      "value": 16
    },
    {
      "userId": "E1389",
      "emotion": "Anger",
      "value": 1
    },
    {
      "userId": "E1389",
      "emotion": "Sadness",
      "value": 1
    },
    {
      "userId": "E1389",
      "emotion": "Fear",
      "value": 0
    },
    {
      "userId": "E1389",
      "emotion": "Neutral",
      "value": 80
    },
    {
      "userId": "E1389",
      "emotion": "Surprise",
      "value": 27
    },
    {
      "userId": "E1389",
      "emotion": "Joy",
      "value": 3
    },
    {
      "userId": "EliruleZ",
      "emotion": "Anger",
      "value": 0
    },
    {
      "userId": "EliruleZ",
      "emotion": "Sadness",
      "value": 0
    },
    {
      "userId": "EliruleZ",
      "emotion": "Fear",
      "value": 1
    },
    {
      "userId": "EliruleZ",
      "emotion": "Neutral",
      "value": 0
    },
    {
      "userId": "EliruleZ",
      "emotion": "Surprise",
      "value": 106
    },
    {
      "userId": "EliruleZ",
      "emotion": "Joy",
      "value": 1
    },
    {
      "userId": "Fleet_Admiral_Auto",
      "emotion": "Anger",
      "value": 17
    },
    {
      "userId": "Fleet_Admiral_Auto",
      "emotion": "Sadness",
      "value": 15
    },
    {
      "userId": "Fleet_Admiral_Auto",
      "emotion": "Fear",
      "value": 15
    },
    {
      "userId": "Fleet_Admiral_Auto",
      "emotion": "Neutral",
      "value": 5
    },
    {
      "userId": "Fleet_Admiral_Auto",
      "emotion": "Surprise",
      "value": 164
    },
    {
      "userId": "Fleet_Admiral_Auto",
      "emotion": "Joy",
      "value": 20
    },
    {
      "userId": "Fuelshop_7",
      "emotion": "Anger",
      "value": 2
    },
    {
      "userId": "Fuelshop_7",
      "emotion": "Sadness",
      "value": 1
    },
    {
      "userId": "Fuelshop_7",
      "emotion": "Fear",
      "value": 95
    },
    {
      "userId": "Fuelshop_7",
      "emotion": "Neutral",
      "value": 4
    },
    {
      "userId": "Fuelshop_7",
      "emotion": "Surprise",
      "value": 25
    },
    {
      "userId": "Fuelshop_7",
      "emotion": "Joy",
      "value": 11
    },
    {
      "userId": "GauMatri",
      "emotion": "Anger",
      "value": 0
    },
    {
      "userId": "GauMatri",
      "emotion": "Sadness",
      "value": 24
    },
    {
      "userId": "GauMatri",
      "emotion": "Fear",
      "value": 97
    },
    {
      "userId": "GauMatri",
      "emotion": "Neutral",
      "value": 0
    },
    {
      "userId": "GauMatri",
      "emotion": "Surprise",
      "value": 573
    },
    {
      "userId": "GauMatri",
      "emotion": "Joy",
      "value": 16
    },
    {
      "userId": "GifReversingBot",
      "emotion": "Anger",
      "value": 2
    },
    {
      "userId": "GifReversingBot",
      "emotion": "Sadness",
      "value": 0
    },
    {
      "userId": "GifReversingBot",
      "emotion": "Fear",
      "value": 0
    },
    {
      "userId": "GifReversingBot",
      "emotion": "Neutral",
      "value": 0
    },
    {
      "userId": "GifReversingBot",
      "emotion": "Surprise",
      "value": 98
    },
    {
      "userId": "GifReversingBot",
      "emotion": "Joy",
      "value": 1
    },
    {
      "userId": "HelioA",
      "emotion": "Anger",
      "value": 5
    },
    {
      "userId": "HelioA",
      "emotion": "Sadness",
      "value": 2
    },
    {
      "userId": "HelioA",
      "emotion": "Fear",
      "value": 2
    },
    {
      "userId": "HelioA",
      "emotion": "Neutral",
      "value": 14
    },
    {
      "userId": "HelioA",
      "emotion": "Surprise",
      "value": 80
    },
    {
      "userId": "HelioA",
      "emotion": "Joy",
      "value": 6
    },
    {
      "userId": "JBColter",
      "emotion": "Anger",
      "value": 12
    },
    {
      "userId": "JBColter",
      "emotion": "Sadness",
      "value": 10
    },
    {
      "userId": "JBColter",
      "emotion": "Fear",
      "value": 110
    },
    {
      "userId": "JBColter",
      "emotion": "Neutral",
      "value": 24
    },
    {
      "userId": "JBColter",
      "emotion": "Surprise",
      "value": 30
    },
    {
      "userId": "JBColter",
      "emotion": "Joy",
      "value": 21
    },
    {
      "userId": "Jacking_Lumber",
      "emotion": "Anger",
      "value": 1
    },
    {
      "userId": "Jacking_Lumber",
      "emotion": "Sadness",
      "value": 0
    },
    {
      "userId": "Jacking_Lumber",
      "emotion": "Fear",
      "value": 1
    },
    {
      "userId": "Jacking_Lumber",
      "emotion": "Neutral",
      "value": 0
    },
    {
      "userId": "Jacking_Lumber",
      "emotion": "Surprise",
      "value": 129
    },
    {
      "userId": "Jacking_Lumber",
      "emotion": "Joy",
      "value": 0
    },
    {
      "userId": "Jake_of_all_Trades",
      "emotion": "Anger",
      "value": 8
    },
    {
      "userId": "Jake_of_all_Trades",
      "emotion": "Sadness",
      "value": 5
    },
    {
      "userId": "Jake_of_all_Trades",
      "emotion": "Fear",
      "value": 7
    },
    {
      "userId": "Jake_of_all_Trades",
      "emotion": "Neutral",
      "value": 14
    },
    {
      "userId": "Jake_of_all_Trades",
      "emotion": "Surprise",
      "value": 76
    },
    {
      "userId": "Jake_of_all_Trades",
      "emotion": "Joy",
      "value": 6
    },
    {
      "userId": "JatinVerma31",
      "emotion": "Anger",
      "value": 12
    },
    {
      "userId": "JatinVerma31",
      "emotion": "Sadness",
      "value": 69
    },
    {
      "userId": "JatinVerma31",
      "emotion": "Fear",
      "value": 6
    },
    {
      "userId": "JatinVerma31",
      "emotion": "Neutral",
      "value": 1
    },
    {
      "userId": "JatinVerma31",
      "emotion": "Surprise",
      "value": 9
    },
    {
      "userId": "JatinVerma31",
      "emotion": "Joy",
      "value": 50
    },
    {
      "userId": "JonnyRichter",
      "emotion": "Anger",
      "value": 24
    },
    {
      "userId": "JonnyRichter",
      "emotion": "Sadness",
      "value": 5
    },
    {
      "userId": "JonnyRichter",
      "emotion": "Fear",
      "value": 11
    },
    {
      "userId": "JonnyRichter",
      "emotion": "Neutral",
      "value": 4
    },
    {
      "userId": "JonnyRichter",
      "emotion": "Surprise",
      "value": 36
    },
    {
      "userId": "JonnyRichter",
      "emotion": "Joy",
      "value": 34
    },
    {
      "userId": "JtB_80",
      "emotion": "Anger",
      "value": 14
    },
    {
      "userId": "JtB_80",
      "emotion": "Sadness",
      "value": 0
    },
    {
      "userId": "JtB_80",
      "emotion": "Fear",
      "value": 16
    },
    {
      "userId": "JtB_80",
      "emotion": "Neutral",
      "value": 20
    },
    {
      "userId": "JtB_80",
      "emotion": "Surprise",
      "value": 20
    },
    {
      "userId": "JtB_80",
      "emotion": "Joy",
      "value": 54
    },
    {
      "userId": "Jumponturtles",
      "emotion": "Anger",
      "value": 6
    },
    {
      "userId": "Jumponturtles",
      "emotion": "Sadness",
      "value": 2
    },
    {
      "userId": "Jumponturtles",
      "emotion": "Fear",
      "value": 9
    },
    {
      "userId": "Jumponturtles",
      "emotion": "Neutral",
      "value": 23
    },
    {
      "userId": "Jumponturtles",
      "emotion": "Surprise",
      "value": 107
    },
    {
      "userId": "Jumponturtles",
      "emotion": "Joy",
      "value": 14
    },
    {
      "userId": "Kevin84333",
      "emotion": "Anger",
      "value": 26
    },
    {
      "userId": "Kevin84333",
      "emotion": "Sadness",
      "value": 3
    },
    {
      "userId": "Kevin84333",
      "emotion": "Fear",
      "value": 3
    },
    {
      "userId": "Kevin84333",
      "emotion": "Neutral",
      "value": 6
    },
    {
      "userId": "Kevin84333",
      "emotion": "Surprise",
      "value": 70
    },
    {
      "userId": "Kevin84333",
      "emotion": "Joy",
      "value": 10
    },
    {
      "userId": "LaserGadgets",
      "emotion": "Anger",
      "value": 10
    },
    {
      "userId": "LaserGadgets",
      "emotion": "Sadness",
      "value": 2
    },
    {
      "userId": "LaserGadgets",
      "emotion": "Fear",
      "value": 9
    },
    {
      "userId": "LaserGadgets",
      "emotion": "Neutral",
      "value": 10
    },
    {
      "userId": "LaserGadgets",
      "emotion": "Surprise",
      "value": 64
    },
    {
      "userId": "LaserGadgets",
      "emotion": "Joy",
      "value": 14
    },
    {
      "userId": "Laweezyanimal",
      "emotion": "Anger",
      "value": 1
    },
    {
      "userId": "Laweezyanimal",
      "emotion": "Sadness",
      "value": 5
    },
    {
      "userId": "Laweezyanimal",
      "emotion": "Fear",
      "value": 4
    },
    {
      "userId": "Laweezyanimal",
      "emotion": "Neutral",
      "value": 1
    },
    {
      "userId": "Laweezyanimal",
      "emotion": "Surprise",
      "value": 48
    },
    {
      "userId": "Laweezyanimal",
      "emotion": "Joy",
      "value": 50
    },
    {
      "userId": "Lunas_Disciple",
      "emotion": "Anger",
      "value": 8
    },
    {
      "userId": "Lunas_Disciple",
      "emotion": "Sadness",
      "value": 5
    },
    {
      "userId": "Lunas_Disciple",
      "emotion": "Fear",
      "value": 8
    },
    {
      "userId": "Lunas_Disciple",
      "emotion": "Neutral",
      "value": 0
    },
    {
      "userId": "Lunas_Disciple",
      "emotion": "Surprise",
      "value": 91
    },
    {
      "userId": "Lunas_Disciple",
      "emotion": "Joy",
      "value": 11
    },
    {
      "userId": "MGS3Snake",
      "emotion": "Anger",
      "value": 19
    },
    {
      "userId": "MGS3Snake",
      "emotion": "Sadness",
      "value": 2
    },
    {
      "userId": "MGS3Snake",
      "emotion": "Fear",
      "value": 17
    },
    {
      "userId": "MGS3Snake",
      "emotion": "Neutral",
      "value": 0
    },
    {
      "userId": "MGS3Snake",
      "emotion": "Surprise",
      "value": 69
    },
    {
      "userId": "MGS3Snake",
      "emotion": "Joy",
      "value": 19
    },
    {
      "userId": "MGTOW_BEASTMODE",
      "emotion": "Anger",
      "value": 24
    },
    {
      "userId": "MGTOW_BEASTMODE",
      "emotion": "Sadness",
      "value": 10
    },
    {
      "userId": "MGTOW_BEASTMODE",
      "emotion": "Fear",
      "value": 2
    },
    {
      "userId": "MGTOW_BEASTMODE",
      "emotion": "Neutral",
      "value": 8
    },
    {
      "userId": "MGTOW_BEASTMODE",
      "emotion": "Surprise",
      "value": 64
    },
    {
      "userId": "MGTOW_BEASTMODE",
      "emotion": "Joy",
      "value": 20
    },
    {
      "userId": "MSHDigit",
      "emotion": "Anger",
      "value": 31
    },
    {
      "userId": "MSHDigit",
      "emotion": "Sadness",
      "value": 6
    },
    {
      "userId": "MSHDigit",
      "emotion": "Fear",
      "value": 6
    },
    {
      "userId": "MSHDigit",
      "emotion": "Neutral",
      "value": 5
    },
    {
      "userId": "MSHDigit",
      "emotion": "Surprise",
      "value": 32
    },
    {
      "userId": "MSHDigit",
      "emotion": "Joy",
      "value": 25
    },
    {
      "userId": "MTGCardFetcher",
      "emotion": "Anger",
      "value": 21
    },
    {
      "userId": "MTGCardFetcher",
      "emotion": "Sadness",
      "value": 17
    },
    {
      "userId": "MTGCardFetcher",
      "emotion": "Fear",
      "value": 15
    },
    {
      "userId": "MTGCardFetcher",
      "emotion": "Neutral",
      "value": 3
    },
    {
      "userId": "MTGCardFetcher",
      "emotion": "Surprise",
      "value": 46
    },
    {
      "userId": "MTGCardFetcher",
      "emotion": "Joy",
      "value": 57
    },
    {
      "userId": "Marketron-I",
      "emotion": "Anger",
      "value": 0
    },
    {
      "userId": "Marketron-I",
      "emotion": "Sadness",
      "value": 0
    },
    {
      "userId": "Marketron-I",
      "emotion": "Fear",
      "value": 792
    },
    {
      "userId": "Marketron-I",
      "emotion": "Neutral",
      "value": 0
    },
    {
      "userId": "Marketron-I",
      "emotion": "Surprise",
      "value": 2
    },
    {
      "userId": "Marketron-I",
      "emotion": "Joy",
      "value": 44
    },
    {
      "userId": "MedievalCutlery",
      "emotion": "Anger",
      "value": 36
    },
    {
      "userId": "MedievalCutlery",
      "emotion": "Sadness",
      "value": 26
    },
    {
      "userId": "MedievalCutlery",
      "emotion": "Fear",
      "value": 7
    },
    {
      "userId": "MedievalCutlery",
      "emotion": "Neutral",
      "value": 22
    },
    {
      "userId": "MedievalCutlery",
      "emotion": "Surprise",
      "value": 125
    },
    {
      "userId": "MedievalCutlery",
      "emotion": "Joy",
      "value": 33
    },
    {
      "userId": "MobdroAndroid",
      "emotion": "Anger",
      "value": 22
    },
    {
      "userId": "MobdroAndroid",
      "emotion": "Sadness",
      "value": 7
    },
    {
      "userId": "MobdroAndroid",
      "emotion": "Fear",
      "value": 4
    },
    {
      "userId": "MobdroAndroid",
      "emotion": "Neutral",
      "value": 6
    },
    {
      "userId": "MobdroAndroid",
      "emotion": "Surprise",
      "value": 62
    },
    {
      "userId": "MobdroAndroid",
      "emotion": "Joy",
      "value": 23
    },
    {
      "userId": "MrRhymestyle",
      "emotion": "Anger",
      "value": 31
    },
    {
      "userId": "MrRhymestyle",
      "emotion": "Sadness",
      "value": 13
    },
    {
      "userId": "MrRhymestyle",
      "emotion": "Fear",
      "value": 10
    },
    {
      "userId": "MrRhymestyle",
      "emotion": "Neutral",
      "value": 11
    },
    {
      "userId": "MrRhymestyle",
      "emotion": "Surprise",
      "value": 54
    },
    {
      "userId": "MrRhymestyle",
      "emotion": "Joy",
      "value": 32
    },
    {
      "userId": "MrUnderdawg",
      "emotion": "Anger",
      "value": 7
    },
    {
      "userId": "MrUnderdawg",
      "emotion": "Sadness",
      "value": 2
    },
    {
      "userId": "MrUnderdawg",
      "emotion": "Fear",
      "value": 1
    },
    {
      "userId": "MrUnderdawg",
      "emotion": "Neutral",
      "value": 51
    },
    {
      "userId": "MrUnderdawg",
      "emotion": "Surprise",
      "value": 35
    },
    {
      "userId": "MrUnderdawg",
      "emotion": "Joy",
      "value": 6
    },
    {
      "userId": "MyDogEli",
      "emotion": "Anger",
      "value": 20
    },
    {
      "userId": "MyDogEli",
      "emotion": "Sadness",
      "value": 6
    },
    {
      "userId": "MyDogEli",
      "emotion": "Fear",
      "value": 11
    },
    {
      "userId": "MyDogEli",
      "emotion": "Neutral",
      "value": 12
    },
    {
      "userId": "MyDogEli",
      "emotion": "Surprise",
      "value": 53
    },
    {
      "userId": "MyDogEli",
      "emotion": "Joy",
      "value": 60
    },
    {
      "userId": "NFCAAOfficialRefBot",
      "emotion": "Anger",
      "value": 17
    },
    {
      "userId": "NFCAAOfficialRefBot",
      "emotion": "Sadness",
      "value": 75
    },
    {
      "userId": "NFCAAOfficialRefBot",
      "emotion": "Fear",
      "value": 62
    },
    {
      "userId": "NFCAAOfficialRefBot",
      "emotion": "Neutral",
      "value": 0
    },
    {
      "userId": "NFCAAOfficialRefBot",
      "emotion": "Surprise",
      "value": 1719
    },
    {
      "userId": "NFCAAOfficialRefBot",
      "emotion": "Joy",
      "value": 0
    },
    {
      "userId": "Nebresto",
      "emotion": "Anger",
      "value": 9
    },
    {
      "userId": "Nebresto",
      "emotion": "Sadness",
      "value": 6
    },
    {
      "userId": "Nebresto",
      "emotion": "Fear",
      "value": 14
    },
    {
      "userId": "Nebresto",
      "emotion": "Neutral",
      "value": 4
    },
    {
      "userId": "Nebresto",
      "emotion": "Surprise",
      "value": 94
    },
    {
      "userId": "Nebresto",
      "emotion": "Joy",
      "value": 1
    },
    {
      "userId": "NeptunePlage",
      "emotion": "Anger",
      "value": 33
    },
    {
      "userId": "NeptunePlage",
      "emotion": "Sadness",
      "value": 7
    },
    {
      "userId": "NeptunePlage",
      "emotion": "Fear",
      "value": 15
    },
    {
      "userId": "NeptunePlage",
      "emotion": "Neutral",
      "value": 9
    },
    {
      "userId": "NeptunePlage",
      "emotion": "Surprise",
      "value": 26
    },
    {
      "userId": "NeptunePlage",
      "emotion": "Joy",
      "value": 13
    },
    {
      "userId": "OrginalCuck",
      "emotion": "Anger",
      "value": 18
    },
    {
      "userId": "OrginalCuck",
      "emotion": "Sadness",
      "value": 12
    },
    {
      "userId": "OrginalCuck",
      "emotion": "Fear",
      "value": 13
    },
    {
      "userId": "OrginalCuck",
      "emotion": "Neutral",
      "value": 11
    },
    {
      "userId": "OrginalCuck",
      "emotion": "Surprise",
      "value": 48
    },
    {
      "userId": "OrginalCuck",
      "emotion": "Joy",
      "value": 107
    },
    {
      "userId": "Ouroboros000",
      "emotion": "Anger",
      "value": 38
    },
    {
      "userId": "Ouroboros000",
      "emotion": "Sadness",
      "value": 10
    },
    {
      "userId": "Ouroboros000",
      "emotion": "Fear",
      "value": 10
    },
    {
      "userId": "Ouroboros000",
      "emotion": "Neutral",
      "value": 4
    },
    {
      "userId": "Ouroboros000",
      "emotion": "Surprise",
      "value": 83
    },
    {
      "userId": "Ouroboros000",
      "emotion": "Joy",
      "value": 13
    },
    {
      "userId": "Owlbelle0",
      "emotion": "Anger",
      "value": 13
    },
    {
      "userId": "Owlbelle0",
      "emotion": "Sadness",
      "value": 6
    },
    {
      "userId": "Owlbelle0",
      "emotion": "Fear",
      "value": 53
    },
    {
      "userId": "Owlbelle0",
      "emotion": "Neutral",
      "value": 7
    },
    {
      "userId": "Owlbelle0",
      "emotion": "Surprise",
      "value": 16
    },
    {
      "userId": "Owlbelle0",
      "emotion": "Joy",
      "value": 64
    },
    {
      "userId": "PaleRulerGoingAlone7",
      "emotion": "Anger",
      "value": 4
    },
    {
      "userId": "PaleRulerGoingAlone7",
      "emotion": "Sadness",
      "value": 1
    },
    {
      "userId": "PaleRulerGoingAlone7",
      "emotion": "Fear",
      "value": 2
    },
    {
      "userId": "PaleRulerGoingAlone7",
      "emotion": "Neutral",
      "value": 111
    },
    {
      "userId": "PaleRulerGoingAlone7",
      "emotion": "Surprise",
      "value": 30
    },
    {
      "userId": "PaleRulerGoingAlone7",
      "emotion": "Joy",
      "value": 3
    },
    {
      "userId": "Popeyesmotherfucker",
      "emotion": "Anger",
      "value": 10
    },
    {
      "userId": "Popeyesmotherfucker",
      "emotion": "Sadness",
      "value": 5
    },
    {
      "userId": "Popeyesmotherfucker",
      "emotion": "Fear",
      "value": 4
    },
    {
      "userId": "Popeyesmotherfucker",
      "emotion": "Neutral",
      "value": 8
    },
    {
      "userId": "Popeyesmotherfucker",
      "emotion": "Surprise",
      "value": 48
    },
    {
      "userId": "Popeyesmotherfucker",
      "emotion": "Joy",
      "value": 41
    },
    {
      "userId": "ProfessorShameless",
      "emotion": "Anger",
      "value": 15
    },
    {
      "userId": "ProfessorShameless",
      "emotion": "Sadness",
      "value": 9
    },
    {
      "userId": "ProfessorShameless",
      "emotion": "Fear",
      "value": 4
    },
    {
      "userId": "ProfessorShameless",
      "emotion": "Neutral",
      "value": 1
    },
    {
      "userId": "ProfessorShameless",
      "emotion": "Surprise",
      "value": 29
    },
    {
      "userId": "ProfessorShameless",
      "emotion": "Joy",
      "value": 46
    },
    {
      "userId": "RAWZAUCE420B",
      "emotion": "Anger",
      "value": 11
    },
    {
      "userId": "RAWZAUCE420B",
      "emotion": "Sadness",
      "value": 7
    },
    {
      "userId": "RAWZAUCE420B",
      "emotion": "Fear",
      "value": 6
    },
    {
      "userId": "RAWZAUCE420B",
      "emotion": "Neutral",
      "value": 9
    },
    {
      "userId": "RAWZAUCE420B",
      "emotion": "Surprise",
      "value": 88
    },
    {
      "userId": "RAWZAUCE420B",
      "emotion": "Joy",
      "value": 47
    },
    {
      "userId": "Reffoty17",
      "emotion": "Anger",
      "value": 2
    },
    {
      "userId": "Reffoty17",
      "emotion": "Sadness",
      "value": 10
    },
    {
      "userId": "Reffoty17",
      "emotion": "Fear",
      "value": 14
    },
    {
      "userId": "Reffoty17",
      "emotion": "Neutral",
      "value": 39
    },
    {
      "userId": "Reffoty17",
      "emotion": "Surprise",
      "value": 41
    },
    {
      "userId": "Reffoty17",
      "emotion": "Joy",
      "value": 9
    },
    {
      "userId": "Roboragi",
      "emotion": "Anger",
      "value": 0
    },
    {
      "userId": "Roboragi",
      "emotion": "Sadness",
      "value": 77
    },
    {
      "userId": "Roboragi",
      "emotion": "Fear",
      "value": 0
    },
    {
      "userId": "Roboragi",
      "emotion": "Neutral",
      "value": 0
    },
    {
      "userId": "Roboragi",
      "emotion": "Surprise",
      "value": 323
    },
    {
      "userId": "Roboragi",
      "emotion": "Joy",
      "value": 0
    },
    {
      "userId": "SapienSaw",
      "emotion": "Anger",
      "value": 3
    },
    {
      "userId": "SapienSaw",
      "emotion": "Sadness",
      "value": 2
    },
    {
      "userId": "SapienSaw",
      "emotion": "Fear",
      "value": 29
    },
    {
      "userId": "SapienSaw",
      "emotion": "Neutral",
      "value": 5
    },
    {
      "userId": "SapienSaw",
      "emotion": "Surprise",
      "value": 47
    },
    {
      "userId": "SapienSaw",
      "emotion": "Joy",
      "value": 41
    },
    {
      "userId": "SlashAgris",
      "emotion": "Anger",
      "value": 4
    },
    {
      "userId": "SlashAgris",
      "emotion": "Sadness",
      "value": 0
    },
    {
      "userId": "SlashAgris",
      "emotion": "Fear",
      "value": 3
    },
    {
      "userId": "SlashAgris",
      "emotion": "Neutral",
      "value": 19
    },
    {
      "userId": "SlashAgris",
      "emotion": "Surprise",
      "value": 75
    },
    {
      "userId": "SlashAgris",
      "emotion": "Joy",
      "value": 3
    },
    {
      "userId": "SoraForBestBoy",
      "emotion": "Anger",
      "value": 12
    },
    {
      "userId": "SoraForBestBoy",
      "emotion": "Sadness",
      "value": 8
    },
    {
      "userId": "SoraForBestBoy",
      "emotion": "Fear",
      "value": 14
    },
    {
      "userId": "SoraForBestBoy",
      "emotion": "Neutral",
      "value": 0
    },
    {
      "userId": "SoraForBestBoy",
      "emotion": "Surprise",
      "value": 35
    },
    {
      "userId": "SoraForBestBoy",
      "emotion": "Joy",
      "value": 40
    },
    {
      "userId": "SpaghettiDelicious",
      "emotion": "Anger",
      "value": 14
    },
    {
      "userId": "SpaghettiDelicious",
      "emotion": "Sadness",
      "value": 8
    },
    {
      "userId": "SpaghettiDelicious",
      "emotion": "Fear",
      "value": 4
    },
    {
      "userId": "SpaghettiDelicious",
      "emotion": "Neutral",
      "value": 7
    },
    {
      "userId": "SpaghettiDelicious",
      "emotion": "Surprise",
      "value": 39
    },
    {
      "userId": "SpaghettiDelicious",
      "emotion": "Joy",
      "value": 34
    },
    {
      "userId": "The-Bigger-Fish",
      "emotion": "Anger",
      "value": 41
    },
    {
      "userId": "The-Bigger-Fish",
      "emotion": "Sadness",
      "value": 4
    },
    {
      "userId": "The-Bigger-Fish",
      "emotion": "Fear",
      "value": 29
    },
    {
      "userId": "The-Bigger-Fish",
      "emotion": "Neutral",
      "value": 33
    },
    {
      "userId": "The-Bigger-Fish",
      "emotion": "Surprise",
      "value": 36
    },
    {
      "userId": "The-Bigger-Fish",
      "emotion": "Joy",
      "value": 3
    },
    {
      "userId": "The-Paranoid-Android",
      "emotion": "Anger",
      "value": 0
    },
    {
      "userId": "The-Paranoid-Android",
      "emotion": "Sadness",
      "value": 0
    },
    {
      "userId": "The-Paranoid-Android",
      "emotion": "Fear",
      "value": 0
    },
    {
      "userId": "The-Paranoid-Android",
      "emotion": "Neutral",
      "value": 0
    },
    {
      "userId": "The-Paranoid-Android",
      "emotion": "Surprise",
      "value": 243
    },
    {
      "userId": "The-Paranoid-Android",
      "emotion": "Joy",
      "value": 0
    },
    {
      "userId": "TheArmoryOne",
      "emotion": "Anger",
      "value": 34
    },
    {
      "userId": "TheArmoryOne",
      "emotion": "Sadness",
      "value": 10
    },
    {
      "userId": "TheArmoryOne",
      "emotion": "Fear",
      "value": 5
    },
    {
      "userId": "TheArmoryOne",
      "emotion": "Neutral",
      "value": 18
    },
    {
      "userId": "TheArmoryOne",
      "emotion": "Surprise",
      "value": 109
    },
    {
      "userId": "TheArmoryOne",
      "emotion": "Joy",
      "value": 18
    },
    {
      "userId": "TheMythof_Feminism",
      "emotion": "Anger",
      "value": 57
    },
    {
      "userId": "TheMythof_Feminism",
      "emotion": "Sadness",
      "value": 8
    },
    {
      "userId": "TheMythof_Feminism",
      "emotion": "Fear",
      "value": 8
    },
    {
      "userId": "TheMythof_Feminism",
      "emotion": "Neutral",
      "value": 0
    },
    {
      "userId": "TheMythof_Feminism",
      "emotion": "Surprise",
      "value": 38
    },
    {
      "userId": "TheMythof_Feminism",
      "emotion": "Joy",
      "value": 13
    },
    {
      "userId": "TheSoonerfan444",
      "emotion": "Anger",
      "value": 29
    },
    {
      "userId": "TheSoonerfan444",
      "emotion": "Sadness",
      "value": 13
    },
    {
      "userId": "TheSoonerfan444",
      "emotion": "Fear",
      "value": 11
    },
    {
      "userId": "TheSoonerfan444",
      "emotion": "Neutral",
      "value": 6
    },
    {
      "userId": "TheSoonerfan444",
      "emotion": "Surprise",
      "value": 88
    },
    {
      "userId": "TheSoonerfan444",
      "emotion": "Joy",
      "value": 31
    },
    {
      "userId": "Timur_tomb_opener",
      "emotion": "Anger",
      "value": 11
    },
    {
      "userId": "Timur_tomb_opener",
      "emotion": "Sadness",
      "value": 6
    },
    {
      "userId": "Timur_tomb_opener",
      "emotion": "Fear",
      "value": 22
    },
    {
      "userId": "Timur_tomb_opener",
      "emotion": "Neutral",
      "value": 6
    },
    {
      "userId": "Timur_tomb_opener",
      "emotion": "Surprise",
      "value": 70
    },
    {
      "userId": "Timur_tomb_opener",
      "emotion": "Joy",
      "value": 10
    },
    {
      "userId": "Tsukino_Stareine",
      "emotion": "Anger",
      "value": 17
    },
    {
      "userId": "Tsukino_Stareine",
      "emotion": "Sadness",
      "value": 7
    },
    {
      "userId": "Tsukino_Stareine",
      "emotion": "Fear",
      "value": 2
    },
    {
      "userId": "Tsukino_Stareine",
      "emotion": "Neutral",
      "value": 3
    },
    {
      "userId": "Tsukino_Stareine",
      "emotion": "Surprise",
      "value": 81
    },
    {
      "userId": "Tsukino_Stareine",
      "emotion": "Joy",
      "value": 9
    },
    {
      "userId": "VivaLaDbakes",
      "emotion": "Anger",
      "value": 6
    },
    {
      "userId": "VivaLaDbakes",
      "emotion": "Sadness",
      "value": 6
    },
    {
      "userId": "VivaLaDbakes",
      "emotion": "Fear",
      "value": 4
    },
    {
      "userId": "VivaLaDbakes",
      "emotion": "Neutral",
      "value": 0
    },
    {
      "userId": "VivaLaDbakes",
      "emotion": "Surprise",
      "value": 41
    },
    {
      "userId": "VivaLaDbakes",
      "emotion": "Joy",
      "value": 44
    },
    {
      "userId": "VredditDownloader",
      "emotion": "Anger",
      "value": 0
    },
    {
      "userId": "VredditDownloader",
      "emotion": "Sadness",
      "value": 0
    },
    {
      "userId": "VredditDownloader",
      "emotion": "Fear",
      "value": 0
    },
    {
      "userId": "VredditDownloader",
      "emotion": "Neutral",
      "value": 0
    },
    {
      "userId": "VredditDownloader",
      "emotion": "Surprise",
      "value": 1175
    },
    {
      "userId": "VredditDownloader",
      "emotion": "Joy",
      "value": 0
    },
    {
      "userId": "WaitingToBeTriggered",
      "emotion": "Anger",
      "value": 3
    },
    {
      "userId": "WaitingToBeTriggered",
      "emotion": "Sadness",
      "value": 5
    },
    {
      "userId": "WaitingToBeTriggered",
      "emotion": "Fear",
      "value": 11
    },
    {
      "userId": "WaitingToBeTriggered",
      "emotion": "Neutral",
      "value": 9
    },
    {
      "userId": "WaitingToBeTriggered",
      "emotion": "Surprise",
      "value": 128
    },
    {
      "userId": "WaitingToBeTriggered",
      "emotion": "Joy",
      "value": 41
    },
    {
      "userId": "Wattybangbang",
      "emotion": "Anger",
      "value": 13
    },
    {
      "userId": "Wattybangbang",
      "emotion": "Sadness",
      "value": 5
    },
    {
      "userId": "Wattybangbang",
      "emotion": "Fear",
      "value": 8
    },
    {
      "userId": "Wattybangbang",
      "emotion": "Neutral",
      "value": 3
    },
    {
      "userId": "Wattybangbang",
      "emotion": "Surprise",
      "value": 60
    },
    {
      "userId": "Wattybangbang",
      "emotion": "Joy",
      "value": 13
    },
    {
      "userId": "X-Drakken",
      "emotion": "Anger",
      "value": 14
    },
    {
      "userId": "X-Drakken",
      "emotion": "Sadness",
      "value": 6
    },
    {
      "userId": "X-Drakken",
      "emotion": "Fear",
      "value": 5
    },
    {
      "userId": "X-Drakken",
      "emotion": "Neutral",
      "value": 18
    },
    {
      "userId": "X-Drakken",
      "emotion": "Surprise",
      "value": 283
    },
    {
      "userId": "X-Drakken",
      "emotion": "Joy",
      "value": 13
    },
    {
      "userId": "a-username-for-me",
      "emotion": "Anger",
      "value": 8
    },
    {
      "userId": "a-username-for-me",
      "emotion": "Sadness",
      "value": 6
    },
    {
      "userId": "a-username-for-me",
      "emotion": "Fear",
      "value": 5
    },
    {
      "userId": "a-username-for-me",
      "emotion": "Neutral",
      "value": 162
    },
    {
      "userId": "a-username-for-me",
      "emotion": "Surprise",
      "value": 240
    },
    {
      "userId": "a-username-for-me",
      "emotion": "Joy",
      "value": 7
    },
    {
      "userId": "antronmae",
      "emotion": "Anger",
      "value": 8
    },
    {
      "userId": "antronmae",
      "emotion": "Sadness",
      "value": 10
    },
    {
      "userId": "antronmae",
      "emotion": "Fear",
      "value": 6
    },
    {
      "userId": "antronmae",
      "emotion": "Neutral",
      "value": 6
    },
    {
      "userId": "antronmae",
      "emotion": "Surprise",
      "value": 46
    },
    {
      "userId": "antronmae",
      "emotion": "Joy",
      "value": 27
    },
    {
      "userId": "awhaling",
      "emotion": "Anger",
      "value": 14
    },
    {
      "userId": "awhaling",
      "emotion": "Sadness",
      "value": 4
    },
    {
      "userId": "awhaling",
      "emotion": "Fear",
      "value": 5
    },
    {
      "userId": "awhaling",
      "emotion": "Neutral",
      "value": 1
    },
    {
      "userId": "awhaling",
      "emotion": "Surprise",
      "value": 32
    },
    {
      "userId": "awhaling",
      "emotion": "Joy",
      "value": 49
    },
    {
      "userId": "canitryto",
      "emotion": "Anger",
      "value": 11
    },
    {
      "userId": "canitryto",
      "emotion": "Sadness",
      "value": 6
    },
    {
      "userId": "canitryto",
      "emotion": "Fear",
      "value": 3
    },
    {
      "userId": "canitryto",
      "emotion": "Neutral",
      "value": 4
    },
    {
      "userId": "canitryto",
      "emotion": "Surprise",
      "value": 66
    },
    {
      "userId": "canitryto",
      "emotion": "Joy",
      "value": 12
    },
    {
      "userId": "cdtd",
      "emotion": "Anger",
      "value": 16
    },
    {
      "userId": "cdtd",
      "emotion": "Sadness",
      "value": 8
    },
    {
      "userId": "cdtd",
      "emotion": "Fear",
      "value": 8
    },
    {
      "userId": "cdtd",
      "emotion": "Neutral",
      "value": 3
    },
    {
      "userId": "cdtd",
      "emotion": "Surprise",
      "value": 48
    },
    {
      "userId": "cdtd",
      "emotion": "Joy",
      "value": 42
    },
    {
      "userId": "colby6666",
      "emotion": "Anger",
      "value": 2
    },
    {
      "userId": "colby6666",
      "emotion": "Sadness",
      "value": 1
    },
    {
      "userId": "colby6666",
      "emotion": "Fear",
      "value": 2
    },
    {
      "userId": "colby6666",
      "emotion": "Neutral",
      "value": 97
    },
    {
      "userId": "colby6666",
      "emotion": "Surprise",
      "value": 80
    },
    {
      "userId": "colby6666",
      "emotion": "Joy",
      "value": 7
    },
    {
      "userId": "danringer",
      "emotion": "Anger",
      "value": 0
    },
    {
      "userId": "danringer",
      "emotion": "Sadness",
      "value": 1
    },
    {
      "userId": "danringer",
      "emotion": "Fear",
      "value": 4
    },
    {
      "userId": "danringer",
      "emotion": "Neutral",
      "value": 38
    },
    {
      "userId": "danringer",
      "emotion": "Surprise",
      "value": 82
    },
    {
      "userId": "danringer",
      "emotion": "Joy",
      "value": 1
    },
    {
      "userId": "deadsix6",
      "emotion": "Anger",
      "value": 4
    },
    {
      "userId": "deadsix6",
      "emotion": "Sadness",
      "value": 5
    },
    {
      "userId": "deadsix6",
      "emotion": "Fear",
      "value": 30
    },
    {
      "userId": "deadsix6",
      "emotion": "Neutral",
      "value": 2
    },
    {
      "userId": "deadsix6",
      "emotion": "Surprise",
      "value": 70
    },
    {
      "userId": "deadsix6",
      "emotion": "Joy",
      "value": 16
    },
    {
      "userId": "egg_on_my_spaghet",
      "emotion": "Anger",
      "value": 6
    },
    {
      "userId": "egg_on_my_spaghet",
      "emotion": "Sadness",
      "value": 3
    },
    {
      "userId": "egg_on_my_spaghet",
      "emotion": "Fear",
      "value": 1
    },
    {
      "userId": "egg_on_my_spaghet",
      "emotion": "Neutral",
      "value": 39
    },
    {
      "userId": "egg_on_my_spaghet",
      "emotion": "Surprise",
      "value": 51
    },
    {
      "userId": "egg_on_my_spaghet",
      "emotion": "Joy",
      "value": 14
    },
    {
      "userId": "elPibeNoEntendiaNada",
      "emotion": "Anger",
      "value": 7
    },
    {
      "userId": "elPibeNoEntendiaNada",
      "emotion": "Sadness",
      "value": 6
    },
    {
      "userId": "elPibeNoEntendiaNada",
      "emotion": "Fear",
      "value": 49
    },
    {
      "userId": "elPibeNoEntendiaNada",
      "emotion": "Neutral",
      "value": 9
    },
    {
      "userId": "elPibeNoEntendiaNada",
      "emotion": "Surprise",
      "value": 29
    },
    {
      "userId": "elPibeNoEntendiaNada",
      "emotion": "Joy",
      "value": 8
    },
    {
      "userId": "fauxcactus77",
      "emotion": "Anger",
      "value": 9
    },
    {
      "userId": "fauxcactus77",
      "emotion": "Sadness",
      "value": 6
    },
    {
      "userId": "fauxcactus77",
      "emotion": "Fear",
      "value": 11
    },
    {
      "userId": "fauxcactus77",
      "emotion": "Neutral",
      "value": 5
    },
    {
      "userId": "fauxcactus77",
      "emotion": "Surprise",
      "value": 42
    },
    {
      "userId": "fauxcactus77",
      "emotion": "Joy",
      "value": 32
    },
    {
      "userId": "garlicbreadfan427",
      "emotion": "Anger",
      "value": 15
    },
    {
      "userId": "garlicbreadfan427",
      "emotion": "Sadness",
      "value": 11
    },
    {
      "userId": "garlicbreadfan427",
      "emotion": "Fear",
      "value": 5
    },
    {
      "userId": "garlicbreadfan427",
      "emotion": "Neutral",
      "value": 25
    },
    {
      "userId": "garlicbreadfan427",
      "emotion": "Surprise",
      "value": 87
    },
    {
      "userId": "garlicbreadfan427",
      "emotion": "Joy",
      "value": 61
    },
    {
      "userId": "grubas",
      "emotion": "Anger",
      "value": 32
    },
    {
      "userId": "grubas",
      "emotion": "Sadness",
      "value": 7
    },
    {
      "userId": "grubas",
      "emotion": "Fear",
      "value": 2
    },
    {
      "userId": "grubas",
      "emotion": "Neutral",
      "value": 5
    },
    {
      "userId": "grubas",
      "emotion": "Surprise",
      "value": 45
    },
    {
      "userId": "grubas",
      "emotion": "Joy",
      "value": 18
    },
    {
      "userId": "iTwoBearsHighFiving",
      "emotion": "Anger",
      "value": 12
    },
    {
      "userId": "iTwoBearsHighFiving",
      "emotion": "Sadness",
      "value": 6
    },
    {
      "userId": "iTwoBearsHighFiving",
      "emotion": "Fear",
      "value": 38
    },
    {
      "userId": "iTwoBearsHighFiving",
      "emotion": "Neutral",
      "value": 4
    },
    {
      "userId": "iTwoBearsHighFiving",
      "emotion": "Surprise",
      "value": 35
    },
    {
      "userId": "iTwoBearsHighFiving",
      "emotion": "Joy",
      "value": 10
    },
    {
      "userId": "im-an-architect",
      "emotion": "Anger",
      "value": 15
    },
    {
      "userId": "im-an-architect",
      "emotion": "Sadness",
      "value": 4
    },
    {
      "userId": "im-an-architect",
      "emotion": "Fear",
      "value": 9
    },
    {
      "userId": "im-an-architect",
      "emotion": "Neutral",
      "value": 0
    },
    {
      "userId": "im-an-architect",
      "emotion": "Surprise",
      "value": 38
    },
    {
      "userId": "im-an-architect",
      "emotion": "Joy",
      "value": 49
    },
    {
      "userId": "jaybigs",
      "emotion": "Anger",
      "value": 31
    },
    {
      "userId": "jaybigs",
      "emotion": "Sadness",
      "value": 12
    },
    {
      "userId": "jaybigs",
      "emotion": "Fear",
      "value": 21
    },
    {
      "userId": "jaybigs",
      "emotion": "Neutral",
      "value": 2
    },
    {
      "userId": "jaybigs",
      "emotion": "Surprise",
      "value": 42
    },
    {
      "userId": "jaybigs",
      "emotion": "Joy",
      "value": 20
    },
    {
      "userId": "jimmyloi92",
      "emotion": "Anger",
      "value": 3
    },
    {
      "userId": "jimmyloi92",
      "emotion": "Sadness",
      "value": 0
    },
    {
      "userId": "jimmyloi92",
      "emotion": "Fear",
      "value": 4
    },
    {
      "userId": "jimmyloi92",
      "emotion": "Neutral",
      "value": 45
    },
    {
      "userId": "jimmyloi92",
      "emotion": "Surprise",
      "value": 52
    },
    {
      "userId": "jimmyloi92",
      "emotion": "Joy",
      "value": 2
    },
    {
      "userId": "kekiokolanee",
      "emotion": "Anger",
      "value": 9
    },
    {
      "userId": "kekiokolanee",
      "emotion": "Sadness",
      "value": 2
    },
    {
      "userId": "kekiokolanee",
      "emotion": "Fear",
      "value": 5
    },
    {
      "userId": "kekiokolanee",
      "emotion": "Neutral",
      "value": 20
    },
    {
      "userId": "kekiokolanee",
      "emotion": "Surprise",
      "value": 42
    },
    {
      "userId": "kekiokolanee",
      "emotion": "Joy",
      "value": 35
    },
    {
      "userId": "killaplz",
      "emotion": "Anger",
      "value": 8
    },
    {
      "userId": "killaplz",
      "emotion": "Sadness",
      "value": 9
    },
    {
      "userId": "killaplz",
      "emotion": "Fear",
      "value": 19
    },
    {
      "userId": "killaplz",
      "emotion": "Neutral",
      "value": 12
    },
    {
      "userId": "killaplz",
      "emotion": "Surprise",
      "value": 61
    },
    {
      "userId": "killaplz",
      "emotion": "Joy",
      "value": 57
    },
    {
      "userId": "kpba32",
      "emotion": "Anger",
      "value": 13
    },
    {
      "userId": "kpba32",
      "emotion": "Sadness",
      "value": 3
    },
    {
      "userId": "kpba32",
      "emotion": "Fear",
      "value": 7
    },
    {
      "userId": "kpba32",
      "emotion": "Neutral",
      "value": 7
    },
    {
      "userId": "kpba32",
      "emotion": "Surprise",
      "value": 59
    },
    {
      "userId": "kpba32",
      "emotion": "Joy",
      "value": 20
    },
    {
      "userId": "krawmol",
      "emotion": "Anger",
      "value": 44
    },
    {
      "userId": "krawmol",
      "emotion": "Sadness",
      "value": 11
    },
    {
      "userId": "krawmol",
      "emotion": "Fear",
      "value": 31
    },
    {
      "userId": "krawmol",
      "emotion": "Neutral",
      "value": 0
    },
    {
      "userId": "krawmol",
      "emotion": "Surprise",
      "value": 23
    },
    {
      "userId": "krawmol",
      "emotion": "Joy",
      "value": 18
    },
    {
      "userId": "lKeepCocaineInMyAss",
      "emotion": "Anger",
      "value": 43
    },
    {
      "userId": "lKeepCocaineInMyAss",
      "emotion": "Sadness",
      "value": 6
    },
    {
      "userId": "lKeepCocaineInMyAss",
      "emotion": "Fear",
      "value": 8
    },
    {
      "userId": "lKeepCocaineInMyAss",
      "emotion": "Neutral",
      "value": 3
    },
    {
      "userId": "lKeepCocaineInMyAss",
      "emotion": "Surprise",
      "value": 62
    },
    {
      "userId": "lKeepCocaineInMyAss",
      "emotion": "Joy",
      "value": 36
    },
    {
      "userId": "lebaronslebaron",
      "emotion": "Anger",
      "value": 32
    },
    {
      "userId": "lebaronslebaron",
      "emotion": "Sadness",
      "value": 11
    },
    {
      "userId": "lebaronslebaron",
      "emotion": "Fear",
      "value": 9
    },
    {
      "userId": "lebaronslebaron",
      "emotion": "Neutral",
      "value": 8
    },
    {
      "userId": "lebaronslebaron",
      "emotion": "Surprise",
      "value": 60
    },
    {
      "userId": "lebaronslebaron",
      "emotion": "Joy",
      "value": 26
    },
    {
      "userId": "lee-everett-1975",
      "emotion": "Anger",
      "value": 38
    },
    {
      "userId": "lee-everett-1975",
      "emotion": "Sadness",
      "value": 12
    },
    {
      "userId": "lee-everett-1975",
      "emotion": "Fear",
      "value": 10
    },
    {
      "userId": "lee-everett-1975",
      "emotion": "Neutral",
      "value": 9
    },
    {
      "userId": "lee-everett-1975",
      "emotion": "Surprise",
      "value": 22
    },
    {
      "userId": "lee-everett-1975",
      "emotion": "Joy",
      "value": 29
    },
    {
      "userId": "lr880618",
      "emotion": "Anger",
      "value": 1
    },
    {
      "userId": "lr880618",
      "emotion": "Sadness",
      "value": 1
    },
    {
      "userId": "lr880618",
      "emotion": "Fear",
      "value": 3
    },
    {
      "userId": "lr880618",
      "emotion": "Neutral",
      "value": 0
    },
    {
      "userId": "lr880618",
      "emotion": "Surprise",
      "value": 102
    },
    {
      "userId": "lr880618",
      "emotion": "Joy",
      "value": 3
    },
    {
      "userId": "mavropanos27",
      "emotion": "Anger",
      "value": 9
    },
    {
      "userId": "mavropanos27",
      "emotion": "Sadness",
      "value": 11
    },
    {
      "userId": "mavropanos27",
      "emotion": "Fear",
      "value": 4
    },
    {
      "userId": "mavropanos27",
      "emotion": "Neutral",
      "value": 7
    },
    {
      "userId": "mavropanos27",
      "emotion": "Surprise",
      "value": 49
    },
    {
      "userId": "mavropanos27",
      "emotion": "Joy",
      "value": 22
    },
    {
      "userId": "mrxd15",
      "emotion": "Anger",
      "value": 27
    },
    {
      "userId": "mrxd15",
      "emotion": "Sadness",
      "value": 4
    },
    {
      "userId": "mrxd15",
      "emotion": "Fear",
      "value": 22
    },
    {
      "userId": "mrxd15",
      "emotion": "Neutral",
      "value": 23
    },
    {
      "userId": "mrxd15",
      "emotion": "Surprise",
      "value": 94
    },
    {
      "userId": "mrxd15",
      "emotion": "Joy",
      "value": 9
    },
    {
      "userId": "notsafeforh0me",
      "emotion": "Anger",
      "value": 21
    },
    {
      "userId": "notsafeforh0me",
      "emotion": "Sadness",
      "value": 17
    },
    {
      "userId": "notsafeforh0me",
      "emotion": "Fear",
      "value": 15
    },
    {
      "userId": "notsafeforh0me",
      "emotion": "Neutral",
      "value": 3
    },
    {
      "userId": "notsafeforh0me",
      "emotion": "Surprise",
      "value": 46
    },
    {
      "userId": "notsafeforh0me",
      "emotion": "Joy",
      "value": 57
    },
    {
      "userId": "nwordcountbot",
      "emotion": "Anger",
      "value": 11
    },
    {
      "userId": "nwordcountbot",
      "emotion": "Sadness",
      "value": 0
    },
    {
      "userId": "nwordcountbot",
      "emotion": "Fear",
      "value": 250
    },
    {
      "userId": "nwordcountbot",
      "emotion": "Neutral",
      "value": 0
    },
    {
      "userId": "nwordcountbot",
      "emotion": "Surprise",
      "value": 0
    },
    {
      "userId": "nwordcountbot",
      "emotion": "Joy",
      "value": 0
    },
    {
      "userId": "periodicdepression",
      "emotion": "Anger",
      "value": 2
    },
    {
      "userId": "periodicdepression",
      "emotion": "Sadness",
      "value": 8
    },
    {
      "userId": "periodicdepression",
      "emotion": "Fear",
      "value": 13
    },
    {
      "userId": "periodicdepression",
      "emotion": "Neutral",
      "value": 2
    },
    {
      "userId": "periodicdepression",
      "emotion": "Surprise",
      "value": 8
    },
    {
      "userId": "periodicdepression",
      "emotion": "Joy",
      "value": 77
    },
    {
      "userId": "poke9090",
      "emotion": "Anger",
      "value": 11
    },
    {
      "userId": "poke9090",
      "emotion": "Sadness",
      "value": 5
    },
    {
      "userId": "poke9090",
      "emotion": "Fear",
      "value": 20
    },
    {
      "userId": "poke9090",
      "emotion": "Neutral",
      "value": 13
    },
    {
      "userId": "poke9090",
      "emotion": "Surprise",
      "value": 59
    },
    {
      "userId": "poke9090",
      "emotion": "Joy",
      "value": 23
    },
    {
      "userId": "rahimmoore26",
      "emotion": "Anger",
      "value": 33
    },
    {
      "userId": "rahimmoore26",
      "emotion": "Sadness",
      "value": 7
    },
    {
      "userId": "rahimmoore26",
      "emotion": "Fear",
      "value": 3
    },
    {
      "userId": "rahimmoore26",
      "emotion": "Neutral",
      "value": 3
    },
    {
      "userId": "rahimmoore26",
      "emotion": "Surprise",
      "value": 33
    },
    {
      "userId": "rahimmoore26",
      "emotion": "Joy",
      "value": 25
    },
    {
      "userId": "s4mpson",
      "emotion": "Anger",
      "value": 7
    },
    {
      "userId": "s4mpson",
      "emotion": "Sadness",
      "value": 3
    },
    {
      "userId": "s4mpson",
      "emotion": "Fear",
      "value": 2
    },
    {
      "userId": "s4mpson",
      "emotion": "Neutral",
      "value": 3
    },
    {
      "userId": "s4mpson",
      "emotion": "Surprise",
      "value": 84
    },
    {
      "userId": "s4mpson",
      "emotion": "Joy",
      "value": 10
    },
    {
      "userId": "sashyblaze",
      "emotion": "Anger",
      "value": 15
    },
    {
      "userId": "sashyblaze",
      "emotion": "Sadness",
      "value": 11
    },
    {
      "userId": "sashyblaze",
      "emotion": "Fear",
      "value": 21
    },
    {
      "userId": "sashyblaze",
      "emotion": "Neutral",
      "value": 4
    },
    {
      "userId": "sashyblaze",
      "emotion": "Surprise",
      "value": 44
    },
    {
      "userId": "sashyblaze",
      "emotion": "Joy",
      "value": 16
    },
    {
      "userId": "spacesoulboi",
      "emotion": "Anger",
      "value": 15
    },
    {
      "userId": "spacesoulboi",
      "emotion": "Sadness",
      "value": 19
    },
    {
      "userId": "spacesoulboi",
      "emotion": "Fear",
      "value": 23
    },
    {
      "userId": "spacesoulboi",
      "emotion": "Neutral",
      "value": 8
    },
    {
      "userId": "spacesoulboi",
      "emotion": "Surprise",
      "value": 39
    },
    {
      "userId": "spacesoulboi",
      "emotion": "Joy",
      "value": 41
    },
    {
      "userId": "swartz913",
      "emotion": "Anger",
      "value": 2
    },
    {
      "userId": "swartz913",
      "emotion": "Sadness",
      "value": 2
    },
    {
      "userId": "swartz913",
      "emotion": "Fear",
      "value": 3
    },
    {
      "userId": "swartz913",
      "emotion": "Neutral",
      "value": 1
    },
    {
      "userId": "swartz913",
      "emotion": "Surprise",
      "value": 104
    },
    {
      "userId": "swartz913",
      "emotion": "Joy",
      "value": 69
    },
    {
      "userId": "that_clique_member",
      "emotion": "Anger",
      "value": 5
    },
    {
      "userId": "that_clique_member",
      "emotion": "Sadness",
      "value": 2
    },
    {
      "userId": "that_clique_member",
      "emotion": "Fear",
      "value": 5
    },
    {
      "userId": "that_clique_member",
      "emotion": "Neutral",
      "value": 0
    },
    {
      "userId": "that_clique_member",
      "emotion": "Surprise",
      "value": 4
    },
    {
      "userId": "that_clique_member",
      "emotion": "Joy",
      "value": 86
    },
    {
      "userId": "the5ilent1",
      "emotion": "Anger",
      "value": 22
    },
    {
      "userId": "the5ilent1",
      "emotion": "Sadness",
      "value": 9
    },
    {
      "userId": "the5ilent1",
      "emotion": "Fear",
      "value": 12
    },
    {
      "userId": "the5ilent1",
      "emotion": "Neutral",
      "value": 3
    },
    {
      "userId": "the5ilent1",
      "emotion": "Surprise",
      "value": 46
    },
    {
      "userId": "the5ilent1",
      "emotion": "Joy",
      "value": 23
    },
    {
      "userId": "thebestyouneverhad_",
      "emotion": "Anger",
      "value": 5
    },
    {
      "userId": "thebestyouneverhad_",
      "emotion": "Sadness",
      "value": 10
    },
    {
      "userId": "thebestyouneverhad_",
      "emotion": "Fear",
      "value": 13
    },
    {
      "userId": "thebestyouneverhad_",
      "emotion": "Neutral",
      "value": 7
    },
    {
      "userId": "thebestyouneverhad_",
      "emotion": "Surprise",
      "value": 49
    },
    {
      "userId": "thebestyouneverhad_",
      "emotion": "Joy",
      "value": 49
    },
    {
      "userId": "throwaway1212378",
      "emotion": "Anger",
      "value": 6
    },
    {
      "userId": "throwaway1212378",
      "emotion": "Sadness",
      "value": 6
    },
    {
      "userId": "throwaway1212378",
      "emotion": "Fear",
      "value": 3
    },
    {
      "userId": "throwaway1212378",
      "emotion": "Neutral",
      "value": 4
    },
    {
      "userId": "throwaway1212378",
      "emotion": "Surprise",
      "value": 48
    },
    {
      "userId": "throwaway1212378",
      "emotion": "Joy",
      "value": 63
    },
    {
      "userId": "vandymontana",
      "emotion": "Anger",
      "value": 27
    },
    {
      "userId": "vandymontana",
      "emotion": "Sadness",
      "value": 10
    },
    {
      "userId": "vandymontana",
      "emotion": "Fear",
      "value": 6
    },
    {
      "userId": "vandymontana",
      "emotion": "Neutral",
      "value": 8
    },
    {
      "userId": "vandymontana",
      "emotion": "Surprise",
      "value": 53
    },
    {
      "userId": "vandymontana",
      "emotion": "Joy",
      "value": 13
    },
    {
      "userId": "wingman43487",
      "emotion": "Anger",
      "value": 33
    },
    {
      "userId": "wingman43487",
      "emotion": "Sadness",
      "value": 14
    },
    {
      "userId": "wingman43487",
      "emotion": "Fear",
      "value": 12
    },
    {
      "userId": "wingman43487",
      "emotion": "Neutral",
      "value": 7
    },
    {
      "userId": "wingman43487",
      "emotion": "Surprise",
      "value": 57
    },
    {
      "userId": "wingman43487",
      "emotion": "Joy",
      "value": 10
    },
    {
      "userId": "yakman244",
      "emotion": "Anger",
      "value": 2
    },
    {
      "userId": "yakman244",
      "emotion": "Sadness",
      "value": 4
    },
    {
      "userId": "yakman244",
      "emotion": "Fear",
      "value": 7
    },
    {
      "userId": "yakman244",
      "emotion": "Neutral",
      "value": 16
    },
    {
      "userId": "yakman244",
      "emotion": "Surprise",
      "value": 91
    },
    {
      "userId": "yakman244",
      "emotion": "Joy",
      "value": 13
    },
    {
      "userId": "zgh5002",
      "emotion": "Anger",
      "value": 23
    },
    {
      "userId": "zgh5002",
      "emotion": "Sadness",
      "value": 6
    },
    {
      "userId": "zgh5002",
      "emotion": "Fear",
      "value": 5
    },
    {
      "userId": "zgh5002",
      "emotion": "Neutral",
      "value": 9
    },
    {
      "userId": "zgh5002",
      "emotion": "Surprise",
      "value": 60
    },
    {
      "userId": "zgh5002",
      "emotion": "Joy",
      "value": 21
    }
  ];

  myControl = new FormControl();
  filteredOptions: Observable<string[]>;

  ngOnInit(): void {
    this.users = [...new Set(this.localData.map(x => x.userId))];
    this.users.sort(function (a, b) {
      if (a < b) { return -1; }
      if (a > b) { return 1; }
      return 0;
    });
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
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

    chart.padding(0, 20, 20, 20);
    this.emotionRadarChart = chart;
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.users.filter(option => option.toLowerCase().includes(filterValue));
  }

  filterUser(user) {
    this.user = user;
    this.emotionRadarChart.data = this.localData.filter(x => x.userId == this.user);
  }

}
