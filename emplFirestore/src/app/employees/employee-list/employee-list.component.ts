import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';
import { Employee } from 'src/app/shared/employee.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  listOfEmployees: Employee[];

  constructor(public service: EmployeeService,
    private firestore: AngularFirestore,
    private toastr: ToastrService ) { }

  ngOnInit(): void {
    this.service.getEmployees().subscribe(actionArray => {
      this.listOfEmployees = actionArray.map( item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data() as {}
        } as Employee;
      });
      console.log(this.listOfEmployees);
    });

  }

  onEdit(emp: Employee) {
    this.service.formData = Object.assign({}, emp);
  }

  onDelete(id: string) {
    if (confirm("Are you sure to delete this record?")) {
      this.firestore.doc('employees/' + id).delete();
      this.toastr.warning('Deleted successfully','EMP. Register');
    }
  }


}
