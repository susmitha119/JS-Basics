import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {appKey} from 'Config/app'
export default class Student {
  public async handle(
    { request, response }: HttpContextContract,
    next: () => Promise<void>
  ) {
    if ( appKey !== request.header('appKey')) {
      response.unauthorized({ error: 'Unauthorized request' })
      return
    }
    await next()
  }
}

