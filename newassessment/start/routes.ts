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
Route .group(()=>{
Route.post('post','CustomersController.create')
Route.get('get','CustomersController.read')
Route.put('updated','CustomersController.update')

Route.delete('delete/:customerId','CustomersController.deleted')
Route.post('search','CustomersController.getName')
Route.get('SortAce','CustomersController.SortAce')
Route.get('SortDesc','CustomersController.SortDesc')
Route.get('SortAceName','CustomersController.SortAceName')
Route.get('SortDescName','CustomersController.SortDescName')
Route.get('SortAcePhone','CustomersController.SortAcePhone')
Route.get('SortDescPhone','CustomersController.SortDescphone')
})



Route.post('add','HotelsController.create')
Route.get('gets','HotelsController.read')
Route.post('update','HotelsController.update')

Route.delete('remove','HotelsController.deleted')
Route.post('searching','HotelsController.getName')



