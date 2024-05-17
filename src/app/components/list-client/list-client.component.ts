import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { Pagination } from 'src/app/shared/Model/Pagination';
import { IClient } from 'src/app/shared/Model/client';
import { ClientParams } from 'src/app/shared/Model/clientParams';

@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.css']
})
export class ListClientComponent  implements OnInit{
  pagination:Pagination | undefined;
  clients?:IClient[]=[];
  clientParam:ClientParams |undefined;
  searchKey: string = '';

  constructor(private router: Router,private clientService:ClientService){
    this.clientParam=this.clientService.getClientParams();

  }

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(){
    console.log("Loading"+this.clientParam?.pageNumber);

    if(this.clientParam){
      this.clientService.setClientParams(this.clientParam);
      this.clientService.getClients(this.clientParam).subscribe({
        next: response=>{
          console.log("response ===>"+response.result);


            this.clients=response.result;
            this.pagination=response.pagination;
            console.log("response.pagination "+response.pagination)


        },
        error:error =>{
      console.log(error);
        }
      })

    }

  }

  deleteClient(id :number){
    if (confirm("Do you want to delete this client?")) {
      this.clientService.deleteClient(id).subscribe({
        next:_=>{
               this.loadClients();
        },error:error =>{
          console.log(error);
        }
      })
    }
  }

  resetFilters(){

    this.clientParam =this.clientService.resetClientParams();
    this.loadClients();
}
  searchClients() {
    // Update the clientParam with searchEmail

    console.log('search key ===>'+this.searchKey)
    if(this.clientParam)
    this.clientParam = { ...this.clientParam, search: this.searchKey };
    this.loadClients(); // Reload clients based on search criteria
    console.log('search inside ===>'+this.clientParam?.search)

  }

  createNewClient(){
    this.router.navigateByUrl('/create-client');
  }
  navigateToDetails(id:number){
    this.router.navigate(["/details-client",id]);

  }

  navigateToEdit(client:IClient){
    this.router.navigate(['/edit-client',client.id], { state: { clientData: client } });

  }

  pageChanged(event :any){
    if(this.clientParam && this.clientParam?.pageNumber !== event.page){
     this.clientParam.pageNumber=event.page;
     this.clientService.setClientParams(this.clientParam);
     this.loadClients();
    }
  }

}




