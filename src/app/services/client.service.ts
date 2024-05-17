import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { IClient } from '../shared/Model/client';
import { ClientParams } from '../shared/Model/clientParams';
import { PaginatedResult } from '../shared/Model/Pagination';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  clientParam:ClientParams |undefined;

  constructor(private http:HttpClient) {
    this.clientParam=new ClientParams();
  }

  getClientParams(){
    return this.clientParam;
  }

  setClientParams(params:ClientParams){
this.clientParam=params;
  }

  resetClientParams(){
  this.clientParam =new ClientParams();
  return this.clientParam;
  }

  getClients(clientParams:ClientParams){
    let params=this.getPaginationHeaders(clientParams.pageNumber,clientParams.pageSize);
    params=params.append('search',clientParams.search);
    return this.getPaginationResult<IClient[]>(environment.BASE_URL+environment.CLIENTS,params);
  }

  getClient(id:number){
    return this.http.get<IClient>(environment.BASE_URL+environment.CLIENTS+"/"+id);
  }

  addClient(client:any){
    return this.http.post(environment.BASE_URL+environment.CLIENTS,client);
  }

  updateClient(client:any){
    return this.http.put(environment.BASE_URL+environment.CLIENTS,client);
  }

  deleteClient(id:number){
    return this.http.delete(environment.BASE_URL+environment.CLIENTS+"/"+id);
  }

  private getPaginationHeaders(pageNumber:number ,pageSize:number){
    let params=new HttpParams();
      params=params.append("pageNumber",pageNumber);
      params=params.append("pageSize",pageSize);
    return params;
  }

  private getPaginationResult<T>(url:string,params :HttpParams)
  {
    const paginatedResult:PaginatedResult<T>=new PaginatedResult<T>;
    return this.http.get<T>(url,{observe:'response',params}).pipe(
      map(response =>{
        if(response.body){
          paginatedResult.result=response.body;
        }
        const pagination=response.headers.get('pagination');
        if(pagination){
          paginatedResult.pagination=JSON.parse(pagination);
        }
        return paginatedResult;
      })
    );
  }
}
