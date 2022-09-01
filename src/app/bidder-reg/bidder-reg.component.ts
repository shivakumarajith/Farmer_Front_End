import { Component, Injectable, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Bidder } from '../Bidder';
import { BidderService } from "../bidder.service";

@Component({
  selector: 'app-bidder-reg',
  templateUrl: './bidder-reg.component.html',
  styleUrls: ['./bidder-reg.component.css']
})

@Injectable()
export class BidderRegComponent implements OnInit {
  BidderRegistrationForm:FormGroup=new FormGroup({
      firstName:new FormControl ('', [Validators.required]),
      lastName:new FormControl ('', [Validators.required]),
      email:new FormControl('',[Validators.required,Validators.email]),
      password:new FormControl("",[Validators.required,Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")]),
      confirmPassword:new FormControl("",[Validators.required,Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")]),
      contact:new FormControl('',[Validators.required]),
      address:new FormControl('',[Validators.required]),
      city:new FormControl('',[Validators.required]),
      state:new FormControl('',[Validators.required]),
      pincode:new FormControl('',[Validators.required]),
      amount:new FormControl('',[Validators.required]),
      traderLicense:new FormControl('',[Validators.required]),
      aadharNo:new FormControl('',[Validators.required,Validators.pattern("^[0-9]{12}$")])
  });
  bidder=new Bidder();
  constructor(private bidderService:BidderService,private router:Router) { }

  

  ngOnInit(): void {
  }

  register() {
    
    if(this.bidder.bidderFirstName == null){
      alert("Invalid FirstName");
      return
    }
    if(this.bidder.bidderLastName == null){
      alert("Invalid LastName");
      return
    }
    if(this.bidder.email == null || !(this.bidder.email.match("@"))){
      alert("Invalid email");
      return
    }
    if(this.bidder.password == null || this.bidder.password.length < 6){
      alert("Invalid Password");
      return
    }
    if(this.bidder.contactNo == null || this.bidder.contactNo.length!=10){
      alert("Invalid Contact No");
      return
    }
    if(this.bidder.aadharNo == null || String(this.bidder.aadharNo).length!=12){
      alert("Invalid Adhar-No");
      return
    }
    if(this.bidder.traderLicenseNo == null){
      alert("Invalid Trade Number");
      return
    }
    if(this.bidder.balance == null){
      alert("Invalid Balance");
      return
    }

    this.bidderService.register(this.bidder).subscribe(data => {      
      if(data.status == 'SUCCESS') {
        alert("SUCCESSFULLY REGISTERED");
        this.router.navigate(['BidderLogin'])
      }
      else {
        alert(data.status);
      }
    }, error => {
      alert("Failed to Register User");
    });
  }
}