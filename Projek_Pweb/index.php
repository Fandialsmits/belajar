<?php
// PHP Dasar: Buat array PHP untuk menyimpan daftar tugas.
// Untuk demo ini, array akan diinisialisasi ulang setiap kali halaman dimuat.
// Dalam aplikasi nyata, Anda akan mengambil data dari database.
// Atau, jika ingin simulasi lebih lanjut, bisa membaca/menulis ke file JSON.

// Ini adalah array yang akan kita gunakan untuk demo.
// Untuk aplikasi yang lebih persistent, Anda bisa load dari JSON atau DB.
$tasks = [
    ['id' => 1, 'text' => 'Pelajari HTML', 'completed' => true],
    ['id' => 2, 'text' => 'Terapkan gaya dengan CSS', 'completed' => false],
    ['id' => 3, 'text' => 'Tambahkan interaktivitas dengan JavaScript', 'completed' => false],
    ['id' => 4, 'text' => 'Integrasikan dengan PHP', 'completed' => false],
    ['id' => 5, 'text' => 'Selesaikan proyek To-Do List', 'completed' => false],
];

// Mengubah array PHP menjadi format JSON agar bisa dibaca oleh JavaScript
$initialTasksJson = json_encode($tasks);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Daftar Tugas Saya (Interaktif)</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h1>Daftar Tugas Saya (Interaktif)</h1>

        <div class="task-input">
            <input type="text" id="newTaskInput" placeholder="Tambahkan tugas baru...">
            <button id="addTaskButton">Tambah Tugas</button>
        </div>

        <ul id="taskList">
            </ul>

        <p style="text-align: center; margin-top: 30px; font-size: 0.9em; color: #666;">
            *Selamat Belajar.
        </p>
    </div>

    <script>
        // Meneruskan data tugas dari PHP ke JavaScript
        const initialTasks = <?php echo $initialTasksJson; ?>;
    </script>
    <script src="script.js"></script>
</body>
</html>