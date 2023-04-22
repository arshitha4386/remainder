import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { resourceLimits } from 'worker_threads';
import { DataserviceService } from '../dataservice.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  eventForm=this.fb.group({
    date:['',[Validators.required]],
    event:['',[Validators.required]]
  })

  constructor(private ds:DataserviceService,private fb:FormBuilder,private router:Router) { }

  ngOnInit(): void {
    if(!localStorage.getItem("loggedUserId")){
      alert("Please Login")
      this.router.navigateByUrl("")
    }
  }

  addEvent(){
    var date=this.eventForm.value.date
    var event=this.eventForm.value.event

    console.log(date);
    console.log(event);

    if(this.eventForm.valid){
      this.ds.addEvent(date,event)
    .subscribe((result:any)=>{
    if(result){
      alert(result.message)
      window.location.reload()
      
    }
    },
    result=>{
      alert(result.error.message)
    }
    )
    }

    
    
  }

   logout(){
    localStorage.removeItem("loggedUser")
    localStorage.removeItem("loggedUserId")
    localStorage.removeItem("token")
    this.router.navigateByUrl("")
   }
}

 

