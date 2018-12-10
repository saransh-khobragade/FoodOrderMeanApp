import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import * as io from 'socket.io-client';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  items = []
  private socket;

  constructor(private data: DataService) {
    this.socket = io('http://localhost:1234');
    
  }
  

  ngOnInit() {

    this.data.getMenu().subscribe(data => {
      if (data.success) {
        for (let i of data.result) {
          this.items.push({ name: i, quantity: "" })
        }
      }
    })


  }

  placeOrder() {

    let order = this.items.filter((x) => {
      if (x.quantity !== "" && x.quantity !== "0") return x
    })

    if(order.length>0){
      this.data.sendOrder(order).subscribe(data => {
        if (data.body.success) alert("Order placed successfuly")
      })
  
      this.socket.emit('orderDetails');
    }
    
  }


}
