<nav class="flex items-center justify-between flex-wrap bg-gradient-to-l from-indigo-500 to-indigo-800 p-6">
    <div class="flex items-center flex-no-shrink text-white mr-6">
        <a href="../"><span class="font-semibold text-xl tracking-tight">FreeAds</span></a>
    </div>
    <div class="block lg:hidden">
        <button class="flex items-center px-3 py-2 border rounded text-teal-lighter border-teal-light text-white hover:border-white">
            <svg class="h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
        </button>
    </div>
    <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div class="text-sm lg:flex-grow">
            <a href="/annonce" class="block mt-4 lg:inline-block lg:mt-0 text-teal-lighter text-white hover:shadow-xl mr-4">
                Ads
            </a>
            <a href="/research" class="block mt-4 lg:inline-block lg:mt-0 text-teal-lighter text-white hover:shadow-xl mr-4">
                Research
            </a>
        </div>
        <a href="/myads" class="block mt-4 lg:inline-block lg:mt-0 text-teal-lighter text-white hover:shadow-xl mr-4">
            My Ads
        </a>
        <a href="/messages" class="block mt-4 lg:inline-block lg:mt-0 text-teal-lighter text-white hover:shadow-xl mr-4">
            Messages
        </a>
        <div>
            <a href="{{route('user.show', [Auth::user()['id']])}}" class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal hover:border-4  mt-4 lg:mt-0">Profil</a>
        </div>
    </div>
</nav>
