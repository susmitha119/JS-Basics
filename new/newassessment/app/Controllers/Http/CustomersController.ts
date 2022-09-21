import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CustomerValidator from '../../Validators/CustomerValidator';
import Customer from 'App/Models/Customer';
import Database from '@ioc:Adonis/Lucid/Database';

export default class CustomersController {
    public async create({request}:HttpContextContract){
        let customer=new Customer()
        const payload = await request.validate(CustomerValidator)
        await customer
        .fill({customerId:payload['customerId'],customerName:payload['customerName'],phoneNumber:payload['phoneNumber']})
        .save()
        return Customer.all()
        
    }
    public async read(){
        return await Customer.all()
        // return await Customer.query().orderBy('customerId','asc')
   }
   public async update({request}:HttpContextContract){
       const payload = await request.validate(CustomerValidator)
       let value=parseInt(request.input('customerId'))
       const customer=await Customer.findByOrFail('customerId',value)
       
       customer.customerId=payload['customerId']
       customer.customerName=payload['customerName']
       customer.phoneNumber=payload['phoneNumber']
       await customer.save()
       return Customer.all()

   }
   public async deleted({request})
   {
       
       const user1= await Customer.findByOrFail('customerId',request.params().customerId)

       await user1.delete()
       return  Customer.all()
   }
   public async getName({request}:HttpContextContract){
    const data = request.input('finding')
        return Database
        .from('customers')
        .select('*')
        .where((query) =>{
            if(/^[0-9]/.test(data)){
                query
                .where('customer_id',data)
                .orWhereILike('customer_name',data+'%')
                .orWhereILike('phone_number','%'+data+'%')
            }
        })
        .orWhere((query) =>{
            query
            .whereILike('customer_name','%'+data+'%')
            .orWhereILike('phone_number','%'+data+'%')
        })
   }
  

public async SortIdAsc(){
  const data= Customer.query().orderBy('customerId','asc')
  return data
 }
public async SortIdDesc(){
      return Customer.query().orderBy('customerId','desc')
            
            }
public async SortAscName(){
            return Customer.query().orderBy("customerName","asc")
            
            }
 public async SortDescName(){
            return Customer.query().orderBy("customerName","desc")
             
            }
public async SortAscPhone(){
             return Customer.query().orderBy("phoneNumber","asc")
            
    
            }
public async SortDescPhone(){
            return Customer.query().orderBy("phoneNumber","desc")
            
            }
          
    
}

