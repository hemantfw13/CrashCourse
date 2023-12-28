const postCounter = document.getElementById("postCounter");
const logoutBtn = document.getElementById("logoutBtn");
const appContainer = document.getElementById("app");

// Replace with your backend API URL
const apiUrl = "http://localhost:3000";

// Check if user is authenticated
const token = localStorage.getItem("token");
if (!token) {
  window.location.href = "login.html";
}

// Fetch user posts
fetch(`${apiUrl}/posts`, {
  method: "GET",
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
})
  .then((response) => response.json())
  .then((posts) => {
    postCounter.textContent = posts.length;

    posts.forEach((post) => {
      const postElement = document.createElement("div");
      postElement.className = "post";
      postElement.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.body}</p>
        <p>Device: ${post.device}</p>
        <button class="btn" onclick="editPost('${post._id}')">Edit</button>
        <button class="btn" onclick="deletePost('${post._id}')">Delete</button>
      `;
      appContainer.appendChild(postElement);
    });
  })
  .catch((error) => console.error("Error fetching posts:", error));

// Logout
logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.href = "login.html";
});

// Function to delete a post
function deletePost(postId) {
  fetch(`${apiUrl}/posts/delete/${postId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((deletedPost) => {
      postCounter.textContent = parseInt(postCounter.textContent) - 1;
      document.getElementById(postId).remove();
    })
    .catch((error) => console.error("Error deleting post:", error));
}

// Function to edit a post
function editPost(postId) {
  const newTitle = prompt("Enter new title:");
  const newBody = prompt("Enter new body:");
  const newDevice = prompt("Enter new device:");

  fetch(`${apiUrl}/posts/update/${postId}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title: newTitle, body: newBody, device: newDevice }),
  })
    .then((response) => response.json())
    .then((updatedPost) => {
      const postElement = document.getElementById(postId);
      postElement.innerHTML = `
        <h3>${updatedPost.title}</h3>
        <p>${updatedPost.body}</p>
        <p>Device: ${updatedPost.device}</p>
        <button class="btn" onclick="editPost('${updatedPost._id}')">Edit</button>
        <button class="btn" onclick="deletePost('${updatedPost._id}')">Delete</button>
      `;
    })
    .catch((error) => console.error("Error updating post:", error));
}
