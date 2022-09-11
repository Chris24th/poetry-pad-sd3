<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\Poem;
use App\Models\User;
use Illuminate\Http\Request;
use App\Notifications\Verification;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Notifications\ChangePassword;
use Illuminate\Support\Facades\Notification;

class AuthController extends Controller
{
    function signup(Request $req)
    {
        $user = new User();
        $user->email = $req->email;
        $user->name = $req->name;
        $user->penName = $req->penName;
        $user->password = Hash::make($req->password);
        //make random string
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $randomString = '';
        for ($i = 0; $i < 30; $i++) {
            $index = rand(0, strlen($characters) - 1);
            $randomString .= $characters[$index];
        }
        $user->token = $randomString;
        //
        $checkEmail = User::where('email', $req->email)->first();
        $checkPN = User::where('penName', $req->penName)->first();

        if ($checkEmail && $checkPN && $checkEmail->email == $req->email && $checkPN->penName == $req->penName) {
            return ["error" => "Email and Pen Name is already taken."];
        } else if ($checkPN && $checkPN->penName == $req->penName) {
            return ["error" => "Pen Name is already taken."];
        } else if ($checkEmail && $checkEmail->email == $req->email) {
            return ["error" => "Email is already taken."];
        } else {
            Notification::send($user, new Verification());
            $user->save();
            return $user->token;
        }
    }

    function signin(Request $req)
    {
        $user = User::where('email', $req->email)->first();

        $credentials = $req->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (Auth::attempt($credentials, true)) {
            if (!$user->email_verified_at) {
                return ["error" => "Email not yet verified. Please check your email inbox."];
            } else
                return $user;
        } else {
            if (!$user || !Hash::check($req->password, $user->password)) {
                return ["error" => "Email or password is not matched."];
            }
        }
    }
    function verification(Request $req)
    {
        $user = User::where('token', $req->token)->first();
        $date = Carbon::now();
        if (!$user)
            return ['error' => 'Token mismatched.'];
        else {
            $user->email_verified_at = $date;
            $user->token = NULL;
            $user->save();
            return ['message' => 'Your email is already verified!'];
        }
    }
    function forgotpassword(Request $req)
    {
        $user = User::where('email', $req->email)->first();
        if (!$user || $req->email != $user->email) {
            return ["error" => "Email not found"];
        }
        Notification::send($user, new ChangePassword());

        return $user->email;
    }

    function resetpassword(Request $req)
    {
        $date = Carbon::now();
        $user = User::where('email', $req->email)->first();
        $user->password = Hash::make($req->input('password'));
        $user->updated_at = $date;
        $user->save();
    }
    function editprofile(Request $req)
    {
        $user = User::where('id', $req->id)->first();
        $user->url = $req->url;
        $user->name = $req->name;
        $user->bio = $req->bio;

        // $ctr = 0;
        $ctr = Poem::where('penName', $req->penName)->count();
        $user->publishedPoems = $ctr;
        $user->save();
        return $user;
    }
}
