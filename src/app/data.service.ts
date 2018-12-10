import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http'

interface res{    success:boolean,    message:string,    result:any }

@Injectable({
  providedIn: 'root'
})
export class DataService {

  items=[]

  constructor(private http: HttpClient) {
    this.items=[
      "Jumbo Chicken Wrap",
      "Vegetarian Lasagne",
      "Chicken Rice Feast",
      "Grilled Chicken Breast"
    ]
   }
   
  getMenu(){
    return this.http.get<res>('/api/menu/getMenu');
  }

  sendOrder(order){
    return this.http.post<res>('/api/order/setOrder', {order}, { observe: 'response' });
  }

  getOrderStatus(){
    return this.http.get<res>('/api/order/getOrderStatus', { observe: 'response' });
  }

  getLiveCount(){
    return this.http.get<res>('/api/order/getLiveCount');
  }

  updateOrder(id){
    return this.http.put<res>('/api/order/updateOrder',{id:id}, { observe: 'response' });
  }

}
