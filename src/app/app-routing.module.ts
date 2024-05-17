import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListClientComponent } from './components/list-client/list-client.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ServerErrorComponent } from './components/server-error/server-error.component';
import { AddandUpadateClientComponent } from './components/addand-upadate-client/addand-upadate-client.component';
import { DetailsClientComponent } from './components/details-client/details-client.component';

const routes: Routes = [
  {path:'',component:ListClientComponent},
  {path:'list-client',component:ListClientComponent},

  {path:"edit-client/:id",component:AddandUpadateClientComponent  },
  {path:"details-client/:id",component:DetailsClientComponent  },

  {path:"create-client",component:AddandUpadateClientComponent  },
  {path:"not-found",component:NotFoundComponent},
  {path:"server-error",component:ServerErrorComponent},

  {path:"**", component:NotFoundComponent,pathMatch:'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
