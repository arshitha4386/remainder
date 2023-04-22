import { Component, OnInit } from '@angular/core';
import { subscribeOn } from 'rxjs';
import { DataserviceService } from '../dataservice.service';

@Component({
  selector: 'app-eventform',
  templateUrl: './eventform.component.html',
  styleUrls: ['./eventform.component.css']
})
export class EventformComponent implements OnInit {

  events:any
  loggedUserId=localStorage.getItem('loggedUserId')
  

  constructor(private ds:DataserviceService) {

    this.ds.getEvent(this.loggedUserId)
    .subscribe((result:any)=>{
      
      this.events=result.event
      
    },
    result=>{
      alert(result.error.message)
    })
   }
   


  ngOnInit(): void {
  }

  removeEvent(k:any){
    this.ds.removeEvent(k)
    .subscribe((result:any)=>{
      if(result){
        window.location.reload();
      }
    },
    result=>{
      alert(result.error.message)
    })
  }

  


}
