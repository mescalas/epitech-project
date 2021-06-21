@extends('layout.app')
@extends('layout.header')

@section('title', 'Research')

@section('content')
@foreach ($researchAds as $ad)
    <div class="w-6/12 border rounded m-auto bg-gray-100 shadow-md mt-4 mb-8">
        <div>
            <div class="flex shadow-md mb-5 mt-5 text-xs w-4/5 m-auto bg-white rounded">
                <span class="bg-gradient-to-l from-indigo-500 to-indigo-800 w-28 font-bold text-center text-gray-200 p-3 px-5 rounded-l">Title </span>
                <a href="{{route('annonce.show', $ad->id)}}"><p class="text-sm m-2">{{ $ad->title }}</p></a>
            </div>
        </div>
        <div>
            <div class="flex shadow-md mb-5 mt-5 text-xs w-4/5 m-auto rounded bg-white">
                <span class="bg-gradient-to-l from-indigo-500 to-indigo-800 w-28 font-bold text-center text-gray-200 p-3 px-5 rounded-l">Description </span>
                <p class="text-sm m-2">{{ $ad->description }}</p>
            </div>
        </div>
        <div>
            <div class="flex shadow-md mb-5 mt-5 text-xs w-4/5 m-auto rounded bg-white">
                <span class="bg-gradient-to-l from-indigo-500 to-indigo-800 w-28 font-bold text-center text-gray-200 p-3 px-5 rounded-l">Price </span>
                <p class="text-sm m-2">{{ $ad->prix }}</p>
            </div>
        </div>
        <div>
            <div class="flex shadow-md mb-5 mt-5 text-xs w-4/5 m-auto rounded bg-white">
                <span class="bg-gradient-to-l from-indigo-500 to-indigo-800 w-28 font-bold text-center text-gray-200 p-3 px-5 rounded-l">Date Release </span>
                <p class="text-sm m-2">{{ date_format($ad->created_at, 'jS M Y') }}</p>
            </div>
        </div>
    </div>

@endforeach
@endsection
