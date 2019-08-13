let url = "https://exceed.superposition.pknn.dev/data/boobo_login";
let url_hw = "https://exceed.superposition.pknn.dev/data/boobo_hardware";
let regis_stat = true;

async function sign_up() {
  Name = document.getElementById('name_reg').value;
  Email = document.getElementById('mail_reg').value;
  password = document.getElementById('password_reg').value;
  Phone = document.getElementById('phone_reg').value;
  Type = document.getElementById('type_reg').value;
  watch_id = document.getElementById('wid_reg').value;
  await fetch(url)
    .then(function (res) {
      return res.json()
    })
    .then(function (res) {
      for (key in res) {
        if (key == watch_id) {
          regis_stat = false;
        }
      }
    })
  if (regis_stat == true) {
    fetch(url)
      .then(function (res) {
        return res.json();
      })
      .then(function (res) {
        console.log("Done")
        res[watch_id] = {
          name: Name,
          password: password,
          email: Email,
          Phone_num: Phone,
          Type: Type
        };
        fetch(url, {
            method: "POST",
            body: JSON.stringify({
              data: res
            }),
            headers: {
              "Content-Type": "application/json"
            }
          })
          .then(function (res) {
            alert('Success!');
            window.location = "login.html";
          })
          .catch(err => alert("Error occur!", err));
      });
  } else {
    alert("This Bracelet Id is already own by someone!")
  }
}

function send_msg() {
  alert("Success!")
}

function update_data(responsive) {
  const params = new URL(window.location)
  watch_id = params.searchParams.get('wid_home')
  document.getElementById("mail_home").innerText = responsive[watch_id]['email'];
  document.getElementById("type_home").innerText = responsive[watch_id]['Type'];
  document.getElementById("name_home").innerText = responsive[watch_id]['name'];
  document.getElementById("phone_home").innerText = responsive[watch_id]["Phone_num"];
  document.getElementById("wid_home").innerText = watch_id;

}

async function getParam() {
  const res = await fetch(url);
  const data = await res.json();
  const res2 = await fetch(url_hw);
  const data2 = await res2.json();
  update_data(data);
  if (data2['isDanger'] == "True") {
    isDanger_stat = "Danger!";
  } else {
    isDanger_stat = "Normal";
  }
  if (data2['isWear'] == "True") {
    isWear_stat = "Wear";
  } else {
    isWear_stat = "Take Off!";
  }
  document.getElementById("status_head").innerText = isDanger_stat;
  document.getElementById("status_stat").innerText = isDanger_stat;
  document.getElementById("watch_stat_home").innerText = isWear_stat;
}

async function sign_in() {
  watch_id = document.getElementById("wid_log").value;
  password = document.getElementById("password_log").value;
  const res = await fetch(url);
  const data = await res.json();
  if (data[watch_id]['password'] == password) {
    alert("Login Success");
    window.location = "home.html?wid_home=" + watch_id;
  } else {
    alert("Password Wrong");
  }
}


function graphMed(NO) {
  const graph = document.getElementById('graph_img_home');
  switch (NO) {
    case 1:
      graph.setAttribute('src', 'images/graph1.png');
      break;
    case 2:
      graph.setAttribute('src', 'images/graph2.png');
      break;
    case 3:
      graph.setAttribute('src', 'images/graph3.png');
      break;

  }
}

function signOut() {
  window.location = "login.html";
}

async function offAlarm() {
  fetch(url_hw, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        data: {
          "isWear": "True",
          "isDanger": "False"
        }
      })
    })
    .then(function () {
      alert("Success!");
      document.getElementById("status_head").innerText = "Normal";
      document.getElementById("status_stat").innerText = "Normal";
    })
    .catch(err => alert('Error Occure'))
}