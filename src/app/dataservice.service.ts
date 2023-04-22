import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const options={
  headers:new HttpHeaders()
}

@Injectable({
  providedIn: 'root'
})
export class DataserviceService {

  constructor(private http:HttpClient) { }
  
  getOptions(){
    const token=localStorage.getItem('token')
    console.log("f-token"+token);
    
    let headers=new HttpHeaders()
    if(token){
      headers=headers.append('reminder-token',token)
      options.headers=headers
    }
    return options
  }

  register(username:any,userid:any,password:any){
    const data={
      username,userid,password
    }
    

    return this.http.post('http://localhost:3000/register',data)
  }

  login(userid:any,password:any){
    const data={
      userid,password
    }

    return this.http.post('http://localhost:3000/login',data)
  }

  addEvent(date:any,event:any){
    const data={
      date,event
    }
    return this.http.post('http://localhost:3000/addEvent',data,this.getOptions())
  }

  getEvent(loggedUserId:any){
    const data={
      loggedUserId
    }

    return this.http.post('http://localhost:3000/getEvent',data,this.getOptions())

  }

  removeEvent(k:any){
    const data={
      k
    }
    return this.http.post('http://localhost:3000/removeEvent',data,this.getOptions())
  }

  
}