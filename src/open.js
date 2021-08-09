window.onload = function () {
    var _a;
    (_a = document.querySelector(".title .open")) === null || _a === void 0 ? void 0 : _a.classList.add("active");
};
function check_time(time) {
    var now = moment().format("X");
    return (now > moment(time).format("X"));
}
function countSecond(time) {
    var remain = moment(time).format("X") - moment().format("X");
    var before = "这颗胶囊还没到提取时间，剩余时间还有 ";
    var after = "秒";
    if (remain > 0) {
        var say = document.querySelector(".cap-tips");
        say === null || say === void 0 ? void 0 : say.classList.remove("hide");
        say.innerHTML = before + remain.toString() + after;
        setTimeout(function () { countSecond(time); }, 1000);
    }
}
function open_capsule() {
    var _a;
    var _b;
    var passwd = (_b = document.querySelector("input[name='passwd'")) === null || _b === void 0 ? void 0 : _b.value;
    var res = localStorage.getItem(passwd);
    if (res) {
        var name_1, email = void 0, time = void 0, content = void 0, tips = void 0;
        _a = res.split("//////////"), name_1 = _a[0], email = _a[1], time = _a[2], content = _a[3], tips = _a[4];
        if (check_time(time)) {
            var say = document.querySelector(".cap-tips");
            say === null || say === void 0 ? void 0 : say.classList.remove("hide");
            var words = document.querySelector(".cap-content");
            words === null || words === void 0 ? void 0 : words.classList.remove("hide");
            say === null || say === void 0 ? void 0 : say.innerHTML = name_1 + " \u5728 " + time + " \u5BF9\u4F60\u8BF4\uFF1A";
            words.value = content;
        }
        else {
            countSecond(time);
            if (tips) {
                words.value = name_1 + "\u7559\u7ED9\u4F60\u7684\u63D0\u793A\u4FE1\u606F\n" + tips;
            }
        }
    }
    else {
        document.querySelector("input[name='passwd']").value = "";
        document.querySelector("input[name='passwd']").placeholder = "请输入有效的密码";
    }
    document.querySelector("input[type='submit']").value = "打开胶囊";
}
