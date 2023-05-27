# This is a simple CRUD application build by ReactJS and Laravel-9 at backend API.
## ReactJS
In React we have used *axios* a promised-based HTTP client for JavaScript, *sweetalert2*, hook's such as *useEffect*, *useState* And routing module such as *useNavigate* to redirect to a specified URL, *useParams* to capture URL parameter.

```
* import React, { useEffect, useState } from "react";
* import { useNavigate, useParams } from 'react-router-dom';
* import axios from 'axios';
* import Swal from 'sweetalert2';
```

## Laravel
```
composer create-project laravel/laravel --prefer-dist laravel-react-app
```
For CORS authentication we also have to install fruitcake/laravel-cors package by below commend.
CORS(Cross Origin Resource Sharing) is a type of HTTP request that allow UI to communicate the backend or any other API of different domain. 
Without fruitcake/laravel-cors package you can't communicate http://127.0.0.1:8000/ URL.
```
composer require fruitcake/laravel-cors
```
Create a controller by below commend.
```
php artisan make:controller your_cntrl_name
```
Make sure the installed controller is under a /api folder. In case of making API it is necessary to put that file inside api folder otherwise it can't communicate to routes/api.php file.
You also have to specify the controller path in api.php such as:
```
use App\Http\Controllers\api\your_cntrl_name
```
And specify the parent controller path in your installed controller file by:-
```
use App\Http\Controllers\Controller;
```
I have use direct query builder not ORM. 
```
use Illuminate\Support\Facades\DB;
```
So that you can execute stored procedure in side this DB facade.
```
  $name=$request->enter_name;
  $gender=$request->enter_gender;

  $insert = DB::insert('CALL insert_react_laravel(?,?)',[$name,$gender]);
```

### Laravel API links:-
Check the api in postman by below routes.
```
http://127.0.0.1:8000/api/v1/data/insert-data 
http://127.0.0.1:8000/api/v1/data/display
http://127.0.0.1:8000/api/v1/data/delete/${id}
http://127.0.0.1:8000/api/v1/data/edit/${id}
http://127.0.0.1:8000/api/v1/data/save/${id}
```

Finally integrate all to React and ready for a CRUD operation.
