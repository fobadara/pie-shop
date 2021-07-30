window.addEventListener("DOMContentLoaded", function (e) {
  // Script for pie.html
  const orderButtons = document.querySelectorAll("button[data-order]");
  orderButtons.forEach(function (button) {
    button.addEventListener("click", function (e) {
      const button = e.currentTarget;
      const container = button.parentNode;

      const order = {
        id: (id = button.getAttribute("data-order")),
        title: container.querySelector(".title").innerText,
        price: container.querySelector(".price").innerText,
        desc: container.querySelector(".desc").innerText,
      };

      localStorage.setItem("order", JSON.stringify(order));

      const url = window.location.href.replace("pies.html", "order.html");
      window.location.href = url;
    });
  });

  let locationBox = document.querySelector("#location");
  let location = {
    latitude: "unknown",
    longitude: "unknown",
  };

  window.navigator.geolocation.getCurrentPosition(
    function (position) {
      location = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };

      locationBox.value = JSON.stringify(location);
    },
    function (error) {
      if (locationBox != null) {
        locationBox.value = JSON.stringify(location);
      }
    }
  );

  //Script for order.html
  const order = localStorage.getItem("order");
  const pieOrder = JSON.parse(order);

  if (order) {
    const pie = document.querySelector(".order-pie");
    const title = pie.querySelector(".title");
    const price = pie.querySelector(".price");
    const desc = pie.querySelector(".desc");
    const orderInput = document.querySelector("#pie-order");

    title.innerText = pieOrder.title;
    price.innerText = pieOrder.price;
    desc.innerText = pieOrder.desc;

    if (orderInput != null) {
      orderInput.value = order;
    }

    const img = pie.querySelector("img");
    img.setAttribute("src", `images/${pieOrder.id}.png`);
    img.setAttribute("alt", pieOrder.title);
  }
});
