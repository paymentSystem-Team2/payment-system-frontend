// ★ YARE YARE Sparkle Particle Effect ★
(function() {
    const MAX_PARTICLES = 50;
    let canvas, ctx, particles = [];

    function init() {
        canvas = document.createElement('canvas');
        canvas.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:99999;';
        document.body.appendChild(canvas);
        resize();
        window.addEventListener('resize', resize);

        for (let i = 0; i < MAX_PARTICLES; i++) {
            particles.push(createParticle(true));
        }
        requestAnimationFrame(animate);
    }

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function pickColor() {
        const roll = Math.random();
        if (roll < 0.4) return { r: 255, g: 20, b: 147 };       // 핑크
        if (roll < 0.7) return { r: 80, g: 80, b: 80 };          // 짙은 회색
        return { r: 255, g: 255, b: 255 };                        // 화이트
    }

    function createParticle(randomY) {
        const types = ['dot', 'star', 'bokeh'];
        const type = types[Math.floor(Math.random() * types.length)];
        return {
            x: Math.random() * (canvas ? canvas.width : window.innerWidth),
            y: randomY ? Math.random() * (canvas ? canvas.height : window.innerHeight) : (canvas ? canvas.height : window.innerHeight) + 20,
            size: type === 'bokeh' ? 12 + Math.random() * 30 : 2 + Math.random() * 5,
            type: type,
            speedY: -(0.4 + Math.random() * 1.0),
            speedX: (Math.random() - 0.5) * 0.4,
            opacity: randomY ? Math.random() * 0.6 : 0,
            maxOpacity: type === 'bokeh' ? 0.08 + Math.random() * 0.12 : 0.5 + Math.random() * 0.5,
            fadeIn: !randomY,
            fadeSpeed: 0.004 + Math.random() * 0.01,
            twinkleSpeed: 0.03 + Math.random() * 0.05,
            twinklePhase: Math.random() * Math.PI * 2,
            rotation: Math.random() * Math.PI * 2,
            rotSpeed: (Math.random() - 0.5) * 0.03,
            life: randomY ? Math.floor(Math.random() * 300) : 0,
            maxLife: 500 + Math.random() * 600,
            color: pickColor()
        };
    }

    function drawStar(x, y, size, rotation) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rotation);
        const inner = size * 0.3;
        ctx.beginPath();
        for (let i = 0; i < 8; i++) {
            const r = i % 2 === 0 ? size : inner;
            const angle = (i * Math.PI) / 4;
            if (i === 0) ctx.moveTo(Math.cos(angle) * r, Math.sin(angle) * r);
            else ctx.lineTo(Math.cos(angle) * r, Math.sin(angle) * r);
        }
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }

    function animate() {
        if (!canvas || !ctx) {
            ctx = canvas.getContext('2d');
            if (!ctx) return;
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            p.life++;
            p.x += p.speedX;
            p.y += p.speedY;
            p.rotation += p.rotSpeed;
            p.twinklePhase += p.twinkleSpeed;

            if (p.fadeIn) {
                p.opacity += p.fadeSpeed * 2;
                if (p.opacity >= p.maxOpacity) {
                    p.opacity = p.maxOpacity;
                    p.fadeIn = false;
                }
            }
            if (p.life > p.maxLife * 0.7) {
                p.opacity -= p.fadeSpeed;
            }

            const twinkle = 0.5 + 0.5 * Math.sin(p.twinklePhase);
            const alpha = Math.max(0, p.opacity * twinkle);

            if (alpha <= 0.01 || p.life > p.maxLife || p.y < -50) {
                particles[i] = createParticle(false);
                continue;
            }

            const { r, g, b } = p.color;

            if (p.type === 'bokeh') {
                const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
                grad.addColorStop(0, `rgba(${r},${g},${b},${alpha * 0.6})`);
                grad.addColorStop(0.5, `rgba(${r},${g},${b},${alpha * 0.2})`);
                grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
                ctx.fillStyle = grad;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            } else if (p.type === 'star') {
                ctx.shadowColor = `rgba(${r},${g},${b},${alpha})`;
                ctx.shadowBlur = p.size * 4;
                ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
                drawStar(p.x, p.y, p.size, p.rotation);
                ctx.shadowBlur = 0;
            } else {
                const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
                grad.addColorStop(0, `rgba(${r},${g},${b},${alpha})`);
                grad.addColorStop(0.3, `rgba(${r},${g},${b},${alpha * 0.5})`);
                grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
                ctx.fillStyle = grad;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // 마우스 트레일 꽃가루
        for (let i = trail.length - 1; i >= 0; i--) {
            const t = trail[i];
            t.life++;
            t.x += t.vx;
            t.y += t.vy;
            t.vy += 0.03; // 중력
            t.rotation += t.rotSpeed;
            t.size *= 0.995;

            const progress = t.life / t.maxLife;
            const alpha = progress < 0.2 ? progress * 5 : Math.max(0, 1 - (progress - 0.2) / 0.8);

            if (alpha <= 0 || t.life > t.maxLife || t.size < 0.3) {
                trail.splice(i, 1);
                continue;
            }

            const { r, g, b } = t.color;
            ctx.save();
            ctx.translate(t.x, t.y);
            ctx.rotate(t.rotation);
            ctx.globalAlpha = alpha * 0.8;

            if (t.shape === 'petal') {
                // 꽃잎 모양
                ctx.fillStyle = `rgb(${r},${g},${b})`;
                ctx.beginPath();
                ctx.ellipse(0, 0, t.size, t.size * 0.5, 0, 0, Math.PI * 2);
                ctx.fill();
                // 빛남
                ctx.shadowColor = `rgba(${r},${g},${b},0.5)`;
                ctx.shadowBlur = t.size * 2;
                ctx.fill();
                ctx.shadowBlur = 0;
            } else if (t.shape === 'sparkle') {
                ctx.fillStyle = `rgb(${r},${g},${b})`;
                drawStar(0, 0, t.size, 0);
                ctx.shadowColor = `rgba(${r},${g},${b},0.6)`;
                ctx.shadowBlur = t.size * 3;
                ctx.fill();
                ctx.shadowBlur = 0;
            } else {
                // 작은 원
                const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, t.size);
                grad.addColorStop(0, `rgba(${r},${g},${b},1)`);
                grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
                ctx.fillStyle = grad;
                ctx.beginPath();
                ctx.arc(0, 0, t.size, 0, Math.PI * 2);
                ctx.fill();
            }

            ctx.globalAlpha = 1;
            ctx.restore();
        }

        requestAnimationFrame(animate);
    }

    // 마우스 트레일 시스템
    let trail = [];
    let mouseX = 0, mouseY = 0;
    let lastSpawn = 0;

    function trailColor() {
        const roll = Math.random();
        if (roll < 0.3) return { r: 255, g: 182, b: 193 };   // 연핑크
        if (roll < 0.5) return { r: 255, g: 20, b: 147 };     // 핫핑크
        if (roll < 0.7) return { r: 255, g: 255, b: 255 };     // 화이트
        if (roll < 0.85) return { r: 255, g: 215, b: 0 };      // 골드
        return { r: 200, g: 200, b: 200 };                      // 실버
    }

    function spawnTrail(x, y) {
        const shapes = ['petal', 'petal', 'sparkle', 'dot'];
        for (let i = 0; i < 3; i++) {
            trail.push({
                x: x + (Math.random() - 0.5) * 10,
                y: y + (Math.random() - 0.5) * 10,
                vx: (Math.random() - 0.5) * 2.5,
                vy: (Math.random() - 0.5) * 2.5 - 1,
                size: 2 + Math.random() * 5,
                rotation: Math.random() * Math.PI * 2,
                rotSpeed: (Math.random() - 0.5) * 0.15,
                life: 0,
                maxLife: 40 + Math.random() * 40,
                color: trailColor(),
                shape: shapes[Math.floor(Math.random() * shapes.length)]
            });
        }
        // 최대 개수 제한
        if (trail.length > 150) trail.splice(0, trail.length - 150);
    }

    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        const now = Date.now();
        if (now - lastSpawn > 30) {
            spawnTrail(mouseX, mouseY);
            lastSpawn = now;
        }
    });

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
