//import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Teacher extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  @column()
  public age:number
  @column()
  public salary:number


}
