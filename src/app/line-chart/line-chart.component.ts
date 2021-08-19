import { Component, ViewChild, OnInit } from "@angular/core";
import { WeatherDataService } from '../weather-data.service';
import {formatDate} from '@angular/common';
import * as _ from 'lodash';

// import { chartData } from "../lineChartData";
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
};

@Component({
  selector: "app-root",
  templateUrl: "./line-chart.component.html",
  styleUrls: ["./line-chart.component.scss"]
})

export class LineChartComponent implements OnInit{
  date: Date = new Date("2013/4/27");
  showChart: boolean = false;
  weatherData: Object[] = [];
  loading: boolean = false;
  error: String[] = [];
  onDateChange(){
    this.loading = true;
    this.showChart = false;
    this.chartOptions.xaxis.categories = [];
    this.chartOptions.series[0].data = [];
    this.weatherDataService.getWeatherData(formatDate(this.date, 'yyyy/MM/dd', 'en-US')).subscribe((res:any) => {
      res.forEach((element:any) => {
        if (element.the_temp && formatDate(this.date, 'yyyy/MM/dd', 'en-US').split('/').join('-') === element.applicable_date) {
          this.weatherData.push(element);
        };
        this.weatherData = _.sortBy(this.weatherData, "created", "desc");
      });
      this.weatherData.forEach((element:any) => { //<----- chartData interface
        this.chartOptions.series[0].data.push(element.the_temp.toFixed(2));
        this.chartOptions.xaxis.categories.push(element.created.slice(11,19))
      })
      this.showChart = true;
      this.loading = false;
    },
    
    err => {this.error = err});
  };
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions> | any;

  constructor( private weatherDataService: WeatherDataService ) {
    this.chartOptions = {
      series: [
        {
          name: "Temperature",
          data: []
        }
      ],
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "straight"
      },
      title: {
        text: "Temperature by time",
        align: "left"
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"],
          opacity: 0.5
        }
      },
      xaxis: {
        categories: []
      }
    };
  };

  ngOnInit(): void {
    this.onDateChange();
  };
}
