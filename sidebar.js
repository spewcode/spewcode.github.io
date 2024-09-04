function getSidebarPath() {
    // GitHub Pages의 구조에 맞게 경로 조정
    return '../sidebar.html';
}

function loadSidebar() {
    fetch(getSidebarPath())
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            document.getElementById('sidebar').innerHTML = data;
            // 사이드바 로드 후 토글 이벤트 리스너 추가
            addToggleListeners();
        })
        .catch(error => {
            console.error('Error loading sidebar:', error);
            document.getElementById('sidebar').innerHTML = '<p>사이드바를 불러오는 데 실패했습니다.</p>';
        });
}

function addToggleListeners() {
    document.querySelectorAll('.category-toggle, .subcategory-toggle').forEach(toggle => {
        toggle.addEventListener('click', function(event) {
            event.stopPropagation();
            this.textContent = this.textContent === '▶' ? '▼' : '▶';
            const contentToToggle = this.nextElementSibling.nextElementSibling;
            if (contentToToggle && (contentToToggle.classList.contains('subcategory') || contentToToggle.classList.contains('subsubcategory'))) {
                contentToToggle.classList.toggle('hidden');
            }
        });
    });
}

// 페이지 로드 시 사이드바 로드
document.addEventListener('DOMContentLoaded', loadSidebar);
