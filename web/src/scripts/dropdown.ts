const TOPBAR_SELECTOR = "[data-topbar]";
const BUTTON_SELECTOR = ".user-menu-btn";
const DROPDOWN_SELECTOR = ".user-menu-dropdown";

function closeAllUserMenus() {
  document.querySelectorAll<HTMLElement>(DROPDOWN_SELECTOR).forEach((drop) => {
    drop.classList.add("hidden");
  });
}

// Delegación global: funciona aunque Astro reemplace el Topbar entre páginas
document.addEventListener("click", (event) => {
  const target = event.target as HTMLElement | null;
  if (!target) return;

  const topbar = target.closest(TOPBAR_SELECTOR);

  // Click dentro del Topbar
  if (topbar) {
    const button = target.closest(BUTTON_SELECTOR);
    const dropdown = topbar.querySelector<HTMLElement>(DROPDOWN_SELECTOR);

    // Click en el botón de usuario → toggle sólo ese menú
    if (button && dropdown) {
      event.stopPropagation();
      const isOpen = !dropdown.classList.contains("hidden");
      closeAllUserMenus();
      if (!isOpen) {
        dropdown.classList.remove("hidden");
      }
      return;
    }

    // Click dentro del dropdown → no cerrar
    const insideDropdown = target.closest(DROPDOWN_SELECTOR);
    if (insideDropdown) {
      event.stopPropagation();
      return;
    }
  }

  // Click fuera del Topbar o del dropdown → cerrar todos
  closeAllUserMenus();
});
