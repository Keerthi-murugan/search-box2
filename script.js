const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const popup = document.getElementById("popup");
const closeBtn = document.getElementById("closeBtn");
const resultDiv = document.getElementById("result");

searchBtn.addEventListener("click", async () => {
    const query = searchInput.value.trim();
    if (!query) return alert("Please enter a search term");

    const url = `https://www.wikidata.org/w/api.php?action=wbsearchentities&search=${encodeURIComponent(query)}&language=en&format=json&origin=*`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.search && data.search.length > 0) {
            let html = `<h2>Results for "${query}"</h2>`;
            data.search.forEach(item => {
                html += `<p><strong>${item.label}</strong>: ${item.description || 'No description available'}<br> ID: ${item.id}</p>`;
            });
            resultDiv.innerHTML = html;
        } else {
            resultDiv.innerHTML = `<p>No results found for "${query}".</p>`;
        }

        popup.style.display = "block";

    } catch (error) {
        resultDiv.innerHTML = `<p>Error fetching data: ${error}</p>`;
        popup.style.display = "block";
    }
});

// Close popup and refresh page
closeBtn.addEventListener("click", () => {
    location.reload();
});

// Optional: close popup when clicking outside content
window.addEventListener("click", (e) => {
    if (e.target === popup) location.reload();
});
