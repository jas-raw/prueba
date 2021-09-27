import { Injectable } from '@angular/core';
import axios from 'axios';

axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
axios.defaults.headers.common['Access-Control-Allow-Methods'] = '*'
axios.defaults.headers.common['Access-Control-Allow-Headers'] = '*'
axios.defaults.headers.common['cache-control'] = 'no-cache'

@Injectable({
  providedIn: 'root'
})
export class AxiosService {

  url: string = "http://localhost:5000/api/v1/"

  constructor() { }

  async addEmployee(datos: any){
    const data = await axios.post(this.url+"create-employee", datos)
    return data.data
  }

  async addBoss(datos: any){
    const data = await axios.post(this.url+"create-boss", datos)
    return data.data
  }

  async listEmployee(){
    const data = await axios.get(this.url+"list-employees")
    return data.data
  }

  async listBoss(){
    const data = await axios.get(this.url+"list-bosses")
    return data.data
  }

}
