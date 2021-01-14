const express = require('express')
const router = express.Router()

const Sequelize = require('sequelize')
const sequelize = new Sequelize('mysql://root:@localhost/crmproject')
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    })    


router.get('/dbData', async (req, res) => {
    try {
        const query = `SELECT c.*, co.country, e.email_type, o.owner
        FROM client as c, country as co, email_type as e, owner as o
        WHERE c.country_id = co.id
        AND c.email_type_id = e.id
        AND c.owner_id = o.id;`
        const clients = (await sequelize.query(query))[0] 
        const owners = (await sequelize.query('SELECT * FROM owner'))[0]   
        const countries = (await sequelize.query('SELECT * FROM country'))[0]
        const emailTypes = (await sequelize.query('SELECT * FROM email_type WHERE email_type IS NOT NULL'))[0]
        res.send([owners, countries, emailTypes, clients])
    } catch (error) {
        res.sendStatus(error)
    }
})

router.get('/clientsData', async (req, res) => {
    try {
        const query = `SELECT c.*, co.country, e.email_type, o.owner
        FROM client as c, country as co, email_type as e, owner as o
        WHERE c.country_id = co.id
        AND c.email_type_id = e.id
        AND c.owner_id = o.id;`
        const clients = (await sequelize.query(query))[0] 
        res.send(clients)
    } catch (error) {
        res.sendStatus(error)
    }
})

router.get('/categorizedData', async (req, res) => {
    try {
        const countryQuery = `SELECT country AS category, COUNT(*) AS sum
                            FROM client as c, country as co
                            WHERE c.country_id = co.id
                            GROUP BY country
                            ORDER BY COUNT(*) DESC;`
        const emailQuery = `SELECT email_type AS category, COUNT(*) AS sum
                            FROM client as c, email_type as et
                            WHERE c.email_type_id = et.id 
                            AND email_type IS NOT NULL
                            GROUP BY email_type
                            ORDER BY COUNT(*) DESC;`
        const monthQuery = `SELECT SUBSTRING_INDEX(date, '/', 1) AS category , COUNT(*) AS sum
                            FROM client
                            GROUP BY SUBSTRING_INDEX(date, '/', 1);`
        const ownerQuery = `SELECT owner AS category, COUNT(*) AS sum
                            FROM  client AS c, owner AS o 
                            WHERE c.owner_id = o.id
                            AND c.sold IS TRUE
                            GROUP BY owner
                            ORDER BY COUNT(*) DESC;`
        const country = (await sequelize.query(countryQuery))[0] 
        const email = (await sequelize.query(emailQuery))[0] 
        const month = (await sequelize.query(monthQuery))[0] 
        const owner = (await sequelize.query(ownerQuery))[0] 
        res.send([country, email, month, owner])
    } catch (error) {
        res.sendStatus(error)
    }
})

router.post('/client', async (req, res) => {  // 2 is the id of email_type row which is equal to null
    try {
        const {first, last, country, owner, date} = req.body
        const query = `INSERT INTO client
        VALUES (null, '${last}', '${first}', null, 0, '${date}', 2, ${owner}, ${country})`
        const client = await sequelize.query(query)
        res.send(client)    
    } catch (error) {
        res.sendStatus(error)
    }
})

router.put('/client', async (req, res) => { 
    try {
        const updateObject = req.body
        const id = updateObject.id
        delete updateObject.id
        let set = Object.keys(updateObject).reduce((total, u)=>{
            return total + `${u} = '${updateObject[u]}' ,`
        }, "")
        set = set.slice(0, -1); 
        const query = `UPDATE client SET ${set} WHERE id = ${id} ;`
        const result = await sequelize.query(query)
        res.send(result)
    } catch (error) {
        res.send(error)
    }
})

module.exports = router