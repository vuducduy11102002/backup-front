import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListPredictComponent } from './list-predict/list-predict.component';
import { GetFileCSVComponent } from './predict-file-csv/getfileCSV.component';

@NgModule({
  declarations: [ListPredictComponent, GetFileCSVComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [],
  exports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PredictModule {}
