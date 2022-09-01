import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';
import { BidApproveDto } from '../bid-approve-dto';
import { FarmerService } from '../farmer.service';
import { MarketDto } from '../market-dto';

@Component({
  selector: 'app-bidding-approval',
  templateUrl: './bidding-approval.component.html',
  styleUrls: ['./bidding-approval.component.css']
})
export class BiddingApprovalComponent implements OnInit {
  crops:MarketDto[];
  div1:boolean = false;
  crop:BidApproveDto = new BidApproveDto();
  constructor(private farmerService:FarmerService,private adminService:AdminService,private router:Router) { }


  ngOnInit(){
    this.farmerService.marketPlace().subscribe(data=>
      {
        this.crops=data;
      })
  }
  approve()
  {
    this.div1=true;
  }
  approveBid()
  {
    if (this.crop.cropid==null){
      alert("Invalid Crop's ID");
      return
    }
    if (this.crop.farmerid==null){
      alert("Invalid Farmer's ID");
      return
    }
    if (this.crop.bidderid==null){
      alert("Invalid Bidder's ID");
      return
    }
    if (this.crop.croptype==null){
      alert("Invalid Crop's Type");
      return
    }
    if (this.crop.cropName==null){
      alert("Invalid Crop's Name");
      return
    }
    if (this.crop.fertilizertype==null){
      alert("Invalid Fertilizer's Type");
      return
    }
    if (this.crop.quantity==null){
      alert("Invalid Quantity");
      return
    }
    if (this.crop.baseprice==null){
      alert("Invalid Bid Price");
      return
    }
    if (this.crop.status==null){
      alert("Invalid Status");
      return
    }
    else{
      alert("Bidding Approval Successful");
    }

    this.adminService.updateBid(this.crop).subscribe(data=>
      {
        this.router.navigate(['adminHome']);
      })
  }
}
