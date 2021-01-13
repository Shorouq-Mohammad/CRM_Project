import { makeObservable, observable, action} from 'mobx'
import moment from 'moment'
import axios from 'axios'


export class ClientsStore {
    constructor() {
        this.getData()
        this.getAnalytics()
        this.clients = []
        this.owners = []
        this.countries = []
        this.emailTypes = []
        this.groupOwner = []
        this.groupCountry = []
        this.groupEmail = []
        this.groupMonth = []

        makeObservable(this, {
            clients: observable,
            owners: observable,
            countries: observable,
            emailTypes: observable,
            getData: action,
            getClients: action,
            getAnalytics: action,
            updateClient: action,
            addClient: action,
            findClient: action,
            TransferOwnership: action,
            declareSale: action,
            sendEmail: action,
        })
    }

    async getData(){
        try {
            const dbResults = (await axios.get("http://localhost:4200/dbData")).data
            this.clients = dbResults[3]
            this.owners = dbResults[0]
            this.countries = dbResults[1]
            this.emailTypes = dbResults[2]
        } catch (error) {
            console.log(error.toString())
        }
    }

    async getClients(){
        try {
            this.clients = (await axios.get("http://localhost:4200/clientsData")).data
            await this.getAnalytics()
        } catch (error) {
            console.log(error.toString())
        }
    }

    async getAnalytics(){
        try {
            const results = (await axios.get("http://localhost:4200/categorizedData")).data
            this.groupCountry = this.reduceResults(results[0])
            this.groupEmail = this.reduceResults(results[1])
            this.groupMonth = this.reduceResults(results[2])
            this.groupOwner = this.reduceResults(results[3])
        } catch (error) {
            console.log(error.toString())
        }
    }

    async updateClient(id, first, last, countryId){ 
        try {
            const result = await axios.put("http://localhost:4200/client", {first, last, country_id: countryId, id})
            await this.getClients()
            return `${first} ${last} was updated`
        } catch (error) {
            return error
        }
    }

    async addClient(first, last, country, owner){
        try {
            const date = new Date().toLocaleDateString()
            const client = {first, last, country, owner, date}
            const id = (await axios.post("http://localhost:4200/client" , client)).data
            await this.getClients()
            return `${first} ${last} was added`
        } catch (error) {
            return error
        }
    }

    findClient(id){
        return this.clients.find(c => c.id === id)
    }

    async TransferOwnership(id, owner_id, owner){
        try {
            const result = await axios.put("http://localhost:4200/client", {id, owner_id})
            await this.getClients()
            return `The client ownership was transferred to ${owner}`
        } catch (error) {
            return error
        }
    }

    async declareSale(id){
        try {
            const result = await axios.put("http://localhost:4200/client", {id, sold: '1' })
            await this.getClients()
            return 'The action was done successfully '
        } catch (error) {
            return error
        }
    }

    async sendEmail(id, email_type_id){
        try {
            const result = await axios.put("http://localhost:4200/client", {id, email_type_id})
            await this.getClients()
            return 'The email was sent successfully'
        } catch (error) {
            return error
        }
    }

    newClients(){
        return this.clients.filter(c => moment().isSame(c.date, 'month')).length
    }

    emailsSent(){
        return this.clients.filter(c => c.email_type != null).length
    }

    outstandingClients(){
        return this.clients.filter(c => !c.sold).length
    }
 
    hottestCountry(){
        return this.groupCountry.length ? this.groupCountry[0][0] : ""
    }

    getBadgesData(){ //0 header, 1 paragraph, 2 color
        const newClient = [this.newClients(), `New ${moment().format('MMMM')} Clients`, '#2ecc71']
        const emails = [this.emailsSent(), 'Emails Sent', '#3498db']
        const outstanding= [this.outstandingClients() , 'Outstanding Clients', '#e74c3c']
        const country = [this.hottestCountry(), 'HottestCountry', '#f1c40f']
        return [newClient, emails, outstanding, country]
    }

    reduceResults(arr){
        const result = arr.reduce((total, c)=>{
            total[0].push(c.category)
            total[1].push(c.sum)
            return total
        }, [[], []])
        return result
    }

    topThreeEmployees(){
        if(this.groupOwner.length){
            const labels = this.groupOwner[0].slice(0, 3)
            const data = this.groupOwner[1].slice(0, 3)
            return [labels, data]
        }else{
            return [[], []]
        }
    }

    get30days(){
        let fromDate = moment().subtract(30, 'days');
        const toDate = moment()
        const dates = []
        const values = []
        while(fromDate <= toDate){
            dates.push(moment(fromDate).format('MM/DD'))
            values.push(this.clients.filter(c => moment(c.date).isSame(fromDate, 'day')).length)
            fromDate = moment(fromDate).add(1,'days')
        }
        return [dates, values]
    }
}