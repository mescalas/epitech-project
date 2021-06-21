@extends('layout.app')
@extends('layout.header')

@section('title', 'Research')

@section('content')

    <h1 class="text-5xl text-center font-bold m-5">
        Research :</h1>

    <div class="w-6/12 border rounded m-auto bg-gray-100 shadow-md mt-8">
        <form
            action="{{route('annonce.research')}}"
            method="POST">
            @csrf
            <div>
                <div
                    class="flex shadow-md mb-5 mt-5 text-xs w-4/5 m-auto bg-white rounded">
                <span
                    class="bg-gradient-to-l from-indigo-500 to-indigo-800 w-28 font-bold text-center text-gray-200 p-3 px-5 rounded-l">Title </span>
                    <input class="w-4/5" name="title" type="text"
                           placeholder="Title of the ads">
                </div>
            </div>
            <div>
                <div
                    class="flex shadow-md mb-5 mt-5 text-xs w-4/5 m-auto bg-white rounded">
                <span
                    class="bg-gradient-to-l from-indigo-500 to-indigo-800 w-28 font-bold text-center text-gray-200 p-3 px-5 rounded-l">Price Min </span>
                    <input class="w-4/5" name="price_min" type="number"
                           placeholder="Price Min">
                </div>
            </div>
            <div>
                <div
                    class="flex shadow-md mb-5 mt-5 text-xs w-4/5 m-auto bg-white rounded">
                <span
                    class="bg-gradient-to-l from-indigo-500 to-indigo-800 w-28 font-bold text-center text-gray-200 p-3 px-5 rounded-l">Price Max </span>
                    <input class="w-4/5" name="price_max" type="number"
                           placeholder="Price Max">
                </div>
            </div>
            <input type="submit"
                   class=" float-right focus:outline-none shadow-lg mt-8 text-white text-sm py-2.5 px-5 rounded-md hover:shadow-xl bg-gradient-to-l from-indigo-500 to-indigo-800 hover:from-indigo-400 hover:to-indigo-700 "
                   value="Research!">
        </form>
    </div>


@endsection
