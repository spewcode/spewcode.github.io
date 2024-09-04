document.addEventListener("DOMContentLoaded", function() {
    fetch('https://username.github.io/sidebar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('sidebar').innerHTML = data;

            // 카테고리 토글 기능 추가
            document.querySelectorAll('.category-toggle').forEach(function(toggle) {
                toggle.addEventListener('click', function() {
                    const subcategory = this.nextElementSibling;
                    if (subcategory.classList.contains('hidden')) {
                        subcategory.classList.remove('hidden');
                    } else {
                        subcategory.classList.add('hidden');
                    }
                });
            });
        });
});
