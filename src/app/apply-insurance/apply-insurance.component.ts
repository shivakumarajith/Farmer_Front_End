import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FarmerService } from '../farmer.service';
import { Insurance } from '../insurance';

@Component({
  selector: 'app-apply-insurance',
  templateUrl: './apply-insurance.component.html',
  styleUrls: ['./apply-insurance.component.css']})

export class ApplyInsuranceComponent implements OnInit {

  message: string;
  insurance: Insurance = new Insurance();
  id:Number;
  amount:Number;
  sum:any;
  flag:boolean=false;
  
  constructor(private farmerService: FarmerService, private router: Router) { }
  calculation()
  {
    if (this.insurance.insureeName==null){
      this.flag=true;
      alert("Invalid Insuree Name");
      return
    }
    if (this.insurance.area==null){
      this.flag=true;
      alert("Invalid Area");
      return
    }
    if (this.insurance.cropName==null){
      this.flag=true;
      alert("Invalid Crop's Name");
      return
    }
    if (this.insurance.croptype==null){
      this.flag=true;
      alert("Invalid Crop's Type");
      return
    }
    if (this.insurance.sumInsured==null){
      this.flag=true;
      alert("Invalid Sum Insured");
      return
    }
    else{
      this.flag=false;
    }
    if(this.insurance.croptype == "Rabi")
    {
      this.sum=this.insurance.sumInsured;
      this.amount = this.sum  * 0.2; 
    }
    else if(this.insurance.croptype == "Kharif")
    {
      this.sum=this.insurance.sumInsured;
      this.amount = this.sum  * 0.15; 
    }
    else 
    {
      this.sum=this.insurance.sumInsured;
      this.amount = this.sum  * 0.1; 
    }
    alert(this.amount+":- to be paid annually")
  }
  Submitdata()
  {
    if (this.flag==true){
      return
    }

    
    this.id = Number(sessionStorage.getItem("farmerId"));
    this.insurance.farmerId = this.id;
    this.insurance.estimatedamount = this.amount;
    this.farmerService.applyInsurance(this.insurance).subscribe(data=>
      {
        console.log(this.insurance);
        if(data.status == 'SUCCESS')
        {
          alert("Insurance Applied Successfully");
          this.router.navigate(['farmerHome']);
        }
        else
          alert(data.status);
      }) 
  }

  ngOnInit(): void {
  }

}
