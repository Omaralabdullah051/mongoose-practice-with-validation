const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const serviceSchema = require('../schema/serviceSchema');
const Service = new mongoose.model('Service', serviceSchema);

//application routes
//post a service
router.post('/service', async (req, res) => {
    try {
        const newService = new Service(req.body);
        await newService.save();
        res.status(200).json({ message: "Successfully inserted" });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//get all the services
router.get('/getservice', async (req, res) => {
    try {
        const services = await Service.find({});
        res.status(200).json({ services });
    }
    catch {
        res.status(500).json({ error: "There was a server side error" });
    }
});

//get all the services by our custom instance method
router.get('/getservices', async (req, res) => {
    try {
        const newService = new Service();
        const services = await newService.findAllServices();
        res.status(200).json({ services });
    }
    catch {
        res.status(500).json({ error: "There was a server side error" });
    }
});

//get much more services as we want by our own query helper
router.get('/getservicesbyquery', async (req, res) => {
    try {
        const services = await Service.find({}).size(3);
        res.status(200).json({ services });
    }
    catch {
        res.status(500).json({ error: "There was a server side error" });
    }
});


//get specific service
router.get('/service/:id', async (req, res) => {
    try {
        const service = await Service.find({ _id: req.params.id });
        res.status(200).json({ service });
    }
    catch {
        res.status(500).json({ error: "There was a server side error" });
    }
});

//get specific service by our own custom instance method
router.get('/servicebyinstance/:id', async (req, res) => {
    try {
        const newService = new Service();
        const service = await newService.findBySpecificId(req.params.id);
        res.status(200).json({ service });
    }
    catch {
        res.status(500).json({ error: "There was a server side error" });
    }
});

//update specific service and get's the updated service instance
router.put('/updateservice/:id', async (req, res) => {
    try {
        const result = await Service.findByIdAndUpdate(
            { _id: req.params.id },
            {
                $set: {
                    phone: req.body.quantity
                },
            },
            {
                new: true,
                useFindAndModify: false
            });
        res.status(200).json({ service: result });
    }
    catch {
        res.status(500).json({ error: 'There was a server side error' });
    }
});

//update specific service and get's the updated service instance by our own static method
router.put('/updateservicebystatic/:id', async (req, res) => {
    try {
        const result = await Service.findAndUpdate(req.params.id, req.body.quantity);
        res.status(200).json({ service: result });
    }
    catch {
        res.status(500).json({ error: 'There was a server side error' });
    }
});

//delete an specific service and get the deleted data instance
router.delete('/delete', async (req, res) => {
    try {
        const result = await Service.findByIdAndDelete({ _id: req.query.id });
        res.status(200).json({ message: "deleted successfully", service: result });
        console.log(result);
    }
    catch {
        res.status(500).json({ error: "There was a server side error" });
    }
})

router.get('/service', (req, res) => {
    res.send('From different router');
})

module.exports = router;