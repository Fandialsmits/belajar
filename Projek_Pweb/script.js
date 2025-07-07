document.addEventListener('DOMContentLoaded', () => {
    const newTaskInput = document.getElementById('newTaskInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');

    // Menggunakan data tugas yang diterima dari PHP
    // initialTasks didefinisikan di <script> tag di index.php
    let currentTasks = initialTasks; // Kita akan memanipulasi array ini di sisi klien

    // Fungsi untuk merender semua tugas ke DOM
    function renderTasks() {
        taskList.innerHTML = ''; // Kosongkan daftar yang ada
        if (currentTasks.length === 0) {
            const noTaskItem = document.createElement('li');
            noTaskItem.textContent = 'Belum ada tugas. Tambahkan satu!';
            noTaskItem.style.fontStyle = 'italic';
            noTaskItem.style.color = '#777';
            taskList.appendChild(noTaskItem);
        } else {
            currentTasks.forEach(task => {
                addTaskToDOM(task.text, task.completed, task.id);
            });
        }
    }

    // Fungsi pembantu untuk menambahkan satu tugas ke DOM (HTML)
    function addTaskToDOM(taskText, isCompleted, taskId) {
        const listItem = document.createElement('li');
        listItem.setAttribute('data-id', taskId); // Tambahkan data-id untuk identifikasi
        if (isCompleted) {
            listItem.classList.add('completed');
        }

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = isCompleted;
        checkbox.addEventListener('change', () => {
            listItem.classList.toggle('completed', checkbox.checked);
            // Temukan tugas di array dan update statusnya
            const taskIndex = currentTasks.findIndex(t => t.id === taskId);
            if (taskIndex !== -1) {
                currentTasks[taskIndex].completed = checkbox.checked;
                // Kirim pembaruan ke PHP (melalui AJAX)
                sendUpdateToPHP('toggle', taskId, checkbox.checked);
            }
        });

        const taskSpan = document.createElement('span');
        taskSpan.textContent = taskText;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Hapus';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', () => {
            if (confirm(`Apakah Anda yakin ingin menghapus tugas "${taskText}"?`)) {
                taskList.removeChild(listItem);
                // Hapus dari array
                currentTasks = currentTasks.filter(t => t.id !== taskId);
                // Kirim permintaan hapus ke PHP (melalui AJAX)
                sendUpdateToPHP('delete', taskId);
                renderTasks(); // Render ulang jika daftar kosong
            }
        });

        listItem.appendChild(checkbox);
        listItem.appendChild(taskSpan);
        listItem.appendChild(deleteButton);
        taskList.appendChild(listItem);
    }

    // --- AJAX Function to "Simulate" PHP Interaction ---
    // Dalam aplikasi nyata, ini akan mengirim permintaan HTTP (fetch/XMLHttpRequest)
    // ke file PHP terpisah (misal: 'api.php') yang memproses data.
    function sendUpdateToPHP(action, taskId, newStatus = null) {
        // Ini adalah SIMULASI sisi klien saja.
        // Perubahan ini hanya akan tercermin di array `currentTasks` di browser.
        // Untuk persistensi, Anda perlu endpoint PHP yang sebenarnya.

        console.log(`[Simulasi AJAX ke PHP] Aksi: ${action}, ID: ${taskId}, Status Baru: ${newStatus}`);
        // Contoh bagaimana Anda akan mengirim data:
        /*
        fetch('api.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ action: action, id: taskId, status: newStatus, text: '...' })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Respons dari server:', data);
            // Opsional: Perbarui `currentTasks` dengan data yang diterima dari server
        })
        .catch(error => console.error('Error:', error));
        */
    }


    // Event listener untuk "Add Task" button
    addTaskButton.addEventListener('click', () => {
        const taskText = newTaskInput.value.trim();
        if (taskText) {
            // Berikan ID unik (simulasi, di dunia nyata DB akan memberikan ID)
            const newId = currentTasks.length > 0 ? Math.max(...currentTasks.map(t => t.id)) + 1 : 1;
            const newTask = { id: newId, text: taskText, completed: false };
            currentTasks.push(newTask);
            addTaskToDOM(newTask.text, newTask.completed, newTask.id);
            newTaskInput.value = ''; // Clear input field
            // Kirim tugas baru ke PHP (melalui AJAX)
            sendUpdateToPHP('add', newId, false, taskText); // Menambahkan text juga
        } else {
            alert('Tugas tidak boleh kosong!');
        }
    });

    // Allow adding tasks with 'Enter' key
    newTaskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTaskButton.click();
        }
    });

    // Render tugas-tugas awal saat halaman dimuat
    renderTasks();
});