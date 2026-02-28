import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";

/** Fixed seed for deterministic star positions across redraws. */
const STAR_SEED = 0.618033988749;

/**
 * Starry sky background canvas.
 * Renders ~150 white dots with varying opacity for a subtle星空 effect.
 * No external deps; uses Canvas 2D.
 */
@customElement("star-background")
export class StarBackground extends LitElement {
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private resizeObserver: ResizeObserver | null = null;
  private themeObserver: MutationObserver | null = null;
  private rafId: number | null = null;

  static styles = css`
    :host {
      display: block;
      position: absolute;
      inset: 0;
      z-index: 0;
      pointer-events: none;
      overflow: hidden;
    }
    canvas {
      display: block;
      width: 100%;
      height: 100%;
    }
  `;

  render() {
    return html`
      <canvas></canvas>
    `;
  }

  override firstUpdated() {
    this.canvas = this.renderRoot.querySelector("canvas");
    if (!this.canvas) {
      return;
    }
    this.ctx = this.canvas.getContext("2d");
    this.resizeObserver = new ResizeObserver(() => this.scheduleDraw());
    this.resizeObserver.observe(this);
    this.themeObserver = new MutationObserver(() => this.scheduleDraw());
    this.themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    this.draw();
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.resizeObserver?.disconnect();
    this.resizeObserver = null;
    this.themeObserver?.disconnect();
    this.themeObserver = null;
    if (this.rafId != null) {
      cancelAnimationFrame(this.rafId);
    }
  }

  private scheduleDraw() {
    if (this.rafId != null) {
      return;
    }
    this.rafId = requestAnimationFrame(() => {
      this.rafId = null;
      this.draw();
    });
  }

  private draw() {
    const canvas = this.canvas;
    const ctx = this.ctx;
    if (!canvas || !ctx) {
      return;
    }

    const dpr = Math.min(window.devicePixelRatio ?? 1, 2);
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    if (w <= 0 || h <= 0) {
      return;
    }

    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.scale(dpr, dpr);

    ctx.clearRect(0, 0, w, h);

    const isLight = document.documentElement.dataset.theme === "light";
    const count = Math.min(180, Math.floor((w * h) / 8000));
    let s = STAR_SEED;
    for (let i = 0; i < count; i++) {
      s = (s * 9301 + 49297) % 233280;
      const x = (s / 233280) * w;
      s = (s * 9301 + 49297) % 233280;
      const y = (s / 233280) * h;
      s = (s * 9301 + 49297) % 233280;
      const radius = 0.5 + (s / 233280) * 1.5;
      s = (s * 9301 + 49297) % 233280;
      const opacity = 0.15 + (s / 233280) * 0.65;

      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = isLight ? `rgba(80, 90, 120, ${opacity})` : `rgba(255, 255, 255, ${opacity})`;
      ctx.fill();
    }
  }
}
