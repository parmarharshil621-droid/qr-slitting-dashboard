const SUPABASE_URL = "https://sfnnwctbsggspnextbwu.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_QWUkDFwzYfbdBE6i7vKjYA_pAEBAPmv";

const TABLE_NAME = "Running job";

let supabaseClient = null;

async function startApp() {
  try {
    if (!window.supabase) {
      console.error("Supabase library not loaded");
      return;
    }

    supabaseClient = window.supabase.createClient(
      SUPABASE_URL,
      SUPABASE_ANON_KEY
    );

    await loadJobs();

  } catch (error) {
    console.error("App Error:", error);
  }
}

async function loadJobs() {
  if (!supabaseClient) return;

  const { data, error } = await supabaseClient
    .from(TABLE_NAME)
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    console.error("Supabase Error:", error);
    return;
  }

  console.log("Running Jobs:", data);

  displayJobs(data || []);
}

function displayJobs(jobs) {

  const tableBody =
    document.getElementById("jobs-body") ||
    document.getElementById("jobTableBody") ||
    document.getElementById("publicJobs");

  if (!tableBody) {
    console.error("Table body not found");
    return;
  }

  tableBody.innerHTML = "";

  jobs.forEach((job) => {

    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${job.machine ?? ""}</td>
      <td>${job["job no"] ?? ""}</td>
      <td>${job.grade ?? ""}</td>
      <td>${job.weight ?? ""}</td>
      <td>${job.job ?? ""}</td>
      <td>${job.status ?? ""}</td>
      <td>${job.mill ?? ""}</td>
      <td>${job["start time"] ?? ""}</td>
    `;

    tableBody.appendChild(row);
  });
}


document.addEventListener("DOMContentLoaded", () => {

  const loginBtn = document.getElementById("adminLoginOpen");
  const publicView = document.getElementById("publicView");
  const loginView = document.getElementById("loginView");
  const backBtn = document.getElementById("backBtn");
  const loginForm = document.getElementById("loginForm");
  const loginMsg = document.getElementById("loginMsg");
  const adminView = document.getElementById("adminView");


  if (loginBtn) {
    loginBtn.addEventListener("click", () => {

      publicView.classList.add("hidden");
      loginView.classList.remove("hidden");

    });
  }


  if (backBtn) {
    backBtn.addEventListener("click", () => {

      loginView.classList.add("hidden");
      publicView.classList.remove("hidden");

    });
  }


  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {

      e.preventDefault();

      const email =
        document.getElementById("email").value.trim();

      const password =
        document.getElementById("password").value;


      if (
        email === "admin@amod.com" &&
        password === "123456"
      ) {

        loginView.classList.add("hidden");
        adminView.classList.remove("hidden");

        if (loginMsg) {
          loginMsg.textContent = "";
        }

      } else {

        if (loginMsg) {
          loginMsg.textContent =
            "Invalid email or password.";

        }

      }

    });
  }


  startApp();

});
