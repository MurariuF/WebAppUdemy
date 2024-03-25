import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss'
})
export class EmployeeComponent implements OnInit {

  constructor(private http:HttpClient){}

  departments: any = [];
  employees: any = [];

  modalTitle: string = "";
  EmployeeId: number = 0;
  EmployeeName: string = "";
  Department: string = "";
  DateOfJoining: string = "";
  PhotoFileName: string = "anonymous.png"

  ngOnInit(): void {
    this.refreshList();
  }

  refreshList(){
    this.http.get<any>('https://localhost:7147/api/Employee')
    .subscribe(data => {
      this.employees=data
    });

    this.http.get<any>('https://localhost:7147/api/Department')
    .subscribe(data => {
      this.departments=data
    });
  }

  addClick(){
    this.modalTitle = "Add Employee";
    this.EmployeeId = 0;
    this.EmployeeName = "";
    this.Department = "";
    this.DateOfJoining = "";
    this.PhotoFileName = "";
  }

  editClick(emp: any){
    this.modalTitle = "Edit Employee";
    this.EmployeeId = emp.EmployeeId;
    this.EmployeeName = emp.EmployeeName;
    this.Department = emp.Department;
    this.DateOfJoining = emp.DateOfJoining;
    this.PhotoFileName = emp.PhotoFileName;
  }

  createClick(){
    var val={
      EmployeeName: this.EmployeeName,
      Department: this.Department,
      DateOfJoining: this.DateOfJoining,
      PhotoFileName: this.PhotoFileName
    };

    this.http.post('https://localhost:7147/api/Employee',val)
    .subscribe(res =>{
      alert(res.toString());
      this.refreshList();
    })
  }

  updateClick(){
    var val={
      EmployeeId: this.EmployeeId,
      EmployeeName: this.EmployeeName,
      Department: this.Department,
      DateOfJoining: this.DateOfJoining,
      PhotoFileName: this.PhotoFileName
    };

    this.http.put('https://localhost:7147/api/Employee',val)
    .subscribe(res =>{
      alert(res.toString());
      this.refreshList();
    })
  }

  deleteClick(id:any){
    if(confirm('Are you sure?')){
      this.http.delete('https://localhost:7147/api/Employee' + id)
        .subscribe(res =>{
          alert(res.toString());
          this.refreshList();
      })
    }
  }

  imageUpload(event:any){
    var file=event.target.files[0];
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    this.http.post('https://localhost:7147/api/Employee/SaveFile', formData)
    .subscribe((data: any) => {
      this.PhotoFileName=data.toString();
    });
  }
}
