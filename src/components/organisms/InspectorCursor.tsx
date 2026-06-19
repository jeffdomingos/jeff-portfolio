"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export function InspectorCursor() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const pathname = usePathname();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let mouseX = -1000;
        let mouseY = -1000;
        let animationFrameId: number;
        
        let inspectableElements: Element[] = [];

        // Atualiza a lista de elementos inspecionáveis
        const updateElements = () => {
            inspectableElements = Array.from(document.querySelectorAll('.inspectable'));
        };

        let isMouseInWindow = true;

        const onMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            isMouseInWindow = true;
        };

        const onMouseLeave = () => {
            isMouseInWindow = false;
        };

        const onMouseEnter = () => {
            isMouseInWindow = true;
        };

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            updateElements();
        };

        window.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseleave", onMouseLeave);
        document.addEventListener("mouseenter", onMouseEnter);
        window.addEventListener("resize", resizeCanvas);
        window.addEventListener("scroll", updateElements, { passive: true });
        
        const observer = new MutationObserver(updateElements);
        observer.observe(document.body, { childList: true, subtree: true });

        resizeCanvas();

        let currentAlpha = 0;
        let animHitTop = 0;
        let animHitBottom = 0;
        let animHitLeft = 0;
        let animHitRight = 0;
        let initializedAnim = false;

        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const approachSection = document.getElementById("approach-section");
            let baseTop = 56; // Proteção da área do header
            let baseBottom = canvas.height;
            
            if (approachSection) {
                const approachRect = approachSection.getBoundingClientRect();
                baseTop = Math.max(56, approachRect.top);
                baseBottom = Math.min(canvas.height, approachRect.bottom);
            }

            let hitTop = baseTop;
            let hitBottom = baseBottom;
            let hitLeft = 0;
            let hitRight = canvas.width;

            let topElements: Element[] = [];
            let bottomElements: Element[] = [];
            let leftElements: Element[] = [];
            let rightElements: Element[] = [];

            let isInsideAnyBox = false;

            for (const el of inspectableElements) {
                const rect = el.getBoundingClientRect();
                if (rect.width === 0 || rect.height === 0) continue;

                if (mouseX >= rect.left && mouseX <= rect.right && mouseY >= rect.top && mouseY <= rect.bottom) {
                    isInsideAnyBox = true;
                }

                // UP
                if (rect.bottom <= mouseY && mouseX >= rect.left && mouseX <= rect.right) {
                    if (rect.bottom > hitTop) { hitTop = rect.bottom; topElements = [el]; }
                    else if (rect.bottom === hitTop) topElements.push(el);
                }
                // DOWN
                if (rect.top >= mouseY && mouseX >= rect.left && mouseX <= rect.right) {
                    if (rect.top < hitBottom) { hitBottom = rect.top; bottomElements = [el]; }
                    else if (rect.top === hitBottom) bottomElements.push(el);
                }
                // LEFT
                if (rect.right <= mouseX && mouseY >= rect.top && mouseY <= rect.bottom) {
                    if (rect.right > hitLeft) { hitLeft = rect.right; leftElements = [el]; }
                    else if (rect.right === hitLeft) leftElements.push(el);
                }
                // RIGHT
                if (rect.left >= mouseX && mouseY >= rect.top && mouseY <= rect.bottom) {
                    if (rect.left < hitRight) { hitRight = rect.left; rightElements = [el]; }
                    else if (rect.left === hitRight) rightElements.push(el);
                }
            }

            let isActive = true;

            if (!isMouseInWindow || mouseX < 0 || mouseY < 0 || mouseX > canvas.width || mouseY > canvas.height) {
                isActive = false;
            }

            if (isInsideAnyBox) {
                isActive = false;
            }

            if (!initializedAnim || !isActive) {
                animHitTop = hitTop;
                animHitBottom = hitBottom;
                animHitLeft = hitLeft;
                animHitRight = hitRight;
                if (isActive) initializedAnim = true;
            } else {
                const lerpSpeed = 0.2; 
                animHitTop += (hitTop - animHitTop) * lerpSpeed;
                animHitBottom += (hitBottom - animHitBottom) * lerpSpeed;
                animHitLeft += (hitLeft - animHitLeft) * lerpSpeed;
                animHitRight += (hitRight - animHitRight) * lerpSpeed;
            }

            if (approachSection) {
                const approachRect = approachSection.getBoundingClientRect();
                if (mouseY < approachRect.top || mouseY > approachRect.bottom) {
                    isActive = false;
                }
            } else {
                isActive = false;
            }

            const targetAlpha = isActive ? 1 : 0;
            currentAlpha += (targetAlpha - currentAlpha) * 0.08;

            if (!isActive && currentAlpha < 0.01) {
                currentAlpha = 0;
            }

            if (currentAlpha === 0) {
                // Garante que todo o DOM visual seja limpo/zerado antes de pausar a renderização visual
                for (const el of inspectableElements) {
                    (el as HTMLElement).style.backgroundColor = `rgba(255, 255, 255, 0)`;
                }
                const gridOverlay = document.getElementById("inspector-grid-overlay");
                if (gridOverlay) gridOverlay.style.display = "none";
                
                animationFrameId = requestAnimationFrame(render);
                return;
            }

            ctx.globalAlpha = currentAlpha;

            const color = "rgba(0, 0, 0, 0.3)";
            const highlightColor = "rgba(0, 0, 0, 0.8)";

            // Atualizar o background de TODOS os inspectable elements simultaneamente
            const bgAlpha = 0.6 * currentAlpha;
            for (const el of inspectableElements) {
                (el as HTMLElement).style.backgroundColor = `rgba(255, 255, 255, ${bgAlpha})`;
            }

            // Gerenciar o Grid overlay via DOM para garantir que fique por TRÁS do conteúdo das divs
            if (approachSection) {
                let gridOverlay = document.getElementById("inspector-grid-overlay");
                if (!gridOverlay) {
                    gridOverlay = document.createElement("div");
                    gridOverlay.id = "inspector-grid-overlay";
                    gridOverlay.style.position = "absolute";
                    gridOverlay.style.top = "0";
                    gridOverlay.style.bottom = "0";
                    gridOverlay.style.left = "0";
                    gridOverlay.style.right = "0";
                    gridOverlay.style.pointerEvents = "none";
                    gridOverlay.style.zIndex = "-1"; // Fica atrás do conteúdo estático
                    approachSection.appendChild(gridOverlay);
                }
                
                gridOverlay.style.display = "block";
                
                if (window.getComputedStyle(approachSection).position === "static") {
                    approachSection.style.position = "relative";
                }
                // Força um "Stacking Context" para que o z-index -1 não vaze para trás do background-color da página (body)
                approachSection.style.isolation = "isolate";

                // Garante que as colunas existem (previne quebra por causa de Hot Reload)
                if (gridOverlay.children.length !== 12) {
                    gridOverlay.innerHTML = '';
                    for (let i = 0; i < 12; i++) {
                        const colDiv = document.createElement("div");
                        colDiv.className = "inspector-grid-col";
                        colDiv.style.position = "absolute";
                        colDiv.style.bottom = "0"; // Ancorado embaixo para crescer de baixo para cima
                        colDiv.style.backgroundColor = "rgba(0,0,0,0.03)";
                        gridOverlay.appendChild(colDiv);
                    }
                }
                
                const computed = window.getComputedStyle(approachSection);
                const pl = parseFloat(computed.paddingLeft) || 0;
                const pr = parseFloat(computed.paddingRight) || 0;
                const gap = parseFloat(computed.columnGap) || 0;
                const w = approachSection.getBoundingClientRect().width;
                const availableW = w - pl - pr - (gap * 11);
                const colW = availableW / 12;

                const cols = gridOverlay.getElementsByClassName("inspector-grid-col");
                for (let i = 0; i < 12; i++) {
                    const colDiv = cols[i] as HTMLElement;
                    colDiv.style.left = `${pl + i * (colW + gap)}px`;
                    colDiv.style.width = `${colW}px`;
                    
                    // Crescimento da Esquerda para Direita (intervalos maiores)
                    const staggerOffset = i * 0.055; 
                    let localProgress = (currentAlpha - staggerOffset) * 2.2; 
                    localProgress = Math.max(0, Math.min(1, localProgress));
                    
                    // Ease-out Quart para um movimento de preenchimento desacelerado e orgânico no final
                    const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);
                    const colHeightProgress = easeOutQuart(localProgress);
                    
                    colDiv.style.height = `${colHeightProgress * 100}%`;
                    colDiv.style.opacity = "1"; // Sem fade, preenchimento sólido
                }
            }

            // Timeline de animação baseada no currentAlpha
            const lineOpacity = Math.min(1, currentAlpha * 5); // Fica opaco quase instantaneamente
            const lineProgress = Math.max(0, Math.min(1, currentAlpha * 2)); // Expande de 0.0 a 0.5
            const arrowAndLabelAlpha = Math.max(0, Math.min(1, (currentAlpha - 0.5) * 2)); // Aparece de 0.5 a 1.0

            ctx.globalAlpha = lineOpacity;

            const currentHitTop = mouseY - (mouseY - animHitTop) * lineProgress;
            const currentHitBottom = mouseY + (animHitBottom - mouseY) * lineProgress;
            const currentHitLeft = mouseX - (mouseX - animHitLeft) * lineProgress;
            const currentHitRight = mouseX + (animHitRight - mouseX) * lineProgress;

            // Desenhar raios
            ctx.beginPath();
            ctx.moveTo(mouseX, currentHitTop); ctx.lineTo(mouseX, currentHitBottom);
            ctx.moveTo(currentHitLeft, mouseY); ctx.lineTo(currentHitRight, mouseY);
            
            ctx.strokeStyle = color;
            ctx.lineWidth = 1;
            ctx.setLineDash([4, 4]);
            ctx.stroke();
            ctx.setLineDash([]);

            // Mira central
            ctx.beginPath();
            ctx.moveTo(mouseX - 4, mouseY); ctx.lineTo(mouseX + 4, mouseY);
            ctx.moveTo(mouseX, mouseY - 4); ctx.lineTo(mouseX, mouseY + 4);
            ctx.strokeStyle = highlightColor;
            ctx.lineWidth = 1;
            ctx.stroke();

            // Draw labels helper
            const drawText = (text: string, x: number, y: number) => {
                ctx.font = "12px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace";
                
                // Contorno branco para legibilidade
                ctx.lineWidth = 2;
                ctx.strokeStyle = "rgba(255, 255, 255, 0.8)";
                ctx.strokeText(text, x, y);
                
                ctx.fillStyle = "#000000";
                ctx.fillText(text, x, y);
            };

            // Desenhar elementos que só aparecem DEPOIS da expansão
            if (arrowAndLabelAlpha > 0) {
                ctx.globalAlpha = arrowAndLabelAlpha;

                // Setas nas extremidades
                const drawArrow = (x: number, y: number, dir: number) => {
                    ctx.beginPath();
                    if (dir === 0) { ctx.moveTo(x-4, y+4); ctx.lineTo(x, y); ctx.lineTo(x+4, y+4); }
                    if (dir === 1) { ctx.moveTo(x-4, y-4); ctx.lineTo(x, y); ctx.lineTo(x+4, y-4); }
                    if (dir === 2) { ctx.moveTo(x+4, y-4); ctx.lineTo(x, y); ctx.lineTo(x+4, y+4); }
                    if (dir === 3) { ctx.moveTo(x-4, y-4); ctx.lineTo(x, y); ctx.lineTo(x-4, y+4); }
                    ctx.strokeStyle = color;
                    ctx.lineWidth = 1.5;
                    ctx.stroke();
                };

                drawArrow(mouseX, currentHitTop, 0);
                drawArrow(mouseX, currentHitBottom, 1);
                drawArrow(currentHitLeft, mouseY, 2);
                drawArrow(currentHitRight, mouseY, 3);

            };



            const horizontalGap = animHitRight - animHitLeft;
            const verticalGap = animHitBottom - animHitTop;

            const labelAlpha = Math.max(0, Math.min(1, (currentAlpha - 0.5) * 2));

            if ((horizontalGap > 0 || verticalGap > 0) && labelAlpha > 0) {
                ctx.globalAlpha = labelAlpha * currentAlpha; // Oculta/Mostra suavemente as labels
                ctx.font = "12px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace";

                let hText = "";
                let htw = 0;
                let hx = 0;
                let hy = 0;
                let hBox = { left: 0, right: 0, top: 0, bottom: 0 };

                if (horizontalGap > 0) {
                    const hPercentage = (horizontalGap / canvas.width) * 100;
                    hText = `${hPercentage.toFixed(1).replace('.0', '')}vw`;
                    htw = ctx.measureText(hText).width;
                    hx = animHitLeft + horizontalGap / 2;
                    
                    // Posição Padrão: Acima da linha
                    hy = mouseY - 10;
                    
                    // Flipa para baixo se for sobrepor o elemento de cima ou sair da tela, 
                    // MAS apenas se o lado de baixo tiver MAIS espaço que o lado de cima.
                    if (hy - 10 < animHitTop || hy - 10 < 0) {
                        if (animHitBottom - mouseY > mouseY - animHitTop) {
                            hy = mouseY + 14;
                        }
                    }
                    
                    hBox = { left: hx - htw/2, right: hx + htw/2, top: hy - 10, bottom: hy + 4 };
                }

                let vText = "";
                let vtw = 0;
                let vx = 0;
                let vy = 0;
                let vBox = { left: 0, right: 0, top: 0, bottom: 0 };

                if (verticalGap > 0) {
                    const vPercentage = (verticalGap / canvas.height) * 100;
                    vText = `${vPercentage.toFixed(1).replace('.0', '')}vh`;
                    vtw = ctx.measureText(vText).width;
                    
                    // Posição Padrão: Direita da linha com um gap de 8px
                    vx = mouseX + 8 + vtw / 2;
                    
                    // Flipa para a esquerda se for sobrepor o elemento da direita ou sair da tela,
                    // MAS apenas se o lado esquerdo tiver MAIS espaço que o lado direito.
                    if (vx + vtw/2 > animHitRight || vx + vtw/2 > canvas.width) {
                        if (mouseX - animHitLeft > animHitRight - mouseX) {
                            vx = mouseX - 8 - vtw / 2;
                        }
                    }
                    
                    vy = animHitTop + verticalGap / 2;
                    vBox = { left: vx - vtw/2, right: vx + vtw/2, top: vy - 10, bottom: vy + 4 };
                }

                // Resolver colisão entre as duas labels
                if (horizontalGap > 0 && verticalGap > 0) {
                    if (hBox.left - 4 < vBox.right && hBox.right + 4 > vBox.left && hBox.top - 4 < vBox.bottom && hBox.bottom + 4 > vBox.top) {
                        vx = (vx > mouseX) ? mouseX - 8 - vtw / 2 : mouseX + 8 + vtw / 2;
                    }
                }
                
                if (horizontalGap > 0 && horizontalGap > htw) {
                    drawText(hText, hx - htw/2, hy);
                }
                
                if (verticalGap > 0 && verticalGap > 10) {
                    drawText(vText, vx - vtw/2, vy);
                }
            }

            ctx.globalAlpha = 1.0; // Restaura opacidade global
            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("resize", resizeCanvas);
            window.removeEventListener("scroll", updateElements);
            observer.disconnect();
            cancelAnimationFrame(animationFrameId);
        };
    }, [pathname]);

    return (
        <canvas 
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-[9999]"
            aria-hidden="true"
        />
    );
}
