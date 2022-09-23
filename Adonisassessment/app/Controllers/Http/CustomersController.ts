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
        return await  Customer.query()
        .join('hotels','customers.customer_id','hotels.customer_id')
            .select('customers.*')
            .groupBy('customers.customer_id')
            .count("customers.customer_id as hotel_count")
            .orderBy('hotel_count','asc')
      
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
    const data = request.input('searchKey')
    //      return Database
    //     .from('customers')
    //     // .join('hotels','customers.customer_id','hotels.customer_id')
    //     .select('customers.*')
    //     // .groupBy('customers.customer_id')
    //     // .count("customers.customer_id as hotel_count")
    //    .where((query) =>{
    //         if(/^[0-9]/.test(data)){
    //             query
    //             .where('customers.customer_id',data)
    //             .orWhereILike('customer_name','%'+data+'%')
    //             .orWhereILike('phone_number','%'+data+'%')
    //         }
    //     })
    //     .orWhere((query) =>{
    //         query
    //         .whereILike('customer_name','%'+data+'%')
    //         .orWhereILike('phone_number','%'+data+'%')
    //     })

     const result = await Customer.query()
      .if(data, (query) => {
        query.where((q) => {
          q.orWhereRaw(`customer_id::text ilike '%${data}%'`)
            .orWhereILike('customerName', `%${data}%`)
            .orWhereILike('phoneNumber', `%${data}%`)
        })
      })

      return result
   }
   public async hotelCount(){
     
    const data =  await  Customer.query() .join('hotels','customers.customer_id','hotels.customer_id')
        .select('customers.*')
        .groupBy('customers.customer_id')
        .orderBy('hotel_count','asc').count("customers.customer_id as hotel_count")
            const value = data.map(el => Object.assign({},el.$attributes,{
            HotelCount:el.$extras['hotel_count']
        }))
        console.log(value)

        return value
    }
 
  

    public async sort({request}){
        const data =  await  Customer.query() .join('hotels','customers.customer_id','hotels.customer_id')
        .orderBy(request.input('sortBy'),request.params().order)
        .select('customers.*')
        .groupBy('customers.customer_id')
        .orderBy('hotel_count','asc').count("customers.customer_id as hotel_count")
            const value = data.map(el => Object.assign({},el.$attributes,{
            HotelCount:el.$extras['hotel_count']
        }))
        console.log(value)

        return value
    }

          
    
}

