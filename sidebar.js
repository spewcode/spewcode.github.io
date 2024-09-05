function setupSidebarInteractions() {
    const toggles = document.querySelectorAll('.category-toggle, .subcategory-toggle, .subsubcategory-toggle');
    console.log(`${toggles.length}개의 카테고리 토글 발견`);
    
    const subsubcategories = document.querySelectorAll('.subsubcategory');
    console.log(`총 ${subsubcategories.length}개의 서브서브 카테고리 발견`);
    
    toggles.forEach((toggle, index) => {
        console.log(`토글 ${index + 1}에 이벤트 리스너 추가`);
        toggle.addEventListener('click', function() {
            console.log(`토글 ${index + 1} 클릭됨`);
            this.textContent = this.textContent === '▶' ? '▼' : '▶';
            const category = this.closest('.category, .subcategory, .subsubcategory');
            console.log(`카테고리 찾음: ${category ? 'Yes' : 'No'}`);
            const subcategories = category.querySelectorAll(':scope > .subcategory, :scope > .subsubcategory');
            console.log(`${subcategories.length}개의 (서브)카테고리 발견`);
            
            const subsubcategoriesInThis = category.querySelectorAll('.subsubcategory');
            console.log(`이 카테고리 내 ${subsubcategoriesInThis.length}개의 서브서브 카테고리 발견`);
            
            subcategories.forEach(sub => {
                sub.classList.toggle('hidden');
                console.log('(서브)카테고리 가시성 토글됨');
            });
        });
    });
}
