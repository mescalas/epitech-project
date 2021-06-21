@extends('layout.app')
@extends('layout.header')

@section('content')
    <div
        class="w-2/3 border m-auto mt-4 rounded shadow-inner ">
        <div class="border-b"><p
                class="m-7 text-4xl font-bold">
                Profil : </p></div>
        <p class="m-7 text-2xl font-bold">Name : </p>
        <p class="m-7">{{$result->name}}</p>
        <p class="m-7 text-2xl font-bold">Email : </p>
        <p class="m-7">{{$result->email}}</p>
        <p class="m-7 text-2xl font-bold">Password : </p>
        <p class="m-7">{{$result->password}}</p>

        <div
            class="flex float-right mt-10">
            <a href="/user/{{$result->id}}/edit">
                <button type="button"
                        class="focus:outline-none text-white text-sm py-2.5 px-5 rounded-md bg-blue-500 hover:bg-blue-600 hover:shadow-lg">
                    Update
                </button>
            </a>
        </div>
        <div>
            <form
                action="{{route('user.destroy', ['user' => $result->id])}}"
                method="post"
                class="flex float-right mt-10 mr-8">
                @csrf
                @method('DELETE')
                <input type="submit"
                       class="focus:outline-none text-white text-sm py-2.5 px-5 rounded-md bg-red-500 hover:bg-red-600 hover:shadow-lg"
                       value="Delete">
            </form>
        </div>
        <form action="{{route('user.logout')}}" method="get">
            <div
                class="flex float-right mt-10">
                <a href="/logout">
                    <button type="button"
                            class="focus:outline-none text-white text-sm py-2.5 px-5 rounded-md bg-blue-500 hover:bg-blue-600 hover:shadow-lg">
                        Logout
                    </button>
                </a>
            </div>
        </form>
    </div>

@endsection

@section('title', 'Profil Page')

