const express = require('express');
const router = express.Router();
const employeeModel = require('../model/employee.js');

/* GET employee listing. */
router.get('/employee', async function(req, res, next) {
    try{
        const employees = await employeeModel.find();

        if (employees.length > 0) {
            res.status(200).send(JSON.stringify({
                "sucess":employees
            }))

        } else {
            return res.status(400).send(JSON.stringify({
                message: "No employees found"
            }))
        }
    }catch(err){
        res.status(500).send(err);
    }
});

router.post('/employee', async (req, res) => {
    console.log(req.body)
    if(!req.body) {
        return res.status(400).send({
            message: "invalid employee"
        });
    }
    const employee = new employeeModel(req.body);
    try{
        await employee.save();
        res.status(201).send({
            "success":employee
        })
    }catch (err){
        console.log("Error occurred " + err)
        res.status(500).send(err);
    }
});

//get employee by id
router.get('/employee/:employeeId', async (req, res) => {
    // Validate request
    if(!req.params.employeeId) {
        return res.status(400).send({
            message: "employee content can not be empty"
        });
    }

    const employee = await employeeModel.findById(req.params.employeeId);
    try{
        res.status(201).send(employee);
    }catch(err){
        res.status(500).send(err);
    }

});

router.put("/employee/:employeeId", async(req, res) => {

    try{
        const updatedEmployee = await employeeModel.findByIdAndUpdate(req.params.employeeId, req.body)
        const employee = await updatedEmployee.save()
        res.status(200).json(employee)
    }catch(err){
        res.status(500).send(err);
    }
});


router.delete("/employee/:employeeId", async(req, res) => {
    try{
        const employee = await employeeModel.findByIdAndDelete(req.params.employeeId)
        if(!employee){
            res.status(404).send("No item found")
        }else{
            res.status(204).json({"message":"employee deleted"})
        }
        
    }catch(err){
        res.status(500).send(err);
    }
});
module.exports = router;
