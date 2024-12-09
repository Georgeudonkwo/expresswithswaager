const express=require('express');
const student=require('../models/student.js')

const Router=express.Router()

/**
 * @openapi
 * /api/students:
 *  get:
 *   summary: Returns students from mongodb
 *   description: Retrieve all the students from the source
 *  
 *   responses:
 *    200:
 *     description: Successfully returns students
 *     content:
 *      application/json:
 *       schema:
 *         type: object
 *         properties:
 *          name:
 *          department:
 *          gradepoint:
 */
Router.get('/api/students',async(req,res)=>{
    try{
        const results=await student.find();
        res.send(results);}
catch(error){
    console.log(error.message)
}
});

/**
 * @openapi
 * /api/save/student:
 *   post:
 *     summary: Create an example resource
 *     description: Accepts data and returns the created resource.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *               department:
 *               gradepoint:
 *     responses:
 *       201:
 *         description: Resource created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                 department:
 *                 gradepoint:
 */
Router.post('/api/save/student',async(req,res)=>{
    try{
        let data=req.body
        let stu=new student();
        stu.name=data.name;
        stu.department=data.department;
        stu.gradepoint=data.gradepoint
        await stu.save();
        let feedback={messgae:"successfuly save the stauden to the database",
            student:stu
        }
        res.send(feedback);
    }
    catch(error){
        res.send(error.message)
    }
});
Router.delete('/api/student/:name/:department?',async(req,res)=>{
    let stname=req.params.name;
    console.log(req.params)
    try{
    let stu=await student.deleteMany({name:stname})
    res.send(stu);
    }
    catch(error){

    }
})






module.exports=Router;