function uploadVideo() {
    const input = document.getElementById('videoUpload');
    const file = input.files[0];
    
    if (file) {
        const videoURL = URL.createObjectURL(file);
        displayVideo(videoURL);
    }
}

function displayVideo(url) {
    const container = document.getElementById('videosContainer');
    const videoElement = document.createElement('video');
    videoElement.src = url;
    videoElement.controls = true;
    container.appendChild(videoElement);
}
