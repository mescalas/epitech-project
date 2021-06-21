@extends('layout.app')
@extends('layout.header')
@section('title', 'Research')
@section('content')
    <form action="{{route('message.send')}}" method="POST">
        @csrf
        <div>
            <div class="flex shadow-md mb-5 mt-5 text-xs w-4/5 m-auto">
        <span
            class="bg-gradient-to-l from-indigo-500 to-indigo-800 w-28 font-bold text-center text-gray-200 p-3 px-5 rounded-l">Choose the recipient :</span>
                <select name="users" id="users">
                    @foreach ($users as $user)
                        <option
                            value="{{$user->id}}" name="id">{{$user->name}}</option>
                    @endforeach
                </select>
            </div>
        </div>
        <input type="submit" value="Send message!" class="focus:outline-none shadow-lg ml-44 mb-4 text-white text-sm py-2.5 px-5 rounded-md
        hover:shadow-xl bg-gradient-to-l from-indigo-500 to-indigo-800 hover:from-indigo-400 hover:to-indigo-700 ">
    </form>
@endsection



