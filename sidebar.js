function setupSidebarInteractions() {
    console.log('setupSidebarInteractions 함수 시작');
    try {
        const sidebar = document.getElementById('sidebar');
        if (!sidebar) {
            throw new Error('사이드바 요소를 찾을 수 없습니다.');
        }
        
        const toggles = sidebar.querySelectorAll('.category-toggle, .subcategory-toggle, .subsubcategory-toggle');
        console.log(`${toggles.length}개의 카테고리 토글 발견`);
        
        const subsubcategories = sidebar.querySelectorAll('.subsubcategory');
        console.log(`총 ${subsubcategories.length}개의 서브서브 카테고리 발견`);
        
        toggles.forEach((toggle, index) => {
            console.log(`토글 ${index + 1}에 이벤트 리스너 추가`);
            toggle.addEventListener('click', function(event) {
                event.stopPropagation();
                console.log(`토글 ${index + 1} 클릭됨`);
                this.textContent = this.textContent === '▶' ? '▼' : '▶';
                
                let nextElement = this.nextElementSibling;
                while (nextElement && !nextElement.classList.contains('subcategory') && !nextElement.classList.contains('subsubcategory')) {
                    nextElement = nextElement.nextElementSibling;
                }
                
                if (nextElement && (nextElement.classList.contains('subcategory') || nextElement.classList.contains('subsubcategory'))) {
                    nextElement.classList.toggle('hidden');
                    console.log(`${nextElement.classList.contains('subcategory') ? '서브' : '서브서브'}카테고리 토글됨`);
                }
            });
        });
    } catch (error) {
        console.error('사이드바 설정 중 오류 발생:', error);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded 이벤트 발생');
    setupSidebarInteractions();
});

window.addEventListener('load', function() {
    console.log('window load 이벤트 발생');
    if (!document.querySelector('.category-toggle')) {
        console.error('카테고리 토글 요소를 찾을 수 없습니다. HTML이 제대로 로드되었는지 확인하세요.');
    }
});
