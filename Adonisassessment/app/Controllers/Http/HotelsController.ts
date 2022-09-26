import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import HotelValidator from 'App/Validators/HotelValidator';
import Hotel from '../../Models/Hotel';
import Database from '@ioc:Adonis/Lucid/Database';
import Customer from 'App/Models/Customer';

export default class HotelsController {
    public async create({request}:HttpContextContract){
        let hotel=new Hotel()
        const payload = await request.validate(HotelValidator)
        await hotel
        .fill({id:payload['id'],hotelName:payload['hotelName'],hotelDoorno:payload['hotelDoorNo'],hotelStreet:payload['hotelStreet'],hotelLandmark:payload['hotelLandmark'],
    hotelPincode:payload['hotelPincode'],customerId:payload['customerId']})
        .save()
        return Hotel.all()
        
    }
    public async read(){
        // return await Hotel.all()
        return await  Database 
        .from('hotels').join('customers','customers.customer_id','hotels.customer_id')
          
            .select('hotels.*')
            .select('customers.customer_name')
   }
   public async update({request}:HttpContextContract){
       const payload = await request.validate(HotelValidator)
       let value=parseInt(request.input('id'))
       const hotel=await Hotel.findByOrFail('id',value)
       
       hotel.id=payload['id']        
       hotel.hotelName=payload['hotelName']
       hotel.hotelDoorno=payload['hotelDoorNo']
       hotel.hotelLandmark=payload['hotelLandmark']
       hotel.hotelStreet=payload['hotelStreet']
       hotel.hotelPincode=payload['hotelPincode']
       hotel.customerId=payload['customerId']



       await hotel.save()
       return Hotel.all()

   }
   public async deleted({request}:HttpContextContract)
   {
       
       const user1= await Hotel.findByOrFail('id',request.params().id)

       await user1.delete()
       return  Hotel.all()
       
   }
   public async getName({request}:HttpContextContract){
    const data = request.input('searchKey')
    const result=await Hotel.query() .join('customers','customers.customer_id','hotels.customer_id')
           .select('*')
            .if(data, (query) => {
                query.where((q) => {
                q.whereRaw(`id::text ilike '%${data}%'`)
                .orWhereRaw(`hotels.customer_id::text ilike '%${data}%'`)
                .orWhereRaw(`hotel_doorno::text ilike '%${data}%'`)
                .orWhereRaw(`hotel_pincode::text ilike '%${data}%'`)
                .orWhereILike('hotel_name', `%${data}%`)
                .orWhereILike('customers.customer_name', `%${data}%`)
                .orWhereILike('hotel_landmark', `%${data}%`)
                .orWhereILike('hotel_street', `%${data}%`)
                   
                })
                
            })
console.log(result)
            const value = result.map(el => Object.assign({},el.$attributes,{
                customerName:el.$extras['customer_name'],
                address: el.$attributes['hotelDoorno'] + ','
                        +el.$attributes['hotelStreet'] + ','
                        +el.$attributes['hotelLandmark'] + ','
                        +el.$attributes['hotelPincode'] + ','
            }))
        // console.log(value)
      return value 
        
    }
    public async ownerName(){
     
        return await  Hotel.query() 
     .join('customers','customers.customer_id','hotels.customer_id')
            .select('hotels.*')
      
            
        }
    public async sort({request}){
        const value=await Customer.query().join('hotels','customers.customer_id','=','hotels.customer_id').select('*')
    .orderBy(request.input('sortBy'),request.params().order)
            const data = value.map(el => Object.assign({},el.$attributes,{
                hotelName:el.$extras['hotel_name'] ,
                id : el.$extras['id'],
                address: el.$extras['hotel_doorno'] + ','
                        +el.$extras['hotel_street'] + ','
                        +el.$extras['hotel_landmark'] + ','
                        +el.$extras['hotel_pincode'] + ','
            }))
            console.log(data)
            return data
    }
   


        public async address(){
            const value=await Customer.query().join('hotels','customers.customer_id','=','hotels.customer_id').select('*')
            const data = value.map(el => Object.assign({},el.$attributes,{
                hotelName:el.$extras['hotel_name'] ,
                id : el.$extras['id'],
                address: el.$extras['hotel_doorno'] + ','
                        +el.$extras['hotel_street'] + ','
                        +el.$extras['hotel_landmark'] + ','
                        +el.$extras['hotel_pincode'] + ','
            }))
            console.log(data)
            return data

        }
            // var id = request.params().id
            // return Database
            // .from('hotels')
            // .select('id','hotel_doorno','hotel_street','hotel_landmark','hotel_pincode')
            // .where('id','=',id)
        }
          
 

