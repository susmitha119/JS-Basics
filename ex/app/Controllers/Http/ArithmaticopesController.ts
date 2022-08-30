 import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ArithValidationValidator from '../../Validators/ArithValidationValidator';

export default class ArithmaticopesController {
    public async add(){

       // const payload = await request.validate(ArithValidationValidator)
        const num1:number=100
        const num2:number=100        
        return num1+num2

    }

    public async sub({request}:HttpContextContract){

        const payload = await request.validate(ArithValidationValidator)
        const num1:number=payload['num1']
        const num2:number=payload['num2']
        return num1-num2

    }
    public async multiply({request}:HttpContextContract){

        const payload = await request.validate(ArithValidationValidator)
        const num1:number=payload['num1']
        const num2:number=payload['num2']
        return num1*num2

    }
    public async division({request}:HttpContextContract)
    {

        const payload = await request.validate(ArithValidationValidator)
        const num1:number=payload['num1']
        const num2:number=payload['num2']
        if (num2==0)
        {
            return "cannot divide"
        }

        return "Division: " + num1/num2

    }

    public async operations(){

       // await request.validate(ArithValidationValidator)
        const num1:number=2
        const num2:number=3
        return "Addition:" + num1+num2 + "\nDifference: " + num1/num2 + "\nProduct: " + num1/num2  + "\nDivision: " + num1/num2

    }

}
