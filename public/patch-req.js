const fetchButton = document.querySelector('#fetchButton')
const songForm = document.querySelector('#songForm')
const titleInput = document.querySelector('#title')
const artistInput = document.querySelector('#artist')
const yearInput = document.querySelector('#releaseYear')
const submitButton = document.querySelector('#submitButton')

fetchButton.addEventListener('click', () => {
    const songId = document.querySelector('#songId').value
    fetch('http://localhost:8000/songs')
        .then(response => response.json())
        .then(resultData => {
            console.log(resultData.data.songs)
            const song = resultData.data.songs.find(s => s.id === +songId)
            console.log(song)
            if (song) {
                titleInput.value = song.title
                artistInput.value = song.artist
                yearInput.value = song.releaseYear
                songForm.style.display = 'block'
            } else {
                alert(`Song ID ${songId} not found!`)
            }
        })
})

submitButton.addEventListener('click', event => {
    event.preventDefault()
    const songId = document.querySelector('#songId').value
    const title = titleInput.value
    const artist = artistInput.value
    const releaseYear = +yearInput.value
    const data = { id: +songId, title, artist, releaseYear }
    fetch(`http://localhost:8000/songs/${songId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (response.ok) {
                alert(`Song ID ${songId} updated successfully!`)
            } else {
                alert(`Error updating song ID ${songId}.`)
            }
        })
})