const Sequelize = require('sequelize')
const data = require("../../src/data.json")
const countries = require("./countries")
const sequelize = new Sequelize('mysql://root:@localhost/crmproject')

const owners = Object.keys(data.reduce((total, c)=>{
    total[c.owner] = true
    return total
}, {}))

let emailTypes = Object.keys(data.reduce((total, c)=>{
    total[c.emailType] = true
    return total
}, {}))

const nullIndex = emailTypes.findIndex(e => e === 'null')
emailTypes.splice(nullIndex, 1)

const addValue = async function (table, type) {
    let query =`INSERT INTO ${table} VALUES (null, '${type}')`
    let result = await sequelize.query(query)
    return result[0]
}

const findByID = async (table, name, value) => {
    let query = `SELECT id FROM ${table} WHERE ${name} = "${value}"`
    let results = await sequelize.query(query)
    return results[0][0].id
}

const addClient = async (client) => { // 14 is the null index in my email_type table
    let emailType = client.emailType !== null ? await findByID('email_type', 'email_type', client.emailType) : 14
    let owner = await findByID('owner', 'owner', client.owner)
    let country = await findByID('country', 'country', client.country)
    let date = new Date (client.firstContact).toLocaleDateString()
    let nameSplit = client.name.split(' ')

    let query =`INSERT INTO client
    VALUES (null, '${nameSplit[1]}', '${nameSplit[0]}', '${client.email}', ${client.sold}, '${date}', ${emailType}, ${owner}, ${country})`
    let result = await sequelize.query(query)
    return result[0]
}

emailTypes.forEach(e => addValue('email_type', e))
countries.forEach(c => addValue('country', c))
owners.forEach(o => addValue('owner', o))
data.forEach(d => addClient(d))