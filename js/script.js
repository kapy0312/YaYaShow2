// 角色圖片對應（縮圖和大圖）
const characters = [
    { id: 1, thumb: 'img/char/1.png', large: 'img/char/1.png', alt: '廖若羽' },//O
    { id: 2, thumb: 'img/char/2.png', large: 'img/char/2.png', alt: '魔法少女' },
    { id: 3, thumb: 'img/char/3.png', large: 'img/char/3.png', alt: '❸ ❸ ฅ՞•ﻌ•՞ฅ' },//O
    { id: 4, thumb: 'img/char/4.png', large: 'img/char/4.png', alt: 'Huang Fu' },
    { id: 5, thumb: 'img/char/5.png', large: 'img/char/5.png', alt: '許曜顯' },
    { id: 6, thumb: 'img/char/6.png', large: 'img/char/6.png', alt: '祐典:夜露死苦' },
    { id: 7, thumb: 'img/char/7.png', large: 'img/char/7.png', alt: '映菊Angela🦁' },//O
    { id: 8, thumb: 'img/char/8.png', large: 'img/char/8.png', alt: '張洺洺' },
    { id: 9, thumb: 'img/char/9.png', large: 'img/char/9.png', alt: 'X' },
    { id: 10, thumb: 'img/char/10.png', large: 'img/char/10.png', alt: 'Chen' },
    { id: 11, thumb: 'img/char/11.png', large: 'img/char/11.png', alt: '雪' },
    { id: 12, thumb: 'img/char/12.png', large: 'img/char/12.png', alt: 'ღYu' },//O
    { id: 13, thumb: 'img/char/13.png', large: 'img/char/13.png', alt: '陳泓嘉' },
    { id: 14, thumb: 'img/char/14.png', large: 'img/char/14.png', alt: '廖恩祁' },//O
    { id: 15, thumb: 'img/char/15.png', large: 'img/char/15.png', alt: '糸彔☀️' },
    { id: 16, thumb: 'img/char/16.png', large: 'img/char/16.png', alt: '張育麟' },//O
    { id: 17, thumb: 'img/char/17.png', large: 'img/char/17.png', alt: '🦖' },
    { id: 18, thumb: 'img/char/18.png', large: 'img/char/18.png', alt: '王晴眉03' },
    { id: 19, thumb: 'img/char/19.png', large: 'img/char/19.png', alt: '吳鎮安' },
    { id: 20, thumb: 'img/char/20.png', large: 'img/char/20.png', alt: '芮芮' },//O
];
// 選中角色

let selectedBox = null;
const characterGrid = document.getElementById('character-grid');
const characterImage = document.getElementById('character-image');
const characterInfoName = document.getElementById('character-name');
const randomSound = document.getElementById('random-sound');
const selectedList = document.getElementById('selected-list');

// 動態生成角色方框
characters.forEach(character => {
    const box = document.createElement('div');
    box.classList.add('character-box');
    box.setAttribute('data-id', character.id);

    const img = document.createElement('img');
    img.src = character.thumb;
    img.alt = character.alt;

    box.appendChild(img);
    characterGrid.appendChild(box);

    // 點擊事件
    box.addEventListener('click', () => {
        // selectCharacter(character);
        randomSound.currentTime = 0; // 確保音效從頭播放
        randomSound.play(); // 播放音效

        if (selectedBox) {
            selectedBox.classList.remove('selected');
        }
        box.classList.add('selected');
        selectedBox = box;

        characterImage.src = character.large;
        characterImage.alt = `${character.alt} 大圖`;
        characterInfoName.textContent = character.alt;
        // 在選擇角色時調用 updateThumbnail()
        updateThumbnail(character.large);
    });
});

// 隨機選角
document.getElementById('random-button').addEventListener('click', () => {
    // 清除所有方框的紅框
    const allBoxes = document.querySelectorAll('.character-box');
    allBoxes.forEach(box => {
        box.classList.remove('selected');
    });

    // const randomIndex = Math.floor(Math.random() * characters.length);

    // 生成一個範圍在 0 到 cheatArray 長度之間的隨機索引
    const randomIndex = Math.floor(Math.random() * cheatArray.length);
    // 獲取對應的作弊INDEX
    const cheatIndex = cheatArray[randomIndex];

    var randomCharacter;
    if (cheatArray.length > 0) {
        randomCharacter = characters[cheatIndex];
    }
    else {
        randomCharacter = characters[Math.floor(Math.random() * characters.length)];
    }
    const randomBox = document.querySelector(`.character-box[data-id="${randomCharacter.id}"]`);
    // 從陣列中移除該元素
    cheatArray.splice(randomIndex, 1);

    // 隨機亮起的過程
    let currentBox = null;
    const interval = setInterval(() => {
        // 移除之前的紅框
        if (currentBox) {
            currentBox.classList.remove('selected');
        }

        // 隨機選擇一個方框
        const randomIndex = Math.floor(Math.random() * characters.length);
        currentBox = document.querySelector(`.character-box[data-id="${characters[randomIndex].id}"]`);
        currentBox.classList.add('selected'); // 增加紅框

        randomSound.currentTime = 0; // 確保音效從頭播放
        randomSound.play(); // 播放音效
    }, 200); // 每100毫秒更新一次

    // 停止隨機亮起，並顯示最終選擇
    setTimeout(() => {
        clearInterval(interval); // 清除隨機亮起的間隔
        if (currentBox) {
            currentBox.classList.remove('selected'); // 移除最後的紅框
        }

        // 獲取作弊的INDEX
        // const cheatIndex = cheatArray[currentChooseRoleIndex - 1]; // 從作弊陣列中選擇對應INDEX

        // 根據作弊陣列中的值，選擇對應角色
        // const finalCharacter = characters[cheatIndex];
        // const finalBox = document.querySelector(`.character-box[data-id="${finalCharacter.id}"]`);
        // finalBox.classList.add('selected'); // 在最終角色上添加紅框
        // selectedBox = finalBox; // 更新已選擇的角色

        randomBox.classList.add('selected'); // 在最終角色上添加紅框
        selectedBox = randomBox; // 更新已選擇的角色

        characterImage.src = randomCharacter.large;
        characterImage.alt = `${randomCharacter.alt} 大圖`;
        characterInfoName.textContent = randomCharacter.alt;

        // 在選擇角色時調用 updateThumbnail()
        updateThumbnail(randomCharacter.large);

    }, 3000); // 3秒後停止
});

function selectCharacter(character) {
    if (selectedBox) {
        selectedBox.classList.remove('selected');
    }

    const selectedBox = document.querySelector(`.character-box[data-id="${character.id}"]`);
    selectedBox.classList.add('selected');

    characterImage.src = character.large;
    characterImage.alt = `${character.alt} 大圖`;
    characterInfoName.textContent = character.alt;

    // 新增選中的角色圖片到列表
    const img = document.createElement('img');
    img.src = character.thumb;
    img.alt = character.alt;
    selectedList.appendChild(img);
}

let currentChooseRoleIndex = 1;

function updateThumbnail(src) {
    if (currentChooseRoleIndex <= 8) {
        const ChooseRole = document.getElementById(`ChooseRole${currentChooseRoleIndex}`);
        ChooseRole.src = src;
        currentChooseRoleIndex++;
    }
}

document.getElementById("start-button").addEventListener("click", function () {
    // 將此處的URL替換為你要載入的網頁
    window.location.href = "game.html";
});

// 存最後停止的INDEX的1維陣列（例如預設每位使用者的作弊值）
const cheatArray = [0, 2, 5, 6, 11, 13, 15, 19]; // 根據實際需求修改

