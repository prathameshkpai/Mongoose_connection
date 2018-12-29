const Express = require('express')
const Mongoose = require('mongoose')
const Bodyparser = require('body-parser')


const App = Express();
Mongoose.connect('mongodb://localhost:27017/details')
Mongoose.Promise = global.Promise

App.use(Bodyparser.json())
App.use(Bodyparser.urlencoded({
    extended: true
}))

let Customers = new Mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    country: { type: String, required: true }
})

let customer = Mongoose.model('customers', Customers);

App.post('/', (req, res) => {
    let data = new customer(req.body)
    data.save().then(() => {
        res.send('Inserted ')
    }).catch((err) => {
        res.send('error')
    })
})


App.get('/', (req, res) => {
    res.send('hello')
})

App.put('/', (req, res) => {
    customer.findOneAndUpdate({ name: req.body.name }, req.body, { new: true }, (err, doc) => {
        if (!err) {
            return res.send('updated')
        }
        else {
            return res.send('update failed')
        }
    })
})

App.delete('/:id', (req, res) => {
    customer.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            return res.send('Deleted')
        } else {
            return res.send('could not delete')
        }
    })

})


App.listen(3000, () => {
    console.log('connected')
})