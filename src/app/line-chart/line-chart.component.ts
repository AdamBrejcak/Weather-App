import { Component, ViewChild, OnInit } from "@angular/core";
import { WeatherDataService } from '../weather-data.service';
import {formatDate} from '@angular/common';

import { chartData } from "../lineChartData";
import { ChartOptions } from "../chartOptions";
import { ChartComponent } from "ng-apexcharts";

import * as _ from 'lodash';
@Component({
  selector: "app-root",
  templateUrl: "./line-chart.component.html",
  styleUrls: ["./line-chart.component.scss"]
})

export class LineChartComponent implements OnInit{
  // define variables
  date: Date = new Date("2013/4/27");
  showChart: boolean = false;
  weatherData: chartData[] = [];
  loading: boolean = false;
  error: string = "";

  // define methods
  resetChartData(){
    this.chartOptions.xaxis.categories = [];
    this.chartOptions.series[0].data = [];
  };

  formatChartData(res:any){
    res.forEach((element:chartData) => {
      if ((element.the_temp) && (formatDate(this.date, 'yyyy/MM/dd', 'en-US').split('/').join('-') === element.applicable_date) ) {
        // this.weatherData.push({"the_temp" : element.the_temp, "created" : element.created.slice(11,19), "applicable_date" : element.applicable_date});
        this.weatherData.push(element);
      };
      this.weatherData = _.sortBy(this.weatherData, "created", "desc");
    });

    this.weatherData.forEach((element:chartData) => {
      this.chartOptions.series[0].data.push(element.the_temp.toFixed(2));
      this.chartOptions.xaxis.categories.push(element.created.slice(11,19))
    })
  };

  onDateChange(){
    this.loading = true;
    this.showChart = false;
    this.resetChartData();
    this.weatherDataService.getWeatherData(formatDate(this.date, 'yyyy/MM/dd', 'en-US')).subscribe((res:any) => {
      this.formatChartData(res);
      this.showChart = true;
      this.loading = false;
    },
    err => {this.error = err,
      this.loading = false;
    }
    );
  };

  // chart from library
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
        text: "",
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
