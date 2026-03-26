// ★ Checker Background Decorations - Cherry & Heart ★
(function() {
    function init() {
        const container = document.createElement('div');
        container.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:0;overflow:hidden;';

        const decos = [
            // 1열 (좌측)
            { emoji: '🍒', top: '2%', left: '1%', size: '2rem', rotate: '-10deg' },
            { emoji: '🖤', top: '10%', left: '5%', size: '1.6rem', rotate: '3deg', text: 'Rich' },
            { emoji: '🍒', top: '20%', left: '3%', size: '1.4rem', rotate: '12deg' },
            { emoji: '🖤', top: '32%', left: '6%', size: '1.5rem', rotate: '-2deg', text: 'YARE' },
            { emoji: '🍒', top: '42%', left: '1%', size: '1.7rem', rotate: '-8deg' },
            { emoji: '🖤', top: '55%', left: '4%', size: '1.8rem', rotate: '5deg', text: 'Lucky' },
            { emoji: '🍒', top: '65%', left: '2%', size: '1.3rem', rotate: '15deg' },
            { emoji: '🖤', top: '78%', left: '5%', size: '1.5rem', rotate: '-4deg', text: 'Cute' },
            { emoji: '🍒', top: '88%', left: '1%', size: '1.6rem', rotate: '8deg' },
            { emoji: '🖤', top: '95%', left: '6%', size: '1.4rem', rotate: '0deg', text: 'Love' },

            // 2열 (좌중)
            { emoji: '🍒', top: '6%', left: '15%', size: '1.3rem', rotate: '5deg' },
            { emoji: '🖤', top: '18%', left: '12%', size: '1.4rem', rotate: '-6deg', text: 'Happy' },
            { emoji: '🍒', top: '38%', left: '14%', size: '1.5rem', rotate: '10deg' },
            { emoji: '🍒', top: '58%', left: '13%', size: '1.2rem', rotate: '-15deg' },
            { emoji: '🖤', top: '72%', left: '11%', size: '1.6rem', rotate: '2deg', text: 'Sweet' },
            { emoji: '🍒', top: '90%', left: '15%', size: '1.4rem', rotate: '-7deg' },

            // 중앙 상단/하단 (콘텐츠 위아래)
            { emoji: '🍒', top: '1%', left: '35%', size: '1.5rem', rotate: '7deg' },
            { emoji: '🖤', top: '4%', left: '55%', size: '1.4rem', rotate: '0deg', text: 'Nice Day' },
            { emoji: '🍒', top: '2%', left: '75%', size: '1.3rem', rotate: '-9deg' },
            { emoji: '🍒', top: '96%', left: '40%', size: '1.5rem', rotate: '11deg' },
            { emoji: '🖤', top: '97%', left: '65%', size: '1.3rem', rotate: '0deg', text: 'Dreamy' },

            // 우중
            { emoji: '🍒', top: '7%', left: '88%', size: '1.6rem', rotate: '-5deg' },
            { emoji: '🖤', top: '16%', left: '90%', size: '1.5rem', rotate: '4deg', text: 'Girl' },
            { emoji: '🍒', top: '26%', left: '87%', size: '1.3rem', rotate: '13deg' },
            { emoji: '🖤', top: '38%', left: '92%', size: '1.4rem', rotate: '-3deg', text: 'Glam' },
            { emoji: '🍒', top: '50%', left: '88%', size: '1.7rem', rotate: '6deg' },
            { emoji: '🖤', top: '62%', left: '91%', size: '1.5rem', rotate: '0deg', text: 'Fancy' },
            { emoji: '🍒', top: '73%', left: '86%', size: '1.4rem', rotate: '-10deg' },
            { emoji: '🖤', top: '83%', left: '90%', size: '1.6rem', rotate: '2deg', text: 'Bling' },
            { emoji: '🍒', top: '93%', left: '89%', size: '1.3rem', rotate: '9deg' },

            // 우측
            { emoji: '🍒', top: '12%', left: '96%', size: '1.5rem', rotate: '8deg' },
            { emoji: '🖤', top: '28%', left: '95%', size: '1.4rem', rotate: '0deg', text: 'Queen' },
            { emoji: '🍒', top: '45%', left: '97%', size: '1.6rem', rotate: '-12deg' },
            { emoji: '🖤', top: '60%', left: '96%', size: '1.3rem', rotate: '5deg', text: 'Star' },
            { emoji: '🍒', top: '75%', left: '95%', size: '1.5rem', rotate: '-3deg' },
            { emoji: '🖤', top: '90%', left: '97%', size: '1.4rem', rotate: '0deg', text: 'Shine' },

            // 추가 중간 흩뿌리기
            { emoji: '🍒', top: '15%', left: '45%', size: '1.2rem', rotate: '20deg' },
            { emoji: '🍒', top: '48%', left: '50%', size: '1.1rem', rotate: '-18deg' },
            { emoji: '🖤', top: '25%', left: '65%', size: '1.3rem', rotate: '0deg', text: 'Pretty' },
            { emoji: '🍒', top: '68%', left: '35%', size: '1.4rem', rotate: '14deg' },
            { emoji: '🖤', top: '82%', left: '55%', size: '1.2rem', rotate: '0deg', text: 'Lovely' },
            { emoji: '🍒', top: '52%', left: '25%', size: '1.3rem', rotate: '-6deg' },
            { emoji: '🖤', top: '44%', left: '72%', size: '1.5rem', rotate: '0deg', text: 'Charm' },
            { emoji: '🍒', top: '80%', left: '70%', size: '1.2rem', rotate: '16deg' },
        ];

        decos.forEach(d => {
            const el = document.createElement('div');
            el.style.cssText = `position:absolute;top:${d.top};left:${d.left};font-size:${d.size};transform:rotate(${d.rotate});opacity:0.2;user-select:none;`;

            if (d.text) {
                el.innerHTML = `<span style="position:relative;display:inline-block;">
                    <span style="font-size:${d.size};">${d.emoji}</span>
                    <span style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);color:#FFF5EE;font-size:0.4em;font-weight:900;font-style:italic;white-space:nowrap;">${d.text}</span>
                </span>`;
            } else {
                el.textContent = d.emoji;
            }

            container.appendChild(el);
        });

        document.body.insertBefore(container, document.body.firstChild);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
