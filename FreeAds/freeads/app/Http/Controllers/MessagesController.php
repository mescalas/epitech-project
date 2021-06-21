<?php

namespace App\Http\Controllers;

use App\Models\Messages;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\View;

class MessagesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = User::all()->where('id', '!=', Auth::user()->id);

        return View::make('messages.index')->with('users', $users);
    }

    public function MessagePanel(Request $request)
    {
        $user_ = Auth::user()->id;
        $user = User::find($request->users);
        $message = DB::select("SELECT content FROM messages WHERE id_expediteur = $user_ AND id_destinataire = $user->id OR id_expediteur = $user->id AND id_destinataire = $user_");
        return view('messages.create', compact('user', 'message', 'user_'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $message = Messages::create(['id_expediteur' => $request->id_expediteur, 'id_destinataire' => $request->id_destinataire, 'content' => $request->content]);
        $request->session()->flash('status', 'Message created succesfully');
        return view('messages.index');
    }

}
