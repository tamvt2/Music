<?php

namespace App\Http\Controllers;

use App\Http\Services\MusicService;
use Illuminate\Http\Request;

class MusicController extends Controller
{
    protected $musicService;

    public function __construct(MusicService $musicService) {
        $this->musicService = $musicService;
    }

    public function index() {
        $values = $this->musicService->getAll();
        if ($values) {
            return response()->json([
                'values' => $values,
                'errors' => true,
            ]);
        }
        return response()->json([ 'errors' => false ]);
    }
}
