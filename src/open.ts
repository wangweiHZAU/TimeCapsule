window.onload = function()
{
  document.querySelector(".title .open")?.classList.add("active");
}

function check_time(time: string)
{
  let now = moment().format("X");
  return (now > moment(time).format("X"));
}

function countSecond(time)
{
  let remain = moment(time).format("X") - moment().format("X");
  let before = "这颗胶囊还没到提取时间，剩余时间还有 ";
  let after = "秒";
  if (remain > 0)
  {
    let say = document.querySelector(".cap-tips");
    say?.classList.remove("hide");
    say.innerHTML = before + remain.toString() + after;
    setTimeout(function(){countSecond(time)}, 1000);
  }
}

function open_capsule()
{
  let passwd = document.querySelector("input[name='passwd'")?.value;
  let res = localStorage.getItem(passwd);
  if (res)
  {
    let name, email, time, content, tips;
    [name, email, time, content, tips] = res.split("//////////");
    if (check_time(time))
    {
      let say = document.querySelector(".cap-tips");
      say?.classList.remove("hide");
      let words = document.querySelector(".cap-content");
      words?.classList.remove("hide");
      say?.innerHTML = `${name} 在 ${time} 对你说：`;
      words.value = content;
    } else 
    {
      countSecond(time);
      if (tips)
      {
        words.value = `${name}留给你的提示信息\n${tips}`;
      }
    }

  }
  else
  {
    document.querySelector("input[name='passwd']").value = "";
    document.querySelector("input[name='passwd']").placeholder = "请输入有效的密码"; 
  }
  document.querySelector("input[type='submit']").value = "打开胶囊";
}