function getSidebarPath() {
    return 'https://spewcode.github.io/sidebar.html';
}
//로드
function loadSidebar() {
    console.log('Attempting to load sidebar...');
    fetch(getSidebarPath())
        .then(response => response.text())
        .then(data => {
            console.log('Sidebar HTML loaded successfully');
            document.getElementById('sidebar').innerHTML = data;
            console.log('Sidebar HTML inserted into DOM');
            
            const toggles = document.querySelectorAll('.category-toggle');
            console.log(`Found ${toggles.length} category toggles`);
            
            toggles.forEach((toggle, index) => {
                console.log(`Adding event listener to toggle ${index + 1}`);
                toggle.addEventListener('click', function() {
                    console.log(`Toggle ${index + 1} clicked`);
                    this.textContent = this.textContent === '▶' ? '▼' : '▶';
                    
                    const category = this.closest('.category');
                    console.log(`Category found: ${category ? 'Yes' : 'No'}`);
                    
                    const subcategories = category.querySelectorAll('.subcategory');
                    console.log(`Found ${subcategories.length} subcategories`);
                    
                    subcategories.forEach(sub => {
                        sub.classList.toggle('hidden');
                        console.log(`Toggled subcategory visibility`);
                    });
                });
            });
        })
        .catch(error => console.error('Error loading sidebar:', error));
}

document.addEventListener('DOMContentLoaded', loadSidebar);
