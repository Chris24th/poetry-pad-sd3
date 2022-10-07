<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PoemController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\LikePoemController;
use App\Http\Controllers\LikeCommentController;

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
Route::post('editpoem', [PoemController::class, 'editpoem']);
Route::post('deletepoem', [PoemController::class, 'deletepoem']);
Route::post('likepoem', [PoemController::class, 'likepoem']);

Route::post('createcomment', [CommentController::class, 'createcomment']);
Route::post('editcomment', [CommentController::class, 'editcomment']);
Route::post('deletecomment', [CommentController::class, 'deletecomment']);
Route::get('displaycomment', [CommentController::class, 'displaycomment']);

Route::post('createlikePoem', [LikePoemController::class, 'createlikePoem']);
Route::get('displaylikePoem', [LikePoemController::class, 'displaylikePoem']);
Route::post('createlikeComment', [LikeCommentController::class, 'createlikeComment']);
Route::get('displaylikeComment', [LikeCommentController::class, 'displaylikeComment']);

Route::post('displaylikedPoems', [LikePoemController::class, 'displaylikedPoems']);
