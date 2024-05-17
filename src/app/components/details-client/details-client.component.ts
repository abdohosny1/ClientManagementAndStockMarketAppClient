import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { IClient } from 'src/app/shared/Model/client';

@Component({
  selector: 'app-details-client',
  templateUrl: './details-client.component.html',
  styleUrls: ['./details-client.component.css']
})
export class DetailsClientComponent implements OnInit {
  @Input() sponsor:IClient ={} as IClient ;
  clientId: number =0; // Assuming sponsorId is of type number
 client:IClient |undefined;
  constructor(
    private activeRoute: ActivatedRoute,
    private router:Router,
    private clientService:ClientService){

    }
  ngOnInit(): void {
     this.activeRoute.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.clientId = id ? Number(id) : 0;    });
      this.loadClient();
  }

  loadClient(){
this.clientService.getClient(this.clientId).subscribe({
  next: (response)=>{
      this.client = response;
  },error:(error)=>{
     console.log(error);
  }
})
  }

  back(){
    this.router.navigateByUrl("list-client");
  }

}
