<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>다단계 카테고리 사이드바</title>
    <style>
        #sidebar {
            width: 300px;
            background-color: #f1f1f1;
            padding: 20px;
            font-family: Arial, sans-serif;
        }
        .category, .subcategory, .subsubcategory {
            margin-left: 20px;
        }
        .category-toggle, .subcategory-toggle, .subsubcategory-toggle {
            cursor: pointer;
            user-select: none;
            padding: 5px;
            background-color: #ddd;
            display: inline-block;
            width: 20px;
            text-align: center;
            margin-right: 5px;
        }
        .category > a, .subcategory > a, .subsubcategory > a {
            text-decoration: none;
            color: #333;
        }
        .subcategory, .subsubcategory {
            display: none;
        }
        .subcategory > div, .subsubcategory > div {
            margin: 5px 0;
        }
        .error-message {
            color: red;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div id="sidebar">
        <!-- 사이드바 내용은 이전과 동일 -->
    </div>

    <script>
    function setupSidebarInteractions() {
        const sidebar = document.getElementById('sidebar');
        
        sidebar.addEventListener('click', function(event) {
            const toggle = event.target.closest('.category-toggle, .subcategory-toggle, .subsubcategory-toggle');
            if (toggle) {
                const parent = toggle.closest('.category, .subcategory, .subsubcategory');
                const child = parent.querySelector('.subcategory, .subsubcategory');
                
                if (child) {
                    toggle.textContent = toggle.textContent === '▶' ? '▼' : '▶';
                    toggle.setAttribute('aria-expanded', toggle.textContent === '▼');
                    child.style.display = child.style.display === 'none' || child.style.display === '' ? 'block' : 'none';
                }

                // 상위 카테고리들을 펼침
                let currentParent = parent;
                while (currentParent) {
                    const parentToggle = currentParent.querySelector('.category-toggle, .subcategory-toggle, .subsubcategory-toggle');
                    if (parentToggle) {
                        parentToggle.textContent = '▼';
                        parentToggle.setAttribute('aria-expanded', 'true');
                    }
                    currentParent.style.display = 'block';
                    currentParent = currentParent.parentElement.closest('.category, .subcategory, .subsubcategory');
                }
            }
        });

        // 키보드 접근성
        sidebar.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                const toggle = event.target.closest('.category-toggle, .subcategory-toggle, .subsubcategory-toggle');
                if (toggle) {
                    event.preventDefault();
                    toggle.click();
                }
            }
        });

        // ARIA 속성 초기화
        sidebar.querySelectorAll('.category-toggle, .subcategory-toggle, .subsubcategory-toggle').forEach((toggle) => {
            toggle.setAttribute('aria-expanded', 'false');
        });
    }

    // 카테고리 상태 저장
    function saveCategoryState() {
        const categories = document.querySelectorAll('.category, .subcategory, .subsubcategory');
        const state = {};
        categories.forEach((category, index) => {
            const toggle = category.querySelector('.category-toggle, .subcategory-toggle, .subsubcategory-toggle');
            if (toggle) {
                state[`category-${index}`] = toggle.textContent === '▼';
            }
        });
        localStorage.setItem('sidebarState', JSON.stringify(state));
    }

    // 카테고리 상태 복원
    function restoreCategoryState() {
        const savedState = localStorage.getItem('sidebarState');
        if (savedState) {
            const state = JSON.parse(savedState);
            const categories = document.querySelectorAll('.category, .subcategory, .subsubcategory');
            categories.forEach((category, index) => {
                const toggle = category.querySelector('.category-toggle, .subcategory-toggle, .subsubcategory-toggle');
                const child = category.querySelector('.subcategory, .subsubcategory');
                if (toggle && child) {
                    const isExpanded = state[`category-${index}`];
                    toggle.textContent = isExpanded ? '▼' : '▶';
                    toggle.setAttribute('aria-expanded', isExpanded);
                    child.style.display = isExpanded ? 'block' : 'none';
                }
            });
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        setupSidebarInteractions();
        restoreCategoryState();
        
        // 페이지 언로드 시 상태 저장
        window.addEventListener('beforeunload', saveCategoryState);
    });
    </script>
</body>
</html>
