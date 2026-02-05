// 等待页面DOM加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 核心配置
    const totalPages = 10; // 总页数
    const showCount = 3; // 固定显示3个页码
    let currentPage = 1; // 默认当前页为第1页

    // 获取元素
    const pageItems = document.querySelectorAll('.page-item');

    // 初始化分页显示
    initPagination();

    // 为所有页码添加点击事件
    pageItems.forEach(item => {
        const link = item.querySelector('.page-link');
        link.addEventListener('click', function(e) {
            e.preventDefault(); // 阻止默认跳转
            
            // 获取点击的页码
            currentPage = parseInt(item.getAttribute('data-page'));
            
            // 更新分页显示（只显示3个连续页码）
            updatePagination();
            
            // 高亮当前页
            highlightCurrentPage();
        });
    });

    // 初始化：默认显示1、2、3页
    function initPagination() {
        pageItems.forEach(item => {
            const pageNum = parseInt(item.getAttribute('data-page'));
            // 只显示前3页
            if (pageNum <= showCount) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });
        // 高亮第1页
        highlightCurrentPage();
    }

    // 更新分页显示：始终显示当前页为中心的3个连续页码
    function updatePagination() {
        // 计算显示的页码范围
        let startPage, endPage;
        
        // 边界处理：如果当前页靠近开头（≤2），显示1-3
        if (currentPage <= 2) {
            startPage = 1;
            endPage = showCount;
        } 
        // 边界处理：如果当前页靠近末尾（≥9），显示8-10
        else if (currentPage >= totalPages - 1) {
            startPage = totalPages - showCount + 1;
            endPage = totalPages;
        } 
        // 中间页码：显示 当前页-1、当前页、当前页+1
        else {
            startPage = currentPage - 1;
            endPage = currentPage + 1;
        }

        // 根据范围显示/隐藏页码
        pageItems.forEach(item => {
            const pageNum = parseInt(item.getAttribute('data-page'));
            if (pageNum >= startPage && pageNum <= endPage) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });
    }

    // 高亮当前页
    function highlightCurrentPage() {
        pageItems.forEach(item => {
            const link = item.querySelector('.page-link');
            const pageNum = parseInt(item.getAttribute('data-page'));
            if (pageNum === currentPage) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
});