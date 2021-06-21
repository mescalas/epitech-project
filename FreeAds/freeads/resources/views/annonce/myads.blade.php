@extends('layout.app')
@extends('layout.header')
@section('title', ' My Ads')
@section('content')

    <h1 class="text-5xl text-center font-bold m-5">
         My Ads :</h1>




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
            <th class="px-4 py-3">Release Date
            </th>
            <th class="px-4 py-3">Action</th>
        </tr>
        </thead>
        <tbody>
        @foreach($annonces as $annonce)
            <tr class="border-b border-indigo-400">
                <td class="px-4 py-3"><img class="w-32 h-32" src="data:image/jpeg;base64, {{$annonce->image}}"
                                           alt=""></td>
                <td class="px-4 py-3"><a href="{{route('annonce.show', $annonce->id)}}">{{$annonce->title}}</a></td>
                <td class="px-4 py-3">{{$annonce->description}}</td>
                <td class="px-4 py-3">{{$annonce->prix}}</td>
                <td class="px-4 py-3">{{$annonce->created_at}}</td>
                <td class="flex">
                    <form
                        action="{{route('annonce.destroy', $annonce->id)}}"
                        method="post">
                        @csrf
                        @method('DELETE')
                        <button type="submit"
                                class="inline-block p-3 text-center text-white transition bg-red-500 rounded-full shadow ripple hover:shadow-lg hover:bg-red-600 focus:outline-none"
                        >
                            <svg
                                class="w-5 h-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor">
                                <path
                                    fill-rule="evenodd"
                                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                        </button>
                    </form>
                    <a href="{{route('annonce.edit', $annonce->id)}}"
                       title="show">
                        <button
                            class="inline-block p-3 text-center text-white transition bg-blue-700 rounded-full shadow ripple hover:shadow-lg hover:bg-blue-800 focus:outline-none"
                        >
                            <svg
                                class="w-5 h-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor">
                                <path
                                    fill-rule="evenodd"
                                    d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                        </button>
                    </a>
                </td>
            </tr>
        </tbody>
        @endforeach
    </table>

    {{--
        {!! $annonces->links() !!}
    --}}

@endsection
