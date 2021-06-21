<?php

use App\Http\Controllers\AnnonceController;
use App\Http\Controllers\IndexController;
use App\Http\Controllers\MessagesController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [IndexController::class, 'showIndex'])->name('showIndex');
Route::resource('user', UserController::class);
Route::get('/register', [UserController::class, 'create'])->name('user.register');
Route::get('/login', [UserController::class, 'loginPage']);
Route::post('/login', [UserController::class, 'login'])->name('user.login');
Route::get('/research', [AnnonceController::class, 'researchPage']);
Route::post('/research', [AnnonceController::class, 'research'])->name('annonce.research');
Route::get('/logout', [UserController::class, 'logout'])->name('user.logout');
Route::get('/myads', [AnnonceController::class, 'myads'])->name('annonce.myads');
Route::post('/sendmessages', [MessagesController::class, 'MessagePanel'])->name('message.send');
Route::resource('annonce', AnnonceController::class);
Route::resource('messages', MessagesController::class);
