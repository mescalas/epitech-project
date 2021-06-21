@extends('layout.app')
@extends('layout.header')
@section('title', 'Ad')
@section('content')

    <h1 class="text-5xl text-center font-bold m-5">
        Ads :</h1>

    <a href="{{route('annonce.create')}}">
        <div class="ml-40">
            <button
                class="p-0 w-16 h-16 rounded-full bg-gradient-to-l from-indigo-500 to-indigo-800 hover:from-indigo-400 hover:to-indigo-700 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none">
                <svg viewBox="0 0 20 20"
                     enable-background="new 0 0 20 20"
                     class="w-6 h-6 inline-block">
                    <path fill="#FFFFFF" d="M16,10c0,0.553-0.048,1-0.601,1H11v4.399C11,15.951,10.553,16,10,16c-0.553,0-1-0.049-1-0.601V11H4.601
                                    C4.049,11,4,10.553,4,10c0-0.553,0.049-1,0.601-1H9V4.601C9,4.048,9.447,4,10,4c0.553,0,1,0.048,1,0.601V9h4.399
                                    C15.952,9,16,9.447,16,10z"/>
                </svg>
            </button>
        </div>
    </a>



    @if ($message = Session::get('success'))
        <div
            class="w-10/12 m-auto mt-8 flex justify-center items-center m-1 font-medium py-1 px-2 bg-white rounded-md text-green-100 bg-green-700 border border-green-700 ">
            <div slot="avatar">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    height="100%"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-check-circle w-5 h-5 mx-2">
                    <path
                        d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline
                        points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
            </div>
            <div
                class="text-xl font-normal  max-w-full flex-initial">
                <div
                    class="py-2">{{$message}}</div>
            </div>
            <div
                class="flex flex-auto flex-row-reverse">
                <div>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="100%"
                        height="100%"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="feather feather-x cursor-pointer hover:text-green-400 rounded-full w-5 h-5 ml-2">
                        <line x1="18"
                              y1="6"
                              x2="6"
                              y2="18"></line>
                        <line x1="6"
                              y1="6"
                              x2="18"
                              y2="18"></line>
                    </svg>
                </div>
            </div>
        </div>
    @endif

    <table
        class="table-auto rounded-t-lg m-5 w-5/6 mx-auto text-gray-100 bg-gradient-to-l from-indigo-500 to-indigo-800">
        <thead>
        <tr class="text-left border-b-2 border-indigo-300">
            <th class="px-4 py-3">Images</th>
            <th class="px-4 py-3">Title</th>
            <th class="px-4 py-3">Description</th>
            <th class="px-4 py-3">Price</th>
            <th class="px-4 py-3">Release Date</th>
        </tr>
        </thead>
        <tbody>
        @foreach($annonces as $annonce)
            <tr class="border-b border-indigo-400">
                <td class="px-4 py-3"><img class="w-32 h-32" src="data:image/jpeg;base64, {{$annonce->image}}" alt=""></td>
                <td class="px-4 py-3"><a href="{{route('annonce.show', $annonce->id)}}">{{$annonce->title}}</a></td>
                <td class="px-4 py-3">{{$annonce->description}}</td>
                <td class="px-4 py-3">{{$annonce->prix}}</td>
                <td class="px-4 py-3">{{$annonce->created_at}}</td>
            </tr>
        </tbody>
        @endforeach
    </table>
@endsection
