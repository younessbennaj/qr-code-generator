const form = document.getElementById("form");
const qrcodeEl = document.getElementById("qrcode");
const inputEl = document.getElementById("url");
const formContainer = document.getElementById("form-container");
const qrcodeContainer = document.getElementById("qrcode-container");
const download = document.getElementById("download");
const copy = document.getElementById("copy");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const url = data.get("url");
  qrcodeEl.innerHTML = "";

  if (url.trim()) {
    const qrcode = new QRCode(qrcodeEl, {
      text: url,
      width: 190,
      height: 190,
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H,
    });
    qrcodeContainer.style.display = "block";
    formContainer.style.display = "none";
    const base64EncodedImageUrl = qrcodeEl.children[0].toDataURL("image/png");
    console.log(base64EncodedImageUrl);
    document.getElementById("link").setAttribute("href", base64EncodedImageUrl);
  }

  inputEl.value = "";
});

copy.addEventListener("click", () => {
  const base64EncodedImageUrl = qrcodeEl.children[0].toDataURL("image/png");
  // Remove data URL prefix
  var base64Image = base64EncodedImageUrl.replace(
    /^data:image\/(png|jpg|jpeg);base64,/,
    ""
  );

  // Decode base64 data
  var binaryString = window.atob(base64Image);

  // Convert binary string to ArrayBuffer
  var arrayBuffer = new ArrayBuffer(binaryString.length);
  var uint8Array = new Uint8Array(arrayBuffer);
  for (var i = 0; i < binaryString.length; i++) {
    uint8Array[i] = binaryString.charCodeAt(i);
  }

  // Create Blob from ArrayBuffer
  var blob = new Blob([uint8Array], { type: "image/png" });
  try {
    navigator.clipboard.write([
      new ClipboardItem({
        "image/png": blob,
      }),
    ]);
    copy.querySelector("span").innerText = "Copied";
    copy.querySelector("img").setAttribute("src", "images/check.svg");
  } catch (error) {
    console.error(error);
  }
});
