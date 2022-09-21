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
Route.post('/post','CustomersController.create')
Route.get('/get','CustomersController.read')
Route.post('/updated','CustomersController.update')

Route.delete('delete/:customerId','CustomersController.deleted')
Route.post('search','CustomersController.getName')

Route.get('sortAsc','CustomersController.SortIdAsc')
Route.get('sortDesc','CustomersController.SortIdDesc')
Route.get('sortAscName','CustomersController.SortAscName')
Route.get('sortDescName','CustomersController.SortDescName')
Route.get('sortAscPhone','CustomersController.SortAscPhone')
Route.get('sortDescPhone','CustomersController.SortDescphone')
Route.get('/count','CustomersController.hotelCount')
}).prefix('/customer')

Route.group(()=>{
    Route.post('/add','HotelsController.create')
    Route.get('/get','HotelsController.read')
    Route.post('/update','HotelsController.update')
    Route.post('search','HotelsController.getName')
    
    Route.delete('remove/:id','HotelsController.deleted')
    Route.post('searching','HotelsController.getName')
    Route.post('address/:id','HotelsController.address')
    Route.get('owner','HotelsController.ownerName')

Route.get('sortIdAsc','HotelsController.SortIdAsc')
Route.get('sortIdDesc','HotelsController.SortIdDesc')

Route.get('sortAscName','HotelsController.SortAscName')
Route.get('sortDescName','HotelsController.SortDescName')

// Route.get('sortAscDoor','HotelsController.SortAscDoor')
// Route.get('sortDescDoor','HotelsController.SortDescDoor')

// Route.get('sortAscLand','HotelsController.SortAscLand')
// Route.get('sortDescLand','HotelsController.SortDescLand')

// Route.get('sortAscStreet','HotelsController.SortAscStreet')
// Route.get('sortDescStreet','HotelsController.SortDescStreet')

// Route.get('sortAscPincode','HotelsController.SortAscPincode')
// Route.get('sortDescPincode','HotelsController.SortDescPincode')

Route.get('sortAsc','HotelsController.SortAsc')
Route.get('sortDesc','HotelsController.SortDesc')
    
}).prefix('/hotel')



