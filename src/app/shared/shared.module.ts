import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { PaginationModule } from 'ngx-bootstrap/pagination';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ToastrModule.forRoot({
      positionClass:'toast-bottom-right'
    }), // ToastrModule added
    NgxSpinnerModule.forRoot({
      type :"line-scale-party"
    }),
    PaginationModule.forRoot(),

    ],
    exports:[
      ToastrModule,
      NgxSpinnerModule,
      PaginationModule
    ]
})
export class SharedModule { }
