import { Component, OnInit } from '@angular/core';
import { Predict, PredictService } from '@hospital/libs/services';

@Component({
  selector: 'hospital-list-predict',
  templateUrl: './list-predict.component.html',
})
export class ListPredictComponent implements OnInit {
  predict: Predict[] = [];
  selectedDate: string = new Date().toISOString().slice(0, 10);

  constructor(private predictService: PredictService) {}

  ngOnInit() {
    this.getPredict();
  }

  getPredict() {
    this.predictService.getPredict().subscribe((data) => {
      // Lọc các mục dữ liệu có ngày trùng khớp với selectedDate
      this.predict = data.filter(
        (item) => item.createdAt?.slice(0, 10) === this.selectedDate
      );
    });
  }

  dateSelected() {
    this.getPredict();
  }

  previousWeek() {
    const selectedDate = new Date(this.selectedDate);
    selectedDate.setDate(selectedDate.getDate() - 7);
    this.selectedDate = selectedDate.toISOString().slice(0, 10);
    this.getPredict();
  }

  nextWeek() {
    const selectedDate = new Date(this.selectedDate);
    selectedDate.setDate(selectedDate.getDate() + 7);
    this.selectedDate = selectedDate.toISOString().slice(0, 10);
    this.getPredict();
  }

  setDayOfWeek(
    dayIndex: number,
    referenceDate: string = new Date().toISOString().slice(0, 10)
  ) {
    const referenceDateObj = new Date(referenceDate);
    const diff = dayIndex - referenceDateObj.getDay();
    const selectedDate = new Date(referenceDateObj);
    selectedDate.setDate(referenceDateObj.getDate() + diff);
    this.selectedDate = selectedDate.toISOString().slice(0, 10);
    this.getPredict();
  }
}
