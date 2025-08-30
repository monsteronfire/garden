class CopyButton {
  constructor(snippetDiv) {
    this.snippetDiv = snippetDiv;
    this.button = this.createButton();
    this.addButtonToDom();
  }

  createButton() {
    const button = document.createElement("button");
    button.className = "copy-code-button";
    button.type = "button";
    button.innerText = "Copy";
    button.addEventListener("click", () => this.copyCodeToClipboard());
    return button;
  }

  async copyCodeToClipboard() {
    const codeElements = this.snippetDiv.querySelectorAll("code");
    const codeToCopy = codeElements[codeElements.length - 1].textContent.replace(/\n{2,}/g, '\n');

    try {
      const result = await navigator.permissions.query({ name: "clipboard-write" });
      if (result.state === "granted" || result.state === "prompt") {
        await navigator.clipboard.writeText(codeToCopy);
      } else {
        this.copyCodeBlockExecCommand(codeToCopy);
      }
    } catch (err) {
      this.copyCodeBlockExecCommand(codeToCopy);
    } finally {
      this.codeWasCopied();
    }
  }

  async copyCodeBlockExecCommand(codeToCopy) {
    try {
      await navigator.clipboard.writeText(codeToCopy);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = codeToCopy;
      this.snippetDiv.insertBefore(textArea, this.snippetDiv.firstChild);
      textArea.select();
      document.execCommand("copy");
      this.snippetDiv.removeChild(textArea);
    }
  }

  codeWasCopied() {
    this.button.blur();
    this.button.innerText = "Copied!";
    setTimeout(() => {
      this.button.innerText = "Copy";
    }, 2000);
  }

  addButtonToDom() {
    this.snippetDiv.insertBefore(this.button, this.snippetDiv.firstChild);
    const wrapper = document.createElement("div");
    wrapper.className = "snippet-wrapper";
    this.snippetDiv.parentNode.insertBefore(wrapper, this.snippetDiv);
    wrapper.appendChild(this.snippetDiv);
  }

  static initAll() {
    document.querySelectorAll(".snippet").forEach(snippetDiv => new CopyButton(snippetDiv));
  }
}

CopyButton.initAll();
