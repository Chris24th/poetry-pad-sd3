<?php

namespace App\Http\Controllers;

use App\Models\likePoem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class LikePoemController extends Controller
{
    function createlikePoem(Request $req){
        $checker = likePoem::where('idUser', $req->idUser)->first();
        if($checker){
            likePoem::where('idUser', $req->idUser)->delete();
            return ['message'=>'Unliked']; 
        }
        else{
            $likePoem = new likePoem;
            $likePoem->idPoem = $req->idPoem;
            $likePoem->idUser = $req->idUser;
            $likePoem->save();
            return $likePoem;  
        }
    }
    function displaylikePoem(){
        $likePoem = DB::table('like_poems')->get();
        $user = User::where('id', $likePoem->idUser)->first();
        return $user->penName;
    }
}
