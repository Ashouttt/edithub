// Funkcja do ładowania zapisanych filmików
function loadVideos() {
    const videos = JSON.parse(localStorage.getItem("editVideos")) || [];
    const container = document.getElementById("videosContainer");
    container.innerHTML = "";

    if (videos.length === 0) {
        container.innerHTML = '<p class="no-videos">Brak editów. Dodaj pierwszy! 🎥</p>';
        return;
    }

    videos.forEach(src => {
        const card = document.createElement("div");
        card.className = "video-card";

        const video = document.createElement("video");
        video.src = src;
        video.muted = true;
        video.playsInline = true;

        // Auto-odtwarzanie przy przewijaniu
        video.addEventListener("intersection", () => {
            video.play().catch(() => {});
        });

        card.appendChild(video);
        container.appendChild(card);

        // Obserwator widoczności
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.dispatchEvent(new CustomEvent("intersection"));
                }
            });
        }, { threshold: 0.7 });

        observer.observe(video);
    });
}

// Funkcja do uploadu
function uploadVideo() {
    const input = document.getElementById("videoUpload");
    const file = input.files[0];

    if (!file) {
        alert("Wybierz plik wideo!");
        return;
    }

    const url = URL.createObjectURL(file);
    const videos = JSON.parse(localStorage.getItem("editVideos")) || [];

    // Dodaj nowy filmik na początek
    videos.unshift(url);
    localStorage.setItem("editVideos", JSON.stringify(videos));

    // Załaduj ponownie listę
    loadVideos();

    // Wyczyść input
    input.value = "";
}

// Załaduj przy starcie
window.onload = loadVideos;
