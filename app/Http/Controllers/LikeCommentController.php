<?php

namespace App\Http\Controllers;

use App\Models\likeComment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class LikeCommentController extends Controller
{
    function createlikeComment(Request $req)
    {
        $minID = likeComment::min('id');
        $maxID = likeComment::max('id');
        for ($i = $minID; $i <= $maxID; $i++) {
            $checker = likeComment::where('id', $i)->first();
            if ($checker && $checker->idComment == $req->idComment && $checker->penName == $req->penName) {
                $checker->delete();
                return ['message' => 'Unliked'];
            }
        }
        $likeComment = new likeComment();
        $likeComment->idComment = $req->idComment;
        $likeComment->penName = $req->penName;
        $likeComment->name = $req->name;
        $likeComment->save();
        return $likeComment;
    }
    function displaylikeComment()
    {
        $likeComment = DB::table('like_comments')->get();
        return $likeComment;
    }
}
