<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class LikeCommentController extends Controller
{
    function createlikeComment(Request $req){
        $likeComment = new LikeComment;
        $likeComment->idComment = $req->idComment;
        $likeComment->idUser = $req->idUser;
        $likeComment->save();
        return $likeComment;
    }
    function deletelikeComment(Request $req){
        $likeComment = Comment::where('id', $req->idLikeComment)->delete();
        return ['message'=>'Unliked'];
    }
}
