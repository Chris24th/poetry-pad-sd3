<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\likeComment;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    function createcomment(Request $req){
        $comment = new Comment();
        $comment->idComment = $req->idComment;
        $comment->idUser = $req->idUser;
        $comment->textContent = $req->textContent;
        $comment->likes = likeComment::where('idComment', $req->idComment)->count();

        $comment->save();
        return $comment;
    }
    function editcomment(Request $req){
        
    }
    function deletecomment(Request $req){
        
    }
}
