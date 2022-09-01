import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';
import { Claim } from '../claim';
import { ClaimApproveDto } from '../claim-approve-dto';
import { Claimins } from '../claimins';
import { FarmerService } from '../farmer.service';

@Component({
  selector: 'app-insuranceclaim',
  templateUrl: './insuranceclaim.component.html',
  styleUrls: ['./insuranceclaim.component.css']
})
export class InsuranceclaimComponent implements OnInit {
  claims : Claimins[];
  claim: ClaimApproveDto = new ClaimApproveDto();
  constructor(private farmerService:FarmerService,private adminService:AdminService,private router:Router) { }
  div1:boolean = false;
  ngOnInit() {
    this.farmerService.getClaim().subscribe(data=>
      {
        console.log(data);
        this.claims = data;
        console.log(this.claims);
      }
      )
  }
  approve()
  {
    this.div1 = true;
  }
  approveclaim()
  {
    if (this.claim.claimId==null){
      alert("Invalid Claim ID");
      return
    }
    if (this.claim.insureeId==null){
      alert("Invalid Insuree ID");
      return
    }
    if (this.claim.farmerId==null){
      alert("Invalid Farmer ID");
      return
    }
    if (this.claim.insureeName==null){
      alert("Invalid Insuree Name");
      return
    }
    if (this.claim.causeofloss==null){
      alert("Invalid Cause Of Loss");
      return
    }
    if (this.claim.dateofloss==null){
      alert("Invalid Date Of Loss");
      return
    }
    if (this.claim.amount==null){
      alert("Invalid Amount");
      return
    }
    if (this.claim.claimapproval==null){
      alert("Invalid Status");
      return
    }
    else{
      alert("Claim Approved Successfully");
    }
    this.adminService.updateClaim(this.claim).subscribe(data=>
      {
        console.log(this.claim);
        this.router.navigate(['adminHome']);
      })
  }
}
