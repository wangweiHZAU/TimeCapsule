function XReadFile()
{
  let url = "test.json";
  let request = new XMLHttpRequest();
  request.open("get", url);
  request.send(null);
  request.onload = function ()
  {
    if (request.status == 200)
    {
      let data = JSON.parse(request.responseText);
      return data;
    } 
    else {
      return null;
    }
  }
}
// async function readFile()
// {
//   let file = new Request("test.json");
//   // if (!file)
//   // {
//   //   createFile();
//   // }

//   try{
//     let response = await fetch(file);
//     // const file_data = await response.json();
//     return await response.json();
//   } catch (e){
//     console.log("Request Failed", e)
//   }
//   const res = fetch(file)
//     .then(function(response)
//     {
//       // console.log(response.json());
//       return response.json();
//     })
//     .then(function(json){
//       return json;
//     })
//     .catch(err => console.log("Request failed", err));
// }
interface ICapsule{
  name: string 
  email: string;
  time: string;
  content: string;
  tips?: string;
}
enum User {name, email, time, content, tips}

function check_null(str: string)
{
  if (str.length === 0 || str.trim().length === 0)
  {return true;}
  else {return false;}
  // return !str && str.trim();
}
function check_email(str: string)
{
  let reg = /^[0-9a-zA-Z_.-]+[@][0-9a-zA-Z_.-]+([.][a-zA-Z]+){1,2}$/;
  return reg.test(str);
}
function check_content(content: string)
{
  return (0 < content.length && content.length < 5000 );
}
function encode(str: string)
{
  // let encode = btoa(str);
  let encode = str;
  let password = Math.random().toString();
  return [password, encode];
}
function warning(attr, p_text)
{
  let v = document.querySelector(`input[name=${attr}]`) 
    || document.querySelector(`textarea[name=${attr}]`);
  v.placeholder = p_text;
}


function check_info(user: ICapsule)
{
  // console.log(!check_null(user.name), check_email(user.email), check_content(user.content));
  if (!check_null(user.name) && check_email(user.email)
     && check_content(user.content))
  {
    let all_content = [user.name, user.email, user.time, user.content, user.tips].join("//////////");
    let t = encode(all_content);
    console.log("all_content", all_content);
    localStorage.setItem(t[0], t[1]);
    document.querySelector('.main').classList.add('hide');
    document.querySelector('.keys').classList.remove('hide');
    document.querySelector("input[name='keys']").value = t[0];
  }
  else 
  {
    if (check_null(user.name))
    {
      warning('name', '名字不能为空');
    }
    if (!check_email(user.email))
    {
      warning('email', '请设置合法的email地址');
    }
    if (!check_content(user.content)) warning('content', '内容不能为空');

  }
}

window.onload = function()
{
  let form = document.querySelector("form") as HTMLFormElement;
  (<HTMLFormElement>form[2]).value = moment().format('YYYY-MM-DD HH:mm:ss')
  document.getElementsByClassName("add")[0].classList.add("active");
  // const file_data = XReadFile();
}
function getText()
{
  // location.href = "/put.html";
  let form = new FormData(document.querySelector('form'));
  let name = form.get("name");
  let email = form.get("email");
  let time = form.get("time");
  let content = form.get("content");
  let tips = form.get("tip");
  // console.log(name, email, time, content, tips);
  check_info({name, email, time, content, tips});

  console.log("Process finished");
  document.querySelector("input[type='submit']").value = "添加胶囊";
}
