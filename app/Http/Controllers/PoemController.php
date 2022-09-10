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
        $poem->title = $req->title;
        $poem->firstStanza = $req->firstStanza;
        $poem->secondStanza = $req->secondStanza;
        $poem->thirdStanza = $req->thirdStanza;
        $poem->fourthStanza = $req->fourthStanza;
        $poem->save();
        return $poem;
    }

    function displaypoem(Request $req)
    {
    }
}
