@extends ('layout.app')
@extends ('layout.header')

@section('title', 'Send Message')
@section('content')
    <h1 class="text-5xl text-center font-bold m-5">Send message to : {{$user->name}}</h1>
    <div class="rounded border w-2/3 m-auto">
        <h1><strong>Conversation :</strong></h1>

        @empty($message)
            <h1>No messages</h1>
        @else
            @foreach($message as $mes)
                <p>- {{$mes->content}}</p>
            @endforeach
        @endempty
    </div>

    <form action="{{route('messages.store')}}" method="post">
        @csrf
        <input type="hidden" name="id_destinataire" value="{{$user->id}}">
        <input type="hidden" name="id_expediteur" value="{{$user_}}">
        <div
            class="flex shadow-md mb-5 mt-5 text-xs w-4/5 m-auto h-20">
            <span class="bg-gradient-to-l from-indigo-500 to-indigo-800 w-24 font-bold text-center text-gray-200 p-3 px-5 rounded-l">New Message</span>
            <textarea name="content" placeholder="New message..." class="field text-sm text-gray-600 p-2 px-3 rounded-r w-full resize-none"></textarea>
        </div>
        <div
            class="float-right mt-8 mr-4">
            <button type="submit"
                    class="inline-block p-3 text-center text-white transition-color bg-gradient-to-l from-indigo-500 to-indigo-800 transition-color hover:from-indigo-400 hover:to-indigo-700 rounded-full shadow ripple hover:shadow-lg hover:bg-blue-800 focus:outline-none">
                <svg class="w-5 h-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clip-rule="evenodd"/>
                </svg>
            </button>
        </div>
    </form>
@endsection
