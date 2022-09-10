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
        $poem->Stanza1Line1 = $req->Stanza1Line1;
        $poem->Stanza1Line1 = $req->Stanza1Line2;
        $poem->save();
        if ($poem->Stanza1Line1) {
            return ['error' => 'Please add at least 2 lines'];
        }
        return $poem->id;
    }

    function displaypoem(Request $req)
    {
    }
}
