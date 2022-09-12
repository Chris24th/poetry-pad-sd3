<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PoemController;
use App\Http\Controllers\PostController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('signin', [AuthController::class, 'signin']);
Route::post('signup', [AuthController::class, 'signup']);
Route::post('verification', [AuthController::class, 'verification']);
Route::post('forgotpassword', [AuthController::class, 'forgotpassword']);
Route::post('resetpassword', [AuthController::class, 'resetpassword']);
Route::post('editprofile', [AuthController::class, 'editprofile']);
Route::post('createpoem', [PoemController::class, 'createpoem']);
Route::get('displaypoem', [PoemController::class, 'displaypoem']);
