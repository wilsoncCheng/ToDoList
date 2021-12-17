const todo = document.querySelector('.todo')
const choose = document.querySelector('.choose')
const submit = document.querySelector('.submit')
let list = document.querySelector('.list')
let obj = [];
submit.addEventListener('click', addtodo);
//輸入產生代辦事項
function addtodo() {
    let temp = {};
    if (todo.value === '') {
        alert('你啥都沒有填')
        return;
    }
    if (todo.choose == '請選擇你想新增的類型') {
        alert('請選擇狀態')
        return;
    }
    temp.content = todo.value;
    temp.state = choose.value;
    obj.push(temp)
    todo.value = "";
    renewscreen()
}
//優化處理
todo.addEventListener("keyup", function (e) {
    if (e.key == "Enter") {
        addtodo();
    }
})
//重新渲染畫面
function renewscreen() {
    str = "";
    obj.forEach(function (item, index) {
        console.log(item.state)
        if (toggleTab == "all") {
            if (item.state == "work")
                str += `<li>${item.content}<input type="button" data-num=${index} value="完成" class="clear"><input type="button" data-num=${index} value="刪除" class="delete"></li>`
            else str += `<li>${item.content}<input type="button" data-num=${index} value="刪除" class="delete"></li>`
        }
        else if (toggleTab == "work" && item.state == "work")
            str += `<li>${item.content}<input type="button" data-num=${index} value="完成" class="clear"><input type="button" data-num=${index} value="刪除" class="delete"></li>`
        else if (toggleTab == "done" && item.state == "done")
            str += `<li>${item.content}<input type="button" data-num=${index} value="刪除" class="delete"></li>`
    })
    list.innerHTML = str;
}

//設立刪除機制
list.addEventListener('click', function (e) {
    if (e.target.getAttribute("class") == "delete") {
    let num = e.target.getAttribute('data-num');
    obj.splice(num, 1);
    renewscreen();
    }
    if (e.target.getAttribute("class") == "clear") {
        let num = e.target.getAttribute('data-num');
        obj[num].state="done";
        renewscreen();
        }
});

//切換tab
const tabs = document.querySelector(".tab");
let toggleTab = "all";
tabs.addEventListener("click", function (e) {
    let all = document.querySelectorAll(".tab li");
    all.forEach((item) => {
        item.setAttribute("class", "");
    });
    e.target.setAttribute("class", "active");
    toggleTab = e.target.getAttribute("data-tab");
    renewscreen()
});