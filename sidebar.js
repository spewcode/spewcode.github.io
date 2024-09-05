function setupSidebarInteractions() {
    const toggles = document.querySelectorAll('.category-toggle, .subcategory-toggle, .subsubcategory-toggle');
    console.log(`${toggles.length}개의 카테고리 토글 발견`);
    
    toggles.forEach((toggle, index) => {
        console.log(`토글 ${index + 1}에 이벤트 리스너 추가`);
        toggle.addEventListener('click', function(event) {
            event.preventDefault();
            console.log(`토글 ${index + 1} 클릭됨`);
            this.textContent = this.textContent === '▶' ? '▼' : '▶';
            
            let subcategory = this.parentElement.querySelector(':scope > .subcategory, :scope > .subsubcategory');
            if (!subcategory) {
                subcategory = this.parentElement.nextElementSibling;
            }
            
            if (subcategory && (subcategory.classList.contains('subcategory') || subcategory.classList.contains('subsubcategory'))) {
                subcategory.classList.toggle('hidden');
                console.log(`${subcategory.classList.contains('subcategory') ? '서브' : '서브서브'}카테고리 가시성 토글됨`);
            } else {
                console.log('토글할 (서브)카테고리를 찾을 수 없음');
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', loadSidebar);
