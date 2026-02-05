// 轮播淡入淡出效果核心JS
document.addEventListener('DOMContentLoaded', function() {
    // 获取元素
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    let currentSlide = 0;
    const slideCount = slides.length;
    let autoPlayInterval;

    // 1. 切换幻灯片函数（淡入淡出核心）
    function showSlide(index) {
        // 边界处理
        if (index < 0) currentSlide = slideCount - 1;
        else if (index >= slideCount) currentSlide = 0;
        else currentSlide = index;

        // 隐藏所有幻灯片，移除指示器激活状态
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));

        // 显示当前幻灯片，激活对应指示器
        slides[currentSlide].classList.add('active');
        indicators[currentSlide].classList.add('active');
    }

    // 2. 下一张/上一张
    function nextSlide() {
        showSlide(currentSlide + 1);
    }
    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    // 3. 绑定按钮事件
    nextBtn.addEventListener('click', function() {
        clearInterval(autoPlayInterval); // 点击后重置自动播放
        nextSlide();
        startAutoPlay();
    });
    prevBtn.addEventListener('click', function() {
        clearInterval(autoPlayInterval);
        prevSlide();
        startAutoPlay();
    });

    // 4. 绑定指示器点击事件
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function() {
            clearInterval(autoPlayInterval);
            showSlide(index);
            startAutoPlay();
        });
    });

    // 5. 自动播放
    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, 5000); // 5秒切换一次
    }

    // 初始化：显示第一张，启动自动播放
    showSlide(0);
    startAutoPlay();
});