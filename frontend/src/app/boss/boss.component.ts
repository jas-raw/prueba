import { Component, OnInit, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AxiosService } from '../axios.service';

@Component({
  selector: 'app-boss',
  templateUrl: './boss.component.html',
  styleUrls: ['./boss.component.scss']
})
export class BossComponent implements OnInit, AfterViewChecked {

  form!: FormGroup
  bosses!: any

  constructor(private fb: FormBuilder, private ax: AxiosService) { }

  async ngOnInit() {
    this.crearFormulario()
    this.bosses = await this.ax.listBoss()
  }

  ngAfterViewChecked(){
    if(this.form.value.activate){
      this.form.controls['employee'].enable
    }else{
      this.form.controls['employee'].disable
    }
  }

  crearFormulario(){
    this.form = this.fb.group({
      name: ['', Validators.required],
      activate: [false, ],
      employee: ['', ]
    })
  }

  async agregar(){
    const data = this.form.value
    const datos = {
      employee: data.activate ? data.employee : null,
      name: data.name
    }
    await this.ax.addBoss(JSON.stringify(datos))
    this.form.reset()
    this.bosses = await this.ax.listBoss()
  }

}
