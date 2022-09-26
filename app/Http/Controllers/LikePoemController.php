<?php

namespace App\Http\Controllers;

use App\Models\likePoem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class LikePoemController extends Controller
{
    function createlikePoem(Request $req)
    {
        //finding the likePoem with the same idPoem

        $minID = likePoem::min('id');
        $maxID = likePoem::max('id');
        for ($i = $minID; $i < $maxID; $i++) {
            $checker = likePoem::where('id', $i)->first();
            if ($checker && $checker->idPoem == $req->idPoem && $checker->penName == $req->penName) {
                likePoem::where('id', $checker->id)->delete();
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

        // $minID = User::min('id');
        // $userArr = array();

        // for ($i = $minID; $i > 0; $i--) {
        //     $user = User::where('id', $i)->first();
        //     if ($user && likePoem::where('idUser', $user->id)->first()) {
        //         array_push($userArr, $user->penName);
        //     }
        // }
        // if ($userArr)
        //     return $userArr;
        // else return ['error' => 'empty data'];
    }
}
