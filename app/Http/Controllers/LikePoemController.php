<?php

namespace App\Http\Controllers;

use App\Models\likePoem;
use Illuminate\Http\Request;

class LikePoemController extends Controller
{
    function createlikePoem(Request $req){
        $likePoem = new likePoem;
        $likePoem->idComment = $req->idComment;
        $likePoem->idUser = $req->idUser;
        $likePoem->save();
        return $likePoem;
    }
    function displaylikePoem(Request $req){
        $likePoemCount = likePoem::where('idPoem', $req->idPoem)->count();
        return $likePoemCount;
    }
}
