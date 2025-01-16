<?php

namespace App\Http\Controllers;

use App\Http\Resources\CategoryApiResource;
use App\Http\Resources\MenuItemsApiResource;
use App\Http\Resources\MenusubmenuResource;
use App\Http\Resources\RestaurantResource;
use App\Models\Category;
use App\Models\Favourite;
use App\Models\History;
use App\Models\Menuitem;
use App\Models\MenuItemType;
use App\Models\Restaurant;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class RestaurantController extends Controller
{
    public function index(){
        $restauransts = Restaurant::inRandomOrder()->get();
        
        return RestaurantResource::collection($restauransts);
    }
    
    public function searchmenu($search){
        
        $restaurants = Restaurant::with(['categories.menuitems' => function ($query) use($search) {
            $query->where('name', 'LIKE', '%'.$search.'%');
        }])->whereHas('categories.menuitems', function ($query) use ($search) {
            $query->where('name', 'LIKE', '%'.$search.'%');
        })->get();
        
        return RestaurantResource::collection($restaurants);
        return response()->json($restaurants,200);
        
        
    }
    
    public function restaurantinfo($id){
        $restauranst = Restaurant::where('id',$id)->first();
        
        
        return new RestaurantResource($restauranst);
    }
    
    public function region($name){
        $restauransts = Restaurant::where('region',$name)->get();
        
        return RestaurantResource::collection($restauransts);
    }
    
    public function categories(){
        $categories = Category::inRandomOrder()->get();
        
        return CategoryApiResource::collection($categories);
    }
    
    public function regions(){
        
        $regions = Restaurant::select('region')
        ->selectRaw('count(*) as total_restaurants')
        ->groupBy('region')
        ->get();
        
        return response()->json($regions,200);
    }
    
    public function byregions($name){
        
        logger($name);
        
        $regions = Restaurant::where('region',$name)
        ->inRandomOrder()
        ->get();
        
        return response()->json($regions,200);
    }
    
    public function menuitems(){
        
        $menuitems = Menuitem::inRandomOrder()->get();
        
        return MenuItemsApiResource::collection($menuitems);
    }

    public function menuitemssub($id,$cat){
        
        $menuitems = MenuItemType::where('menuitem_id',$id)->where('category_id',$cat)->get();
        $menuitem = MenuItemType::all();
        
        return MenusubmenuResource::collection($menuitems);
    }
    
    public function myinformation($id){
        
        // $user = User::where('id',$id)->first();
        $user = User::findOrFail(2);
        
        return response()->json($user,200);        
    }
    
    
    public function saved($id){
        $user = User::findOrFail(2);
        $fvrts = Favourite::where('user_id',$user->id)->pluck('restaurant_id');
        
        logger($id);
        
        $restauransts = Restaurant::whereIn('id',$fvrts)->get();
        
        return RestaurantResource::collection($restauransts);
    }
    
    
    public function myvrts($id){
        
        $fvrts = Favourite::where('user_id',$id)->pluck('restaurant_id');
        
        return response()->json($fvrts,200);        
    }
    
    public function addtofvrts(Request $request){
        
        $user = User::findOrFail(2);
        $userid = $user->id;
        $restaurant = $request->restaurantid;
        
        $fvrt = Favourite::where('user_id',$userid)
        ->where('restaurant_id',$restaurant)
        ->first();
        
        $data = [
            'user_id' => $userid,
            'restaurant_id' => $restaurant
        ];
        
        if($fvrt){
            
            $fvrt->delete();
            
            return response()->json([
                'message' => 'Favourite removed successfully!'
            ],200);
            
        }else{
            Favourite::create($data);
        }
        
        return response()->json([
            'message' => 'Added successfully!'
        ],200);
        
    }
    
    
    public function myhistories($id){
        
        logger("history: ".$id);
        
        $user = User::findOrFail(2);
        
        $histories = History::where('user_id',$user->id)->pluck('restaurant_id');
        
        $restauransts = Restaurant::whereIn('id',$histories)->get();
        
        return RestaurantResource::collection($restauransts);
    }
    
    public function addtohistories(Request $request){
        
        $user = User::findOrFail(2);
        $userid = $user->id;
        $restaurant = $request->restaurantid;
        
        $fvrt = History::where('user_id',$userid)
        ->where('restaurant_id',$restaurant)
        ->first();
        
        $data = [
            'user_id' => $userid,
            'restaurant_id' => $restaurant
        ];
        
        logger($data);
        
        if(!$fvrt){
            History::create($data);
        }
        
        return response()->json([
            'message' => 'Added successfully!'
        ],200);
        
    }
    
    
    public function adduser(Request $request) {
        
        $user = User::findOrFail(2);
        
        if ($request->has('logo')) {

            $file = $request->file('logo');
            $fileName = time() . '_' . $file->getClientOriginalName();
            
            // Save the file in the 'uploads' directory (within 'storage/app/public/uploads')
            $filePath = $file->storeAs('uploads',$fileName, 'public');

            $user->photo = $filePath;
        
        }else{
            $imagepath = null;
        }
        
        
        $user->name = $request->fullname;
        $user->email = $request->email;
        $user->phone = $request->phone;
        
        $user->save();
        
        return response()->json($user,200);
    }
    
    
    
    public function addreview(Request $request) {
        
        $id = $request->id;
        
        $restaurant = Restaurant::where('id',$id)->first();
        
        $user = User::findOrFail(2);
        
        //$user = User::where('id',1)->first();
        
        $restaurant->rating([
            'title' => 'Posted by '.($user->name ?? 'Ananomous'),
            'customer_service_rating' => $request->customerservice,
            'quality_rating' => $request->quality,
            'friendly_rating' => $request->friendly,
            'pricing_rating' => $request->pricing,
            'rating' => $request->overall,
            'body' => $request->review,
            'recommend' => 'Yes',
            'approved' => true
        ],$user);
        
        return response()->json("added successfully!",200);
    }
    
    
    
}
