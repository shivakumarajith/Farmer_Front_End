import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';
import { FarmerService } from '../farmer.service';
import { Insurance } from '../insurance';
import { InsuranceApproveDto } from '../insurance-approve-dto';
import { InsuranceDto } from '../insurance-dto';

@Component({
  selector: 'app-insurance-approval',
  templateUrl: './insurance-approval.component.html',
  styleUrls: ['./insurance-approval.component.css']
})
export class InsuranceApprovalComponent implements OnInit {
  div1=false;
  insurances:InsuranceDto[];
  insurance: InsuranceApproveDto = new InsuranceApproveDto();

  constructor(private farmerService:FarmerService,private adminService:AdminService,private router:Router) { }

  ngOnInit(){
    this.farmerService.getInsurance().subscribe(data=>
      {
        this.insurances = data;
      })
  }
  approve()
  {
    this.div1=true;
  }
  approveInsurance()
  {
    if(this.insurance.insureeId==null){
      alert("Invalid Insuree's ID");
      return
    }
    if(this.insurance.farmerId==null){
      alert("Invalid Farmer's ID");
      return
    }
    if(this.insurance.insureeName==null){
      alert("Invalid Insuree's Name");
      return
    }
    if(this.insurance.area==null){
      alert("Invalid Area");
      return
    }
    if(this.insurance.cropName==null){
      alert("Invalid Crop Name");
      return
    }
    if(this.insurance.croptype==null){
      alert("Invalid Crop's Type");
      return
    }
    if(this.insurance.sumInsured==null){
      alert("Invalid Sum Insured");
      return
    }
    if(this.insurance.estimatedamount==null){
      alert("Invalid Estimated Amount");
      return
    }
    if(this.insurance.approvedstatus==null){
      alert("Invalid Approved Status");
      return
    }
    else{
      alert("Successfully Approved Insurance");
    }

    this.adminService.updateInsurance(this.insurance).subscribe(data=>
      {
        // if(data.status='SUCCESS')
        // {
          console.log(this.insurance.insureeId);
          this.router.navigate(['adminHome']);
        // }
      })
  }
}
