const path = require("path")

const mongoose = require("mongoose")
const State = mongoose.model("State")

mongoose.Promise = global.Promise;
module.exports = {
    index: (req, res, next) => {
        State.find()
            .then(data => res.json(data))
            .catch(err => { res.status(500).json(err) })
    },
    upload: (req, res) => {

        let new_state = new State(req.body)
        new_state.save()
            .then(() => {
                return res.json(new_state)
            })
            .catch(err => {
                console.log("*** my_state save error", err)
                return res.json(err)
            })
    },
    destroy: (req, res, next) => {
        console.log('logging the req.body', req.body)
        let state = new State(req.body);
        console.log("logging the new state to be destroyed", state)
        State.remove({ _id: state._id })
            .then(() => {
                res.json(true);
            })
            .catch((err) => {
                res.status(500).json(err);
            })
    },
    update: (req, res, next) => {
        console.log("logging the update req.body", req.body)
        let myState = new State(req.body)
        State.findOne({ _id: myState._id }) //update makes you find one
            .then((doctor) => {
                console.log('successfully found one')
                state.name = myState.name
                state.save()
                    .then(() => { res.json(true) })
                    .catch((err) => { res.status(500).json(err) })
            })
            .catch((err) => {
                res.status(500).json(err);
            })
    },
    getOne: (req, res, next) => {
        console.log('logging the body for getting one state', req.body)
        State.findOne({ _id: req.body.state_id })
            .then((state) => {
                console.log('found me a state', state)
                res.json(state)
            })
            .catch((err) => {
                res.status(500).json(err);
            })

    }
}