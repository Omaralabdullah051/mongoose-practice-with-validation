const mongoose = require('mongoose');

const serviceSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        validate: {
            validator: function (v) {
                return /^\S+@\S+\.\S+$/.test(v)
            },
            message: props => `${props.value} is not a valid email`
        }
    },
    serviceName: {
        type: String,
        required: [true, 'Service is required'],
    },
    description: {
        type: String,
        minLength: [50, 'Must be at least 50 words, got {VALUE}'],
        maxLength: [150, 'Must be maximum 150 words, got {VALUE}']
    },
    phone: {
        type: String,
        validate: {
            validator: function (v) {
                return /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/.test(v)
            },
            message: props => `${props.value} is not a valid BD number`
        },
        required: [true, 'Phone number is required']
    }

});

//*Instance method
serviceSchema.methods = {
    findAllServices: function () {
        return mongoose.model("Service").find({})
    },
    findBySpecificId: function (id) {
        return mongoose.model("Service").findOne({ _id: id });
    }
};


//*Static method 
serviceSchema.statics = {
    findAndUpdate: function (id, body) {
        return this.findByIdAndUpdate(
            { _id: id },
            {
                $set: {
                    phone: body
                },
            },
            {
                new: true,
                useFindAndModify: false
            });
    }
}

//*Query helpers
serviceSchema.query = {
    size: function (limit) {
        return this.limit(limit);
    }
}

module.exports = serviceSchema;