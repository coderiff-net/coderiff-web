class AwCopy extends HTMLElement {
  connectedCallback() {
    const button = this.querySelector<HTMLButtonElement>('[data-aw-copy-button]');
    const label = this.querySelector<HTMLElement>('[data-aw-copy-text]');
    const status = this.querySelector<HTMLElement>('[data-aw-copy-status]');
    if (!button || !label || !navigator.clipboard) return;

    button.hidden = false;
    button.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(this.dataset.text ?? '');
        label.textContent = button.dataset.copiedLabel ?? 'Copied';
        if (status) status.textContent = label.textContent;
        window.setTimeout(() => {
          label.textContent = button.dataset.copyLabel ?? 'Copy';
        }, 2000);
      } catch {
        label.textContent = button.dataset.copyLabel ?? 'Copy';
      }
    });
  }
}

if (!customElements.get('aw-copy')) customElements.define('aw-copy', AwCopy);
