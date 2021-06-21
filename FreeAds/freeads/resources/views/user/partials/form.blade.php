<div
    class="text-gray-800 text-2xl flex justify-center border-b-2 py-2 mb-4">
    @yield('titleForm')
</div>
<div class="mb-4">
    <label
        class="block text-gray-700 text-sm font-normal mb-2"
        for="username">
        Email :
    </label>
    <input
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        name="email"
        type="email"
        autofocus
        placeholder="Email"
        value="{{old('email', $result->email ?? null)}}"/>
</div>
<div class="mb-6">
    <label
        class="block text-gray-700 text-sm font-normal mb-2"
        for="password">
        Password :
    </label>
    <input
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
        type="password"
        placeholder="Password"
        name="password"
        autocomplete="current-password"
        value="{{old('password', $result->password ?? null)}}"/>
</div>
@if($errors->any())
    <div
        class="bg-red-50 border-l-8 border-red-900 mb-2">
        <div
            class="flex items-center">
            <div class="p-2">
                <div
                    class="flex items-center">
                    <div
                        class="ml-2">
                        <svg
                            class="h-8 w-8 text-red-900 mr-2 cursor-pointer"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                    </div>
                    <p class="px-6 py-4 text-red-900 font-semibold text-lg">
                        Please fix
                        the
                        following
                        errors.</p>
                </div>
                <div
                    class="px-16 mb-4">

                    @foreach($errors->all() as $error)
                        <li class="text-md font-bold text-red-500 text-sm">{{$error}}</li>
                    @endforeach
                </div>
            </div>
        </div>
    </div>
@endif
