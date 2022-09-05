/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
Route.post('create','StudentsController.create')
Route.get('read','StudentsController.read')
Route.put('update','StudentsController.update')
Route.delete('delete','StudentsController.delete')
Route.get('join','StudentsController.join')
Route.post('getName','StudentsController.getNme')

}).middleware('Student')

Route.group(() => {
Route.post('add','TeachersController.add')
Route.get('get','TeachersController.get')
Route.put('upgrade','TeachersController.upgrade')
Route.delete('remove','TeachersController.remove')
Route.post('getInfo','TeachersController.getInfo')
}).middleware('Student')


