let likes = 0;
let savedVideos = [];
let following = new Set();

function showSection(id) {
    document.querySelectorAll(".feed").forEach(sec => sec.style.display = "none");
    document.getElementById(id).style.display = "flex";
}

function toggleTheme() {
    document.body.classList.toggle("light-mode");
}

function addVideo() {
    const fileInput = document.getElementById("videoFile");
    const captionInput = document.getElementById("captionInput");
    const file = fileInput.files[0];
    const caption = captionInput.value || "#cool #edit";

    if (!file) {
        alert("Please select a video!");
        return;
    }

    const videoURL = URL.createObjectURL(file);
    const container = document.getElementById("videosContainer");

    const videoCard = createVideoElement(videoURL, caption, "You");
    container.prepend(videoCard);

    fileInput.value = "";
    captionInput.value = "";
}

function submitNewVideo() {
    addVideo();
    showSection("feed");
}

function createVideoElement(src, caption, username) {
    const card = document.createElement("div");
    card.className = "video-card";

    card.innerHTML = `
        <video controls muted></video>
        <div class="mini-profile">
            <img src="https://via.placeholder.com/40/00ccff/ffffff?text=${username[0]}" alt="${username}">
            <h4>${username}</h4>
            <button onclick="toggleFollow(this, '${username}')">+ Follow</button>
        </div>
        <div class="video-caption">${caption}</div>
        <div class="video-actions">
            <button class="action-btn" onclick="toggleLike(this)">
                <i class="far fa-heart"></i> <span class="like-count">0</span>
            </button>
            <button class="action-btn" onclick="toggleComments(this)">
                <i class="far fa-comment"></i> <span>Comment</span>
            </button>
            <button class="action-btn" onclick="saveVideo(this)">
                <i class="far fa-bookmark"></i> <span>Save</span>
            </button>
            <button class="action-btn" onclick="shareVideo()">
                <i class="fas fa-share"></i> <span>Share</span>
            </button>
        </div>
        <div class="comments">
            <div class="comment">🔥 Sick edit!</div>
            <div class="add-comment">
                <input type="text" placeholder="Add comment...">
                <button onclick="postComment(event)">Post</button>
            </div>
        </div>
    `;

    card.querySelector("video").src = src;
    card.querySelector("video").addEventListener("mouseenter", () => card.querySelector("video").play());
    card.querySelector("video").addEventListener("mouseleave", () => card.querySelector("video").pause());

    return card;
}

function toggleLike(btn) {
    const icon = btn.querySelector("i");
    const count = btn.querySelector(".like-count");

    if (icon.classList.contains("fas")) {
        icon.classList.replace("fas", "far");
        count.textContent = parseInt(count.textContent) - 1;
        likes--;
    } else {
        icon.classList.replace("far", "fas");
        count.textContent = parseInt(count.textContent) + 1;
        likes++;
    }
    document.getElementById("globalLikes").textContent = likes;
}

function toggleComments(btn) {
    const comments = btn.closest(".video-card").querySelector(".comments");
    comments.style.display = comments.style.display === "block" ? "none" : "block";
}

function postComment(e) {
    e.stopPropagation();
    const input = e.target.previousElementSibling;
    if (input.value.trim()) {
        const commentDiv = document.createElement("div");
        commentDiv.className = "comment";
        commentDiv.textContent = input.value;
        e.target.parentNode.parentNode.insertBefore(commentDiv, e.target.parentNode);
        input.value = "";
    }
}

function saveVideo(btn) {
    const icon = btn.querySelector("i");
    if (icon.classList.contains("fas")) {
        icon.classList.replace("fas", "far");
        alert("Removed from saved");
    } else {
        icon.classList.replace("far", "fas");
        alert("✅ Added to Saved!");
        // Możesz dodać do listy savedVideos[]
    }
}

function shareVideo() {
    navigator.clipboard.writeText(window.location.href)
        .then(() => alert("🔗 Link copied!"))
        .catch(() => alert("❌ Failed"));
}

function toggleFollow(btn, user) {
    if (following.has(user)) {
        following.delete(user);
        btn.textContent = "+ Follow";
        alert(`Unfollowed ${user}`);
    } else {
        following.add(user);
        btn.textContent = "✓ Following";
        alert(`Now following ${user}!`);
        document.getElementById("followers").textContent = following.size;
    }
}

// Demo videos on load
window.onload = () => {
    const container = document.getElementById("videosContainer");
    const examples = [
        { cap: "#fun #epic #dance", user: "EditMaster", vid: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" },
        { cap: "#anime #shorts #viral", user: "AnimeFan", vid: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4" }
    ];

    examples.forEach(ex => {
        const card = createVideoElement(ex.vid, ex.cap, ex.user);
        container.appendChild(card);
    });
};
