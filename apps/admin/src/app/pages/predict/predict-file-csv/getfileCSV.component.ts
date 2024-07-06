import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PredictService, CsvFile } from '@hospital/libs/services';
import * as moment from 'moment';

@Component({
  selector: 'hospital-getfilecsv-predict',
  templateUrl: './getfileCSV.component.html',
})
export class GetFileCSVComponent implements OnInit {
  csvFiles: CsvFile[] = [];
  selectedFileContent: string | null = null;
  selectedFileName: string | null = null;
  showDialog = false;
  selectedDate: moment.Moment = moment();
  calendarForm: FormGroup;

  constructor(private csvFileService: PredictService, private fb: FormBuilder) {
    this.calendarForm = this.fb.group({
      date: [this.selectedDate.toDate()],
    });
  }

  ngOnInit(): void {
    this.loadCsvFiles();
    this.calendarForm.get('date')!.valueChanges.subscribe((date) => {
      this.selectedDate = moment(date);
    });
  }

  loadCsvFiles(): void {
    this.csvFileService.getFileCsvList().subscribe(
      (data) => {
        this.csvFiles = data;
      },
      (error) => {
        console.error('Error fetching CSV files:', error);
      }
    );
  }

  getWeekDays(): moment.Moment[] {
    const startOfWeek = this.selectedDate.clone().startOf('week');
    const endOfWeek = this.selectedDate.clone().endOf('week');
    const days = [];
    let day = startOfWeek;

    while (day <= endOfWeek) {
      days.push(day.clone());
      day = day.clone().add(1, 'day');
    }

    return days;
  }

  getCsvFilesForDate(date: moment.Moment): CsvFile[] {
    const startOfDay = date.clone().startOf('day');
    const endOfDay = date.clone().endOf('day');
    return this.csvFiles.filter((file) => {
      const fileDate = moment(file.mtime, 'YYYY-MM-DD');
      return fileDate.isBetween(startOfDay, endOfDay, null, '[]');
    });
  }

  viewCsvContent(fileName: string): void {
    this.csvFileService.getCsvContent(fileName).subscribe(
      (data) => {
        this.selectedFileContent = data;
        this.selectedFileName = fileName;
        this.showDialog = true;
      },
      (error) => {
        console.error('Error fetching CSV content:', error);
      }
    );
  }

  downloadCsv(fileName: string): void {
    this.csvFileService.getCsvContent(fileName).subscribe(
      (data) => {
        const blob = new Blob([data], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
      },
      (error) => {
        console.error('Error downloading CSV file:', error);
      }
    );
  }

  closeDialog(): void {
    this.showDialog = false;
    this.selectedFileContent = null;
    this.selectedFileName = null;
  }

  getDayOfWeek(day: moment.Moment): string {
    return day.format('dddd');
  }
}
