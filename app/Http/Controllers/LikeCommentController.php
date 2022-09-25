<?php

namespace App\Http\Controllers;

use App\Models\likeComment;
use Illuminate\Http\Request;

class LikeCommentController extends Controller
{
    function createlikeComment(Request $req){
        $likeComment = new likeComment;
        $likeComment->idComment = $req->idComment;
        $likeComment->idUser = $req->idUser;
        $likeComment->save();
        return $likeComment;
    }
    function deletelikeComment(Request $req){
        $likeComment = likeComment::where('id', $req->idLikeComment)->delete();
        return ['message'=>'Unliked'];
    }
    function displaylikeComment(Request $req){
        $likeCommentCount = likeComment::where('idComment', $req->idComment)->count();
        return $likeCommentCount;
    }
}
