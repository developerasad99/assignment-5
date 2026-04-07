function loadLabels(arr) {
  const createLabel = arr.map(
    (el) =>
      `<h1 class="uppercase ${el === "bug" ? "bg-[#FEECEC] text-[#F04E4E]" : el === "enhancement" ? "bg-[#BBF7D0] text-[#37BE8C]" : el === "good first issue" ? "bg-[#748bd4b4] text-[#0a68c0]" : el === "documentation" ? "bg-[#6cb7d486] text-[#ff9900]" : el === "help wanted" ? "bg-[#FFF8DB] text-[#DE8721]" : ""} rounded-full px-2 py-1 text-sm">${el === "bug" ? `<i class="fa-solid fa-bug"></i>` : el === "enhancement" ? `<i class="fa-solid fa-wand-magic-sparkles"></i>` : el === "good first issue" ? `<i class="fa-brands fa-gg"></i>` : el === "help wanted" ? `<i class="fa-solid fa-helicopter-symbol"></i>` : el === "documentation" ? `<i class="fa-brands fa-readme"></i>` : ""} ${el}</h1>`,
  );
  return createLabel.join(" ");
}
function getDate(str) {
  const date = new Date(str);
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const finalDate = `<p>Create at: ${month === 0 ? `${month + 1}` : month}/${day}/${year}</p>`;
  return finalDate;
}
const allBtn = document.getElementById("all");
const openBtn = document.getElementById("open");
const closeBtn = document.getElementById("close");

function toogleStutus(status) {
  if (status === "all") {
    openBtn.classList.remove("btn-primary");
    closeBtn.classList.remove("btn-primary");
    allBtn.classList.add("btn-primary");
  } else if (status === "open") {
    allBtn.classList.remove("btn-primary");
    closeBtn.classList.remove("btn-primary");
    openBtn.classList.add("btn-primary");
  } else if (status === "close") {
    allBtn.classList.remove("btn-primary");
    openBtn.classList.remove("btn-primary");
    closeBtn.classList.add("btn-primary");
  } else {
    allBtn.classList.remove("btn-primary");
    openBtn.classList.remove("btn-primary");
    closeBtn.classList.remove("btn-primary");
  }
}
function loadAllData(state) {
  const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
  if (state == "all") {
    fetch(url).then((res) =>
      res.json().then((data) => {
        DisplayData(data.data);
        counter(data.data);
        toogleStutus("all");
      }),
    );
  } else if (state == "open") {
    fetch(url).then((res) =>
      res.json().then((data) => {
        DisplayData(data.data.filter((op) => op.status === "open"));
        counter(data.data.filter((op) => op.status === "open"));
        toogleStutus("open");
      }),
    );
  } else if (state == "closed") {
    fetch(url).then((res) =>
      res.json().then((data) => {
        DisplayData(data.data.filter((close) => close.status === "closed"));
        counter(data.data.filter((close) => close.status === "closed"));
        toogleStutus("close");
      }),
    );
  }
}

function loadSearchData() {
  const text = document.getElementById("searchText").value;
  let url = `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${text}`;
  if (text.trim()) {
    fetch(url).then((res) =>
      res.json().then((data) => {
        DisplayData(data.data);
        counter(data.data);
        toogleStutus("");
      }),
    );
  } else {
    alert(`write something in Search input box 📝`);
  }
}
function loadSingleDataIssue(id) {
  const link = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
  fetch(link).then((res) =>
    res.json().then((data) => {
      showSingleIssue(data.data);
    }),
  );
}
function showSingleIssue(obj) {
  const modalContainer = document.getElementById("modalContainer");
  modalContainer.innerHTML = `<div>
        <h1 class="text-3xl font-bold">${obj.title}</h1>
        <div class="flex  items-center gap-2 mt-4">
          <span class="text-sm text-white bg-[#00A96E] p-2 rounded-full">Opened</span>
          <div class="w-1 h-1 rounded-full bg-[#64748B]"></div>
          <span>Opened by Fahim Ahmed</span>
          <div class="w-1 h-1 rounded-full bg-[#64748B]"></div>
          <span>22/02/2026</span>
        </div>
        <div class="flex gap-3 mt-6">
          <h1 class="uppercase bg-[#FEECEC] text-[#F04E4E] rounded-full px-2 py-1 text-sm"><i class="fa-solid fa-bug"></i> Bug</h1>
          <h1 class="uppercase bg-[#FEECEC] text-[#F04E4E] rounded-full px-2 py-1 text-sm"><i class="fa-solid fa-bug"></i> Bug</h1>
        </div>
        <p class="text-sm mt-6 mb-6">${obj.description}</p>
        <div class="flex bg-[#F8FAFC] p-4 rounded-lg">
           <div class="flex-1">
             <p>Assignee:</p>
             <p class="font-bold">Fahim Ahmed</p>
           </div>
           <div class="flex-1">
             <p class="mb-1">Priority:</p>
             <span class="uppercase bg-[#EF4444] text-[#fff] rounded-full px-6 py-1">High</span>
           </div>
           
        </div>
       </div>`;
  document.getElementById("modal").showModal();
}
const renderSection = document.getElementById("renderSection");
function DisplayData(data) {
  renderSection.innerHTML = "";
  if (data.length === 0) {
    renderSection.innerHTML = `<div class="flex flex-col justify-center items-center text-6xl">
     <i class="fa-regular fa-face-frown-open text-center"></i>
    <p class="text-3xl text-center font-bold">No Issues found!</p>
    <div/>`;
    renderSection.classList.remove("grid");
    return;
  }
  renderSection.classList.add("grid");
  for (singleData of data) {
    let createElement = document.createElement("div");
    createElement.innerHTML = `<div onclick="loadSingleDataIssue(${singleData.id})" class="card shadow-md ${singleData.status === "open" ? "border-[#00A96E]" : "border-[#ac1dff]"}  border-t-5 rounded-lg">
                 <div class="p-3">
                     <div class="flex justify-between ">
                     <div class="w-8">
                      <img class="w-full" src="${singleData.status === "open" ? "assets/Open-Status.png" : "assets/Closed-Status.png"}" alt="">
                     </div>
                      <h1 class="uppercase ${singleData.priority === "high" ? "bg-[#FEECEC] text-[#EF4444]" : singleData.priority === "medium" ? "bg-[#FFF6D1] text-[#F59E0B]" : singleData.priority === "low" ? "bg-[#EEEFF2] text-[#9CA3AF]" : ""}  rounded-full px-6 py-1">${singleData.priority}</h1>
                    </div>
                      <div class="mt-6">
                  <h1 class="text-xl font-bold">${singleData.title}</h1>
                  <p>${singleData.description}</p>
                     </div>

                     <div class="flex items-center mt-6 gap-1">
                      ${loadLabels(singleData.labels)}
                      
                     </div>
                 </div>
                 <div class="h-[1px] w-full bg-gray-400"></div>
                 <div class="p-6">
                      <p>Author: ${singleData.author}</p>
                      ${getDate(singleData.createdAt)}
                 </div>
                </div>`;
    renderSection.appendChild(createElement);
  }
}

function counter(count) {
  const counterSpan = document.getElementById("counter");
  counterSpan.innerText = count.length;
}

loadAllData("all");
