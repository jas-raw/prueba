const express = require('express')
const cors = require('cors')
const body_parser = require('body-parser')
const { Client } = require('pg')
const uuid = require('uuid')

const conection = {
    user: 'admin',
    host: '',
    database: 'prueba',
    password: 'admin',
    port: 5432
}
const client = new Client(conection)

const app = express()

app.set('port', 5000)
app.use(body_parser.json())
app.use(body_parser.urlencoded({extended: true}))
app.use(cors())

app.listen(app.get('port'), () => {
    client.connect((err) => {
        if(err) throw new Error(`error in db connect: ${err}`)
        console.log('connected to postgres db')
    })
    console.log('Aplication is running at', app.get('port'))
})

app.get('/liveness', (req, res) => {
    res.json('OK')
})

app.get('/health', (req, res) => {
    res.json('OK')
})

app.get('/api/v1/list-employees', async (req, res) => {
    try{
        let query = `SELECT * FROM employee`
        const data = await client.query(query)
        console.log('data from db:', data.rows)
        res.send(data.rows);
    }catch(err){
        console.log(`${err}`)
    }
    return
})

app.get('/api/v1/list-bosses', async (req, res) => {
    try{
        let query = `SELECT * FROM boss`
        const data = await client.query(query)
        console.log('data from db:', data.rows)
        res.send(data.rows);
    }catch(err){
        console.log(`${err}`)
    }
    return
})

app.post('/api/v1/create-employee', async (req, res) => {
    try{
        let { name, func, boss } = req.body
        let boss_query = `SELECT * FROM boss WHERE name='${boss}'`
        const boss_data = await client.query(boss_query)
        if(!boss_data || boss_data.rows.length <= 0) throw new Error(`boss with name ${boss} doesn't exist`)
        let query = `INSERT INTO employee(id, boss_id, func, name) VALUES($1, $2, $3, $4) RETURNING *`
        let values = [
            uuid.v4(),
            boss_data.rows[0].id,
            func,
            name
        ]
        const data = await client.query(query, values)
        console.log('data from db:', data.rows)
        res.send(data.rows);
    }catch(err){
        console.log(`${err}`)
    }
    return
})

app.post('/api/v1/create-boss', async (req, res) => {
    try{
        let { name, employee } = req.body
        let query = `INSERT INTO boss(id, employee_id, name) VALUES($1, $2, $3) RETURNING *`
        let values
        let id = uuid.v4()
        if(employee){
            const employee_query = `SELECT * FROM employee WHERE name = '${employee}'`
            const employee_data = await client.query(employee_query)
            if(!employee_data || employee_data.rows.length <= 0) throw new Error(`employee with name ${employee} doesn't exist`)
            values = [
                id,
                employee_data.rows[0].id,
                name
            ]
        }else{
            values = [
                id,
                null,
                name
            ]
        }
        const data = await client.query(query, values)
        console.log('data from db:', data.rows)
        res.send(data.rows);
    }catch(err){
        console.log(`${err}`)
    }
    return
})