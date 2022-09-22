import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import HotelValidator from 'App/Validators/HotelValidator';
import Hotel from '../../Models/Hotel';
import Database from '@ioc:Adonis/Lucid/Database';

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
            // .select('hotels.id')
            // .select('hotels.hotel_name')
            // .select('hotels.hotel_doorno')
            // .select('hotels.hotel_landmark')
            // .select('hotels.hotel_street')
            // .select('hotels.hotel_pincode')
            // .select('hotels.customer_id')
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
    const data = request.input('finding')
        return Database
        .from('hotels')
        .select('*')
        .where((query) =>{
            if(/^[0-9]/.test(data)){
                query
                .where('id',data)
                .orWhereILike('hotel_name','%'+data+'%')
                .orWhere('hotel_doorno',data)
                .orWhereILike('hotel_street','%'+data+'%')
                .orWhereILike('hotel_landmark','%'+data+'%')
                .orWhereILike('hotel_pincode','%'+data+'%')
                .orWhere('customer_id',data)
            }
        })
        .orWhere((query) =>{
            query
            .whereILike('hotel_name','%'+data+'%')
            .orWhereILike('hotel_street','%'+data+'%')
            .orWhereILike('hotel_landmark','%'+data+'%')
            .orWhereILike('hotel_pincode','%'+data+'%')
        })
    }
    public async ownerName(){
     
        return await  Database 
        .from('hotels').join('customers','customers.customer_id','hotels.customer_id')
            .select('hotels.*')
            .select('customers.customer_name')
            
        }
     public async address({request}){
        var id = request.params().id
        return Database
        .from('hotels')
        .select('id','hotel_doorno','hotel_street','hotel_landmark','hotel_pincode')
        .where('id','=',id)
    }
    public async SortIdAsc(){
        return await  Database 
        .from('hotels').join('customers','customers.customer_id','hotels.customer_id')
            .select('hotels.*')
            .select('customers.customer_name')
            .orderBy('id','asc')
 }
public async SortIdDesc(){
    return await  Database 
    .from('hotels').join('customers','customers.customer_id','hotels.customer_id')
        .select('hotels.*')
        .select('customers.customer_name')
        .orderBy('id','desc')
    
}
public async SortAscName(){
    return await  Database 
    .from('hotels').join('customers','customers.customer_id','hotels.customer_id')
        .select('hotels.*')
        .select('customers.customer_name')
        .orderBy('hotel_name','asc')
    
            
}
 public async SortDescName(){
    return await  Database 
    .from('hotels').join('customers','customers.customer_id','hotels.customer_id')
        .select('hotels.*')
        .select('customers.customer_name')
        .orderBy('hotel_name','desc')
    
             
}

public async SortAsc(){
    return await  Database 
    .from('hotels').join('customers','customers.customer_id','hotels.customer_id')
        .select('hotels.*')
        .select('customers.customer_name')
        .orderBy('customer_id','asc')
    
    }
public async SortDesc(){
    return await  Database 
    .from('hotels').join('customers','customers.customer_id','hotels.customer_id')
        .select('hotels.*')
        .select('customers.customer_name')
        .orderBy('customer_id','desc')
        
        }
          
}

