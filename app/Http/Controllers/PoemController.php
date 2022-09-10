<?php

namespace App\Http\Controllers;

use App\Models\Poem;
use Illuminate\Http\Request;

class PoemController extends Controller
{
    function createpoem(Request $req)
    {
        $poem = new Poem();
        $poem->penName = $req->penName;
        $poem->privacy = $req->privacy;
        $poem->isDraft = $req->isDraft;
        $poem->firstStanza = strval($req->firstStanza);
        if (!$poem->firstStanza) {
            return ["error" => "Please add at least 2 lines"];
        } else {
            $poem->save();
            return $poem;
        }
    }

    function displaypoem(Request $req)
    {
    }
}
