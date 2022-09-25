<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\likePoem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class LikePoemController extends Controller
{
    function createlikePoem(Request $req)
    {
        $checker = likePoem::where('idUser', $req->idUser)->first();
        if ($checker) {
            likePoem::where('idUser', $req->idUser)->delete();
            return ['message' => 'Unliked'];
        } else {
            $likePoem = new likePoem;
            $likePoem->idPoem = $req->idPoem;
            $likePoem->idUser = $req->idUser;
            $likePoem->save();
            return $likePoem;
        }
    }
    function displaylikePoem()
    {
        $minID = User::min('id');
        $userArr = array();

        for ($i = $minID; $i > 0; $i--) {
            $data = User::where('id', $i)->first();
            if ($data && likePoem::where('idUser', $data->id)->first()) {
                array_push($userArr, $data->penName);
            }
        }
        if ($userArr)
            return $userArr;
        else return ['error' => 'empty data'];
    }
}
