document.addEventListener('DOMContentLoaded', async () => {
    const birdGridContainer = document.getElementById('bird-grid-container');
    const searchInput = document.getElementById('bird-search-input');
    let allBirds = [];

    async function loadBirdsFromJSON() {
        const response = await fetch('birds_data.json');
        return await response.json();
    }

    function displayBirds(birds) {
        birdGridContainer.innerHTML = '';

        if (birds.length === 0) {
            birdGridContainer.innerHTML = '<p>Không tìm thấy loài chim nào phù hợp.</p>';
            return;
        }

        birds.forEach(bird => {
            const card = document.createElement('div');
            card.className = 'bird-card';
            card.innerHTML = `
                <div class="bird-image-container">
                    <img src="${bird.image_url || 'https://via.placeholder.com/330x220'}" alt="${bird.name}">
                </div>
                <div class="bird-info">
                    <h3>${bird.name}</h3>
                    <a href="bird_info.html?name=${encodeURIComponent(bird.name)}" class="btn-detail">Xem chi tiết</a>
                </div>
            `;
            birdGridContainer.appendChild(card);
        });
    }
    function handleSearchInput() {
        const keyword = searchInput.value.trim().toLowerCase();
        const filteredBirds = allBirds.filter(bird =>
            bird.name.toLowerCase().includes(keyword)
        );
        displayBirds(filteredBirds);
    }

    allBirds = await loadBirdsFromJSON();
    displayBirds(allBirds);

    searchInput.addEventListener('input', handleSearchInput);
});



