<?php

namespace App\Http\Controllers\api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class react_laravel_app extends Controller
{
    function insert_data(Request $request)
    {
        try{
            $name=$request->enter_name;
            $gender=$request->enter_gender;

            $insert = DB::insert('CALL insert_react_laravel(?,?)',[$name,$gender]);
            // return redirect('http://127.0.0.1:3000/insert');
            return json_encode(array("message"=>"Data Inserted Successfully!"));
        }
        catch(Exception $e){
            return json_encode(array("message"=>"Error:- ".$e));
        }
    }

    function display_data()
    {
        try{
            $select=DB::select("CALL select_react_laravel");
            $new_arr = array();

            if(count($select) > 0)
            {
                foreach($select as $data)
                {
                    // $new_arr[]=$data;
                    array_push($new_arr,$data);
                }
                return json_encode($new_arr);
            }
            else
            {
                return json_encode(array("message"=>"No Record Available!"));
            }
        }
        catch(Exception $e){
            return json_encode(array("message"=>"Error:- ".$e));
        }
    }

    function delete_data($id)
    {
        try{
            $del=DB::delete("CALL delete_react_laravel(?)",[$id]);
            return json_encode(array("message"=>$id." No Record Deleted Successfully!"));
        }
        catch(Exception $e){
            return json_encode(array("message"=>"Error:- ".$e));
        }
    }

    function fetch_data($id)
    {
        try{
            $fetch_edit=DB::select("CALL edit_react_laravel(?)",[$id]);
            $arr = array();
            foreach($fetch_edit as $val)
            {
                array_push($arr,$val);
            }
            return json_encode($arr);
        }
        catch(Exception $e){
            return json_encode(array("message"=>"Error:- ".$e));
        }
    }

    function save_update_data(Request $request, $id){
        try{
            $name=$request->enter_name;
            $gender=$request->enter_gender;

            $update=DB::update("CALL update_react_laravel(?,?,?)",[$id,$name,$gender]);
            return json_encode(array("message"=>"Data Updated Successfully!"));
        }
        catch(Exception $e){
            return json_encode(array("message"=>"Error:- ".$e));
        }
    }
}

