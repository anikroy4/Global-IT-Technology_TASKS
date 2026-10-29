
    const API_URL = "https://jsonplaceholder.typicode.com/users";
    const statusMessageEl = document.getElementById("statusMessage");
    const userListEl = document.getElementById("userList");

    async function fetchUsers() {
      // 1. Show loading state
      statusMessageEl.textContent = "Loading users...";
      statusMessageEl.className = "status-message loading";
      userListEl.innerHTML = "";

      try {
        const response = await fetch(API_URL);

        // Check HTTP response status
        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        if (!Array.isArray(data) || data.length === 0) {
          statusMessageEl.textContent = "No users found.";
          statusMessageEl.className = "status-message empty";
          return;
        }

        // Hide status message once data is loaded successfully

        statusMessageEl.className = "hidden";

        // 4. Render user name, email, and company name
        const userCardsHtml = data
          .map((user) => `
            <li class="user-card">
              <h2 class="user-name">${escapeHtml(user.name ?? "N/A")}</h2>
              <p class="user-info"><strong>Email:</strong> ${escapeHtml(user.email ?? "N/A")}</p>
              <p class="user-info"><strong>Company:</strong> ${escapeHtml(user.company?.name ?? "N/A")}</p>
            </li>
          `)
          .join("");

        userListEl.innerHTML = userCardsHtml;
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        statusMessageEl.textContent = `Failed to load users: ${errorMessage}`;
        statusMessageEl.className = "status-message error";
      }
    }

    function escapeHtml(str) {
      return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
    }

    fetchUsers();
