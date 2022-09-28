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
        $user = User::where('id', $req->idUser)->first();
        $comment->textContent = $req->textContent;
        $comment->save();
        $data = [$comment, $user];
        return $data;
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
        $comment = DB::table('comments')->get();
        return $comment;
    }
}
