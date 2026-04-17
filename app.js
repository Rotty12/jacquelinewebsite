(() => {
  const USERNAME = "Jacqueline1964";
  const PASSWORD = "Jacqueline$$";
  const AUTH_KEY = "jacq_demo_authed_v1";
  const NAME_KEY = "jacq_demo_name_v1";
  const LOGIN_PAGE = "index.html";
  const ELIGIBILITY_PAGE = "eligibility.html";
  const storage = (() => {
    try {
      const testKey = "__jacq_storage_test__";
      window.localStorage.setItem(testKey, "1");
      window.localStorage.removeItem(testKey);
      return window.localStorage;
    } catch {
      const memory = new Map();
      return {
        getItem: (k) => (memory.has(k) ? memory.get(k) : null),
        setItem: (k, v) => void memory.set(k, String(v)),
        removeItem: (k) => void memory.delete(k),
      };
    }
  })();

  function setYear() {
    const yearNodes = document.querySelectorAll("#year");
    const year = String(new Date().getFullYear());
    yearNodes.forEach((n) => (n.textContent = year));
  }

  function normalize(s) {
    return String(s ?? "").trim();
  }

  function isAuthed() {
    return storage.getItem(AUTH_KEY) === "true";
  }

  function goEligibility() {
    window.location.assign(ELIGIBILITY_PAGE);
  }

  function goLogin() {
    window.location.assign(LOGIN_PAGE);
  }

  function onLoginPage() {
    const form = document.getElementById("loginForm");
    if (!form) return false;

    if (isAuthed()) {
      window.location.replace(ELIGIBILITY_PAGE);
      return true;
    }

    const errorNode = document.getElementById("error");

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      errorNode.textContent = "";

      const formData = new FormData(form);
      const username = normalize(formData.get("username"));
      const password = String(formData.get("password") ?? "");

      if (username !== USERNAME || password !== PASSWORD) {
        errorNode.textContent = "Incorrect username or password.";
        return;
      }

      storage.setItem(AUTH_KEY, "true");
      storage.setItem(NAME_KEY, "Jacqueline Owens");
      goEligibility();
    });

    return true;
  }

  function onEligibilityPage() {
    const logoutBtn = document.getElementById("logoutBtn");
    if (!logoutBtn) return false;

    if (!isAuthed()) {
      window.location.replace(LOGIN_PAGE);
      return true;
    }

    const applicantName = document.getElementById("applicantName");
    const name = storage.getItem(NAME_KEY) || "Jacqueline Owens";
    if (applicantName) applicantName.textContent = name;

    logoutBtn.addEventListener("click", () => {
      storage.removeItem(AUTH_KEY);
      storage.removeItem(NAME_KEY);
      goLogin();
    });

    return true;
  }

  setYear();
  onLoginPage();
  onEligibilityPage();
})();
