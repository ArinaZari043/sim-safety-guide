document.addEventListener('DOMContentLoaded', () => {

    const speedInput = document.getElementById('speed-input');
    const roadInput = document.getElementById('road-input');
    const speedLabel = document.getElementById('speed-label');
    const metricDist = document.getElementById('metric-dist');
    const metricTime = document.getElementById('metric-time');
    const metricEnergy = document.getElementById('metric-energy');
    const scooter = document.getElementById('scooter-sprite');
    const alertSign = document.getElementById('alert-sign');
    const btnLaunchSim = document.getElementById('btn-launch-sim');

    function calculateStats() {
        const speed = parseFloat(speedInput.value);
        const friction = parseFloat(roadInput.value);
        
        speedLabel.textContent = speed + ' км/ч';

        const v = speed / 3.6;
        const g = 9.81;

        const dist = (v * v) / (2 * g * friction);
        const time = v / (g * friction);
        const energy = 0.5 * 70 * v * v;

        metricDist.textContent = dist.toFixed(1) + ' м';
        metricTime.textContent = time.toFixed(1) + ' сек';
        metricEnergy.textContent = Math.round(energy) + ' Дж';

        scooter.style.transition = 'none';
        scooter.style.left = '20px';
        scooter.classList.remove('braking');
        alertSign.style.display = 'none';
    }

    function launchTestDrive() {
        calculateStats();
        const speed = parseFloat(speedInput.value);
        const friction = parseFloat(roadInput.value);
        const v = speed / 3.6;
        const g = 9.81;
        const dist = (v * v) / (2 * g * friction);
        const time = v / (g * friction);

        scooter.style.transition = 'left 1s cubic-bezier(0.4, 0, 0.2, 1)';
        scooter.style.left = '36%'; 

        setTimeout(() => {
            alertSign.style.display = 'block';
            scooter.classList.add('braking');

            scooter.style.transition = `left ${time.toFixed(1)}s ease-out`;
            const maxPercent = Math.min(36 + (dist * 1.5), 82);
            scooter.style.left = maxPercent + '%';

            setTimeout(() => {
                scooter.classList.remove('braking');
            }, time * 1000);
        }, 1000);
    }

    speedInput.addEventListener('input', calculateStats);
    roadInput.addEventListener('change', calculateStats);
    btnLaunchSim.addEventListener('click', launchTestDrive);

    const layerTabs = document.querySelectorAll('.layer-tab');
    const shellSvg = document.getElementById('svg-shell');
    const epsSvg = document.getElementById('svg-eps');
    const strapsSvg = document.getElementById('svg-straps');

    function setLayer(layerName) {
        layerTabs.forEach(t => t.classList.remove('active'));
        const activeTab = document.querySelector(`.layer-tab[data-layer="${layerName}"]`);
        if (activeTab) activeTab.classList.add('active');

        shellSvg.style.fill = '#97A0AF';
        shellSvg.style.filter = 'none';
        epsSvg.style.fill = '#DFE1E6';
        epsSvg.style.filter = 'none';
        strapsSvg.style.stroke = '#5E6C84';
        strapsSvg.style.filter = 'none';

        if (layerName === 'shell') {
            shellSvg.style.fill = 'var(--accent-blue)';
            shellSvg.style.filter = 'drop-shadow(0 0 8px rgba(0, 82, 204, 0.7))';
            epsSvg.style.fill = 'rgba(223, 225, 230, 0.4)';
            strapsSvg.style.stroke = 'rgba(94, 108, 132, 0.4)';
        } else if (layerName === 'eps') {
            epsSvg.style.fill = 'var(--primary-blue)';
            epsSvg.style.filter = 'drop-shadow(0 0 8px rgba(10, 37, 64, 0.7))';
            shellSvg.style.fill = 'rgba(151, 160, 175, 0.4)';
            strapsSvg.style.stroke = 'rgba(94, 108, 132, 0.4)';
        } else if (layerName === 'straps') {
            strapsSvg.style.stroke = 'var(--accent-green)';
            strapsSvg.style.filter = 'drop-shadow(0 0 8px rgba(0, 135, 90, 0.7))';
            shellSvg.style.fill = 'rgba(151, 160, 175, 0.4)';
            epsSvg.style.fill = 'rgba(223, 225, 230, 0.4)';
        }
    }

    layerTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            setLayer(tab.getAttribute('data-layer'));
        });
    });

    shellSvg.addEventListener('click', () => setLayer('shell'));
    epsSvg.addEventListener('click', () => setLayer('eps'));
    strapsSvg.addEventListener('click', () => setLayer('straps'));

    const btnCalc = document.getElementById('btnCalculate');
    const inputSize = document.getElementById('headSize');
    const resultBox = document.getElementById('calcResult');
    const resultSize = document.getElementById('resultSize');
    const resultText = document.getElementById('resultText');

    btnCalc.addEventListener('click', () => {
        const cm = parseFloat(inputSize.value);
        if (!cm || cm < 46 || cm > 65) {
            alert('Пожалуйста, введите корректный обхват головы от 46 до 65 см.');
            return;
        }

        let size = '';
        let desc = '';

        if (cm <= 52) {
            size = 'XS (48–52 см)';
            desc = 'Очень маленький размер (подростковый).';
        } else if (cm <= 56) {
            size = 'S (52–56 см)';
            desc = 'Маленький размер. Подходит для большинства девушек и подростков.';
        } else if (cm <= 58) {
            size = 'M (55–58 см)';
            desc = 'Средний универсальный размер. Самый популярный стандарт.';
        } else if (cm <= 61) {
            size = 'L (59–61 см)';
            desc = 'Большой размер для взрослых.';
        } else {
            size = 'XL (61–63+ см)';
            desc = 'Очень большой размер с увеличенной глубиной посадки.';
        }

        resultSize.textContent = 'Ваш размер: ' + size;
        resultText.textContent = desc + ' Напоминание: шлем должен сидеть горизонтально на 2 пальца выше бровей и не болтаться.';
        resultBox.style.display = 'block';
    });

    const checkboxes = document.querySelectorAll('.check-box');
    const progressBar = document.getElementById('progressBar');
    const progressMsg = document.getElementById('progressMsg');

    checkboxes.forEach(cb => {
        cb.addEventListener('change', () => {
            const total = checkboxes.length;
            const checked = document.querySelectorAll('.check-box:checked').length;
            const percent = Math.round((checked / total) * 100);

            progressBar.style.width = percent + '%';

            if (percent === 100) {
                progressMsg.textContent = 'Отлично! Вы на 100% экипированы и готовы к безопасной поездке!';
                progressMsg.style.color = 'var(--accent-green)';
            } else if (percent > 0) {
                progressMsg.textContent = `Выполнено ${checked} из ${total} шагов безопасности (${percent}%)`;
                progressMsg.style.color = 'var(--accent-blue)';
            } else {
                progressMsg.textContent = 'Отметьте выполненные пункты безопасности';
                progressMsg.style.color = 'var(--text-muted)';
            }
        });
    });

    const quizCases = [
        {
            q: "Кейс 1. Пешеходный переход. Вы подъезжаете к регулируемой «зебре» на скорости 20 км/ч. Ваши действия?",
            options: [
                "Быстро проехать переход на зеленый сигнал светофора.",
                "Полностью спешиться и перейти дорогу пешком, ведя СИМ рядом со своей стороны.",
                "Проехать переход на минимальной скорости верхом на транспортном средстве."
            ],
            correct: 1,
            info: "ПДД РФ п. 24.8 строго требуют спешиваться на переходах. Водители авто ожидают пешехода со скоростью 4-5 км/ч, быстрое СИМ появляется внезапно для их реакции."
        },
        {
            q: "Кейс 2. Езда вдвоем. Пассажир предлагает доехать вдвоем на одном СИМ. В чем главная техническая опасность?",
            options: [
                "Штраф от сотрудников ГИБДД или блокировка аккаунта.",
                "Центр тяжести резко смещается вперед-вверх, при торможении падение через руль неизбежно.",
                "Батарея устройства разрядится в два раза быстрее положенного."
            ],
            correct: 1,
            info: "Это законы динамики: дополнительный вес на одной платформе лишает конструкцию баланса, провоцируя переворот вперед головой."
        },
        {
            q: "Кейс 3. Слепая зона. Справа от вашего СИМ медленно поворачивает грузовой автомобиль. Что делать?",
            options: [
                "Увеличить скорость и быстро проскочить справа от кабины.",
                "Остановиться, пропустить грузовик и держаться на расстоянии от его правого борта.",
                "Продолжать движение с прежней скоростью — грузовик обязан уступить дорогу."
            ],
            correct: 1,
            info: "Крупногабаритный транспорт имеет обширные слепые зоны справа. Водитель физически не видит райдера в боковое зеркало при повороте."
        }
    ];

    let quizIndex = 0;
    const questionEl = document.getElementById('quiz-question');
    const answersBox = document.getElementById('quiz-answers-box');
    const explanationEl = document.getElementById('quiz-explanation');
    const btnNext = document.getElementById('quiz-btn-next');
    const btnRestart = document.getElementById('quiz-btn-restart');

    function loadQuizItem() {
        const item = quizCases[quizIndex];
        questionEl.textContent = item.q;
        answersBox.innerHTML = '';
        explanationEl.style.display = 'none';
        btnNext.style.display = 'none';
        btnRestart.style.display = 'none';

        item.options.forEach((optText, idx) => {
            const btn = document.createElement('button');
            btn.className = 'quiz-btn-opt';
            btn.textContent = optText;
            btn.addEventListener('click', () => {
                const allBtns = answersBox.querySelectorAll('.quiz-btn-opt');
                allBtns.forEach(b => b.disabled = true);

                if (idx === item.correct) {
                    btn.classList.add('correct');
                    btnNext.style.display = 'inline-block';
                } else {
                    btn.classList.add('wrong');
                    allBtns[item.correct].classList.add('correct');
                    btnRestart.style.display = 'inline-block';
                }

                explanationEl.textContent = 'Разбор дорожной физики: ' + item.info;
                explanationEl.style.display = 'block';
            });
            answersBox.appendChild(btn);
        });
    }

    btnNext.addEventListener('click', () => {
        quizIndex++;
        if (quizIndex < quizCases.length) {
            loadQuizItem();
        } else {
            questionEl.textContent = 'Все кейсы успешно пройдены!';
            answersBox.innerHTML = `
                <div style="text-align: center; padding: 20px;">
                    <p style="color: var(--accent-green); font-weight:800; font-size: 16px; margin-bottom: 20px;">
                        Вы успешно подтвердили отличное знание ключевых правил безопасного вождения СИМ!
                    </p>
                    <button class="btn btn--primary" id="btn-quiz-reset" style="max-width: 260px; margin: 0 auto;">Пройти тест заново</button>
                </div>
            `;
            btnNext.style.display = 'none';
            btnRestart.style.display = 'none';
            explanationEl.style.display = 'none';
            document.getElementById('btn-quiz-reset').addEventListener('click', () => {
                quizIndex = 0;
                loadQuizItem();
            });
        }
    });

    btnRestart.addEventListener('click', loadQuizItem);

    calculateStats();
    setLayer('shell');
    loadQuizItem();
});