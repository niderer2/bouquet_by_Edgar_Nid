document.addEventListener("DOMContentLoaded", function() {
    console.log("Страница полностью загружена!");
    let txt_info = document.querySelector('.txt_info')
    let botton_info = document.querySelector('.botton_info')
    let botton_info_body = botton_info.querySelector('.botton_info_body')
    //кнопка инфо
    for (let eventName of ["mouseover", "mousedown"]) {
        botton_info.addEventListener(eventName, function() {
            if (window.innerWidth > 700){
                botton_info_body.style.width = '50px'
                botton_info_body.style.height = '50px'
                botton_info_body.style.right = '5px'
                botton_info_body.style.top = '-5px'
            } else {
                console.log("Здесь должен быть код для другой версии значка при меньшем экране. Но я не знаю как это проверить на ноутбуке");
            }

        });
    }


    for (let eventName of ["mouseleave", "mouseup"]) {
        botton_info.addEventListener(eventName, function() {
            if (window.innerWidth > 700){
                botton_info_body.style.width = '40px'
                botton_info_body.style.height = '40px'
                botton_info_body.style.right = '10px'
                botton_info_body.style.top = '0px'
            } else {
                console.log("Здесь должен быть код для другой версии значка при меньшем экране. Но я не знаю как это проверить на ноутбуке");
            }
        });
    }
    //фукционал кнопки инфо 
    let should_i_open_the_price_tag_text = true
    let txt2 = document.querySelector('.txt2')
    let txt3 = document.querySelector('.txt3')
    let txt4 = document.querySelector('.txt4')
    let txt5 = document.querySelector('.txt4')
    let do_i_need_to_show_text = true
    botton_info.addEventListener("click", function() {
        if (do_i_need_to_show_text){
            do_i_need_to_show_text = false
            should_i_open_the_price_tag_text = false
            txt2.textContent = 'Цель игры  очень проста - собрать букет на максимальную стоимостью'
            txt3.textContent = 'Пустой букет стоит ровно 0'
            txt4.textContent = 'Но добавления каждого цветка изменяет это число по матeматической формуле'
            txt5.textContent = 'Из-за чего вы можете получить совершенно разный ценник используя одни и теже цветы. Изначально вы не знаете какой цветок что делает. Но по мере игры вы откроете предмет "ценник" который раскажет вам о способностях цветов.'
            txt_info.style.display = 'block'

        } else {
            should_i_open_the_price_tag_text = true
            do_i_need_to_show_text = true
            txt_info.style.display = 'none'

        }
    });

    //взятие цветов. 
    let color_1 = document.querySelector('.color_1')
    let color_2 = document.querySelector('.color_2')
    let color_3 = document.querySelector('.color_3')
    let color_4 = document.querySelector('.color_4')
    let color_5 = document.querySelector('.color_5')
    let colors_1_5 = [color_1, color_2, color_3, color_4, color_5]
    let in_hands = document.querySelector('.in_hands')
    let in_hands_color = in_hands

    for (let eventName of colors_1_5) {
        eventName.addEventListener('click', function() {
            in_hands.style.background = getComputedStyle(eventName).backgroundColor
            in_hands_color = eventName
        });
    }
    //фукция модуля
    function abc(n){
        if (n < 0){
            return -n
        } else {
            return n
        }
    }
    //работа с ценником
    let price_tag_T_F = false
    let price_tag = document.querySelector('.price_tag')
    price_tag.addEventListener('click', function() {
        if(price_tag_T_F){
                console.log('Нажат ценник')
                if(should_i_open_the_price_tag_text){
                    txt_info.style.display = 'block'
                    do_i_need_to_show_text = false
                    should_i_open_the_price_tag_text = false
                    txt2.textContent = 'Как говорилось ранее каждый цветок изменяет конечную цену по разному. Но у вас также есть и карточки Холодильника, Кассы и Батарейки. '
                    txt3.textContent = 'Условные обозначения: MaxDLS - Максимальная цифра; MinDLS - Минимальная цифра. SumDLS - сумма кол-ва уникальных цифр числа. '
                    txt4.textContent = 'Роза: n + 7; Фиалка: n - 27; Мимоза: n * MaxDLS / MinDLS + 1; Лилия: n ^ 2 / 10 + 1; Тюльпан: n * 2 + 1'
                    txt5.textContent = 'Холодильник заменяет самую минимальную правую цифру на 8; Касса: итогое значение * 6 * (10 - SumDLS); барарейка переставляет цифры в порядке убывания'
                } else {
                    txt_info.style.display = 'none'
                    do_i_need_to_show_text = true
                    should_i_open_the_price_tag_text = true
                }
        }
    });
    //фукция холодильника
    function replaceMinCandidate(n) {
        let digits = n.toString().split('');
        let bestCandidateIndex = -1;
        let bestCandidateValue = Infinity;
        for (let i = digits.length - 1; i >= 0; i--) {
          let d = Number(digits[i]);
          if (d >= 8 && d < bestCandidateValue) {
            bestCandidateValue = d;
            bestCandidateIndex = i;
            if (d === 8) {
              break;
            }
          }
        }
        if (bestCandidateIndex !== -1) {
          digits[bestCandidateIndex] = '6';
        }
        
        return Number(digits.join(''));
      }
    //фукция батарейки
    function sortDigitsDescending(n) {
        let digits = n.toString().split('');
        digits.sort((a, b) => b - a);
        return Number(digits.join(''));
      }
    //фукция кассы
    function cash_register(n) {
        let uniqueCount = new Set(n.toString().split('')).size;
        return n * 6 * (10 - uniqueCount);
      }

    //фукция изменения входного значения карточками. А также фукция вывода конечного значения.
    let battery = false
    let fridge = false
    let cash_register_T_F = false
    

    function cards(n){
       if(fridge){
        n = replaceMinCandidate(n)
       }
       if(battery){
        n = sortDigitsDescending(n)
       }
       return n 
    }
    let result = document.querySelector('.result')
    function end(n){
        if (cash_register_T_F){
        n = cash_register(n)
        }
        result.textContent = abc(n)
    }

    //фукции цветов. 
    function rose(n){
        return n + 7
    }
    function violet(n){
        return n - 27
    }
    function dandelion(n) {
        let digits = n.toString().split('').map(Number);
        let maxDigit = Math.max(...digits);
        let minDigit = Math.min(...digits);
        if (minDigit === 0) {
          minDigit = 1;
        }
        return Math.floor((n * maxDigit) / minDigit) + 1;
    }
    function snowdrop(n){
        return Math.floor(Math.pow(n, 2) / 10) + 1
    }
    function black_lily(n){
        return n * 2 + 1
    }
    //фукция присваивания карточек
    let cards_txt_cash_register = document.querySelector('.cards_txt_cash_register')
    let cards_txt_fridge = document.querySelector('.cards_txt_fridge')
    let cards_txt_battery = document.querySelector('.cards_txt_battery')

    function if_cards(n){
        let y = false
        if (cash_register_T_F){
            n = cash_register(n)
            y = true
        }

        if(n >= 100 && !price_tag_T_F){
            price_tag.style.display = 'block'
            price_tag_T_F  = true
            y = true
        }
        if(n >= 10000 && !cash_register_T_F){
            cards_txt_cash_register.textContent = 'У вас ЕСТЬ касса'
            cash_register_T_F = true
            y = true
        }
        if(n >= 20000 && !fridge){
            cards_txt_fridge.textContent = 'У вас ЕСТЬ холодильник'
            fridge = true
            y = true
        }
        if(n >= 48000 && !battery){
            cards_txt_battery.textContent = 'У вас ЕСТЬ батарейка'
            battery = true
            y = true
        }
        return y
    }

    //фукция расщёта итогового значения. Список табс хранит в себе все поряд исполнения операций. 
    let tabs = ['None', 'None', 'None', 'None', 'None']
    function tab(T_F){
        let result_i = 0
        for(let i of tabs){
            if (i != 'None'){
                result_i = i(cards(abc(result_i)))
            } else {result_i = 0}
        }
        end(result_i)
        if(if_cards(result_i) && T_F){
            tab(false)
        }
    }


    //размещение цветов по ячейкам.
    let flower_1 = document.querySelector('.flower_1')
    let flower_2 = document.querySelector('.flower_2')
    let flower_3 = document.querySelector('.flower_3')
    let flower_4 = document.querySelector('.flower_4')
    let flower_5 = document.querySelector('.flower_5')
    
    let fl_1_1 = document.querySelector('.fl_1_1')
    let fl_1_2 = document.querySelector('.fl_1_2')
    let fl_1_3 = document.querySelector('.fl_1_3')
    let fl_1_4 = document.querySelector('.fl_1_4')
    let fl_1_5 = document.querySelector('.fl_1_5')

    let fl_2_1 = document.querySelector('.fl_2_1')
    let fl_2_2 = document.querySelector('.fl_2_2')
    let fl_2_3 = document.querySelector('.fl_2_3')
    let fl_2_4 = document.querySelector('.fl_2_4')
    let fl_2_5 = document.querySelector('.fl_2_5')

    let fl_3_1 = document.querySelector('.fl_3_1')
    let fl_3_2 = document.querySelector('.fl_3_2')
    let fl_3_3 = document.querySelector('.fl_3_3')
    let fl_3_4 = document.querySelector('.fl_3_4')
    let fl_3_5 = document.querySelector('.fl_3_5')

    let fl_4_1 = document.querySelector('.fl_4_1')
    let fl_4_2 = document.querySelector('.fl_4_2')
    let fl_4_3 = document.querySelector('.fl_4_3')
    let fl_4_4 = document.querySelector('.fl_4_4')
    let fl_4_5 = document.querySelector('.fl_4_5')

    let fl_5_1 = document.querySelector('.fl_5_1')
    let fl_5_2 = document.querySelector('.fl_5_2')
    let fl_5_3 = document.querySelector('.fl_5_3')
    let fl_5_4 = document.querySelector('.fl_5_4')
    let fl_5_5 = document.querySelector('.fl_5_5')

    flower_1.addEventListener('click', function() {
        flower_1.style.background = getComputedStyle(in_hands).backgroundColor
        fl_1_1.style.background = getComputedStyle(in_hands).backgroundColor
        fl_1_2.style.background = getComputedStyle(in_hands).backgroundColor
        fl_1_3.style.background = getComputedStyle(in_hands).backgroundColor
        fl_1_4.style.background = getComputedStyle(in_hands).backgroundColor
        fl_1_5.style.background = getComputedStyle(in_hands).backgroundColor
        let m = 0
        if(in_hands_color == color_1){
            tabs.splice(m, 1, rose)
        }
        if(in_hands_color == color_2){
            tabs.splice(m, 1, violet)
        }
        if(in_hands_color == color_3){
            tabs.splice(m, 1, dandelion)
        }
        if(in_hands_color == color_4){
            tabs.splice(m, 1, snowdrop)
        }
        if(in_hands_color == color_5){
            tabs.splice(m, 1, black_lily)
        }
        tab(true)
    });

    flower_2.addEventListener('click', function() {
        flower_2.style.background = getComputedStyle(in_hands).backgroundColor
        fl_2_1.style.background = getComputedStyle(in_hands).backgroundColor
        fl_2_2.style.background = getComputedStyle(in_hands).backgroundColor
        fl_2_3.style.background = getComputedStyle(in_hands).backgroundColor
        fl_2_4.style.background = getComputedStyle(in_hands).backgroundColor
        fl_2_5.style.background = getComputedStyle(in_hands).backgroundColor
        let m = 1
        if(in_hands_color == color_1){
            tabs.splice(m, 1, rose)
        }
        if(in_hands_color == color_2){
            tabs.splice(m, 1, violet)
        }
        if(in_hands_color == color_3){
            tabs.splice(m, 1, dandelion)
        }
        if(in_hands_color == color_4){
            tabs.splice(m, 1, snowdrop)
        }
        if(in_hands_color == color_5){
            tabs.splice(m, 1, black_lily)
        }
        tab(true)
    });

    flower_3.addEventListener('click', function() {
        flower_3.style.background = getComputedStyle(in_hands).backgroundColor
        fl_3_1.style.background = getComputedStyle(in_hands).backgroundColor
        fl_3_2.style.background = getComputedStyle(in_hands).backgroundColor
        fl_3_3.style.background = getComputedStyle(in_hands).backgroundColor
        fl_3_4.style.background = getComputedStyle(in_hands).backgroundColor
        fl_3_5.style.background = getComputedStyle(in_hands).backgroundColor
        let m = 2
        if(in_hands_color == color_1){
            tabs.splice(m, 1, rose)
        }
        if(in_hands_color == color_2){
            tabs.splice(m, 1, violet)
        }
        if(in_hands_color == color_3){
            tabs.splice(m, 1, dandelion)
        }
        if(in_hands_color == color_4){
            tabs.splice(m, 1, snowdrop)
        }
        if(in_hands_color == color_5){
            tabs.splice(m, 1, black_lily)
        }
        tab(true)
    });

    flower_4.addEventListener('click', function() {
        flower_4.style.background = getComputedStyle(in_hands).backgroundColor
        fl_4_1.style.background = getComputedStyle(in_hands).backgroundColor
        fl_4_2.style.background = getComputedStyle(in_hands).backgroundColor
        fl_4_3.style.background = getComputedStyle(in_hands).backgroundColor
        fl_4_4.style.background = getComputedStyle(in_hands).backgroundColor
        fl_4_5.style.background = getComputedStyle(in_hands).backgroundColor
        let m = 3
        if(in_hands_color == color_1){
            tabs.splice(m, 1, rose)
        }
        if(in_hands_color == color_2){
            tabs.splice(m, 1, violet)
        }
        if(in_hands_color == color_3){
            tabs.splice(m, 1, dandelion)
        }
        if(in_hands_color == color_4){
            tabs.splice(m, 1, snowdrop)
        }
        if(in_hands_color == color_5){
            tabs.splice(m, 1, black_lily)
        }
        tab(true)
    });

    flower_5.addEventListener('click', function() {
        flower_5.style.background = getComputedStyle(in_hands).backgroundColor
        fl_5_1.style.background = getComputedStyle(in_hands).backgroundColor
        fl_5_2.style.background = getComputedStyle(in_hands).backgroundColor
        fl_5_3.style.background = getComputedStyle(in_hands).backgroundColor
        fl_5_4.style.background = getComputedStyle(in_hands).backgroundColor
        fl_5_5.style.background = getComputedStyle(in_hands).backgroundColor
        let m = 4
        if(in_hands_color == color_1){
            tabs.splice(m, 1, rose)
        }
        if(in_hands_color == color_2){
            tabs.splice(m, 1, violet)
        }
        if(in_hands_color == color_3){
            tabs.splice(m, 1, dandelion)
        }
        if(in_hands_color == color_4){
            tabs.splice(m, 1, snowdrop)
        }
        if(in_hands_color == color_5){
            tabs.splice(m, 1, black_lily)
        }
        tab(true)
    });
});
