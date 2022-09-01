import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Farmer } from '../farmer';
import { FarmerService } from "../farmer.service";
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-farmer-reg',
  templateUrl: './farmer-reg.component.html',
  styleUrls: ['./farmer-reg.component.css']
})

@Injectable()
export class FarmerRegComponent  {
farmer:Farmer=new Farmer();

constructor(private farmerService:FarmerService,private router:Router) {}
ngOnInit(){
}


register()
{
  //alert(JSON.stringify(this.customer));
  if(this.farmer.farmerFirstName == null){
    alert("Invalid FirstName");
    return
  }
  if(this.farmer.farmerLastName == null){
    alert("Invalid LastName");
    return
  }
  if(this.farmer.email == null || !(this.farmer.email.match("@"))){
    alert("Invalid Email");
    return
  }
  if(this.farmer.password == null || this.farmer.password.length < 6){
    alert("Invalid password");
    return
  }
  if(this.farmer.contactNo == null || this.farmer.contactNo.length != 10){
    alert("Invalid Contact No");
    return
  }
  if(this.farmer.aadharNo == null || String(this.farmer.aadharNo).length != 12){
    alert("Invalid Aadhar-No");
    return
  }
  if(this.farmer.landDetails == null){
    alert("Invalid Land Details");
    return
  }
  if(this.farmer.balance == null){
    alert("Invalid balance");
    return
  }
  
  this.farmerService.register(this.farmer).subscribe(
    data => {
    
    if(data.status == 'SUCCESS') {
      alert("SUCCESSFULLY REGISTERED");
      this.router.navigate(['FarmerLogin'])
    }
    else {
      alert(data.status);
    }
    }, error => {
      alert("Failed to Register User");
    });
}
}