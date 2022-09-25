<?php

namespace App\Http\Controllers;

use App\Models\User;
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
            $user = User::where('id', $req->idUser)->first();
            return $user->penName;  
        }
    }
    function displaylikePoem(){
        $likePoem = DB::table('like_poems')->get();
        return $likePoem;
    }
}
