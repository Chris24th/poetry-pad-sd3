<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\likeComment;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CommentController extends Controller
{
    function createcomment(Request $req)
    {
        $comment = new Comment();
        $comment->idPoem = $req->idPoem;
        $comment->idUser = $req->idUser;
        $comment->textContent = $req->textContent;
        $comment->save();
        return $comment;
    }
    function editcomment(Request $req)
    {
        $comment = Comment::where('id', $req->idComment)->first();
        $comment->textContent = $req->textContent;
        $comment->save();
        return $comment;
    }
    function deletecomment(Request $req)
    {
        $comment = Comment::where('id', $req->idComment)->delete();
        return ['message' => 'Comment deleted successfully.'];
    }
    function displaycomment()
    {
        $minID = Comment::min('id');
        $maxID = Comment::max('id');
        $result = array();
        for ($i = $minID; $i <= $maxID; $i++) {
            $data = array();
            $comment = Comment::where('id', $i)->first();
            $user = User::where('id', $comment->idUser)->first();
            array_push($data, $comment, $user);
            array_push($result, $data);
        }
        return $result;
    }
}
