<?php

namespace App\Http\Controllers;

use App\Models\Annonce;
use App\Models\Images;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;


class AnnonceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $annonces = DB::select("SELECT annonce.*, (SELECT images.image FROM images WHERE images.annonce_id = annonce.id LIMIT 1) as 'image' FROM annonce");
        //dd($annonces);
        return view('annonce.index', compact('annonces'));
        //SELECT annonce.*, GROUP_CONCAT(images.image SEPARATOR ', ') FROM annonce INNER JOIN images ON annonce.id = images.annonce_id GROUP BY annonce.id

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('annonce.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate(['title' => 'required', 'description' => 'required', 'prix' => 'required', 'images' => 'required']);
        $annonce = Annonce::create(['id_user' => [Auth::user()['id']][0],'title' => $request->title, 'description' => $request->description, 'prix' => $request->prix]);
        foreach ($request->images as $image) {
            $img_base64 = base64_encode(file_get_contents($image->path()));
            Images::create(['annonce_id' => $annonce->id, 'image' => $img_base64,]);
        }
        return redirect()->route('annonce.index')->with('success', 'Ad created successfully.');
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function show(Annonce $annonce)
    {
        //$annonce = DB::select('SELECT annonce.*, images.image FROM annonce INNER JOIN images ON annonce.');
        $images = DB::select('SELECT images.* FROM images WHERE images.annonce_id = ?', [$annonce->id]);
        return view('annonce.show', compact('annonce', 'images'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function edit(Annonce $annonce)
    {
        return view('annonce.edit', compact('annonce'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Annonce $annonce)
    {
        $request->validate(['title' => 'required', 'description' => 'required', 'prix' => 'required']);
        $annonce->update($request->all());

        return redirect()->route('annonce.index')->with('success', 'Ad updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Annonce $annonce)
    {
        $annonce->delete();

        return redirect()->route('annonce.index')->with('success', 'Ad deleted successfully');
    }

    public function researchPage()
    {
        return view('annonce.research.form');
    }

    /**
     * @param \Illuminate\Http\Request $request
     */

    public function research(Request $request)
    {
        $researchAds = Annonce::where(function ($query) use ($request) {
            return $request->title ? $query->where("title", "like", "%" . $request->title . "%") : '';
        })->where(function ($query) use ($request) {
            return $request->price_min ? $query->where("prix", ">=", $request->price_min) : '';
        })->where(function ($query) use ($request) {
            return $request->price_max ? $query->where("prix", "<=", $request->price_max) : '';
        })->orderBy("created_at", 'DESC')->paginate(5);

        return view('annonce.research.result', ["researchAds" => $researchAds]);
    }

    public function myads(){
        $id_user = [Auth::user()['id']][0];
        $annonces = DB::select("SELECT annonce.*, (SELECT images.image FROM images WHERE images.annonce_id = annonce.id LIMIT 1) as 'image' FROM annonce WHERE id_user=$id_user");
        return view('annonce.myads', compact('annonces'));
    }
}
