import checkNumber from "./checkNumber";

const changeModalState = (state) => {
  const windowForm = document.querySelectorAll(".balcon_icons_img"),
    windowWidth = document.querySelectorAll("#width"),
    windowHeight = document.querySelectorAll("#height"),
    windowType = document.querySelectorAll("#view_type"),
    windowProfile = document.querySelectorAll(".checkbox");

  checkNumber("#width");
  checkNumber("#height");

  function bindAction(event, $el, prop) {
    $el.forEach((item, index) => {
      item.addEventListener(event, () => {
        switch (item.nodeName) {
          case "SPAN":
            state[prop] = index;
            break;

          case "INPUT":
            if (item.getAttribute("type") === "checkbox") {
              index === 0
                ? (state[prop] = "Холодное")
                : (state[prop] = "Теплое");
              $el.forEach((box, j) => {
                box.checked = false;
                if (index === j) {
                  box.checked = true;
                }
              });
            } else {
              state[prop] = item.value;
            }
            break;

          case "SELECT":
            state[prop] = item.value;
            break;
        }

        console.log(state);
      });
    });
  }

  bindAction("click", windowForm, "form");
  bindAction("input", windowHeight, "height");
  bindAction("input", windowWidth, "width");
  bindAction("change", windowType, "type");
  bindAction("change", windowProfile, "profile");
};

export default changeModalState;
