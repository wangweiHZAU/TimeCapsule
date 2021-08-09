function XReadFile() {
    var url = "test.json";
    var request = new XMLHttpRequest();
    request.open("get", url);
    request.send(null);
    request.onload = function () {
        if (request.status == 200) {
            var data = JSON.parse(request.responseText);
            return data;
        }
        else {
            return null;
        }
    };
}
var User;
(function (User) {
    User[User["name"] = 0] = "name";
    User[User["email"] = 1] = "email";
    User[User["time"] = 2] = "time";
    User[User["content"] = 3] = "content";
    User[User["tips"] = 4] = "tips";
})(User || (User = {}));
function check_null(str) {
    if (str.length === 0 || str.trim().length === 0) {
        return true;
    }
    else {
        return false;
    }
    // return !str && str.trim();
}
function check_email(str) {
    var reg = /^[0-9a-zA-Z_.-]+[@][0-9a-zA-Z_.-]+([.][a-zA-Z]+){1,2}$/;
    return reg.test(str);
}
function check_content(content) {
    return (0 < content.length && content.length < 5000);
}
function encode(str) {
    // let encode = btoa(str);
    var encode = str;
    var password = Math.random().toString();
    return [password, encode];
}
function warning(attr, p_text) {
    var v = document.querySelector("input[name=" + attr + "]")
        || document.querySelector("textarea[name=" + attr + "]");
    v.placeholder = p_text;
}
function check_info(user) {
    // console.log(!check_null(user.name), check_email(user.email), check_content(user.content));
    if (!check_null(user.name) && check_email(user.email)
        && check_content(user.content)) {
        var all_content = [user.name, user.email, user.time, user.content, user.tips].join("//////////");
        var t = encode(all_content);
        console.log("all_content", all_content);
        localStorage.setItem(t[0], t[1]);
        document.querySelector('.main').classList.add('hide');
        document.querySelector('.keys').classList.remove('hide');
        document.querySelector("input[name='keys']").value = t[0];
    }
    else {
        if (check_null(user.name)) {
            warning('name', '名字不能为空');
        }
        if (!check_email(user.email)) {
            warning('email', '请设置合法的email地址');
        }
        if (!check_content(user.content))
            warning('content', '内容不能为空');
    }
}
window.onload = function () {
    var form = document.querySelector("form");
    form[2].value = moment().format('YYYY-MM-DD HH:mm:ss');
    document.getElementsByClassName("add")[0].classList.add("active");
    // const file_data = XReadFile();
};
function getText() {
    // location.href = "/put.html";
    var form = new FormData(document.querySelector('form'));
    var name = form.get("name");
    var email = form.get("email");
    var time = form.get("time");
    var content = form.get("content");
    var tips = form.get("tip");
    // console.log(name, email, time, content, tips);
    check_info({ name: name, email: email, time: time, content: content, tips: tips });
    console.log("Process finished");
    document.querySelector("input[type='submit']").value = "添加胶囊";
}
