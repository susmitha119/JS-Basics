import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Teacher from 'App/Models/Teacher';
//import Database from '@ioc:Adonis/Lucid/Database';
import TeacherValidator from '../../Validators/TeacherValidator';

export default class TeachersController {
    public async add({request}:HttpContextContract){
        let teacher=new Teacher()
        const payload = await request.validate(TeacherValidator)
        await teacher
        .fill({id:payload['id'],age:payload['age'],salary:payload['salary']})
        .save()
        return Teacher.all()
        
    }

    public async get(){
         return await Teacher.all()
    }
    public async upgrade({request}:HttpContextContract){
        const payload = await request.validate(TeacherValidator)
        const teacher=await Teacher.findByOrFail('id',request.input('id'))
        teacher.age=payload['age']
        teacher.salary=payload['salary']
        await teacher.save()
        return Teacher.all()

    }
    public async remove({request}:HttpContextContract)
    {
        
        const user1= await Teacher.findByOrFail('id', request.input('id'))
        await user1.delete()
        return Teacher.all()
    }
    public async getInfo({request}:HttpContextContract){
        const getid=request.input("id")
        const info = Teacher.query().select('teachers.*').where("id","=",getid)
        return info
    }


}
    


