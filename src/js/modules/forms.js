import checkNumber from "./checkNumber";

const forms = (state) => {
  const form = document.querySelectorAll("form"),
    input = document.querySelectorAll("input");

  checkNumber('input[name="user_phone"]');

  const message = {
    loading: "Грузимся не нервничай",
    success: "Все, а теперь отстань",
    failure: "Все сломалось ОШИИИБКА",
  };

  const postData = async (url, data) => {
    document.querySelector(".status").innerHTML = message.loading;

    let res = await fetch(url, {
      method: "POST",
      body: data,
    });

    return await res.text();
  };

  const clear = () => {
    input.forEach((item) => (item.value = ""));
  };

  form.forEach((item) => {
    item.addEventListener("submit", (e) => {
      e.preventDefault();

      let statusMessage = document.createElement("div");
      statusMessage.classList.add("status");
      item.appendChild(statusMessage);

      const formData = new FormData(item);
      if (item.getAttribute("data-calc") === "end") {
        for (let key in state) {
          formData.append(key, state[key]);
        }
      }

      try {
        postData(
          "https://6321af2582f8687273b6cd37.mockapi.io/js-forms",
          formData
        )
          .then((res) => {
            console.log(res);
            statusMessage.textContent = message.success;
          })
          .finally(() => {
            clear();
            setTimeout(() => {
              statusMessage.remove();
            }, 10000);
          });
      } catch (error) {
        statusMessage.textContent = message.failure;
      }
    });
  });
};

export default forms;
