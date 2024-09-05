function getSidebarPath() {
    return 'https://spewcode.github.io/sidebar.html';
}
function loadSidebar() {
    console.log('사이드바 로드 시도 중...');
    fetch(getSidebarPath())
        .then(response => {
            if (!response.ok) {
                throw new Error(HTTP error! status: ${response.status});
            }
            console.log('사이드바 HTML 요청 성공');
            return response.text();
        })
        .then(data => {
            console.log('사이드바 HTML 로드 성공');
            if (data.trim().length === 0) {
                throw new Error('로드된 HTML이 비어 있습니다.');
            }
            document.getElementById('sidebar').innerHTML = data;
            console.log('사이드바 HTML DOM에 삽입됨');
            setupSidebarInteractions();
        })
        .catch(error => {
            console.error('사이드바 로드 오류:', error);
            document.getElementById('sidebar').innerHTML = <p class="error-message">사이드바를 로드할 수 없습니다: ${error.message}</p>;
        });
}
function setupSidebarInteractions() {
    const toggles = document.querySelectorAll('.category-toggle, .subcategory-toggle, .subsubcategory-toggle');
    console.log(${toggles.length}개의 카테고리 토글 발견);

    toggles.forEach((toggle, index) => {
        console.log(토글 ${index + 1}에 이벤트 리스너 추가);
        toggle.addEventListener('click', function() {
            console.log(토글 ${index + 1} 클릭됨);
            this.textContent = this.textContent === '▶' ? '▼' : '▶';
            const category = this.closest('.category, .subcategory, .subsubcategory');
            console.log(카테고리 찾음: ${category ? 'Yes' : 'No'});
            const subcategories = category.querySelectorAll(':scope > .subcategory, :scope > .subsubcategory');
            console.log(${subcategories.length}개의 (서브)카테고리 발견);
            subcategories.forEach(sub => {
                sub.classList.toggle('hidden');
                console.log('(서브)카테고리 가시성 토글됨');
            });
        });
    });
}
document.addEventListener('DOMContentLoaded', loadSidebar);
