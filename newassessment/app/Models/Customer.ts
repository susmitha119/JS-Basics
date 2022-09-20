//import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Customer extends BaseModel {
  @column({ isPrimary: true })
  public customerId: number
  @column()
 public customerName:string

  @column()
  public phoneNumber:string
}
