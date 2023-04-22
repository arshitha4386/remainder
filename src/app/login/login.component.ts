import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DataserviceService } from '../dataservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm=this.fb.group({
    username:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
    password:['',[Validators.required,Validators.pattern('[0-9]*')]]
  })

  constructor(private fb:FormBuilder,private ds:DataserviceService,private router:Router) { }

  ngOnInit(): void {
  }

  login(){
    var userid=this.loginForm.value.username
    var password=this.loginForm.value.password 

    console.log(userid);
    console.log(password);

    

    if(this.loginForm.valid){
      this.ds.login(userid,password)
      .subscribe((result:any)=>{
        if(result){
          console.log(result);
          
          localStorage.setItem('loggedUser',result.currentUser)
          localStorage.setItem('loggedUserId',result.currentUserid)
          localStorage.setItem('token',result.token)
          alert(result.message)
          this.router.navigateByUrl('dashboard')
        }
      },
      result=>{
        alert(result.error.message)
      })
    }
    else{
      alert("Invalid form")
    }
  }

}

