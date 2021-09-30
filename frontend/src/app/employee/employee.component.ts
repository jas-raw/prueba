import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AxiosService } from '../axios.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  form!: FormGroup
  employees!: any

  constructor(private fb: FormBuilder, private ax: AxiosService) { }

  async ngOnInit() {
    this.crearFormulario()
    this.employees = await this.ax.listEmployee()
  }

  crearFormulario(){
    this.form = this.fb.group({
      name: ['', Validators.required],
      func: ['', Validators.required],
      boss: ['', Validators.required]
    })
  }

  async agregar(){
    await this.ax.addEmployee(this.form.value)
    this.form.reset()
    this.employees = await this.ax.listEmployee()
  }

}
