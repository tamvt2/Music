<?php
namespace App\Http\Services;

use App\Models\Music;
class MusicService {
    public function getAll() {
        return Music::orderby('id', 'asc')->get();
    }
}
?>