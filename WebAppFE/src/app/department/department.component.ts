import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrl: './department.component.scss'
})
export class DepartmentComponent implements OnInit {

  constructor(private http:HttpClient){}

  departments: any = [];

  modalTitle: string = "";
  DepartmentId: number = 0;
  DepartmendName: string = "";

  ngOnInit(): void {
    this.refreshList();
  }

  refreshList(){
    this.http.get<any>('https://localhost:7147/api/Department')
    .subscribe(data => {
      this.departments=data
    });
  }

  addClick(){
    this.modalTitle = "Add Department";
    this.DepartmentId = 0;
    this.DepartmendName = "";
  }

  editClick(dep: any){
    this.modalTitle = "Edit Department";
    this.DepartmentId = dep.DepartmentId;
    this.DepartmendName = dep.DepartmendName;
  }

  createClick(){
    var val={
      DepartmentName:this.DepartmendName
    };

    this.http.post('https://localhost:7147/api/Department',val)
    .subscribe(res =>{
      alert(res.toString());
      this.refreshList();
    })
  }

  updateClick(){
    var val={
      DepartmentId:this.DepartmentId,
      DepartmentName:this.DepartmendName
    };

    this.http.put('https://localhost:7147/api/Department',val)
    .subscribe(res =>{
      alert(res.toString());
      this.refreshList();
    })
  }

  deleteClick(id:any){
    if(confirm('Are you sure?')){
      this.http.delete('https://localhost:7147/api/Department/' + id)
        .subscribe(res =>{
          alert(res.toString());
          this.refreshList();
      })
    }
  }
}
