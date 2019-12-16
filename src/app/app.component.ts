import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  data:any[] = []
  constructor(private http:HttpClient){
  }
  ngOnInit(){
    this.onGetData();
  }
  onSend(data){
    this.http.post<any>("http://localhost:3000/api",data).subscribe(result=>{
      alert(JSON.stringify(result));
      this.onGetData();
    })
  }
  onGetData(){
    this.http.get<any>("http://localhost:3000/api").subscribe(result=>{
      this.data = result.rs;
    });
  }
  onDelete(id:String){
    alert(id);
    this.http.delete("http://localhost:3000/delete/"+id).subscribe(result=>{
    alert(JSON.stringify(result));
    this.onGetData();
    });
  }
  onUpdate(data){
    alert("hello function update")
    this.http.put("http://localhost:3000/update",data).subscribe(result=>{
      alert(JSON.stringify(result));
    })
  }
}
