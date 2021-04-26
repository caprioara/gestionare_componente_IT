const button = document.getElementsByClassName(".butonSubmit");

async function submit() {
  const username = document.querySelector(".username");
  const password = document.querySelector(".password");
  const data = {
    username: username.value,
    password: password.value,
  };

  let res = await fetch("http://89.136.170.156:5000/login", {
    method: "POST",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  // .then(async res => {
  //     username.value = ''
  //     password.value = ''
  //     console.log(await res.json())
  //     /*  window.location.replace('http://127.0.0.1:5500/templates/redirect.html') */
  // })
  // .catch(e => console.log(e))
  // console.log(await res.json())
  let user = await res.json();
  if (user?.success)
    window.location.replace("http://127.0.0.1:5500/templates/products.html");
}

async function lmao() {
  let res = await fetch("http://89.136.170.156:5000/products");
  const rezultat = await res.json();
  for (let i = 0; i < rezultat.data.length; i++) {
    document.getElementById("smecherie").innerHTML += `
        <div class="col-md-3 mt-1"><img id="produs1" class="img-fluid img-responsive rounded product-image" src="${
          rezultat.data[i].image
        }">
        </div>
        <div class="col-md-6 mt-1">
            <h5>${rezultat.data[i].name}</h5>
            <div class="d-flex flex-row">
                <div class="ratings mr-2"><i class="fa fa-star">
                </i><i class="fa fa-star">
                </i><i class="fa fa-star">
                </i><i class="fa fa-star"></i>
            </div>
            <span>3.10</span>
            </div>
           
            <p class="text-justify text-truncate para mb-0">${
              rezultat.data[i].details
            }<br><br></p>
        </div>

        <div class="align-items-center align-content-center col-md-3 border-left mt-1">
            <div class="d-flex flex-row align-items-center">
                <h4 class="mr-1">$${rezultat.data[i].price}</h4>
                <div>Stoc: ${rezultat.data[i].stock}</div>
            </div>

            <h6 class="text-success">${
              rezultat.data[i].price < 300
                ? "Transport gratuit"
                : "Transport: $20"
            }</h6>
            
            <div class="d-flex flex-column mt-4">
                <button class="btn btn-primary btn-sm" ntype="button" >Detalii produs</button>
            </div>
        </div>
        ${rezultat.data.length !== i + 1 ? '<hr class="w-100" />' : ""}
        `;
  }
}

lmao();

async function sendData(e) {
  e.preventDefault();

  const image = document.getElementById("image").value;
  const price = document.getElementById("price").value;
  const stock = document.getElementById("stock").value;
  const name = document.getElementById("name").value;
  const category = document.getElementById("category").value;

  const data = {
    image,
    price,
    stock,
    name,
    category,
  };

  if (
    image !== "" &&
    price !== "" &&
    stock !== "" &&
    name !== "" &&
    category !== ""
  ) {
  }

  await fetch("http://89.136.170.156:5000/product", {
    method: "POST",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}
