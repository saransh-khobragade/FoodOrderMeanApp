import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import * as io from 'socket.io-client';
import { ExcelService } from '../excel.service';

@Component({
  selector: 'app-kichen',
  templateUrl: './kichen.component.html',
  styleUrls: ['./kichen.component.css']
})
export class KichenComponent implements OnInit {

  orderDetails = []
  liveCount = []
  private socket;
  order:any={}
  excel=[]
    
  constructor(private data: DataService,private excelService:ExcelService) {
    this.socket = io('http://localhost:1234');
   }

  ngOnInit() {
    this.refreshList()
    this.socket.on('orderDetails', (data) => {     
      this.refreshList();
    })
  }

  refreshList(){
    this.orderDetails = []
    this.data.getLiveCount().subscribe((data => {
      Array.prototype.push.call(this.liveCount, data.result);

      this.data.getOrderStatus().subscribe((x) => {
        for (let i of x.body.result) {
          let createTillNow = 0

          for (let cnt of this.liveCount[0]) {
            if (cnt.name === i.name) {
              createTillNow = cnt.count
              break;
            }
          }

          this.orderDetails.push(

            {
              Id: i.orderId,
              name: i.name,
              quantity: i.quantity,
              created: createTillNow,
              predicted: i.predicted
            }

          )
        }
      })
    }))
  }
  doneOrder(index,id){
    
    let changeCreated=Number(this.orderDetails[index].created)+Number(this.orderDetails[index].quantity)
    let name=this.orderDetails[index].name

    for(let i of this.orderDetails){
      if(i.name===name){i.created=changeCreated;}
    }
    this.orderDetails.splice(index,1)
    this.data.updateOrder(id).subscribe(data=>{
      if(data.status){
        
      }
    })
  
  }

  exportAsXLSX():void {
    this.excel=[]
    
    for(let i of this.orderDetails){
      this.excel.push({DishName:i.name,Produced:i.created,Predicted:i.predicted})
    }
    
    this.excelService.exportAsExcelFile(this.excel, 'sample');
  }
}
