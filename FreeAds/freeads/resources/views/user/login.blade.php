@extends('layout.app')

@section('titleForm', 'Login Form')
@section('content')
    <div
        class="flex items-center justify-center mt-24">
        <div class="w-full max-w-md">
            <form
                action="{{route('user.login')}}"
                method="POST"
                class="bg-white shadow-lg rounded px-12 pt-6 pb-8 mb-4">
                @csrf
                @include('user.partials.form')
                <div
                    class="flex items-center justify-between">
                    <button
                        class="px-4 py-2 rounded text-white inline-block shadow-lg bg-blue-500 hover:bg-blue-600 focus:bg-blue-700"
                        type="submit">Sign In
                    </button>
                    <a href="/register" class="underline text-blue-500 hover:text-blue-600">Not registered yet?
                    </a>
                </div>

            </form>
            <p class="text-center text-gray-500 text-xs">
                &copy;2021 Web@cademie Corp. All
                rights
                reserved.
            </p>
        </div>
    </div>
@endsection
@section('title', 'Login Page')

