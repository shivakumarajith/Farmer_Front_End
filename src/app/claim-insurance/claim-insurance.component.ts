import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClaimDto } from '../claim-dto';
import { FarmerService } from '../farmer.service';
import { InsuranceDto } from '../insurance-dto';
import { Claimins } from '../claimins';


@Component({
  selector: 'app-claim-insurance',
  templateUrl: './claim-insurance.component.html',
  styleUrls: ['./claim-insurance.component.css']
})
export class ClaimInsuranceComponent implements OnInit {

  insurance:ClaimDto = new ClaimDto();
  insurances:InsuranceDto[];
  claims : Claimins[];
  div1 = false;
  constructor(private farmerService:FarmerService,private router:Router) { }

  ngOnInit(){
    this.farmerService.getClaim().subscribe(data=>
      {
        console.log(data);
        this.claims = data;
        console.log(this.claims);
      }
      )
  }
  claim()
  {
    this.div1=true;
  }
  Submitdata()
  {
    if (this.insurance.insureeId==null){
      alert("Invalid InsureeID");
      return
    }
    if (this.insurance.amount==null){
      alert("Invalid Amount");
      return
    }
    if (this.insurance.causeofloss==null){
      alert("Invalid Cause of Loss");
      return
    }
    if (this.insurance.dateofloss==null){
      alert("Invalid Date of Loss");
      return
    }
    if (this.insurance.farmerId==null){
      alert("Invalid Farmer's ID");
      return
    }
    if (this.insurance.insureeName==null){
      alert("Invalid Insuree Name");
      return
    }
    this.farmerService.claimInsurance(this.insurance).subscribe(data=>
      {
        if(data.status == 'SUCCESS')
        {
          alert("Claim Submitted Successfully");
          this.router.navigate(['farmerHome']);
        }
      })
  }
}
