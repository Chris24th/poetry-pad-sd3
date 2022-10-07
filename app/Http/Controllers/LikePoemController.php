<?php

namespace App\Http\Controllers;

use App\Models\Poem;
use App\Models\likePoem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class LikePoemController extends Controller
{
    function createlikePoem(Request $req)
    {
        $minID = likePoem::min('id');
        $maxID = likePoem::max('id');
        for ($i = $minID; $i <= $maxID; $i++) {
            $checker = likePoem::where('id', $i)->first();
            if ($checker && $checker->idPoem == $req->idPoem && $checker->penName == $req->penName) {
                $checker->delete();
                return ['message' => 'Unliked'];
            }
        }
        $likePoem = new likePoem;
        $likePoem->idPoem = $req->idPoem;
        $likePoem->penName = $req->penName;
        $likePoem->name = $req->name;
        $likePoem->save();
        return $likePoem;
    }
    function displaylikePoem()
    {
        $likePoem = DB::table('like_poems')->get();
        return $likePoem;
    }
    function displaylikedPoem(Request $req)
    {
        $minID = likePoem::min('id');
        $maxID = likePoem::max('id');
        $likedArr = array();
        for ($i = $minID; $i <= $maxID; $i++) {
            $poem = Poem::where('id', $i)->first();
            $likePoem = likePoem::where('idPoem', $poem->id)->first();
            if ($likePoem && $likePoem->penName == $req->penName) {
                array_push($likedArr, $poem);
            }
        }
        if ($likedArr) return $likedArr;
    }
}
