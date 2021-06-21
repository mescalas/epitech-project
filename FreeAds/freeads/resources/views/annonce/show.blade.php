@extends('layout.app')
@extends('layout.header')
@section('title', 'Show Ad')
@section('content')
    <h1 class="text-5xl text-center font-bold m-5">{{$annonce->title}}</h1>
    <a href="{{ route('annonce.index') }}">
        <input type="submit"
               class="focus:outline-none shadow-lg ml-44 mb-4 text-white text-sm py-2.5 px-5 rounded-md hover:shadow-xl bg-gradient-to-l from-indigo-500 to-indigo-800 hover:from-indigo-400 hover:to-indigo-700 "
               value="Go Back!"></a>

    <div
        class="w-6/12 border rounded m-auto bg-gray-100 shadow-md mb-8">
        <div class="flex m-8 justify-around">
            @foreach ($images as $image)
                <img class="max-w-4xl max-h-60"
                     src="data:image/jpeg;base64,{{$image->image}}"
                     alt="">
            @endforeach
        </div>
        <div>
            <div
                class="flex shadow-md mb-5 mt-5 text-xs w-4/5 m-auto bg-white rounded">
                <span
                    class="bg-gradient-to-l from-indigo-500 to-indigo-800 w-28 font-bold text-center text-gray-200 p-3 px-5 rounded-l">Title </span>
                <p class="text-sm m-2">{{ $annonce->title }}</p>
            </div>
        </div>
        <div>
            <div
                class="flex shadow-md mb-5 mt-5 text-xs w-4/5 m-auto rounded bg-white">
                <span
                    class="bg-gradient-to-l from-indigo-500 to-indigo-800 w-28 font-bold text-center text-gray-200 p-3 px-5 rounded-l">Description </span>
                <p class="text-sm m-2">{{ $annonce->description }}</p>
            </div>
        </div>
        <div class="flex justify-around w-4/5 m-auto">
            <div
                class="flex shadow-md mb-5 mt-5 text-xs w-56 m-auto rounded bg-white">
                <span
                    class="bg-gradient-to-l from-indigo-500 to-indigo-800 w-28 font-bold text-center text-gray-200 p-3 px-5 rounded-l">Price </span>
                <p class="text-sm m-2">{{ $annonce->prix }}</p>
            </div>
            <div
                class="flex shadow-md mb-5 mt-5 text-xs w-56 m-auto rounded bg-white">
                <span
                    class="bg-gradient-to-l from-indigo-500 to-indigo-800 w-28 font-bold text-center text-gray-200 p-3 px-5 rounded-l">Date Release </span>
                <p class="text-sm m-2">{{ date_format($annonce->created_at, 'jS M Y') }}</p>
            </div>
        </div>
    </div>
@endsection
