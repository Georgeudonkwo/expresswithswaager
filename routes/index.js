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

/**
 * @openapi
 * /api/student/{name}:
 *   delete:
 *     summary: Delete a user by ID
 *     description: Deletes a student from the database based on the provided student name.
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         description: The name of the student to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: student deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User deleted successfully
 *       404:
 *         description: student not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: student not found
 *       500:
 *         description: Server error
 */
Router.delete('/api/student/:name',async(req,res)=>{
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