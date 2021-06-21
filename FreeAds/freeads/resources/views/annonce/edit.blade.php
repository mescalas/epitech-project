@extends('layout.app')
@extends('layout.header')
@section('title', 'Edit Ad')
@section('content')

    <h1 class="text-5xl text-center font-bold m-5">
        Edit Ad</h1>
    <a href="{{ route('annonce.index') }}">
        <input type="submit"
               class="focus:outline-none shadow-lg ml-44 mb-4 text-white text-sm py-2.5 px-5 rounded-md hover:shadow-xl bg-gradient-to-l from-indigo-500 to-indigo-800 hover:from-indigo-400 hover:to-indigo-700 "
               value="Go Back!"></a>

    @if ($errors->any())
        <div
            class="rounded bg-red-500 text-white">
            <strong>Whoops!</strong> There were
            some problems with your input.<br><br>
            <ul>
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif

    @if ($errors->any())
        <div
            class="flex w-6/12 m-auto mb-8 justify-center items-center m-1 font-medium py-1 px-2 bg-white rounded-md text-red-700 bg-red-100 border border-red-300 ">
            <div slot="avatar">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%" height="100%"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-alert-octagon w-5 h-5 mx-2">
                    <polygon
                        points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"></polygon>
                    <line x1="12" y1="8" x2="12"
                          y2="12"></line>
                    <line x1="12" y1="16"
                          x2="12.01"
                          y2="16"></line>
                </svg>
            </div>
            <div
                class="text-xl font-normal  max-w-3/5 flex-initial">
                <div class="py-2">
                    <strong>Whoops!</strong> There
                    were some problems with your
                    input.
                    <div
                        class="text-sm font-base">
                        <ul>
                            @foreach ($errors->all() as $error)
                                <li class="font-bold">{{ $error }}</li>
                            @endforeach
                        </ul>
                    </div>
                </div>
            </div>
            <div
                class="flex flex-auto flex-row-reverse">
                <div>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="100%" height="100%"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="feather feather-x cursor-pointer hover:text-red-400 rounded-full w-5 h-5 ml-2">
                        <line x1="18" y1="6"
                              x2="6"
                              y2="18"></line>
                        <line x1="6" y1="6"
                              x2="18"
                              y2="18"></line>
                    </svg>
                </div>
            </div>
        </div>
    @endif



    <form action="{{ route('annonce.update', $annonce->id) }}" method="POST">
        @csrf
        @method('PUT')
        <div
            class="w-6/12 border rounded m-auto bg-gray-100 shadow-md">
            <div>
                <div
                    class="flex shadow-md mb-5 mt-5 text-xs w-4/5 m-auto">
                    <span
                        class="bg-gradient-to-l from-indigo-500 to-indigo-800 w-28 font-bold text-center text-gray-200 p-3 px-5 rounded-l">Title</span>
                    <input type="text"
                           name="title"
                           placeholder="Title"
                           class="field text-sm text-gray-600 p-2 px-3 rounded-r w-full"
                           value="{{old('title', $annonce->title ?? null)}}"/>
                </div>
            </div>
            <div>
                <div
                    class="flex shadow-md mb-5 mt-5 text-xs w-4/5 m-auto h-20">
                    <span
                        class="bg-gradient-to-l from-indigo-500 to-indigo-800 w-24 font-bold text-center text-gray-200 p-3 px-5 rounded-l">Description</span>
                    <textarea
                        name="description"
                        placeholder="Description"
                        class="field text-sm text-gray-600 p-2 px-3 rounded-r w-full resize-none">{{old('description', $annonce->description ?? null)}}</textarea>
                </div>
            </div>
            <div>
                <div
                    class="flex shadow-md mb-5 mt-5 text-xs w-4/5 m-auto">
                    <span
                        class="bg-gradient-to-l from-indigo-500 to-indigo-800 w-28 font-bold text-center text-gray-200 p-3 px-5 rounded-l">Price</span>
                    <input type="number"
                           name="prix"
                           placeholder="Price"
                           class="field text-sm text-gray-600 p-2 px-3 rounded-r w-full"
                           value="{{old('prix', $annonce->prix ?? null)}}">
                </div>
            </div>
            <div>
                <div
                    class="flex shadow-md mb-5 mt-5 text-xs w-4/5 m-auto">
                    <span
                        class="bg-gradient-to-l from-indigo-500 to-indigo-800 w-28 font-bold text-center text-gray-200 p-3 px-5 rounded-l">Price</span>
                    <input type="file"
                           name="photos"
                           placeholder="Pictures"
                           class="field text-sm text-gray-600 p-2 px-3 rounded-r w-full"
                           multiple
                           accept="image/png, image/jpeg, image/jpg">
                </div>
            </div>
            <div
                class="float-right mt-8 mr-4">
                <button type="submit"
                        class="inline-block p-3 text-center text-white transition-color bg-gradient-to-l from-indigo-500 to-indigo-800 transition-color hover:from-indigo-400 hover:to-indigo-700 rounded-full shadow ripple hover:shadow-lg hover:bg-blue-800 focus:outline-none"
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
            </div>
        </div>
    </form>
@endsection
