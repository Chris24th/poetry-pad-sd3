<?php

namespace App\Http\Controllers;

use App\Models\likeComment;
use Illuminate\Http\Request;

class LikeCommentController extends Controller
{
    function createlikeComment(Request $req){
        $checker = likeComment::where('idUser', $req->idUser)->first();
        if($checker){
            likeComment::where('idUser', $req->idUser)->delete();
            return ['message'=>'Unliked']; 
        }
        else{
            $likeComment = new likeComment;
            $likeComment->idComment = $req->idComment;
            $likeComment->idUser = $req->idUser;
            $likeComment->save();
            return $likeComment;      
        }
    }
    function displaylikeComment(Request $req){
        $likeCommentCount = likeComment::where('idComment', $req->idComment)->count();
        return $likeCommentCount;
    }
}
