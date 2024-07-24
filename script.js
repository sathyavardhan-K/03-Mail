// function toggleDropdown() {
//     document.getElementById("myDropdown").classList.toggle("show");
// }

// // Close the dropdown if the user clicks outside of it
// window.onclick = function(event) {
//     if (!event.target.matches('.dropbtn')) {
//         var dropdowns = document.getElementsByClassName("dropdown12-content");
//         for (var i = 0; i < dropdowns.length; i++) {
//             var openDropdown = dropdowns[i];
//             if (openDropdown.classList.contains('show')) {
//                 openDropdown.classList.remove('show');
//             }
//         }
//     }
// }



document.getElementById('select').addEventListener('click', function() {
    var targetDiv = document.getElementById('targetDiv');
    targetDiv.classList.toggle('active');
    targetDiv.classList.toggle('content');
});








document.addEventListener('DOMContentLoaded', function() {
    const titleInput = document.querySelector('.note-title');
    const contentInput = document.querySelector('.note-content');
    const saveBtn = document.querySelector('.save-btn');
    const noteTitle = document.getElementById('note-title');
    const noteContent = document.getElementById('note-content');

    // Load saved note if available
    loadNote();

    // Event listener for save button
    saveBtn.addEventListener('click', function() {
        const title = titleInput.value.trim();
        const content = contentInput.value.trim();

        if (title === '' || content === '') {
            alert('Please enter both title and content!');
            return;
        }

        // Save note to localStorage
        saveNote({
            title: title,
            content: content
        });


        // Display the saved note
        displayNote();
        // Clear the note
        clearFields();

        alert('Note saved successfully!');
    });

    // Function to save note to localStorage
    function saveNote(note) {
        localStorage.setItem('savedNote', JSON.stringify(note));
    }

    // Function to load saved note from localStorage
    function loadNote() {
        const savedNote = localStorage.getItem('savedNote');

        if (savedNote) {
            const note = JSON.parse(savedNote);
            titleInput.value = note.title;
            contentInput.value = note.content;
        }
        clearFields();
    }


    // Function to display the note
    function displayNote() {
        const savedNote = localStorage.getItem('savedNote');

        if (savedNote) {
            const note = JSON.parse(savedNote);
            noteTitle.textContent = note.title;
            noteContent.textContent = note.content;
        }

        console.log('hii');
        


    }

    // Function to clear input fields
    function clearFields() {
        titleInput.value = '';
        contentInput.value = '';
    }

});




   

