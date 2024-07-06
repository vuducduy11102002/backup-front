import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'hospital-chart-bar',
  templateUrl: './bar.component.html',
})
export class ChartBarComponent implements OnInit {
  basicData: any;
  basicOptions: any;
  selectedDate!: Date;

  ngOnInit() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary'
    );
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.selectedDate = new Date(); // Khởi tạo selectedDate với ngày hiện tại

    this.updateChartData();

    this.basicOptions = {
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
        x: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
      },
    };
  }

  onDateSelect() {
    this.updateChartData();
  }

  updateChartData() {
    // Thực hiện logic để lấy dữ liệu cho biểu đồ dựa trên ngày được chọn
    // Trong ví dụ này, tôi sử dụng dữ liệu ngẫu nhiên
    const randomData = Array.from({ length: 7 }, () =>
      Math.floor(Math.random() * 100)
    );
    this.basicData = {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [
        {
          label: 'Daily Data',
          data: randomData,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgb(75, 192, 192)',
          borderWidth: 1,
        },
      ],
    };
  }
}
