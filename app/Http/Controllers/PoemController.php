<?php

namespace App\Http\Controllers;

use App\Models\Poem;
use App\Models\User;
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

        $user = User::where('penName', $req->penName)->first();
        $user->publishedPoems++;
        $user->save();
        $poem->save();
        return $poem;
    }

    function displaypoem()
    {
        $maxID = Poem::max('id');
        $minID = Poem::min('id');
        $poemArr = array();

        for ($i = $maxID; $i > $minID; $i--) {
            $data = array();
            $poem = Poem::where('id', $i)->first();
            if ($poem) {
                $user = User::where('penName', $poem->penName)->first();
                array_push($data, $poem, $user);
                array_push($poemArr, $data);
            }
        }
        if ($poemArr)
            return $poemArr;
    }

    function editpoem(Request $req)
    {
        $poem = Poem::where('id', $req->id)->first();
        $poem->title = $req->title;
        $poem->isDraft = $req->isDraft;
        $poem->privacy = $req->privacy;
        $poem->firstStanza = $req->firstStanza;
        $poem->secondStanza = $req->secondStanza;
        $poem->thirdStanza = $req->thirdStanza;
        $poem->fourthStanza = $req->fourthStanza;
        $poem->save();
        return $poem;
    }

    function deletepoem(Request $req)
    {
        $poem = Poem::find($req->id);
        $user = User::where('penName', $poem->penName)->first();
        $user->publishedPoems--;
        $user->save();
        $poem->delete();
        return ['message' => 'Comment deleted successfully.'];
    }

    function checkstanza(Request $req)
    {
        $checkFIS = Poem::where('firstStanza', 'like', $req->firstStanza)->first();
        $checkSS = Poem::where('secondStanza', 'like', $req->secondStanza)->first();
        $checkTS = Poem::where('thirdStanza', 'like', $req->secondStanza)->first();
        $checkFOS = Poem::where('fourthStanza', 'like', $req->fourthStanza)->first();
        if ($checkFIS || ($req->secondStanza &&  $checkSS) || ($req->secondStanza && $checkTS)  || ($req->fourthStanza && $checkFOS)) {
            return ["error" => "A user has the exact same stanza as yours please try again.", $checkFIS, $checkSS];
        } else return ["Unique", $checkFIS, $checkSS];
    }
}
