// 사이드바 HTML 파일의 경로를 계산하는 함수
function getSidebarPath() {
    // 방법 1: 절대 경로 사용 (GitHub Pages 구조에 맞게 조정 필요)
    return 'https://spewcode.github.io/sidebar.html';

    // 방법 2: 동적 경로 계산
    //const currentPath = window.location.pathname;
    //const pathParts = currentPath.split('/');
    //pathParts.pop(); // 현재 HTML 파일명 제거
    //return pathParts.join('/') + '/sidebar.html';
}

function loadSidebar() {
    fetch(getSidebarPath())
        .then(response => response.text())
        .then(data => {
            document.getElementById('sidebar').innerHTML = data;
            // 사이드바 로드 후 토글 이벤트 리스너 추가
            document.querySelectorAll('.category-toggle').forEach(toggle => {
                toggle.addEventListener('click', function() {
                    this.textContent = this.textContent === '▶' ? '▼' : '▶';
                    this.nextElementSibling.nextElementSibling.classList.toggle('hidden');
                });
            });
        })
        .catch(error => console.error('Error loading sidebar:', error));
}

// 페이지 로드 시 사이드바 로드
document.addEventListener('DOMContentLoaded', loadSidebar);
