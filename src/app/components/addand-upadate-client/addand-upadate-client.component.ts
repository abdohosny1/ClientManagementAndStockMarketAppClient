import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClientService } from 'src/app/services/client.service';
import { emailValidator } from 'src/app/shared/Validator/emailValidator';

@Component({
  selector: 'app-addand-upadate-client',
  templateUrl: './addand-upadate-client.component.html',
  styleUrls: ['./addand-upadate-client.component.css']
})
export class AddandUpadateClientComponent  implements OnInit{

  clientId: number =0; // Assuming sponsorId is of type number
  isEditing: boolean = false; // Flag to track if editing an existing sponsor

  createClientForm!: FormGroup<{
    firstName: FormControl<string | null>;
    lastName: FormControl<string | null>;
    phone: FormControl<string | null>;
    email: FormControl<string | null>;
  }>;

  constructor(private clientService:ClientService, private  router:Router,
    private toaster:ToastrService,  private fb:FormBuilder,
    private route: ActivatedRoute
  ){

    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.clientId = id ? Number(id) : 0;    });

    this.initializeForm();
    this.populateFormWithSponsorData();
  }

  initializeForm(): void {
    this.createClientForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required,emailValidator()],
    });
  }
  submitForm(){
    if (this.isEditing) {
      this.editClient(); // Call editSponsor method if editing an existing sponsor
    } else {
      this.createClient(); // Call createSponsor method if creating a new sponsor
    }
  }


  ngOnInit(): void {
  }

  createClient(){
    console.log(this.createClientForm.value);
    this.clientService.addClient(this.createClientForm.value).subscribe(
      (response) => {
        // Handle successful response here
        this.toaster.success("Create Success");
        this.router.navigateByUrl("list-client");
      },
      (error) => {
        // Handle error here
        console.error('Error creating sponsor:', error);
      }
    );
  }
  editClient(){
    var client ={
      id:this.clientId,
      firstName:this.createClientForm.value['firstName'],
      lastName:this.createClientForm.value['lastName'],
      phone:this.createClientForm.value['phone'],
      email:this.createClientForm.value['email'],

    }
    console.log(client);
    this.clientService.updateClient(client).subscribe(
      (response) => {
        // Handle successful response here
        this.toaster.success("Update Success");
        this.router.navigateByUrl("list-client");
      },
      (error) => {
        // Handle error here
        console.error('Error creating sponsor:', error);
      }
    );
  }

  populateFormWithSponsorData(): void {
    const clientData = history.state.clientData;
    if (clientData) {
      this.isEditing = true; // Set editing flag to true
      this.createClientForm.patchValue(clientData);
    }
  }

  back(){
    this.router.navigateByUrl("list-client");
  }
}
