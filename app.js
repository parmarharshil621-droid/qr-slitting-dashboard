const SUPABASE_URL = "https://sfnnwctbsggspnextbwu.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_QWUkDFwzYfbdBE6i7vKjYA_pAEBAPmv";

const TABLE_NAME = "slitting_jobs";

let supabaseClient = null;

async function startApp() {
  try {
    if (!window.supabase) {
      const script = document.createElement("script");

      script.src =
        "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";

      script.onload = loadJobs;
      script.onerror = () => {
        console.error("Supabase library load nahi hui.");
      };

      document.head.appendChild(script);
    } else {
      loadJobs();
    }
  } catch (error) {
    console.error(error);
  }
}

async function loadJobs() {
  supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
  );

  const { data, error } = await supabaseClient
    .from(TABLE_NAME)
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    console.error("Supabase Error:", error);
    return;
  }

  displayJobs(data || []);
}

function displayJobs(jobs) {
  const tableBody =
    document.getElementById("jobs-body") ||
    document.getElementById("jobTableBody");

  if (!tableBody) {
    console.log("Jobs table nahi mili.");
    return;
  }

  tableBody.innerHTML = "";

  jobs.forEach((job, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${job.sr_no ?? index + 1}</td>
      <td>${job.wo_no ?? ""}</td>
      <td>${job.grade ?? ""}</td>
      <td>${job.weight ?? ""}</td>
      <td>${job.job ?? ""}</td>
      <td>${job.status ?? ""}</td>
      <td>${job.mill ?? ""}</td>
    `;

    tableBody.appendChild(row);
  });
}

document.addEventListener("DOMContentLoaded", startApp);
