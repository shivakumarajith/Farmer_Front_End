import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BidDto } from '../bid-dto';
import { BidderService } from '../bidder.service';
import { FarmerService } from '../farmer.service';
import { MarketDto } from '../market-dto';

@Component({
  selector: 'app-bid-placing',
  templateUrl: './bid-placing.component.html',
  styleUrls: ['./bid-placing.component.css']
})
export class BidPlacingComponent implements OnInit {
  crops: MarketDto[];
  market: MarketDto[];
  crop:BidDto = new BidDto();
  id:Number
  div1:boolean = false;
  constructor(private farmerService:FarmerService,private bidderService:BidderService,private router:Router) { }
   
  ngOnInit(): void {
    this.farmerService.marketPlace().subscribe(data =>
      {
        this.market = data;
        this.crops = this.market.filter(
          x=> x.status == false
        );
      }) 
  }
  bid()
  {
    this.div1=true;
  }
  
  placeBid()
  {
    if (this.crop.cropId==null){
      alert("Invalid Crop ID");
      return
    }
    if (this.crop.farmerId==null){
      alert("Invalid Farmer ID");
      return
    }
    if (this.crop.cropType==null){
      alert("Invalid Crop Type");
      return
    }
    if (this.crop.cropName==null){
      alert("Invalid Crop Name");
      return
    }
    if (this.crop.fertilizertype==null){
      alert("Invalid Fertilizer");
      return
    }
    if (this.crop.quantity==null){
      alert("Invalid Quantity");
      return
    }
    if (this.crop.baseprice==null){
      alert("Invalid Bid Amount");
      return
    }

    this.id = Number(sessionStorage.getItem("bidderId"));
    this.crop.bidderId = this.id;
    
    this.bidderService.updateCrop(this.crop).subscribe(data=>
      {
        console.log(this.crop.farmerId);
        if(data.status == "SUCCESS")
        {
          alert("Successfully Bid Placed");
          this.router.navigate(['bidderHome']);
        }
        else
        {
          alert(data.message);
        }
        
      })
  }    
}


