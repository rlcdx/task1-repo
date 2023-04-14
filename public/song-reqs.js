function getSongs() {
    fetch('http://localhost:8000/songs')
        .then(res => res.json())
        .then(data => {
            const resultData = data
            console.log(resultData)
            const resultDiv = document.getElementById('result')
            resultDiv.innerHTML = JSON.stringify(resultData.data.songs, null, 2)
        })
        .catch(error => console.error(error))
}

function getSingleSong() {
    const id = document.getElementById('songId').value
    fetch(`http://localhost:8000/songs/${id}`)
        .then(res => res.json())
        .then(data => {
            const resultData = data
            console.log(resultData.data.song)
            const resultDiv = document.getElementById('resultTwo')
            resultDiv.innerHTML = JSON.stringify(resultData.data.song, null, 2)
        })
        .catch(error => console.error(error))
}

function postSong() {
    const title = document.getElementById("titleInput").value;
    const artist = document.getElementById("artistInput").value;
    const year = document.getElementById("yearInput").value;

    fetch('http://localhost:8000/songs')
        .then(res => res.json())
        .then(data => {
            const resultData = data
            console.log(resultData)
            const newId = resultData.data.songs[resultData.data.songs.length - 1].id + 1
            if (title === '' || artist === '' || year === '') {
                alert('Please enter a valid title, artist, and year');
                return;
            } else {
                const newSong = { "id": newId, "title": title, "artist": artist, "releaseYear": +year }
                const updatedData = resultData.data.songs.push(newSong)

                fetch('http://localhost:8000/songs', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newSong)
                })
                    .then(res => console.log(res))
                    .catch(error => console.error(error));
            }
        })
        .catch(error => console.error(error));
}

function patchSong() {
    window.location.href = "patch-req"
}

function deleteSong() {
    const id = document.getElementById('deleteId').value
    fetch(`http://localhost:8000/songs/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    })
        .then(res => {
            if (res.ok) {
                console.log('Song deleted successfully')
            } else if (res.status === 404) {
                console.error('There is no song with ID ' + id)
            } else {
                console.error('Failed to delete song')
            }
        })
        .catch(error => console.error(error));
}