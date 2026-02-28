import { LitElement, css, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";

const MIN_WIDTH = 200;
const MAX_WIDTH = 480;

/**
 * Draggable resizer for the chat list right edge.
 * Dispatches 'resize' events with { width: number } detail.
 */
@customElement("chat-list-resizer")
export class ChatListResizer extends LitElement {
  @property({ type: Number }) width = 280;

  private isDragging = false;
  private startX = 0;
  private startWidth = 0;

  static styles = css`
    :host {
      width: 6px;
      min-width: 6px;
      cursor: col-resize;
      flex-shrink: 0;
      position: relative;
      background: transparent;
      transition: background 150ms ease-out;
    }
    :host::before {
      content: "";
      position: absolute;
      top: 0;
      left: -2px;
      right: -2px;
      bottom: 0;
    }
    :host(:hover),
    :host(.dragging) {
      background: color-mix(in srgb, var(--accent, #007bff) 30%, transparent);
    }
    :host(.dragging) {
      background: color-mix(in srgb, var(--accent, #007bff) 50%, transparent);
    }
  `;

  render() {
    return nothing;
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("mousedown", this.handleMouseDown);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("mousedown", this.handleMouseDown);
    document.removeEventListener("mousemove", this.handleMouseMove);
    document.removeEventListener("mouseup", this.handleMouseUp);
  }

  private handleMouseDown = (e: MouseEvent) => {
    this.isDragging = true;
    this.startX = e.clientX;
    this.startWidth = this.width;
    this.classList.add("dragging");

    document.addEventListener("mousemove", this.handleMouseMove);
    document.addEventListener("mouseup", this.handleMouseUp);

    e.preventDefault();
  };

  private handleMouseMove = (e: MouseEvent) => {
    if (!this.isDragging) {
      return;
    }

    const deltaX = e.clientX - this.startX;
    let newWidth = this.startWidth + deltaX;
    newWidth = Math.max(MIN_WIDTH, Math.min(MAX_WIDTH, newWidth));

    this.dispatchEvent(
      new CustomEvent("resize", {
        detail: { width: newWidth },
        bubbles: true,
        composed: true,
      }),
    );
  };

  private handleMouseUp = () => {
    this.isDragging = false;
    this.classList.remove("dragging");

    document.removeEventListener("mousemove", this.handleMouseMove);
    document.removeEventListener("mouseup", this.handleMouseUp);
  };
}

declare global {
  interface HTMLElementTagNameMap {
    "chat-list-resizer": ChatListResizer;
  }
}
