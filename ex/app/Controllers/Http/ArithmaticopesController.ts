// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ArithmaticopesController {
    public async add({request}){

        const num1:number=request.input("num1")
        const num2:number=request.input("num2")
        return num1+num2

    }

    public async sub({request}){

        const num1:number=request.input("num1")
        const num2:number=request.input("num2")
        return num1-num2

    }
    public async multiply({request}){

        const num1:number=request.input("num1")
        const num2:number=request.input("num2")
        return num1*num2

    }
    public async division({request})
    {

        const num1:number=request.input("num1")
        const num2:number=request.input("num2")
        if (num2==0)
        {
            return "cannot divide"
        }

        return "Division: " + num1/num2

    }

    public async operations(){

        const num1:number = 2
        const num2:number = 3
        return "Addition:" + num1+num2 + "\nDifference: " + num1/num2 + "\nProduct: " + num1/num2  + "\nDivision: " + num1/num2

    }

}
