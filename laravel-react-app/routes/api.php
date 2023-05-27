<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\api\react_laravel_app;

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

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });


Route::group([
    'prefix' => 'v1',
    'namespace' => 'App\Http\Controllers\api',
], function() {

    Route::group([
        'prefix' => '/data',
    ], function() {
        Route::post('/insert-data', [react_laravel_app::class, 'insert_data']);
        Route::get('/display', [react_laravel_app::class, 'display_data']);
        Route::get('/delete/{id}', [react_laravel_app::class, 'delete_data']);
        Route::get('/edit/{id}', [react_laravel_app::class, 'fetch_data']);
        Route::post('/save/{id}', [react_laravel_app::class, 'save_update_data']);
    });

});

