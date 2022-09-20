import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Hotel extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public hotelName:string
  @column()
  public hotelDoorno:number
  @column()
  public hotelStreet:string
  @column()
  public hotelLandmark:string
  @column()
  public hotelPincode:string
  @column()
  public customerId:number

}
