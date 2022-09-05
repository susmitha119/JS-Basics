import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import StudentValidator from 'App/Validators/StudentValidator'
import Student from 'App/Models/Student'
import Database from '@ioc:Adonis/Lucid/Database';
export default class StudentsController {
    public async create({request}:HttpContextContract){
        let student=new Student()
        const payload = await request.validate(StudentValidator)
        await student
        .fill({id:payload['id'],name:payload['name'],departement:payload['departement']})
        .save()
        return Student.all()
        
    }

    public async read(){
         return await Student.all()
    }
    public async update({request}:HttpContextContract){
        const payload = await request.validate(StudentValidator)
        const student=await Student.findByOrFail('id',request.input('id'))
        student.name=payload['name']
        student.departement=payload['departement']
        await student.save()
        return Student.all()

    }
    public async delete({request}:HttpContextContract)
    {
        
        const user1= await Student.findByOrFail('id', request.input('id'))
        await user1.delete()
        return Student.all()
    }
    public async join(){
        const name = await Database.from('students')
        .join('teachers', 'students.id', '=', 'teachers.id')
        .select('students.*')
        .select('teachers.*')
        return name
    }
    public async getName({request}:HttpContextContract){
        const getname=request.input("id")
        const info = Student.query().select('teachers.*').where("id","=",getname)
        return info
    }



}
    

