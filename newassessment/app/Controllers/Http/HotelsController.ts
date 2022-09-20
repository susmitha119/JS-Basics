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
        return await Hotel.query().orderBy('id','asc')
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
       
       const user1= await Hotel.findByOrFail('id',request.input('id'))

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
}

