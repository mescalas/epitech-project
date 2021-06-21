<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginVerif;
use App\Http\Requests\UserVerif;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

//1337|ryRvEyy84uds0nGd6U0n68xJJLRsO9RTWv1rW7uBF2JWOVczFIQd4L4v9amHDyd5OPteNuxMHcuyD7Vz


class UserController extends Controller
{
    public function index()
    {
        return view('user.login');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('user.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * //* @return \Illuminate\Http\Response
     */
    public function store(UserVerif $request)
    {
        $validated = $request->validated();
        $params = new User();
        $params->email = $validated['email'];
        $params->password = Hash::make($validated['password']);
        $params->name = $validated['name'];
        try {
            $params->save();
            $request->session()->flash('status', 'User has been created!');
            $credentials = $request->only('email', 'password');
            if (Auth::attempt($credentials)) {
                $request->session()->regenerate();
                //$request->session()->flash('status', 'Connected');
                return redirect()->route('annonce.index');
            }
            //return redirect()->route('user.show', [$params]);
        } catch (\Illuminate\Database\QueryException $e) {
            $request->session()->flash('error', 'Email is already taken!');
            return view('user.create');
        }
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $params = User::findOrFail($id);
        return view('user.show', ['result' => $params]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        return view('user.edit', ['result' => User::findOrFail($id)]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function update(UserVerif $request, $id)
    {
        $params = User::findOrFail($id);
        $validated = $request->validated();
        $params->fill($validated);
        $params->password = Hash::make($validated['password']);
        try {
            $params->save();
            $request->session()->flash('status', 'User has been updated!');
            return redirect()->route('user.show', [$params]);
        } catch (\Illuminate\Database\QueryException $e) {
            $request->session()->flash('error', 'Email is already taken!');
            return view('user.edit', ['result' => User::findOrFail($id)]);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $params = User::findOrFail($id);
        $params->delete();

        session()->flash('status', 'User has been deleted!');
        return redirect()->route('user.login');
    }

    public function loginPage()
    {
        return view('user.login');

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * //* @return \Illuminate\Http\Response
     */
    public function login(LoginVerif $request)
    {
        $credentials = $request->only('email', 'password');
        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
            $request->session()->flash('status', 'Connected');
            return redirect()->route('annonce.index');
        }

        return back()->withErrors(['email' => 'The provided credentials do not match our records.',]);
    }

    /**
     *
     * @param \Illuminate\Http\Request $request
     *
     */
    public function logout(UserVerif $request)
    {
        Auth::logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();
        dd('test');
        return redirect()->route('user.login');
    }
}
