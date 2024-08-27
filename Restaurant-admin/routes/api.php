<?php

use App\Http\Controllers\RestaurantController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::get('/all-restaurants',[RestaurantController::class, 'index']);

Route::get('/restaurant-info/{id}',[RestaurantController::class, 'restaurantinfo']);

Route::get('/all-restaurant-region/{name}',[RestaurantController::class, 'region']);

Route::get('/all-categories',[RestaurantController::class, 'categories']);

Route::get('/regions',[RestaurantController::class, 'regions']);

Route::get('/restaurant-by-region/{name}',[RestaurantController::class, 'byregions']);

Route::get('/menuitems',[RestaurantController::class, 'menuitems']);

Route::get('/my-information/{id}',[RestaurantController::class, 'myinformation']);

Route::get('/my-fvrts/{id}',[RestaurantController::class, 'myvrts']);
Route::post('/add-to-fvrts',[RestaurantController::class, 'addtofvrts']);

Route::get('/my-saved/{id}',[RestaurantController::class, 'saved']);

Route::get('/my-history/{id}',[RestaurantController::class, 'myhistories']);
Route::post('/add-to-history',[RestaurantController::class, 'addtohistories']);


Route::post('/add-user',[RestaurantController::class, 'adduser']);

Route::post('/add-review',[RestaurantController::class, 'addreview']);











