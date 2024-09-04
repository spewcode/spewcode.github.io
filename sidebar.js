//
function loadSidebar() {
    fetch('sidebar.html')
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
        });
}

// 페이지 로드 시 사이드바 로드
document.addEventListener('DOMContentLoaded', loadSidebar);
