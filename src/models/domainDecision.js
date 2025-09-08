const mongoose = require("mongoose");

const domainDecisionSchema = new mongoose.Schema({
    domain: {type: String, required: true, unique: true},
    decision: {type: Boolean, required: true}, // true == "Yes" false == "No"
    number: {type: Number, default: null, min: 1, max: 3},
    generated_at: {type: Date, min: function(){
        return new Date(Date.now()- 90 * 24 * 60 * 60 * 1000)
    }, max: Date.now(), default: null}
})

module.exports = mongoose.model('DomainDecision', domainDecisionSchema);