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
        $poem->url = $req->url;
        $poem->firstStanza = $req->firstStanza;
        $poem->secondStanza = $req->secondStanza;
        $poem->thirdStanza = $req->thirdStanza;
        $poem->fourthStanza = $req->fourthStanza;
        $poem->save();
        return $poem;
    }

    function displaypoem()
    {
        $maxID = Poem::max('id');
        $commentArr = array();

        for ($i = $maxID; $i > 0; $i--) {
            $data = Poem::where('id', $i)->first();
            if ($data) {
                array_push($commentArr, $data);
            }
        }
        if ($commentArr)
            return $commentArr;
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
        $poem->delete();
        return ['message'=>'Comment deleted successfully.'];
    }
    function likepoem(Request $req){
        $poem = Poem::where('id', $req->idPoem);
        if($req->unlike == true){
            $poem->likes--;
            $poem->save();
            return ['message'=>'Unliked.'];
        }
        else{
            $poem->likes++;
            $poem->save();
            return ['message'=>'Liked.'];
        }
    }
}
