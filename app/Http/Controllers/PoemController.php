<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PoemController extends Controller
{
    function createpoem(Request $req){
        $poem = new Poem();
        $poem->privacy = $req->privacy;
        $poem->isDraft = $req->isDraft;
        $poem->Stanza1Line1 = $req->Stanza1Line1;
        $poem->Stanza1Line1 = $req->Stanza1Line2;
        $poem->Stanza1Line1 = $req->Stanza1Line3;
        $poem->Stanza1Line1 = $req->Stanza1Line4;
        $poem->Stanza1Line2 = $req->Stanza1Line1;
        $poem->Stanza1Line2 = $req->Stanza1Line2;
        $poem->Stanza1Line2 = $req->Stanza1Line3;
        $poem->Stanza1Line2 = $req->Stanza1Line4;
        $poem->Stanza1Line3 = $req->Stanza1Line1;
        $poem->Stanza1Line3 = $req->Stanza1Line2;
        $poem->Stanza1Line3 = $req->Stanza1Line3;
        $poem->Stanza1Line3 = $req->Stanza1Line4;
        $poem->Stanza1Line4 = $req->Stanza1Line1;
        $poem->Stanza1Line4 = $req->Stanza1Line2;
        $poem->Stanza1Line4 = $req->Stanza1Line3;
        $poem->Stanza1Line4 = $req->Stanza1Line4;
        $poem->save();
        
        return $poem;
    }
}