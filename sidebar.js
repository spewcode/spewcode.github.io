function setupSidebarInteractions() {
    const toggles = document.querySelectorAll('.category-toggle, .subcategory-toggle, .subsubcategory-toggle');
    console.log(`${toggles.length}개의 카테고리 토글 발견`);
    
    const subsubcategories = document.querySelectorAll('.subsubcategory');
    console.log(`총 ${subsubcategories.length}개의 서브서브 카테고리 발견`);
    
    toggles.forEach((toggle, index) => {
        console.log(`토글 ${index + 1}에 이벤트 리스너 추가`);
        toggle.addEventListener('click', function(event) {
            event.stopPropagation(); // 이벤트 버블링 방지
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
}

document.addEventListener('DOMContentLoaded', setupSidebarInteractions);
