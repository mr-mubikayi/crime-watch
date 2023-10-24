import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Article } from 'src/app/models/interfaces/article';
import { HelperService } from 'src/app/services/helper/helper.service';
import { InsightsService } from 'src/app/services/insights/insights.service';

@Component({
  selector: 'app-insights',
  templateUrl: './insights.page.html',
  styleUrls: ['./insights.page.scss'],
})
export class InsightsPage implements OnInit {

  articles: Article[];
  areaName: string;
  data: any;
  combinedData: any[]

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public bar_chart_option: ChartConfiguration['options'] = {
    font: {
      family: 'Inter'
    },
    animation: {
      easing: 'easeInOutElastic',
      delay: 25
    },
    responsive: true,
    scales: {
      x: {
        grid: {
          borderColor: this.helperService.getColorVariable('medium'),
          color: this.helperService.getColorVariable('medium')
        },
        ticks: {
          color: this.helperService.getColorVariable('tertiary'),
          font: {
            family: 'Inter',
            weight: '500'
          }
        }
      },
      y: {
        position: 'right',
        grid: {
          borderColor: this.helperService.getColorVariable('medium'),
          color: this.helperService.getColorVariable('medium')
        },
        ticks: {
          color: this.helperService.getColorVariable('tertiary'),
          font: {
            family: 'Inter',
            weight: '500'
          },
          callback: function (value, index, ticks) {
            return '$' + value;
          }
        }
      }
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: this.helperService.getColorVariable('dark'),
        bodyColor: this.helperService.getColorVariable('primary'),
        titleColor: this.helperService.getColorVariable('tertiary'),
        titleFont: {
          size: 14,
          weight: 'normal'
        },
        bodyFont: {
          size: 16,
          weight: 'bold'
        },
        padding: 12,
        boxWidth: 10,
        boxHeight: 10,
        boxPadding: 3,
        usePointStyle: true,
        callbacks: {
          // Add currency format to tooltip
          label: function (context) {
            var label = context.dataset.label || '';

            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
            }
            return label;
          }
        }
      }
    }
  };

  public bar_chart_data: ChartData<'bar'> = {
    labels: [],
    datasets: []
  };

  public bar_chart_type: ChartType = 'bar';

  content_loaded: boolean = false;

  constructor(
    private helperService: HelperService,
    private insightService: InsightsService) {
  }

  ngOnInit() {

    // Create bar chart
    this.createBarChart();

    this.insightService.getCityCrimeData().subscribe(response => {
      this.data = response;
      const combinedData = this.combineEntriesByYear(this.data);
    });
  }

  ionViewDidEnter() {

    // Fake timeout
    setTimeout(() => {
      this.content_loaded = true;
    }, 2000);
  }

  // Create bar chart
  createBarChart() {

    let helperService = this.helperService;

    // Random array of numbers
    let rand_numbers = [...Array(12)].map(e => Math.random() * 100 | 0);

    // Set labels
    this.bar_chart_data.labels = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

    // Set datasets
    this.bar_chart_data.datasets = [
      {
        data: rand_numbers,
        backgroundColor: function (context) {

          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (!chartArea) {
            // This case happens on initial chart load
            return null;
          }

          // Create gradient
          return helperService.createGradientChart(ctx, 'primary', 'primary');
        },
        barThickness: 10,
        borderRadius: 4,
        borderColor: helperService.getColorVariable('primary'),
        hoverBackgroundColor: helperService.getColorVariable('primary'),
        pointStyle: 'circle',
      }
    ];
  }

  combineEntriesByYear(data: any) {
    const groupedByYear: { [key: number]: any[] } = {};

    // Group entries by year
    data.entries.forEach((entry: any) => {
        if (!groupedByYear[entry.year]) {
            groupedByYear[entry.year] = [];
        }
        groupedByYear[entry.year].push(entry);
    });

    const combinedEntries: any[] = [];

    // Combine entries for each year
    for (const year in groupedByYear) {
        const entries = groupedByYear[year];
        const combinedEntry = {
            date: entries[0].date,
            worried_attacked: 0,
            year: parseInt(year),
            level_of_crime: 0,
            problem_property_crimes: 0,
            safe_alone_night: 0,
            worried_car_stolen: 0,
            worried_home_broken: 0
        };

        entries.forEach((entry: any) => {
            combinedEntry.worried_attacked += entry.worried_attacked;
            combinedEntry.level_of_crime += entry.level_of_crime;
            combinedEntry.worried_attacked += entry.worried_attacked;
            combinedEntry.problem_property_crimes += entry.problem_property_crimes;
            combinedEntry.safe_alone_night += entry.safe_alone_night;
            combinedEntry.worried_car_stolen += entry.worried_car_stolen;
            combinedEntry.worried_home_broken += entry.worried_home_broken;
        });

        combinedEntries.push(combinedEntry);
    }

    return {
        entries: combinedEntries,
        name: data.name,
        city_id: data.city_id
    };
}
}
