// ★ Draggable Sticker System ★
(function() {
    const STICKER_FILES = [
        'sticker_1.png','sticker_2.png','sticker_3.png','sticker_4.png',
        'sticker_5.png','sticker_6.png','sticker_7.png',
        'sticker_9.png','sticker_10.png','sticker_11.png','sticker_12.png',
        'sticker_13.png','sticker_15.png','sticker_16.png',
        'sticker_17.png','sticker_18.png','sticker_19.png',
        'sticker_21.png','sticker_23.png',
        'sticker_26.png','sticker_27.png','sticker_28.png',
        'sticker_29.png','sticker_30.png','sticker_31.png'
    ];
    const STICKER_COUNT = 30;      // 화면에 배치할 스티커 수
    const MIN_SIZE = 80;
    const MAX_SIZE = 170;
    const SIDE_ZONE = 15;           // 좌우 %영역 (0~12%, 88~100%)

    function init() {
        // 모바일이면 스킵
        if (window.innerWidth < 900) return;

        const container = document.createElement('div');
        container.id = 'sticker-container';
        container.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:50;overflow:hidden;';
        document.body.appendChild(container);

        for (let i = 0; i < STICKER_COUNT; i++) {
            const file = STICKER_FILES[Math.floor(Math.random() * STICKER_FILES.length)];
            const size = MIN_SIZE + Math.random() * (MAX_SIZE - MIN_SIZE);
            const rotation = (Math.random() - 0.5) * 60; // -30 ~ +30도
            const isLeft = Math.random() < 0.5;
            const x = isLeft
                ? Math.random() * SIDE_ZONE
                : (100 - SIDE_ZONE-5) + Math.random() * SIDE_ZONE;
            const y = 5 + Math.random() * 85; // 5~90%

            const el = document.createElement('img');
            el.src = '/images/' + file;
            el.draggable = false;
            el.style.cssText = [
                'position:absolute',
                'width:' + size + 'px',
                'height:auto',
                'left:' + x + '%',
                'top:' + y + '%',
                'transform:rotate(' + rotation + 'deg)',
                'opacity:1',
                'pointer-events:auto',
                'cursor:grab',
                'user-select:none',
                'filter:drop-shadow(2px 2px 4px rgba(0,0,0,0.2))',
                'transition:filter 0.2s',
            ].join(';') + ';';

            // 드래그 시스템
            let isDragging = false;
            let startX, startY, origLeft, origTop;

            el.addEventListener('mousedown', function(e) {
                e.preventDefault();
                isDragging = true;
                startX = e.clientX;
                startY = e.clientY;
                origLeft = el.offsetLeft;
                origTop = el.offsetTop;
                el.style.cursor = 'grabbing';
                el.style.filter = 'drop-shadow(4px 4px 8px rgba(0,0,0,0.35))';
                el.style.zIndex = '999';
                el.style.transition = 'none';
            });

            document.addEventListener('mousemove', function(e) {
                if (!isDragging) return;
                const dx = e.clientX - startX;
                const dy = e.clientY - startY;
                el.style.left = (origLeft + dx) + 'px';
                el.style.top = (origTop + dy) + 'px';
            });

            document.addEventListener('mouseup', function() {
                if (!isDragging) return;
                isDragging = false;
                el.style.cursor = 'grab';
                el.style.filter = 'drop-shadow(2px 2px 4px rgba(0,0,0,0.2))';
                el.style.zIndex = '';
                el.style.transition = 'filter 0.2s';
            });

            // 호버 효과
            el.addEventListener('mouseenter', function() {
                if (!isDragging) {
                    el.style.filter = 'drop-shadow(3px 3px 6px rgba(0,0,0,0.3))';
                }
            });
            el.addEventListener('mouseleave', function() {
                if (!isDragging) {
                    el.style.filter = 'drop-shadow(2px 2px 4px rgba(0,0,0,0.2))';
                }
            });

            container.appendChild(el);
        }

        // 컨텐츠 영역에 소수의 작은 스티커
        const CENTER_COUNT = 30;
        for (let i = 0; i < CENTER_COUNT; i++) {
            const file = STICKER_FILES[Math.floor(Math.random() * STICKER_FILES.length)];
            const size = 40 + Math.random() * 50; // 40~90px (작게)
            const rotation = (Math.random() - 0.5) * 80;
            const x = 20 + Math.random() * 60; // 20~80% (중앙 영역)
            const y = 10 + Math.random() * 80;

            const el = document.createElement('img');
            el.src = '/images/' + file;
            el.draggable = false;
            el.style.cssText = [
                'position:absolute',
                'width:' + size + 'px',
                'height:auto',
                'left:' + x + '%',
                'top:' + y + '%',
                'transform:rotate(' + rotation + 'deg)',
                'opacity:0.45',
                'pointer-events:auto',
                'cursor:grab',
                'user-select:none',
                'filter:drop-shadow(1px 1px 2px rgba(0,0,0,0.15))',
                'transition:filter 0.2s, opacity 0.2s',
            ].join(';') + ';';

            let isDragging = false;
            let startX, startY, origLeft, origTop;

            el.addEventListener('mousedown', function(e) {
                e.preventDefault();
                isDragging = true;
                startX = e.clientX;
                startY = e.clientY;
                origLeft = el.offsetLeft;
                origTop = el.offsetTop;
                el.style.cursor = 'grabbing';
                el.style.opacity = '0.6';
                el.style.zIndex = '999';
                el.style.transition = 'none';
            });
            document.addEventListener('mousemove', function(e) {
                if (!isDragging) return;
                el.style.left = (origLeft + e.clientX - startX) + 'px';
                el.style.top = (origTop + e.clientY - startY) + 'px';
            });
            document.addEventListener('mouseup', function() {
                if (!isDragging) return;
                isDragging = false;
                el.style.cursor = 'grab';
                el.style.opacity = '0.25';
                el.style.zIndex = '';
                el.style.transition = 'filter 0.2s, opacity 0.2s';
            });
            el.addEventListener('mouseenter', function() {
                if (!isDragging) el.style.opacity = '0.45';
            });
            el.addEventListener('mouseleave', function() {
                if (!isDragging) el.style.opacity = '0.25';
            });

            container.appendChild(el);
        }

        // 리사이즈 시 모바일이면 숨김
        window.addEventListener('resize', function() {
            container.style.display = window.innerWidth < 900 ? 'none' : 'block';
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
